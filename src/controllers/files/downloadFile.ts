import { Request, Response } from "express";
import { FileSchema } from "../../models/File";
import bcrypt from "bcrypt";

export async function downloadFile(req: Request, res: Response) {
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
