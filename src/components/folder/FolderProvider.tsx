import React, { ReactNode, useContext, useEffect } from "react";
import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import getRandomColor from "../../utils/getRandomColor";
import { FolderType } from "../../types";

export type FolderState = {
  folders: FolderType[];
};

const folderInitialState: FolderState = {
  folders:
    localStorage.getItem("folders") == null
      ? []
      : JSON.parse(localStorage.getItem("folders")!),
};

export enum ActionType {
  ADD = "ADD_FOLDER",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
  SELECT = "SELECT_FOLDER",
  REMOVE_SELECTED = "REMOVE_SELECTED",
}

const { ADD, REMOVE, UPDATE, SELECT, REMOVE_SELECTED } = ActionType;

export type FolderActions =
  | {
      type: ActionType.ADD;
      payload: {
        folderName: string;
      };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        id: string;
        folderName: string;
        editable: boolean;
      };
    }
  | {
      type: ActionType.REMOVE;
      payload: {
        id: string;
      };
    }
  | {
      type: ActionType.SELECT;
      payload: {
        id: string;
        checked: boolean;
      };
    }
  | {
      type: ActionType.REMOVE_SELECTED;
      payload: {};
    };

type FolderContextType = {
  state: FolderState;
  dispatch: React.Dispatch<FolderActions>;
};

const FolderContext = createContext<FolderContextType>({
  state: {
    folders: [],
  },
  dispatch: () => {},
});

const folderReducer = (
  state: FolderState,
  action: FolderActions
): typeof folderInitialState => {
  const addFolder = ({ folderName }: { folderName: string }) => {
    const newFolder = {
      id: uuid(),
      name: folderName,
      color: getRandomColor(),
      isChecked: false,
      editable: false,
    };

    return {
      ...state,
      folders: [...state.folders, newFolder],
    };
  };

  const removeFolder = ({ id }: { id: string }) => {
    const newFolders = state.folders.filter((folder) => folder.id !== id);

    return {
      ...state,
      folders: newFolders,
    };
  };

  const updateFolder = ({
    id,
    editable,
    folderName,
  }: {
    id: string;
    folderName: string;
    editable: boolean;
  }) => {
    const foldersToUpdate = state.folders.map((folder) => {
      if (folder.id === id) {
        return {
          ...folder,
          editable: editable,
          name: folderName,
        };
      }
      return folder;
    });

    return {
      ...state,
      folders: foldersToUpdate,
    };
  };

  const selectFolders = ({ id, checked }: { id: string; checked: boolean }) => {
    const selectedFolders = state.folders.map((folder) => {
      if (folder.id === id) {
        return { ...folder, isChecked: checked };
      }
      return folder;
    });

    return {
      ...state,
      folders: selectedFolders,
    };
  };

  const removeSelectedFolders = () => {
    const newFolders = state.folders.filter(
      (folder: { isChecked: boolean }) => !folder.isChecked
    );
    return {
      ...state,
      folders: newFolders,
    };
  };

  const folderAction = {
    [ADD]: addFolder,
    [REMOVE]: removeFolder,
    [UPDATE]: updateFolder,
    [SELECT]: selectFolders,
    [REMOVE_SELECTED]: removeSelectedFolders,
  };

  return folderAction[action.type](action.payload as any);
};

const FolderContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(folderReducer, folderInitialState);
  const value = { state, dispatch };

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(state.folders));
  }, [state]);

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};

const useFoldersContext = () => {
  return useContext(FolderContext);
};

export { FolderContext, FolderContextProvider, useFoldersContext };
