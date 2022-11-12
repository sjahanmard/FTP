import { Router } from "express";
import { downloadFile } from "../controllers/files/downloadFile";
import { getAllFiles } from "../controllers/files/getAllFiles";
import { getMainPage } from "../controllers/files/getMainPage";
import { uploadFile } from "../controllers/files/uploadFile";
import multer from "multer";
import { deleteAllFiles } from "../controllers/files/deleteAllFiles";

export const router = Router();
const upload = multer({ dest: "uploads" });

router.route("/").get(getMainPage);
router.route("/all").get(getAllFiles);
router.route("/file/:id").get(downloadFile).post(downloadFile);
router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/delete-all").get(deleteAllFiles);
