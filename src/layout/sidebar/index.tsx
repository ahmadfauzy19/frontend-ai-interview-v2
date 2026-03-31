import { Icon } from '@iconify/react';
import { Link, Stack, Typography, useTheme } from '@mui/material';
import { matchPath, Link as RouterLink, useLocation } from 'react-router-dom';
import { SidebarMenu } from './Sidebar.const';
import { useAuth } from '@/context/auth/AuthContext';

const Sidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { userData } = useAuth();

  const filteredMenu = SidebarMenu.filter((item) => {
    if (item.hidden) return false;
    if (!item.roles) return true;
    return item.roles.includes(userData?.role);
  });

  return (
    <Stack
      sx={{
        minWidth: 245,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: 'calc(100vh - 75px)',
      }}
    >
      {filteredMenu .filter(item => !item.hidden).map((item, index) => {
        const isActive = !!matchPath({ path: item.path, end: false }, pathname);
        


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
