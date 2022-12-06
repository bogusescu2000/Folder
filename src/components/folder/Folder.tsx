import React, { useState, useRef, useContext } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Box, Checkbox, Typography, Button, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";

import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";

import { FolderButton } from "../Button";
import { FolderType } from "../../types";

import "../../styles/folder.scss";
import { FolderContext } from "./FolderProvider";

import {
  onDeleteFolder,
  onSelectFolder,
  onUpdateFolder,
  onRenameFolder,
} from "../../components/folder/FolderActions";

interface FolderProps {
  folder: FolderType;
}

export const Folder = ({
  folder: { isChecked, name, editable, id, color },
}: FolderProps) => {
  const { dispatch } = useContext(FolderContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const folderNameFocus = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renameAndFocus = () => {
    onRenameFolder(dispatch, { id, name, editable: true });
    if (folderNameFocus) {
      folderNameFocus.current?.focus();
    }
    handleClose();
  };

  return (
    <Card className="folder-container">
      <Box className="top-section">
        <Box className="buttons">
          <FormControlLabel
            label=""
            control={
              <Checkbox
                className="check-button"
                checked={isChecked}
                onChange={(_, checked) =>
                  onSelectFolder(dispatch, { id, checked })
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </Box>
        <Box className="centre-block" sx={{ backgroundColor: color }}>
          <Box className="button" sx={{ display: isChecked ? "none" : "" }}>
            <FolderButton
              name="Edit Folder"
              backColor="white"
              textColor="black"
              onClick={() => {}}
            />
          </Box>
        </Box>
        <Box className="buttons">
          <Box>
            <Button
              className="more-button"
              onClick={handleClick}
              sx={{ display: isChecked ? "none" : "" }}
            >
              <MoreHorizOutlinedIcon className="more-icon" />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={renameAndFocus}>Rename</MenuItem>
            <MenuItem onClick={() => onDeleteFolder(dispatch, id)}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box className="bottom-section">
        {editable ? (
          <TextField
            fullWidth
            id="outlined-name"
            label="Name"
            value={name}
            inputRef={folderNameFocus}
            onChange={(e) =>
              onUpdateFolder(dispatch, {
                id,
                folderName: e.target.value,
                editable,
              })
            }
            onBlur={(e) =>
              onUpdateFolder(dispatch, {
                id,
                folderName: e.target.value,
                editable: false,
              })
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onUpdateFolder(dispatch, {
                  id,
                  folderName: name,
                  editable: false,
                });
              }
            }}
          />
        ) : (
          <Typography className="folder-title">{name}</Typography>
        )}
      </Box>
    </Card>
  );
};
