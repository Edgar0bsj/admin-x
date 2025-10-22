import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      trim: true,
      require: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      require: true,
    },
    amount: { type: Number, require: true },
    description: { type: String, trim: true, require: true },
    date: { type: Date, require: true },
    type: { type: String, enum: ["despesa", "receita"], require: true },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const transactionModel = mongoose.model("Transactions", transactionSchema);

export default transactionModel;
