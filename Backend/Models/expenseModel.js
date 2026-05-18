import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other",
        "Salary",
        "Business",
        "Freelance",
        "Investment"
      ]
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    receiptImage: {
      type: String, // store image URL if using receipt scanning
    },
    isActive:{
      type:Boolean,
      default:true,
    }
  },
  {
    timestamps: true,
    strict:"throw",
    versionkey:false
  }
);

export const ExpenseModel =mongoose.model("expense",expenseSchema);
