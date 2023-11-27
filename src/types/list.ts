export interface ListItem {
  text: string;
  isShared?: boolean;
}

export type ToggleIconButtonProps = {
  selectedIcon: React.ReactElement;
  unselectedIcon: React.ReactElement;
  selectedText: string;
  unselectedText: string;
};

export type DialogList = {
  setOpen: (value: boolean) => void;
  open: boolean;
};
