import { Upload } from "lucide-react";
import React, { FormEvent } from "react";
import { Button } from "./ui/button";
import { usePopup } from "@/hooks/use-popup";

export default function UploadFile() {
  const { hideUploadFile } = usePopup();
  const handleFile = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <dialog
      open
      className="z-10 absolute top-1/2 right-1/5 bg-secondary "
      tabIndex={-1}
      aria-hidden>
      <form
        onSubmit={handleFile}
        className="w-[600px] p-4 flex flex-col gap-4 text-foreground max-h-full rounded-md">
        <h1 className="w-full text-center">Upload File</h1>
        <div className="w-full bg-background flex flex-col gap-4 justify-center items-center p-8">
          <p className="flex items-center gap-2">
            <span>
              <Upload />
            </span>
            Chooose a file
          </p>
          <p>Max size: 10MB</p>
        </div>
        <div className="flex gap-4 justify-end">
          <Button onClick={hideUploadFile} variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </dialog>
  );
}
