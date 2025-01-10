import mongoose from "mongoose";

const Schema = mongoose.Schema;
const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const folderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    folderName: { type: String, required: true },
    files: [fileSchema],
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
  },
  { timestamps: true }
);

export const File = mongoose.model("Files", fileSchema);
export const Folder = mongoose.model("Folder", folderSchema);
