import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';
import { getStyles } from './AccessDeniedPage.style';
import { useNavigate, useLocation } from "react-router-dom";

const AccessDeniedPage = () => {
  const styles = getStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const requiredRole = location.state?.requiredRole;

  const handleBackToHome = (): void => {
    globalThis.location.href = '/';
  };

  const handleBackToLogin = (): void => {
    navigate("/", { replace: true });
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography fontWeight={700} fontSize={24} color="error">
          403 | <span style={styles.span}>Akses ditolak</span>
        </Typography>

        <Typography mt={1} color="text.secondary">
          Halaman ini hanya untuk role: <b>{requiredRole?.join(", ")}</b>
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={handleBackToHome}
          sx={{ mt: 3, mr: 3 }}
        >
          Kembali ke Beranda
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={handleBackToLogin}
          sx={{ ml: 3, mt: 3 }}
        >
          Kembali Login
        </Button>
      </Box>
    </Box>
  );
};

export default memo(AccessDeniedPage);