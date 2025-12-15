import mongoose from "mongoose";

const connectDB = async ()=>{
  try {

    mongoose.connection.on('connected',()=>{
      console.log("Database is connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
  } catch (error) {
    console.log("Error in connecting database",error)
  }
}

export default connectDB;