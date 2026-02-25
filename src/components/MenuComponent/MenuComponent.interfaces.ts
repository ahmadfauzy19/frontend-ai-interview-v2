import type { MenuProps, Theme } from '@mui/material';

export interface MenuComponentProps extends MenuProps {
  items: MenuComponentItemData[];
}

export interface MenuComponentItemData {
  sectionId: string;
  sectionLabel?: string;
  items: {
    id: string;
    label: string;
    icon?: string;
    color?: string | Theme;
    disabled?: boolean;
    onClick?: () => void;
    children?: MenuComponentItemData[];
  }[];
}
