import React, { useState } from "react";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";

import { FolderCatalog } from "./FolderCatalog";
import { FolderDialog } from "../FolderDialog";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { FolderButton } from "../Button";
import { useDialog } from "../../hooks/useDialog";
import { useConfirmationDialog } from "../../hooks/useConfirmationDialog";

import "../../styles/createFolder.scss";
import { useFoldersContext } from "./FolderProvider";

export const CreateFolder = () => {
  const [name, setName] = useState("");

  const {
    state: { folders },
  } = useFoldersContext();

  const { handleOpenClick, handleCloseClick, open } = useDialog();
  const { handleDialogOpenClick, handleDialogCloseClick, openDialog } =
    useConfirmationDialog();

  const selectedFolders = folders.filter((folder) => folder.isChecked === true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    setName(typeof e === "string" ? e : e.target.value);
  };

  return (
    <div>
      {folders.length > 0 ? (
        <div>
          <div className="top-buttons">
            <FolderButton
              name="Delete"
              disabled={selectedFolders.length < 1}
              onClick={handleDialogOpenClick}
            />

            <CreateNewFolderOutlinedIcon onClick={handleOpenClick} />
          </div>

          <FolderCatalog />
        </div>
      ) : (
        <div className="create-folder-container">
          <CloudSyncOutlinedIcon
            sx={{ height: "200px", width: "200px", color: "#5C5CDF" }}
          />
          <h1 className="title-text">You don't have folders created</h1>
          <h4 className="subtitle-text">
            Create folders for you and your team
          </h4>

          <FolderButton name="Create a folder" onClick={handleOpenClick} />
        </div>
      )}

      <ConfirmationDialog
        onClose={handleDialogCloseClick}
        open={openDialog}
        onClickDeleteFolder={() => {}}
        folders={selectedFolders}
      />

      <FolderDialog
        onClickCreateFolder={() => {}}
        onClose={handleCloseClick}
        onChange={onChange}
        value={name}
        open={open}
      />
    </div>
  );
};
