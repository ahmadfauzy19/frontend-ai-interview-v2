import { ButtonComponent } from '@/components/ButtonComponent';
import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { Icon } from '@iconify/react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
  const [allQuestion, setAllQuestion] = useState<Question[]>(questions);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [recordId, setRecordId] = useState('');
  const { userData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const resumeTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  const {
    createRecording,
    activeRecordings,
    openCamera,
    startRecording,
    stopRecording,
    clearAllRecordings,
    pauseRecording,
    resumeRecording,
  } = useRecordWebcam();

  const currentRecording = activeRecordings.find(r => r.id === recordId);
  const isRecording = currentRecording?.status === 'RECORDING';
  const isPaused = currentRecording?.status === 'PAUSED';
  const isStopped = currentRecording?.status === 'STOPPED';
  const isLastQuestion = activeQuestion === questions.length;

  useEffect(() => {
    setCurrentQuestion(questions[activeQuestion - 1]);
  }, [activeQuestion]);

  useEffect(() => {
    initRecording();
    setTimer(0);
  }, []);

  const initRecording = async () => {
    const recording = await createRecording();
    if (!recording) return;
    setRecordId(recording.id);
    await openCamera(recording.id);
  };

  const recordVideo = async () => {
    if (isPaused) {
      resumeTimer();
      await resumeRecording(recordId);
    } else {
      await startRecording(recordId);
      startTimer();
    }
  };

  const pauseRecordVideo = async () => {
    await pauseRecording(recordId);
    stopTimer();
  };

  const stopRecordVideo = async () => {
    await stopRecording(recordId);
    stopTimer();
  };

  const nextRecordVideo = async (index: number) => {
    stopTimer();
    setTimer(0);
    setActiveQuestion(index);
    await clearAllRecordings();

    const newRecording = await createRecording();
    if (newRecording) {
      setRecordId(newRecording.id);
      await openCamera(newRecording.id);
    }
  };

  const submitRecord = async (index: number, type: 'next' | 'finish') => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (currentRecording?.blob) {
        const videoFile = new File(
          [currentRecording.blob],
          `${currentQuestion.questionText.replace(/\s+/g, '_')}-${userData.userId}-${Date.now()}.mp4`,
          { type: 'video/webm' }
        );

        formData.append('video', videoFile);
      }

      await axiosUtils.post(
        `/answers/upload?questionId=${currentQuestion.id}&userId=${userData.userId}`,
        formData
      );

      setAllQuestion(prev =>
        prev.map(q =>
          q.id === currentQuestion.id ? { ...q, isDone: true } : q
        )
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
        }
      }

      setIsLoading(false);
      setTimer(0);
    } catch (error) {
      console.log(error);
      showSnackbar('Failed to upload video', 'error');
      setIsLoading(false);
    }
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
          {allQuestion.map((question, index) => {
            const questionOrder = index + 1;
            const isCurrentQuestion = questionOrder === activeQuestion;
            const isDone = question.isDone;

            const getBorderColor = () => {
              if (isDone) return `1px solid ${theme.palette.success.main}`;
              if (isCurrentQuestion)
                return `1px solid ${theme.palette.primary.main}`;
              return 'none';
            };

            return (
              <Box
                key={question.id}
                component="div"
                sx={{
                  backgroundColor: 'white',
                  border: getBorderColor(),
                  borderRadius: 2,
                  paddingY: 1.5,
                  paddingX: 3,
                  display: 'flex',
                  gap: 1,
                  cursor:
                    isCurrentQuestion || isDone ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (!isCurrentQuestion && !isDone)
                    return nextRecordVideo(questionOrder);
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
                    isCurrentQuestion ? 'black' : theme.palette.text.secondary
                  }
                >
                  {question.questionText}
                </Typography>
                {isDone && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      icon="material-symbols:check-circle"
                      color={theme.palette.success.main}
                      width={22}
                      style={{ marginLeft: 'auto', flexShrink: 0 }}
                    />
                  </Box>
                )}
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
                muted
                width="100%"
                height="auto"
              />
            </Box>
          ))}
        </Box>
        {isRecording && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 1,
              backgroundColor: theme.palette.primary.light,
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.error.main,
                width: 10,
                height: 10,
                borderRadius: 50,
              }}
            />
            <Typography fontSize={14}>{formatTimer(timer)}</Typography>
          </Box>
        )}
        <Box display="flex" gap={2} justifyContent="center">
          {(!isRecording || isPaused) && (
            <ButtonComponent
              variant="contained"
              onClick={recordVideo}
              disabled={isLoading}
              startIcon={<Icon icon="material-symbols:play-arrow-rounded" />}
            >
              {isPaused
                ? 'Resume Record'
                : isStopped
                  ? 'Retake Record'
                  : 'Start Record'}
            </ButtonComponent>
          )}
          {isRecording && (
            <ButtonComponent
              variant="contained"
              onClick={pauseRecordVideo}
              disabled={isLoading}
              startIcon={<Icon icon="material-symbols:pause" />}
              color="warning"
            >
              Pause Record
            </ButtonComponent>
          )}
          {isRecording && (
            <ButtonComponent
              variant="contained"
              onClick={stopRecordVideo}
              disabled={isLoading}
              startIcon={<Icon icon="material-symbols:stop-rounded" />}
              color="error"
            >
              Stop Record
            </ButtonComponent>
          )}
          {!isLastQuestion && isStopped && (
            <ButtonComponent
              variant="contained"
              onClick={() => submitRecord(activeQuestion + 1, 'next')}
              loading={isLoading}
              startIcon={<Icon icon="material-symbols:send" />}
              color="success"
            >
              Submit & Next
            </ButtonComponent>
          )}
          {isLastQuestion && isStopped && (
            <ButtonComponent
              variant="contained"
              onClick={() => submitRecord(1, 'finish')}
              loading={isLoading}
              startIcon={<Icon icon="material-symbols:exit-to-app" />}
            >
              Submit & Finish Session
            </ButtonComponent>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RecordInterviews;
