import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FolderButton } from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import { FolderContext, ActionType } from "../components/folder/FolderProvider";
import { onAddFolder } from "../components/folder/FolderActions";

import "../styles/folderCatalog.scss";
import { Box } from "@mui/material";

type FolderDialogType = {
  onClickCreateFolder: (folderName: string) => void;
  onClose: () => void;
  onChange: any;
  value: string;
  open: boolean;
};

export const FolderDialog = ({
  onClose,
  onChange,
  value,
  open,
}: FolderDialogType) => {
  const { dispatch } = useContext(FolderContext);
  const onResetClose = () => {
    onClose();
    onChange("");
  };

  const onClickCreateClose = () => {
    onAddFolder(dispatch, value);
    onResetClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onResetClose}>
        <DialogTitle sx={{ fontWeight: "600", paddingBottom: "0px" }}>
          Create a new folder
        </DialogTitle>
        <DialogContent>
          <TextField
            className="foldername-input"
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={onChange}
            value={value}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "0px 24px 24px 24px" }}>
          <FolderButton
            backColor="white"
            textColor="black"
            name="Cancel"
            onClick={onResetClose}
          ></FolderButton>
          <FolderButton
            disabled={!value}
            name="Create"
            onClick={onClickCreateClose}
          ></FolderButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
