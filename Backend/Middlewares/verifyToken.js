import jwt from 'jsonwebtoken';

export const verifyToken= async(req,res,next)=>{
     //read token from req
     let token=req.cookies.token; //{token:""}
     //console.log("token ",token);
     if(!token){
          return res.status(400).json({message:"Unauthorized req.Plz login"})
     }
     //verify the validity of token(decoding the token)
     let decodeToken=jwt.verify(token,process.env.JWT_SECRET);
     req.user = decodeToken;
     //forward to next middleware/route
     next()

}