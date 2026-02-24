import { Box, Typography, useTheme } from '@mui/material';

const AuthPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography color={theme.palette.primary.main} variant="h6">
        This is Auth Page Test
      </Typography>
    </Box>
  );
};

export default AuthPage;
