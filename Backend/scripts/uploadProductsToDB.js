import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/mongoDB.js';
import productModel from '../models/product.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Read and parse the assets.js file
const assetsPath = path.join(__dirname, '../upload/assets.js');
const assetsContent = fs.readFileSync(assetsPath, 'utf-8');

// Extract products array using regex - get the entire array as string
// Find the start of the array
const startIndex = assetsContent.indexOf('export const products = [');
if (startIndex === -1) {
  throw new Error('Could not find products array in assets.js');
}

// Find the matching closing bracket
let bracketCount = 0;
let inArray = false;
let endIndex = startIndex;

for (let i = startIndex + 'export const products = '.length; i < assetsContent.length; i++) {
  if (assetsContent[i] === '[') {
    bracketCount++;
    inArray = true;
  } else if (assetsContent[i] === ']') {
    bracketCount--;
    if (bracketCount === 0 && inArray) {
      endIndex = i + 1;
      break;
    }
  }
}

const productsArrayString = assetsContent.substring(
  startIndex + 'export const products = '.length,
  endIndex
);

// Function to extract all image references from the products array string
function extractImageReferences(productsString) {
  const imageRefs = new Set();
  // Match image arrays - handle multiline with /s flag
  const imagePattern = /image:\s*\[([^\]]+)\]/gs;
  let match;
  
  while ((match = imagePattern.exec(productsString)) !== null) {
    const imageArrayContent = match[1];
    // Extract individual image references (p_img1, p_img2_1, etc.)
    // Remove whitespace and newlines, then extract refs
    const cleaned = imageArrayContent.replace(/\s+/g, '');
    const refs = cleaned.match(/p_img[\w\d_]+/g);
    if (refs) {
      refs.forEach(ref => imageRefs.add(ref));
    }
  }
  
  return Array.from(imageRefs);
}

// Function to parse products and extract image references for each product
function parseProductsWithImageRefs(productsString) {
  const products = [];
  // Match product objects - handle nested braces properly
  const productPattern = /\{\s*(?:\/\/[^\n]*\n\s*)?name:\s*"([^"]+)",[\s\S]*?\}/g;
  let match;
  let index = 0;
  
  while ((match = productPattern.exec(productsString)) !== null) {
    const productStr = match[0];
    index++;
    
    try {
      // Extract name
      const nameMatch = productStr.match(/name:\s*"([^"]+)"/);
      const name = nameMatch ? nameMatch[1] : `Product ${index}`;
      
      // Extract description
      const descMatch = productStr.match(/description:\s*"([^"]+)"/);
      const description = descMatch ? descMatch[1] : '';
      
      // Extract price
      const priceMatch = productStr.match(/price:\s*(\d+)/);
      const price = priceMatch ? parseInt(priceMatch[1]) : 0;
      
      // Extract image references - handle multiline arrays
      const imageMatch = productStr.match(/image:\s*\[([^\]]+)\]/s);
      let imageRefs = [];
      if (imageMatch) {
        const cleaned = imageMatch[1].replace(/\s+/g, '');
        imageRefs = cleaned.match(/p_img[\w\d_]+/g) || [];
      }
      
      // Extract category
      const categoryMatch = productStr.match(/category:\s*"([^"]+)"/);
      const category = categoryMatch ? categoryMatch[1] : '';
      
      // Extract subCategory
      const subCategoryMatch = productStr.match(/subCategory:\s*"([^"]+)"/);
      const subCategory = subCategoryMatch ? subCategoryMatch[1] : '';
      
      // Extract sizes
      const sizesMatch = productStr.match(/sizes:\s*\[([^\]]+)\]/);
      const sizes = sizesMatch ? sizesMatch[1].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || [] : [];
      
      // Extract date
      const dateMatch = productStr.match(/date:\s*(\d+)/);
      const date = dateMatch ? parseInt(dateMatch[1]) : Date.now();
      
      // Extract bestseller
      const bestsellerMatch = productStr.match(/bestseller:\s*(true|false)/);
      const bestseller = bestsellerMatch ? bestsellerMatch[1] === 'true' : false;
      
      products.push({
        name,
        description,
        price,
        image: imageRefs, // Store as array of image reference strings
        category,
        subCategory,
        sizes,
        date,
        bestseller
      });
    } catch (error) {
      console.warn(`Error parsing product ${index}:`, error.message);
    }
  }
  
  if (products.length === 0) {
    throw new Error('Could not parse any products from array');
  }
  
  return products;
}

// Extract all unique image references
const allImageRefs = extractImageReferences(productsArrayString);
console.log(`Found ${allImageRefs.length} unique image references`);

// Parse products
const products = parseProductsWithImageRefs(productsArrayString);
console.log(`Parsed ${products.length} products`);

// Function to get image file path
function getImagePath(imageRef) {
  const uploadDir = path.join(__dirname, '../upload');
  // Try different extensions
  const extensions = ['.png', '.jpg', '.jpeg'];
  for (const ext of extensions) {
    const filePath = path.join(uploadDir, `${imageRef}${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: 'image',
      folder: 'e-commerce/products', // Optional: organize images in a folder
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error.message);
    throw error;
  }
}

// Main function to process products
async function uploadProducts() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Create a map to store image references to Cloudinary URLs
    const imageMap = new Map();

    // Upload all images to Cloudinary
    console.log('Uploading images to Cloudinary...');
    let uploadedCount = 0;
    for (const imageRef of allImageRefs) {
      const imagePath = getImagePath(imageRef);
      if (!imagePath) {
        console.warn(`Warning: Image file not found for ${imageRef}`);
        continue;
      }

      try {
        const cloudinaryUrl = await uploadImageToCloudinary(imagePath);
        imageMap.set(imageRef, cloudinaryUrl);
        uploadedCount++;
        console.log(`✓ Uploaded ${imageRef} -> ${cloudinaryUrl.substring(0, 50)}...`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to upload ${imageRef}:`, error.message);
      }
    }

    console.log(`\nSuccessfully uploaded ${uploadedCount} images to Cloudinary`);

    // Process products and replace image references with Cloudinary URLs
    console.log('\nProcessing products...');
    const processedProducts = products.map((product, index) => {
      const processedProduct = { ...product };
      
      // Replace image references (strings) with Cloudinary URLs
      if (Array.isArray(product.image)) {
        processedProduct.image = product.image.map(imageRef => {
          const cloudinaryUrl = imageMap.get(imageRef);
          if (cloudinaryUrl) {
            return cloudinaryUrl;
          } else {
            console.warn(`Warning: No Cloudinary URL found for ${imageRef} in product ${index + 1} (${product.name})`);
            return null;
          }
        }).filter(url => url !== null); // Remove null values
        
        if (processedProduct.image.length === 0) {
          console.warn(`Warning: Product ${index + 1} (${product.name}) has no valid images`);
        }
      }

      // Map bestseller to bestSeller (schema uses bestSeller)
      if (product.bestseller !== undefined) {
        processedProduct.bestSeller = product.bestseller;
        delete processedProduct.bestseller;
      }

      return processedProduct;
    });

    // Insert products into MongoDB
    console.log('\nInserting products into MongoDB...');
    const result = await productModel.insertMany(processedProducts, { ordered: false });
    console.log(`\n✓ Successfully inserted ${result.length} products into MongoDB!`);

    // Summary
    console.log('\n=== Summary ===');
    console.log(`Total products processed: ${products.length}`);
    console.log(`Images uploaded to Cloudinary: ${uploadedCount}`);
    console.log(`Products inserted into MongoDB: ${result.length}`);

  } catch (error) {
    console.error('Error in uploadProducts:', error);
    throw error;
  } finally {
    // Close MongoDB connection
    process.exit(0);
  }
}

// Run the script
uploadProducts().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});

