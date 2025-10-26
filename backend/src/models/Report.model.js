import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    ph: {
      type: Number,
      required: true,
    },
    tds: {
      type: Number,
      required: true,
    },
    turbidity: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    smell: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    aiResult: {
      purity: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["safe", "unsafe", "Needs treatment"],
        default: "safe",
      },
      explanation: {
        type: String,
        required: true,
      },
      suggestions: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
