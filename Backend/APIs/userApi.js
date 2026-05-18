import exp from 'express';
import {UserModel} from '../Models/userModel.js'
import {register} from '../Services/authservice.js'
import bcrypt from "bcryptjs";
import { authenticate } from "../Services/authservice.js";

export const userRoute=exp.Router();

// Register user
userRoute.post("/users", async (req, res, next) => {
    try {
        let userObj = req.body;
        const newUserObj = await register(userObj);
        res.status(201).json({ message: "User Created", payload: newUserObj });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(error);
    }
})

//login
userRoute.post("/login", async (req, res, next) => {
    try {
         let authorCred = req.body;
         let { token, user } = await authenticate(authorCred);
         res.cookie("token", token, {
              httpOnly: true,
              sameSite: "lax",
              secure: false,
         });
         res.status(200).json({ message: "login success", payload: { token, user } });
    }
    catch (error) {
         next(error);
    }
})

//logout
userRoute.get("/logout", async (req, res, next) => {
    try {
         res.clearCookie('token', {
              httpOnly: true,
              secure: false,
              sameSite: 'lax'
         });
         res.status(200).json({ message: "logged out successfully" })
    }
    catch (error) {
         next(error);
    }
})