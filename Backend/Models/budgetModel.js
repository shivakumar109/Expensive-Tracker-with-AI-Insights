import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    month: {
      type: Number,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    budgetAmount: {
      type: Number,
      required: true
    },

    spentAmount: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    strict:"throw",
  }
);

export const BudgetModel =mongoose.models.Budget || mongoose.model("Budget", budgetSchema);