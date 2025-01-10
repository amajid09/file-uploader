import { usePopup } from "@/hooks/use-popup";
import { cn } from "@/lib/utils";
import {
    Ellipsis,
    Folder,
    Folders,
    Upload
} from "lucide-react";
import { HTMLProps, ReactNode } from "react";

export default function ManageDocuments() {
  return (
    <main className="p-10 h-full z-[-1] text-foreground bg-background">
      <div className="flex flex-col gap-8">
        <Titles />
        <Documents />
      </div>
    </main>
  );
}
const Documents = () => (
  <div className=" grid grid-cols-12 px-6 py-4 justify-items-center auto-rows-max gap-4 min-h-screen w-full border border-foreground border-1 rounded-md shadow-md">
    <DocumentHeading />
    <DocumentRow />
    <DocumentRow />
  </div>
);

const DocumentRow = () => (
  <>
    <Title className="col-span-8 justify-self-start flex gap-2">
      <span>
        <Folder />
      </span>
      New Folder
    </Title>
    <Title>2MB</Title>
    <Title>2 Feb 2024</Title>
    <Title>3 Jan 2025</Title>
    <button className="max-w-fit bg-background text-foreground">
      <Ellipsis />
    </button>
  </>
);
interface TitleProps extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
}
const Title = ({ children, className, ...props }: TitleProps) => (
  <p className={cn(className, "py-6")} {...props}>
    {children}
  </p>
);
const DocumentHeading = () => (
  <>
    <p className="col-span-8 justify-self-start">Name</p>
    <p className="col-span-1">Size</p>
    <p className="col-span-1">Created</p>
    <p className="col-span-1">Last Updated</p>
    <p className="col-span-1">Options</p>
  </>
);
const Titles = () => {
  const { showCreateFolder, showUploadFile } = usePopup();
    return <div className="flex justify-between">
      <p className="flex gap-2 items-center">
        <span>
          <Folders />
        </span>
        My Documents
      </p>
      <div className="flex gap-8">
        <button
          onClick={showCreateFolder}
          className=" flex outline bg-accent p-3 rounded-md outline-1 gap-2 items-center">
          <span className="fill-foreground">
            <Folders />
          </span>
          New Folders
        </button>
        <button
          onClick={showUploadFile}
          className="flex outline bg-accent p-3 rounded-md gap-2 outline-1 items-center">
          <span className="fill-foreground">
            <Upload />
          </span>
          Upload files
        </button>
      </div>
    </div>
};
