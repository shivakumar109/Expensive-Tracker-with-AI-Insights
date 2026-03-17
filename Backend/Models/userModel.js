import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
     firstName:{
          type:String,
          required:[true,"FirstName required"]
     },
     lastName:{
          type:String,
          required:[true,"LastName required"]
     },
     email:{
          type:String,
          required:[true, "Email Required"],
          unique:[true," Email is already exits"]
     },
     password:{
          type:String,
          required:[true, "Password Required"]
     },
     profileImageUrl:{
          type:String,
     },
     isActive:{
          type: Boolean,
          default:true
     }

},{
     timestamps:true,
     strict:"throw",
     versionKey:false
})
export const UserModel =mongoose.models.user|| mongoose.model("user",userSchema);