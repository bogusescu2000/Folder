import React, { useCallback, useState } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenClick = useCallback(() => setOpen(true), []);
  const handleCloseClick = useCallback(() => setOpen(false), []);

  return { open, handleOpenClick, handleCloseClick };
};
