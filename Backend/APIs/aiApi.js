import exp from "express";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { ExpenseModel } from "../Models/expenseModel.js";
import mongoose from "mongoose";
import { generateSuggestions, chatWithAI } from "../Services/aiservice.js";

export const aiRoute = exp.Router();

const getUserFinancialSummary = async (userId) => {
  const result = await ExpenseModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), isActive: true } },
    { $group: { _id: "$type", total: { $sum: "$amount" } } }
  ]);
  let income = 0;
  let expense = 0;
  result.forEach(item => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  const categoryData = await ExpenseModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), type: "expense", isActive: true } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);

  return { income, expense, balance: income - expense, categories: categoryData };
};

// GET AI suggestions
aiRoute.get("/suggestions", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const summary = await getUserFinancialSummary(userId);
    const suggestions = await generateSuggestions(summary);
    
    res.status(200).json({
      message: "AI suggestions generated",
      payload: suggestions
    });
  } catch (error) {
    next(error);
  }
});

// POST AI Chat
aiRoute.post("/chat", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const summary = await getUserFinancialSummary(userId);
    const reply = await chatWithAI(message, summary);

    res.status(200).json({
      message: "AI replied",
      payload: reply
    });
  } catch (error) {
    next(error);
  }
});