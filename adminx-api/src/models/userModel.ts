import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //Permite espaço
      minlength: 3,
      maxlength: 50,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Esse Email ja existe!"],
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
