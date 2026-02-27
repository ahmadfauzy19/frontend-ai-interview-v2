import { Icon } from '@iconify/react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

const EndInterviews = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      gap={3}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '90%', sm: '40vw', xl: '20vw' },
          textAlign: 'center',
        }}
      >
        <Stack alignItems="center" gap={3}>
          <Icon
            icon="prime:check-circle"
            width={60}
            color={theme.palette.primary.main}
          />
          <Box>
            <Typography fontWeight={600} variant="h6">
              Thank you very much for considering.
            </Typography>
            <Typography color="textSecondary">
              You can close this tab now.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default EndInterviews;
