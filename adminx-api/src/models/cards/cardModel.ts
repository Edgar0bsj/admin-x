import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    idName: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      required: true,
    },
    stats: {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

const cardModel = mongoose.model("Cards", cardSchema);

export default cardModel;
