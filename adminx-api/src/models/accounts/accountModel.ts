import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      trim: true,
      require: true,
    },
    name: { type: String, trim: true, require: true },
    type: { type: String, enum: ["débito", "crédito"], require: true },
    balance: { type: Number, require: true },
    currency: { type: String, default: "BRL" },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const accountModel = mongoose.model("Accounts", accountSchema);

export default accountModel;
