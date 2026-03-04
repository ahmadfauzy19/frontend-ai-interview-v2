import { Box, Typography, useTheme } from '@mui/material';
import type { DetailInterview } from '../../DetailInterview.interfaces';

const UserResponseCard = ({ data }: { data: DetailInterview }) => {
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
        <Typography fontSize={12} fontWeight={500}>
          {data.name}'s Response
        </Typography>
        <Typography fontSize={12}>{data.interviewTime}</Typography>
      </Box>
    </Box>
  );
};

export default UserResponseCard;
