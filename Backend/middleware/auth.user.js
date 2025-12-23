import jwt from 'jsonwebtoken'



const authUser = async (req,res,next) =>{
  const {token} = req.headers;
  if(!token){
    return res.json({
      success:false,
      message:"Not authorized log in again"
    })
  }

  try {
    // it gives us user id
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    // pass this id to req.body
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
     return res.json({
      success:false,
      message:error.message
    })
  }
}

export default authUser;