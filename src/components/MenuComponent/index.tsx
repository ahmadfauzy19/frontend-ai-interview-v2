import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import type {
  MenuComponentItemData,
  MenuComponentProps,
} from './MenuComponent.interfaces';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    borderRadius: 8,
    padding: 0,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 0 1px ${theme.palette.divider}`,
    marginTop: theme.spacing(1),
  },
}));

const MenuItemContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  margin: 0,
}));

const MenuItemDivider = styled(Divider)(() => ({
  '&.MuiDivider-root': {
    marginY: 3,
  },
}));

function generateMenu(menuData: MenuComponentItemData[]) {
  return menuData.map((section, index) => {
    const { sectionId, sectionLabel, items } = section;

    return [
      sectionLabel && (
        <Typography key={sectionId + sectionLabel}>{sectionLabel}</Typography>
      ),
      ...items.map(item => {
        return (
          <MenuItem
            key={item.id + item.label}
            onClick={item.onClick}
            sx={{ m: 0 }}
          >
            <MenuItemContent>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  color={item.color as string}
                  fontSize={24}
                />
              )}
              <Typography component="span" color={item.color as string}>
                {item.label}
              </Typography>
            </MenuItemContent>
          </MenuItem>
        );
      }),
      index !== menuData.length - 1 && <MenuItemDivider key={sectionId} />,
    ];
  });
}

export default function MenuComponent(props: Readonly<MenuComponentProps>) {
  const { items: data, ...rest } = props;
  return <StyledMenu {...rest}>{generateMenu(data)}</StyledMenu>;
}
