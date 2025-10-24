import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      trim: true,
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      trim: true,
      require: true,
    },
    amount: { type: Number, require: true },
    spent: { type: Number, require: true },
    period: {
      type: String,
      enum: ["mensal", "semanal", "anual"],
      require: true,
    },
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const budgetModel = mongoose.model("Budgets", budgetSchema);

export default budgetModel;
