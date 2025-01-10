import { Router } from "express";
import {
  getRootDocuments,
  getOneFile,
  uploadFolders,
  addSubFolders,
  getDocuments,
  uploadFile,
} from "../controllers/file-controller.js";
import multer from "multer";
const fileRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
    filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
fileRouter.get("/folders", getRootDocuments);
fileRouter.get("/folders/:folderName", getDocuments);
fileRouter.get("/file/:_id", getOneFile);
fileRouter.post("/create-folder", uploadFolders);
fileRouter.post("/file", upload.single("file"), uploadFile);
fileRouter.post("/subfolder", addSubFolders);
export default fileRouter;
