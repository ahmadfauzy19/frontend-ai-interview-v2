import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';
import { getStyles } from './AccessDeniedPage.style';
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
  const styles = getStyles();
  const navigate = useNavigate();

  const handleBackToHome = (): void => {
    globalThis.location.href = '/';
  };

  const handleBackToLogin = (): void => {
    navigate("/", { replace: true });
  }

  return (
    <Box sx={styles.container}>
      <Box sx={{ 
        textAlign: 'center',

       }}>
        <Typography fontWeight={700} fontSize={24} color="error">
          403 | <span style={styles.span}>Access Denied</span>
        </Typography>

        <Typography mt={1} color="text.secondary">
          You do not have permission to access this page.
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={handleBackToHome}
          sx={{ mt: 3, mr:3 }}
        >
          Kembali ke Beranda
        </Button>

        <Button
          variant="contained"
          size='small'
          onClick={handleBackToLogin}
          sx={{ ml: 3, mt:3 }}  
        >
          Kembali Login
        </Button>
      </Box>
    </Box>
  );
};

export default memo(AccessDeniedPage);