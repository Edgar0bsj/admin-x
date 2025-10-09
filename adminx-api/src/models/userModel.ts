import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
      minlength: [3, "O nome tem que ter no mínimo 3 letras"],
      maxlength: [50, "O nome não pode ter mais de 50 dígitos"],
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Esse e-mail já existe"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "E-mail inválido"],
    },
    password: {
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

const userModel = mongoose.model("User", userSchema);

export default userModel;
