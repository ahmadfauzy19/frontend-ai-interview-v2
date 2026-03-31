import { ButtonComponent } from '@/components/ButtonComponent';
import {
  Box,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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

  const isBlocked =
    permissionState?.errorCode === ERROR_MESSAGES.NO_USER_PERMISSION ||
    permissionState?.errorCode === 'Permission denied';

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      px={2}
      marginTop={10}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '420px' },
          borderRadius: 4,
          boxShadow: 4,
          p: 4,
          backgroundColor: 'white',
        }}
      >
        {/* TITLE */}
        <Stack spacing={1} alignItems="center" mb={2}>
          <Typography fontSize={20} fontWeight={700}>
            {data?.name}
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            AI Interview Session
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* WARNING */}
        <Box
          sx={{
            backgroundColor: '#FFF7E6',
            border: '1px solid #FFD591',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <WarningAmberIcon color="warning" />
            <Box>
              <Typography fontSize={13} fontWeight={600}>
                Please prepare before starting:
              </Typography>
              <Typography fontSize={13}>
                • Ensure microphone is enabled  
                • Stay in a quiet environment  
                • Do not switch tabs (will be recorded)
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* CAMERA STATUS */}
        <Stack spacing={1} alignItems="center" mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <VideocamIcon
              color={isBlocked ? 'error' : 'success'}
              fontSize="small"
            />
            <Typography fontSize={13}>
              {permissionState?.message || 'Checking camera...'}
            </Typography>
          </Stack>
        </Stack>

        {/* ACTION BUTTON */}
        <Stack spacing={1}>
          <ButtonComponent
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setInterviewState('QUESTION')}
            disabled={isBlocked}
            sx={{
              fontWeight: 600,
              py: 1.2,
              borderRadius: 2,
            }}
          >
             Start Interview
          </ButtonComponent>

          <ButtonComponent
            variant="outlined"
            fullWidth
            size="medium"
            onClick={() => setInterviewState('END')}
            sx={{
              borderRadius: 2,
            }}
          >
            Exit
          </ButtonComponent>
        </Stack>
      </Box>
    </Box>
  );
};

export default IntroInterviews;