import { ButtonComponent } from '@/components/ButtonComponent';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ERROR_MESSAGES } from 'react-record-webcam';
import type {
  CameraState,
  InterviewDetail,
  InterviewState,
} from '../../CallInterview.interfaces';

const IntroInterviews = ({
  data,
  setInterviewState,
  permissionState,
}: {
  data?: InterviewDetail;
  setInterviewState: (state: InterviewState) => void;
  permissionState?: CameraState;
}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      gap={3}
      alignItems="center"
    >
      <Typography fontSize={18} fontWeight={700}>
        {data?.name}
      </Typography>
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: 'fit-content', sm: '40vw', xl: '20vw' },
        }}
      >
        <Box display="flex" gap={1} flexDirection="column" alignItems="center">
          <Stack alignItems="center">
            <Typography fontSize={14} fontWeight={600}>
              Role
            </Typography>
            <Typography fontSize={14}>{data?.roleTarget}</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography fontSize={14} fontWeight={600}>
              Technology
            </Typography>
            <Typography fontSize={14}>{data?.technology}</Typography>
          </Stack>
        </Box>
        <Typography fontSize={14} fontWeight={700}>
          Ensure your volume is up and grant microphone access when prompted.
          Additionally, please make sure you are in a quiet environment.
        </Typography>
        <Typography fontSize={14} fontWeight={700}>
          Note: Tab switching will be recorded.
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
          <Typography fontSize={14}>
            Camera status: {permissionState?.message}
          </Typography>
        </Box>
        <Box display="flex" gap={1} justifyContent="center">
          <ButtonComponent
            variant="contained"
            onClick={() => setInterviewState('QUESTION')}
            disabled={
              permissionState?.errorCode ===
                ERROR_MESSAGES.NO_USER_PERMISSION ||
              permissionState?.errorCode === 'Permission denied'
            }
          >
            Start Interview
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            onClick={() => setInterviewState('END')}
            sx={{ backgroundColor: 'white', color: 'black', boxShadow: 1 }}
          >
            Exit
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroInterviews;
