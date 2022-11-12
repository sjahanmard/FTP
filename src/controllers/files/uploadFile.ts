import { Request, Response } from "express";
import { FileSchema, IFile } from "../../models/File";
import bcrypt from "bcrypt";

export async function uploadFile(req: Request, res: Response): Promise<void> {
  const fileData: IFile = {
    path: req?.file?.path || "",
    originalName: req?.file?.originalname || "",
  };
  if (req?.body?.password) {
    fileData.password = await bcrypt.hash(req?.body?.password, 10);
  }
  const file = await FileSchema.create(fileData);
  res.render("index", {
    fileLink: `${req?.headers?.origin}/file/${file?.id}`,
  });
}
