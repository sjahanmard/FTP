import { Request, Response } from "express";

export async function getMainPage(req: Request, res: Response): Promise<void> {
  res.render("index");
}
