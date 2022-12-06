export type FolderType = {
  id: string;
  name: string;
  isChecked: boolean;
  color: string;
  editable?: boolean;
};

export type FolderCatalogType = {
  folders: FolderType[];
};
