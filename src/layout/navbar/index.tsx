import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import assets from '../../assets';
import { SidebarMenu } from '../sidebar/Sidebar.const';

const Navbar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const activeMenu = SidebarMenu.find(item => item.path === pathname);
  const pageTitle = activeMenu ? activeMenu.title : 'Login';

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
    </Box>
  );
};

export default Navbar;
