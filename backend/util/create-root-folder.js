import mongoose from "mongoose";
import { Folder } from "../models/file-models.js";
import { config } from "dotenv";
config({path:'../', debug: true});
const username = "amajid09@gmail.com";

const mongodbUri = process.env.MONGODB_URI;
console.log("uri", mongodbUri);
mongoose.connect(mongodbUri);
mongoose.connection.on("connected", () => {
  Folder.insertMany({
    username,
    folderName: "root",
    files: [],
    folders: [],
  });
});
