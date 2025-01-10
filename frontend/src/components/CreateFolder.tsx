import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePopup } from "@/hooks/use-popup";

export default function CreateFolder() {
  const { hideCreateFolder } = usePopup();
  const handleFolder = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <dialog
      open
      className="z-10 absolute top-1/2 right-1/5 bg-secondary "
      tabIndex={-1}
      aria-hidden>
      <form
        onSubmit={handleFolder}
        className="w-[600px] p-4 flex flex-col gap-4 text-foreground max-h-full rounded-md">
        <h1 className="w-full text-center">Create Folder</h1>
        <label htmlFor="">Folder</label>
        <Input type="text" placeholder="Folder..." />
        <div className="flex gap-4 justify-end">
          <Button
            onClick={hideCreateFolder}
            variant={"secondary"}
            className="">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </dialog>
  );
}
