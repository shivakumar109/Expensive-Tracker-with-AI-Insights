import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRoute } from './APIs/userApi.js';
import {expenseRoute} from "./APIs/expensesAPI.js"
import { budgetRoute } from './APIs/budgetAPI.js';
//process.env
config()
const  app=exp()
//add body parser middleware
app.use(exp.json());
//add cookiParser
app.use(cookieParser());
//connect to db
const connectDb=async()=>{
     try{
     await connect(process.env.DB_URL);
     console.log("DB connection successful");
     app.listen(process.env.PORT,()=>console.log("server 4000 started"));
     }catch(err){
          console.log('Error in DB Connection ',err);
     }
}
connectDb();
//connect-apis
app.use('/user-api',userRoute)
app.use('/expense-api',expenseRoute);
app.use('/budget-api',budgetRoute);
//error handling middle ware
app.use((err,req,res,next)=>{
     res.json({message:"Error ",paylood:err.message});
     next();
})