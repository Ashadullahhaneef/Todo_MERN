const mongoose = require("mongoose");

const todSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("todo", todoSchema);
