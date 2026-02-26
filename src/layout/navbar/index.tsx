import assets from '@/assets';
import MenuComponent from '@/components/MenuComponent';
import { useAuth } from '@/context/auth/AuthContext';
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarMenu } from '../sidebar/Sidebar.const';
import { navbarMenu } from './Navbar.const';

const Navbar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { logout, isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();

  const activeMenu = SidebarMenu.find(item => item.path === pathname);
  const pageTitle = activeMenu ? activeMenu.title : 'Login';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  function limitUsername(username: string) {
    const words = username.split(' ');
    const truncatedText =
      words.length > 3 ? words.slice(0, 3).join(' ') : username;

    return truncatedText;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      paddingX={3}
      borderBottom={`1px solid ${theme.palette.divider}`}
      height={74}
    >
      <Box display="flex" gap={2} alignItems="center">
        <img src={assets.logo79} alt="Logo" style={{ width: 74, height: 74 }} />
        <Stack direction="row" gap={0.5}>
          <Typography
            fontSize={20}
            fontWeight={600}
            color={theme.palette.primary.main}
          >
            AI
          </Typography>
          <Typography
            fontSize={20}
            fontWeight={600}
            color={theme.palette.secondary.main}
          >
            Interview
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ height: 38, display: 'flex', marginY: 'auto' }}
        />
        <Typography fontSize={16} color={theme.palette.text.secondary}>
          {pageTitle}
        </Typography>
      </Box>
      {isAuthenticated && (
        <Box display="flex" gap={2} alignItems="center">
          <button
            onClick={handleClickProfile}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              gap: 10,
              color: 'black',
              alignItems: 'center',
            }}
          >
            <Avatar src={assets.avatarDefault} />
            <Typography>{limitUsername(userData.name)}</Typography>
          </button>
          <MenuComponent
            open={openProfile}
            onClose={handleCloseProfile}
            onClick={handleCloseProfile}
            anchorEl={anchorEl}
            items={navbarMenu(theme, handleLogout)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
