import { Request, Response } from "express";
import { FileSchema } from "../../models/File";

export async function getAllFiles(req: Request, res: Response): Promise<void> {
  const items = await FileSchema.find();
  res.send(items);
}
