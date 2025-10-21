import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      trim: true,
      require: true,
    },
    name: { type: String, trim: true, require: true },
    color: { type: String, require: true },
    icon: { type: String, require: true },
    type: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const categoryModel = mongoose.model("Categories", categorySchema);

export default categoryModel;
