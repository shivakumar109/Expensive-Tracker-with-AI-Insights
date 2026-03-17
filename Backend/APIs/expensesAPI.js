import exp from "express";
import { ExpenseModel } from "../Models/expenseModel.js";
import { verifyToken } from '../Middlewares/verifyToken.js'
import mongoose from "mongoose";
export const expenseRoute=exp.Router();



// POST   expenses
expenseRoute.post("/expenses",verifyToken,async(req,res)=>{
     let userId = req.user.userId;
     let expObj=req.body
    if (expObj.type === "expense") {
    const incomeExists = await ExpenseModel.findOne({
        user: userId,
        type: "income",
        isActive: true
      });
      if (!incomeExists) {
        return res.status(400).json({
          message: "Please add income first before adding expenses"
        });
      }
    }
    let expenseObj=new ExpenseModel({...expObj,user:userId});
    await expenseObj.save();
    res.status(201).json({message:"expense of user",payload:expenseObj});
})


// GET    /expenses
expenseRoute.get("/expenses",verifyToken,async(req,res)=>{
    // get userID
    let user=req.user.userId;
    // console.log(user);
    // get expenses with userID
    let expenseObj=await ExpenseModel.find({user,isActive:true});
    // send res
    res.status(201).json({message:"expense of user",payload:expenseObj});
})
// GET  specific expense by catogery
expenseRoute.get("/expenses/:category",verifyToken,async(req,res)=>{
    // get userId
    let userId=req.user.userId;
    let cat=req.params.category;
    //console.log(userId,cat)
    // get expenseOBj by userID
    let expenseObj= await ExpenseModel.find({user:userId,category:cat,isActive:true });
    // send res
    res.status(201).json({message:"Object fetched sucessfully",payload:expenseObj})
})

// Put request to softdelete the income
expenseRoute.put("/expenses/:id",verifyToken,async(req,res)=>{
    // GET expenses id from req.params
    let expid=req.params.id;
    // Find the expenseObj and make isActive to false
    let newExpense = await ExpenseModel.findOneAndUpdate(
    { _id: expid, user: req.user.userId },
    { isActive: false },
    { new: true }
    );
    // send res
    res.status(201).json({message:"Deleted succesfully",payload:newExpense});
})
expenseRoute.get("/monthly-summary", verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;

    const data = await ExpenseModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          isActive: true
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      }
    ]);

    let result = {};

    data.forEach(item => {
      let month = item._id.month;
      let type = item._id.type;

      if (!result[month]) {
        result[month] = { income: 0, expense: 0 };
      }

      result[month][type] = item.total;
    });

    res.status(200).json({
      message: "Monthly summary",
      payload: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error",
      payload: error.message
    });
  }
});
//summary
expenseRoute.get("/summary", verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;

    const result = await ExpenseModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          isActive: true
        }
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    result.forEach(item => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//category-summary
expenseRoute.get("/category-summary", verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;

    const data = await ExpenseModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
          isActive: true
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      message: "Category summary",
      payload: data
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//top cat
expenseRoute.get("/top-category", verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;

    const data = await ExpenseModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
          isActive: true
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 1
      }
    ]);

    res.json({
      message: "Top category",
      payload: data[0]
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});