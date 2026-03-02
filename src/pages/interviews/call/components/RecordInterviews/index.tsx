import { ButtonComponent } from '@/components/ButtonComponent';
import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import type { InterviewState, Question } from '../../CallInterview.interfaces';

const RecordInterviews = ({
  questions,
  setInterviewState,
}: {
  questions: Question[];
  setInterviewState: (state: InterviewState) => void;
}) => {
  const theme = useTheme();
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [recordId, setRecordId] = useState('');
  const { userData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentQuestion(questions[activeQuestion - 1]);
  }, [activeQuestion]);

  useEffect(() => {
    // Record video for the first question
    recordVideo();
  }, []);

  const {
    createRecording,
    activeRecordings,
    openCamera,
    startRecording,
    stopRecording,
    clearAllRecordings,
  } = useRecordWebcam();

  const recordVideo = async () => {
    const recording = await createRecording();

    if (!recording) return;
    setRecordId(recording.id);

    await openCamera(recording.id);
    await startRecording(recording.id);
  };

  const nextRecord = async (index: number, type: 'next' | 'finish') => {
    const recorded: any = await stopRecording(recordId);

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        'video',
        recorded.blob,
        `${currentQuestion.questionText}-${userData.userId}-${Date.now()}.mp4`
      );

      await axiosUtils.post(
        `/answers/upload?questionId=${currentQuestion.id}&userId=${userData.userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (type === 'finish') {
        setInterviewState('END');
        await clearAllRecordings();
      } else {
        setActiveQuestion(index);

        await clearAllRecordings();

        const newRecording = await createRecording();
        if (newRecording) {
          setRecordId(newRecording.id);
          await openCamera(newRecording.id);
          await startRecording(newRecording.id);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showSnackbar('Failed to upload video', 'error');
      setIsLoading(false);
    }

    await startRecording(recordId);
  };

  return (
    <Box display="flex" gap={5}>
      <Box
        sx={{
          width: '30%',
          maxHeight: '100vh',
          overflowY: 'auto',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          backgroundColor: '#fafafa',
          padding: 3,
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Questions
        </Typography>
        <Stack gap={1}>
          {questions.map((question, index) => {
            const questionOrder = index + 1;
            const currentQuestion = questionOrder === activeQuestion;

            return (
              <Box
                key={question.id}
                component="div"
                sx={{
                  backgroundColor: 'white',
                  border: currentQuestion
                    ? `1px solid ${theme.palette.primary.main}`
                    : 'none',
                  borderRadius: 2,
                  paddingY: 1.5,
                  paddingX: 3,
                  display: 'flex',
                  gap: 1,
                  cursor: currentQuestion ? 'unset' : 'pointer',
                }}
                onClick={() => {
                  if (!currentQuestion)
                    return nextRecord(questionOrder, 'next');
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  color={theme.palette.primary.main}
                >
                  {questionOrder}.
                </Typography>
                <Typography
                  fontSize={14}
                  color={
                    currentQuestion ? 'black' : theme.palette.text.secondary
                  }
                >
                  {question.questionText}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box
        paddingY={3}
        display="flex"
        flexDirection="column"
        gap={3}
        width="70%"
      >
        <Typography textAlign="center">
          {currentQuestion?.questionText}
        </Typography>
        <Box borderRadius={4} overflow="hidden">
          {activeRecordings.map(recording => (
            <Box width="100%" key={recording.id}>
              <video
                ref={recording.webcamRef}
                autoPlay
                width="100%"
                height="auto"
              />
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="center">
          <ButtonComponent
            variant="contained"
            onClick={async () => {
              nextRecord(1, 'finish');
            }}
            loading={isLoading}
          >
            Finish Session
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default RecordInterviews;
