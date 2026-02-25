import { Box, Stack } from '@mui/material';
import Navbar from '../navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';

const MainLayout = () => {
  return (
    <Stack sx={{ height: '100vh' }}>
      <Navbar />
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

export default MainLayout;
