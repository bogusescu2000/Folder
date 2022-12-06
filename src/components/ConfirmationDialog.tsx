import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { FolderContext } from "./folder/FolderProvider";

import { FolderButton } from "./Button";
import { FolderType } from "../types";
import { removeSelectedFolders } from "../components/folder/FolderActions";

import "../styles/confirmationDialog.scss";

type ConfirmationDialogType = {
  onClickDeleteFolder: () => void;
  onClose: () => void;
  open: boolean;
  folders: FolderType[];
};

export const ConfirmationDialog = ({
  onClose,
  open,
  folders,
}: ConfirmationDialogType) => {
  const { dispatch } = useContext(FolderContext);

  const onDeleteClose = () => {
    removeSelectedFolders(dispatch);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box className="dialog-container">
        <Box className="left-side">
          <Box className="triangle"></Box>
        </Box>
        <Box className="right-side">
          <DialogTitle sx={{ fontWeight: "900", paddingBottom: "10px" }}>
            Delete forever?
            <hr></hr>
          </DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to permanently delete:
              {folders.map(({ name }) => " " + name).join(", ")}?
            </Typography>

            <Typography sx={{ marginTop: "20px" }}>
              You can't undo this action.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ padding: "20px 24px" }}>
            <FolderButton
              backColor="white"
              textColor="black"
              name="Cancel"
              onClick={onClose}
            ></FolderButton>
            <FolderButton name="Delete" onClick={onDeleteClose}></FolderButton>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

//TO DO

//  1. Enhance design
//  2. Focus on click rename
//  3. Save in local storage
//  4. Migrate use state to use reducer
//  5. Migrate project to use Vite
//  6. Add Vitest and react testing library
