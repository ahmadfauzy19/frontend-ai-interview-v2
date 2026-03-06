import { Box, Skeleton, Typography, useTheme } from '@mui/material';

const UserResponseCardLoading = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        padding: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Box
        sx={{
          width: 10,
          height: '100%',
          backgroundColor: theme.palette.success.light,
          borderRadius: 3,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Skeleton width={100} />
        <Typography fontSize={12}>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  );
};

export default UserResponseCardLoading;
