import { Icon } from '@iconify/react';
import { Link, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { SidebarMenu } from './Sidebar.const';

const Sidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <Stack
      sx={{
        width: 245,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: 'calc(100vh - 75px)',
      }}
    >
      {SidebarMenu.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={index}
            component={RouterLink}
            to={item.path}
            underline="none"
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: isActive
                ? theme.palette.action.selected
                : 'transparent',
              color: isActive
                ? theme.palette.primary.main
                : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Icon icon={item.icon} width={25} height={25} />
            <Typography fontWeight={isActive ? 600 : 400}>
              {item.title}
            </Typography>
          </Link>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
