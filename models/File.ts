import mongoose from "mongoose";

const File = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const FileSchema = mongoose.model("File", File);
