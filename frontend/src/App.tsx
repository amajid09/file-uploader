import CreateFolder from "./components/CreateFolder";
import ManageDocuments from "./components/ManageDocuments";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";
import { usePopup } from "./hooks/use-popup";

function App() {
  const { isCreateFolder, isUploadFile } = usePopup();
  return (
    <div className="relative box-border dark bg-background h-screen w-full text-foreground">
      {isCreateFolder && <CreateFolder />}
      {isUploadFile && <UploadFile />}
      <Header />
      <ManageDocuments />
    </div>
  );
}

export default App;
