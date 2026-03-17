import exp from 'express';
import {UserModel} from '../Models/userModel.js'
import {register} from '../Services/authservice.js'
import bcrypt from "bcryptjs";
import { authenticate } from "../Services/authservice.js";

export const userRoute=exp.Router();

// Register user
userRoute.post("/users",async(req,res)=>{
    let userObj=req.body;
    const newUserObj=await register(userObj);
    console.log(userObj);
    res.json({message:"User Created",payload:newUserObj});
})

//login
userRoute.post("/login",async(req,res)=>{
     let authorCred = req.body;
     //call authenticate service
     let {token,user}= await authenticate(authorCred);
     //save token as httponly cookie
     res.cookie("token",token,{
          httpOnly:true,
          sameSite:"lax",
          secure:false,
     });
     //send res
     res.status(201).json({message:"login sucess",payload:user});
})

//logout
userRoute.get("/logout",async(req,res)=>{
     //clear all the cookies
     //must match orginal settings
     res.clearCookie('token',{
          httpOnly:true,
          secure:false,
          sameSite:'lax'
     });
     res.status(200).json({message:"loged out sucessfully"})
})

