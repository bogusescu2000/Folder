import React, { useContext } from "react";
import { Folder } from "./Folder";
import { FolderContext } from "./FolderProvider";

export const FolderCatalog = () => {
  const {
    state: { folders },
  } = useContext(FolderContext);

  return (
    <div className="folder-catalog-container">
      <div className="folders">
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  );
};
