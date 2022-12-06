import { CreateFolder } from "./components/folder/CreateFolder";
import { FolderContextProvider } from "./components/folder/FolderProvider";

const App = () => {
  return (
    <div className="App">
      <FolderContextProvider>
        <CreateFolder />
      </FolderContextProvider>
    </div>
  );
};

export default App;
