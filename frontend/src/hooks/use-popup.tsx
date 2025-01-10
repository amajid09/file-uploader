import {
    createContext,
    ReactElement,
    useContext,
    useState
} from "react";
interface PopupProps {
  isUploadFile: boolean;
  showUploadFile: () => void;
  showCreateFolder: () => void;
  isCreateFolder: boolean;
  hideUploadFile: () => void;
  hideCreateFolder: () => void;
}
const PopupContext = createContext({} as PopupProps);

const PopupProvider = ({ children }: { children: ReactElement }) => {
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [isCreateFolder, setIsCreateFolder] = useState(false);

  const showUploadFile = () => {
    setIsCreateFolder(false);
    setIsUploadFile(true);
  };
  const hideUploadFile = () => {
    setIsUploadFile(false);
  };
  const showCreateFolder = () => {
    setIsUploadFile(false);
    setIsCreateFolder(true);
  };
  const hideCreateFolder = () => {
    setIsCreateFolder(false);
  };
  return (
    <PopupContext.Provider
      value={{
        showCreateFolder,
        showUploadFile,
        hideCreateFolder,
        hideUploadFile,
        isCreateFolder,
        isUploadFile,
      }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw Error("use usePopup inside of PopupProvider");
  }
  return context;
};
export default PopupProvider;
