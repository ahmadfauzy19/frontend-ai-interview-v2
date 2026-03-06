import { formattedTimestamp } from '@/utils/timeUtils';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import type { CandidateInterview } from '../../DetailInterview.interfaces';

const UserResponseCard = ({ data }: { data: CandidateInterview }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, userId } = useParams();

  const handleClick = () => {
    navigate(`/interviews/${id}/answer/${data.candidateId}`);
  };

  const isActive = data.candidateId === userId;

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        gap: 1,
        padding: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isActive
            ? theme.palette.action.selected
            : theme.palette.action.hover,
        },
        backgroundColor: isActive
          ? theme.palette.action.selected
          : 'transparent',
      }}
      onClick={handleClick}
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
        <Typography fontSize={12}>
          {formattedTimestamp(data.startedAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserResponseCard;
