import exp from "express";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { ExpenseModel } from "../Models/expenseModel.js";
import mongoose from "mongoose";
import { generateSuggestions } from "../Services/aiservice.js";

export const aiRoute = exp.Router();

// GET AI suggestions
aiRoute.get("/suggestions", verifyToken, async (req, res) => {
  try {

    const userId = req.user.userId;

    // 1️⃣ Get summary (income + expense)
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

    // 2️⃣ Category-wise expense
    const categoryData = await ExpenseModel.aggregate([
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

    // 3️⃣ Prepare summary object
    const summary = {
      income,
      expense,
      balance: income - expense,
      categories: categoryData
    };

    // 4️⃣ Call AI service
    const suggestions = await generateSuggestions(summary);

    // 5️⃣ Send response
    res.status(200).json({
      message: "AI suggestions generated",
      payload: suggestions
    });

  } catch (error) {
    res.status(500).json({
      message: "Error generating suggestions",
      payload: error.message
    });
  }
});