import { Dispatch } from "react";
import { ActionType, FolderActions } from "./FolderProvider";

const onAddFolder = (dispatch: Dispatch<FolderActions>, folderName: string) => {
  dispatch({
    type: ActionType.ADD,
    payload: {
      folderName: folderName,
    },
  });
};

const onDeleteFolder = (dispatch: Dispatch<FolderActions>, id: string) => {
  dispatch({
    type: ActionType.REMOVE,
    payload: {
      id,
    },
  });
};

const onSelectFolder = (
  dispatch: Dispatch<FolderActions>,
  {
    id,
    checked,
  }: {
    id: string;
    checked: boolean;
  }
) => {
  dispatch({
    type: ActionType.SELECT,
    payload: {
      id,
      checked,
    },
  });
};

const onUpdateFolder = (
  dispatch: Dispatch<FolderActions>,
  {
    id,
    folderName,
    editable,
  }: {
    id: string;
    folderName: string;
    editable: boolean;
  }
) => {
  dispatch({
    type: ActionType.UPDATE,
    payload: {
      id,
      folderName,
      editable,
    },
  });
};

const onRenameFolder = (
  dispatch: Dispatch<FolderActions>,
  {
    id,
    name,
    editable,
  }: {
    id: string;
    name: string;
    editable: boolean;
  }
) => {
  dispatch({
    type: ActionType.UPDATE,
    payload: {
      id,
      folderName: name,
      editable: true,
    },
  });
};

const removeSelectedFolders = (dispatch: Dispatch<FolderActions>) => {
  dispatch({
    type: ActionType.REMOVE_SELECTED,
    payload: {},
  });
};

export {
  onAddFolder,
  onDeleteFolder,
  onSelectFolder,
  onUpdateFolder,
  onRenameFolder,
  removeSelectedFolders,
};
