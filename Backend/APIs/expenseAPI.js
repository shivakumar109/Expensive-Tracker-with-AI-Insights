import exp from "express";
import { ExpenseModel } from "../Models/expenseModel.js";
import { verifyToken } from '../Middlewares/verifyToken.js'
import mongoose from "mongoose";
export const expenseRoute=exp.Router();


// POST   expenses
expenseRoute.post("/expenses",verifyToken,async (req, res, next) =>{
  try{
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
  }
  catch(error){
    next(error);
  }
})


// GET    /expenses
expenseRoute.get("/expenses", verifyToken, async (req, res, next) => {
  try {
    let user = req.user.userId;
    const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;
    
    let query = { user, isActive: true };
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    
    let expenseObj = await ExpenseModel.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const totalCount = await ExpenseModel.countDocuments(query);

    res.status(200).json({
      message: "Expenses fetched successfully",
      payload: expenseObj,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pages: Math.ceil(totalCount / limit)
      }
    });
  }
  catch (error) {
    next(error);
  }
})

// GET  specific expense by category
expenseRoute.get("/expenses/category/:category", verifyToken, async (req, res, next) => {
  try {
    let userId = req.user.userId;
    let cat = req.params.category;
    let expenseObj = await ExpenseModel.find({ user: userId, category: cat, isActive: true });
    res.status(200).json({ message: "Object fetched successfully", payload: expenseObj })
  }
  catch (error) {
    next(error);
  }
})

// PUT request to update an expense
expenseRoute.put("/expenses/:id", verifyToken, async (req, res, next) => {
  try {
    let expid = req.params.id;
    let updateData = req.body;
    let updatedExpense = await ExpenseModel.findOneAndUpdate(
      { _id: expid, user: req.user.userId, isActive: true },
      updateData,
      { new: true }
    );
    res.status(200).json({ message: "Updated successfully", payload: updatedExpense });
  }
  catch (error) {
    next(error);
  }
})

// DELETE request to softdelete the expense
expenseRoute.delete("/expenses/:id", verifyToken, async (req, res, next) => {
  try {
    let expid = req.params.id;
    let newExpense = await ExpenseModel.findOneAndUpdate(
      { _id: expid, user: req.user.userId },
      { isActive: false },
      { new: true }
    );
    res.status(200).json({ message: "Deleted successfully", payload: newExpense });
  }
  catch (error) {
    next(error);
  }
})

expenseRoute.get("/monthly-summary", verifyToken, async (req, res, next) => {
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
    next(error);
  }
});

//summary
expenseRoute.get("/summary", verifyToken, async (req, res, next) => {
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
    next(error);
  }
});

//category-summary
expenseRoute.get("/category-summary", verifyToken, async (req, res, next) => {
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
    next(error);
  }
});

//top cat
expenseRoute.get("/top-category", verifyToken, async (req, res, next) => {
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
    next(error);
  }
});