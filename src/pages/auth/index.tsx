import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import assets from '@/assets';
import Navbar from '@/layout/navbar';

const AuthLayout = () => {
  return (
    <Stack>
      <Navbar />
      <Box
        sx={{
          paddingY: 4,
          paddingX: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box>
          <img
            src={assets.imageMan}
            alt="Interview Illustration"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Box>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AuthLayout;
