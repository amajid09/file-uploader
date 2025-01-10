import { File, Folder } from "../models/file-models.js";
import { v2 as cloudinary } from "cloudinary";
import { formatBytes } from "../util/convert.js";
export const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ messsage: "User is not authorised" });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const username = req.user;
    const { folderName } = req.params;
    const documents = await Folder.findOne({ folderName, username })
      .populate("folders", "folderName")
      .exec();
    if (!documents) {
      return res.status(400).json({
        message: `The provided folder (${folderName}) does not exist.`,
      });
    }
    res.json({ documents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOneFile = async (req, res) => {
  const { _id } = req.params;
  try {
    const file = await File.findOne({ _id });
    res.json({ message: "get a single file", file });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRootDocuments = async (req, res) => {
  try {
    const folders = await Folder.find({});
    res.json({ folders, user: req.user });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getFoldersAndFiles = async (req, res) => {
  res.json({ message: "get all folders and files" });
};

export const uploadFolders = async (req, res) => {
  try {
    const username = req.user;
    const folders = await Folder.insertMany({
      username,
      folderName: "root",
      files: [],
      folders: [],
    });
    res.status(200).json({ message: "successfully created a folder", folders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSubFolders = async (req, res) => {
  try {
    const username = req.user;
    const { parentFolder, subFolder } = req.body;
    if (!parentFolder || !subFolder) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields." });
    }
    const checkFolder = await Folder.findOne({ folderName: parentFolder });
    if (!checkFolder) {
      return res.status(503).json({
        messsage:
          "The given directory does not exist. Please use one that does exist.",
      });
    }
    const subfolder = new Folder({
      username,
      folderName: subFolder,
      files: [],
      folders: [],
    });
    await subfolder.save();
    const folders = await Folder.findOneAndUpdate(
      { username, folderName: parentFolder },
      {
        $push: {
          folders: subfolder.id,
        },
      }
    );
    res.status(200).json({ message: "successfully created a folder", folders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { folderName } = req.body;
    const checkFolder = await Folder.findOne({ folderName });
    if (!checkFolder) {
      return res.status(400).json({
        message: "Cannot upload a file to a folder that does not exist.",
      });
    }
    const result = await cloudinary.uploader.upload(
      "./uploads/" + req.file.originalname,
      { resource_type: "raw" }
    );
    const url = result.secure_url;
    const username = req.user;
    if (!folderName) {
      return res.status(400).json({ message: "No folderName provided!" });
    }
    const { originalname, mimetype, size } = req.file;
    const filename = originalname;
    const fileType = mimetype;
    const fileSize = formatBytes(size);
    const file = new File({ filename, fileType, fileSize, folderName, url });

    const files = await file.save();

    await Folder.findOneAndUpdate(
      { username, folderName },
      {
        $push: {
          files,
        },
      }
    );
    res.json({
      message: "Successfully uploaded the file.",
      file: { filename, fileType, fileSize, folderName, username },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};
