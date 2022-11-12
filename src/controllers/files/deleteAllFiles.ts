import { Request, Response } from "express";
import { FileSchema, IFile } from "../../models/File";
import fs from "fs";
import path from "path";

export async function deleteAllFiles(
  req: Request,
  res: Response
): Promise<void> {
  const folder = "uploads";

  fs.readdir(folder, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlinkSync(path.join(folder, file));
    }
  });
  await FileSchema.deleteMany();
  res.json({ message: "Done!" });
}
