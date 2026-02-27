import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { ERROR_MESSAGES, useRecordWebcam } from 'react-record-webcam';
import useCallInterview from './CallInterview.hooks';
import type { CameraState, InterviewState } from './CallInterview.interfaces';
import EndInterviews from './components/EndInterviews';
import IntroInterviews from './components/IntroInterviews';
import RecordInterviews from './components/RecordInterviews';

const CallInterviewPage = () => {
  const { interview, isLoading } = useCallInterview();
  const [interviewState, setInterviewState] = useState<InterviewState>('INTRO');

  // Camera permission
  const { errorMessage } = useRecordWebcam();
  const [permissionState, setPermissionState] = useState<CameraState>();

  useEffect(() => {
    if (
      errorMessage === ERROR_MESSAGES.NO_USER_PERMISSION ||
      errorMessage === 'Permission denied'
    ) {
      setPermissionState({
        message: 'Permission Denied',
        errorCode: ERROR_MESSAGES.NO_USER_PERMISSION,
      });
    } else {
      setPermissionState({
        message: 'OK',
        errorCode: null,
      });
    }
  }, [errorMessage]);

  return (
    <Box
      minHeight="100vh"
      padding={3}
      display="flex"
      flexDirection="column"
      boxSizing="border-box"
    >
      <Box border="2px solid" borderRadius={3} padding={2} flexGrow={1}>
        {isLoading && (
          <Box
            display="flex"
            flexGrow={1}
            flexDirection="column"
            gap={3}
            alignItems="center"
            marginTop={10}
          >
            <CircularProgress />
          </Box>
        )}
        {interviewState === 'INTRO' && !isLoading && (
          <IntroInterviews
            data={interview}
            setInterviewState={setInterviewState}
            permissionState={permissionState}
          />
        )}
        {interviewState === 'QUESTION' && (
          <RecordInterviews questions={interview?.questions || []} />
        )}
        {interviewState === 'END' && <EndInterviews />}
      </Box>
    </Box>
  );
};

export default CallInterviewPage;
