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
    type: { type: String, enum: ["c", "d"], require: true }, // débito, crédito
    balance: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const accountModel = mongoose.model("Accounts", accountSchema);

export default accountModel;
