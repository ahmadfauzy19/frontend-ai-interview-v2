import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';
import { getStyles } from './NotFoundPage.styles';

const NotFoundPage = () => {
  const styles = getStyles();

  const handleBackToHome = (): void => {
    globalThis.location.href = '/';
  };

  return (
    <Box sx={styles.container}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography fontWeight={700} fontSize={24} color="error">
          404 | <span style={styles.span}>Page Not Found</span>
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleBackToHome}
          sx={{ mt: 3 }}
        >
          Kembali ke Beranda
        </Button>
      </Box>
    </Box>
  );
};

export default memo(NotFoundPage);
