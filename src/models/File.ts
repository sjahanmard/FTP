import mongoose from "mongoose";

export interface IFile {
  path: string;
  originalName: string;
  password?: string;
  downloadCount?: number;
}

const File = new mongoose.Schema<IFile>({
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
