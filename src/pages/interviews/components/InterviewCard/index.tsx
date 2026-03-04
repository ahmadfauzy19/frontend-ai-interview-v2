import type { Interviews } from '@/pages/interviews/Interviews.interfaces';
import { Icon } from '@iconify/react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../../../components/ButtonComponent';

const InterviewCard = ({ data }: { data: Interviews }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStartInterview = () => {
    window.open(`/interviews/call/${data.id}`, '_blank');
  };

  const handleInterviewResult = () => {
    navigate(`/interviews/${data.id}`);
  };

  return (
    <Box
      sx={{
        width: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: '8px 8px 0 0 ',
          padding: 3,
          width: '100%',
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          color="white"
          fontWeight={600}
          textAlign="center"
          fontSize={14}
        >
          {data.name}
        </Typography>
      </Box>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        flexGrow={1}
        width="100%"
        boxSizing="border-box"
        justifyContent="space-between"
      >
        <Typography fontWeight={500} fontSize={14} textAlign="center">
          {data.roleTarget}
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <ButtonComponent
            variant="contained"
            size="small"
            sx={{ borderRadius: 1, fontSize: 12 }}
            fullWidth
            startIcon={<Icon icon="mdi:camera-outline" />}
            onClick={handleStartInterview}
          >
            Start Interview
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            size="small"
            sx={{
              borderRadius: 1,
              fontSize: 12,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 2,
              },
            }}
            fullWidth
            startIcon={<Icon icon="solar:document-linear" />}
            onClick={handleInterviewResult}
          >
            See interview result
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewCard;
