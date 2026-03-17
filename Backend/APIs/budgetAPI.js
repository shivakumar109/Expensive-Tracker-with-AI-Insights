import exp from "express";
import {BudgetModel} from "../Models/budgetModel.js"
import {verifyToken} from "../Middlewares/verifyToken.js"
import { ExpenseModel } from "../Models/expenseModel.js";
import mongoose from "mongoose";
export const budgetRoute=exp.Router();

// Create budget for user(protected route) POST
budgetRoute.post("/budget",verifyToken,async(req,res)=>{
    // get userID from req.body
    let userId=req.user.userId;
    // update the budget of specific user
    let budObj=req.body;
    let newbudObj=await BudgetModel({...budObj,user:userId});
    await newbudObj.save();
    // send res
    res.status(201).json({message:"budet created",payload:newbudObj});
})

// GET budget Route
budgetRoute.get("/budget",verifyToken,async(req,res)=>{
    let userId=req.user.userId;
    // get the budgObj from 
    let budget=await BudgetModel.findOne({user:userId,isActive:true, });
    if (!budget) {
      return res.status(404).json({
        message: "No budget found"
      });
    }
     const totalExpense = await ExpenseModel.aggregate([
      {
        $match: {
          user:new mongoose.Types.ObjectId( userId),
          type: "expense",
          isActive: true
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);
    const spentExpenses = totalExpense.length > 0 ? totalExpense[0].total : 0;

    // 3️Calculate remaining budget
    const remaining = budget.budgetAmount - spentExpenses;

    // 4️ Send response
    res.status(200).json({message:"budget of user",payload:{
      user: userId,
      budgetAmount: budget.budgetAmount,
      spentExpenses,
      remaining
    }});
});

// get route to check budget is completed or n
budgetRoute.get("/check-budget", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const budget = await BudgetModel.findOne({
      user: userId,
      isActive: true
    });
    if (!budget) {
      return res.status(404).json({
        message: "No budget found"
      });
    }
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
    result.forEach((item) => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    // Budget calculations
    const budgetAmount = budget.budgetAmount;
    const spent = expense;
    const remainingBudget = budgetAmount - spent;

    // Balance calculation
    const balance = income - expense;

    // Alert logic
    let alert = "Safe";

    const percentage = (spent / budgetAmount) * 100;

    if (spent >= budgetAmount) {
      alert = "Budget exceeded!";
    } else if (percentage >= 80) {
      alert = "Warning: 80% budget used";
    }

    //  Response
    res.status(200).json({
      message: "Budget & financial status",
      payload: {
        budgetAmount,
        income,
        expense,
        remainingBudget,
        balance,
        percentage: percentage.toFixed(2),
        alert
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error",
      payload: error.message
    });
  }
});

// PUT request to update budget
budgetRoute.put("/budget/:amount", verifyToken, async (req, res) => {
  try {

    let userId = req.user.userId;
    let amount = req.params.amount;

    // update budget using userI
    let newBudget = await BudgetModel.findOneAndUpdate(
      { user: userId, isActive: true },
      { budgetAmount: amount },
      { new: true }
    );

    if (!newBudget) {
      return res.status(404).json({
        message: "No budget found"
      });
    }

    res.status(200).json({
      message: "Budget updated successfully",
      payload: newBudget
    });

  } catch (error) {
    res.status(500).json({
      message: "Error",
      payload: error.message
    });
  }
});