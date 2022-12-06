import React, { useCallback, useState } from "react";

export const useConfirmationDialog = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogOpenClick = useCallback(() => setOpenDialog(true), []);
  const handleDialogCloseClick = useCallback(() => setOpenDialog(false), []);

  return { openDialog, handleDialogOpenClick, handleDialogCloseClick };
};
