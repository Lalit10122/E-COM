import {v2 as cloudinary} from 'cloudinary'

// fuction for add products
const addProduct = async (req, res) => {
  try {
    const { name, description, category, subCategory, price, sizes, bestSeller } = req.body;

    
    if (!req.files) {
      return res.json({ success: false, message: "No files uploaded" });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item)=>item != undefined)

    let imagesUrl = await Promise.all(
      images.map( async (item)=>{
        // give us image url
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})

        return result.secure_url;
      })
    )




    console.log(imagesUrl);
    console.log("Data:", name, description, category, subCategory, price, sizes, bestSeller);

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// fuction for list products
const listProducts = async(req,res)=>{
  
}

// fuction for removing products
const removeProduct = async(req,res)=>{

}

// fuction for  single product info
const singleProduct = async(req,res)=>{

}

export {listProducts,addProduct,removeProduct,singleProduct}