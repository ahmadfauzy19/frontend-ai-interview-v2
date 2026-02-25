import type { Theme } from '@mui/material';
import type { MenuComponentItemData } from '../../components/MenuComponent/MenuComponent.interfaces';

export const navbarMenu = (
  theme: Theme,
  handleLogout: () => void
): MenuComponentItemData[] => [
  {
    sectionId: '1',
    items: [
      {
        id: '1',
        label: 'Manage Account',
        icon: 'mdi:account-edit-outline',
      },
      {
        id: '2',
        label: 'Logout',
        icon: 'mdi:exit-run',
        onClick: handleLogout,
        color: theme.palette.error.main,
      },
    ],
  },
];
