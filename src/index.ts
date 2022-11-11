import express, { Request, Response } from "express";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { FileSchema } from "../models/File";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads" });
mongoose.connect(process.env.DATABASE_URL || "");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData: any = {
    path: req?.file?.path,
    originalName: req?.file?.originalname,
  };
  if (req?.body?.password) {
    fileData.password = await bcrypt.hash(req?.body?.password, 10);
  }
  const file = await FileSchema.create(fileData);
  console.log("Salam", file?.originalName);
  res.render("index", {
    fileLink: `${req?.headers?.origin}/file/${file?.id}`,
  });
});

app.route("/file/:id").get(handleDownload).post(handleDownload);

app.get("/all", async (req, res) => {
  const items = await FileSchema.find();
  res.send(items);
});

app.listen(process.env.PORT);

async function handleDownload(req: Request, res: Response) {
  const file = await FileSchema.findById(req?.params?.id);

  if (file?.password) {
    if (!req?.body?.password) {
      return res.render("password");
    } else if (!(await bcrypt.compare(req?.body?.password, file?.password))) {
      return res.render("password", { error: true });
    }
  }
  file?.downloadCount && file.downloadCount++;
  await file?.save();

  res.download(file?.path || "", file?.originalName || "");
}
