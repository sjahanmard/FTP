import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { router } from "./routes/files";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE_URL || "");

app.set("view engine", "ejs");
app.use(router);
app.listen(process.env.PORT);
