import { ButtonComponent } from '@/components/ButtonComponent';
import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { Icon } from '@iconify/react';
import { Box, Typography} from '@mui/material';
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
  const [allQuestion, setAllQuestion] = useState<Question[]>(questions);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [recordId, setRecordId] = useState('');
  const { userData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [breakTime, setBreakTime] = useState(0);
  const breakTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    setTimer(0);
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
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  const startBreakTimer = () => {
    if (breakTimerRef.current) return;
    breakTimerRef.current = setInterval(() => {
      setBreakTime(prev => prev + 1);
    }, 1000);
  };

  const stopBreakTimer = () => {
    if (breakTimerRef.current) {
      clearInterval(breakTimerRef.current);
      breakTimerRef.current = null;
    }
  };

  const resetBreakTimer = () => {
    stopBreakTimer();
    setBreakTime(0);
  };

  const {
    createRecording,
    activeRecordings,
    openCamera,
    startRecording,
    stopRecording,
    clearAllRecordings,
  } = useRecordWebcam();

  const currentRecording = activeRecordings.find(r => r.id === recordId);
  const isRecording = currentRecording?.status === 'RECORDING';
  const isStopped = currentRecording?.status === 'STOPPED';
  const isLastQuestion = activeQuestion === questions.length;

  useEffect(() => {
    setCurrentQuestion(questions[activeQuestion - 1]);
  }, [activeQuestion]);

  useEffect(() => {
    initRecording();
    startBreakTimer();
  }, []);

  const initRecording = async () => {
    const recording = await createRecording();
    if (!recording) return;
    setRecordId(recording.id);
    await openCamera(recording.id);
  };

  const recordVideo = async () => {
    stopBreakTimer();
    await startRecording(recordId);
    startTimer();
  };

  const stopRecordVideo = async () => {
    await stopRecording(recordId);
    stopTimer();
    stopBreakTimer();
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

      formData.append('breakTime', breakTime.toString());
      formData.append('answerTime', timer.toString());

      await axiosUtils.post(
        `/answers/upload?questionId=${currentQuestion.id}&userId=${userData.userId}`,
        formData
      );

      setAllQuestion(prev =>
        prev.map(q =>
          q.id === currentQuestion.id ? { ...q, isDone: true } : q
        )
      );

      resetBreakTimer();

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

        startBreakTimer();
      }

      setTimer(0);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showSnackbar('Failed to upload video', 'error');
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#F4F6F8">
      
      {/* Sidebar */}
      <Box
        sx={{
          width: 80,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
          boxShadow: '2px 0 10px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingY: 3,
          gap: 2,
        }}
      >
        {allQuestion.map((question, index) => {
          const questionOrder = index + 1;
          const isActive = questionOrder === activeQuestion;
          const isDone = question.isDone;

          return (
            <Box
              key={question.id}
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                backgroundColor: isDone
                  ? '#22C55E'
                  : isActive
                    ? '#1976D2'
                    : '#E5E7EB',
                color: isDone || isActive ? 'white' : '#555',
                boxShadow: isActive
                  ? '0 4px 12px rgba(25,118,210,0.4)'
                  : 'none',
                transition: '0.2s',
              }}
            >
              {isDone ? (
                <Icon icon="mdi:check" width={18} />
              ) : (
                questionOrder
              )}
            </Box>
          );
        })}
      </Box>

      {/* Main */}
      <Box flex={1} display="flex" flexDirection="column" paddingX={5} gap={1} paddingY={3}>
        
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize={16} color="#1E293B">
            Question {activeQuestion} / {questions.length}
          </Typography>

          <Box display="flex" gap={2} alignItems="center">
            <Typography fontSize={13} color="#64748B">
              {isRecording
                ? `● Recording ${formatTimer(timer)}`
                : `Break ${formatTimer(breakTime)}`}
            </Typography>

            {!isRecording && !isStopped && (
              <ButtonComponent
                onClick={recordVideo}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  paddingX: 3,
                  backgroundColor: '#1976D2',
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  },
                }}
              >
                Start
              </ButtonComponent>
            )}

            {isRecording && (
              <ButtonComponent
                onClick={stopRecordVideo}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  paddingX: 3,
                  backgroundColor: '#EF4444',
                  '&:hover': {
                    backgroundColor: '#DC2626',
                  },
                }}
              >
                Stop
              </ButtonComponent>
            )}

            {!isLastQuestion && isStopped && (
              <ButtonComponent
                onClick={() => submitRecord(activeQuestion + 1, 'next')}
                loading={isLoading}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  paddingX: 3,
                  backgroundColor: '#1976D2',
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  },
                }}
              >
                Next
              </ButtonComponent>
            )}

            {isLastQuestion && isStopped && (
              <ButtonComponent
                onClick={() => submitRecord(1, 'finish')}
                loading={isLoading}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  paddingX: 3,
                  backgroundColor: '#1976D2',
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  },
                }}
              >
                Finish
              </ButtonComponent>
            )}
          </Box>
        </Box>

        {/* Question / Info */}
        <Box minHeight={60} display="flex" justifyContent="center" alignItems="center">
          {isRecording ? (
            <Typography textAlign="center" fontWeight={600} fontSize={18}>
              {currentQuestion?.questionText}
            </Typography>
          ) : (
            <Box
              sx={{
                padding: '10px 16px',
                borderRadius: 2,
                backgroundColor: '#E3F2FD',
                border: '1px solid #90CAF9',
              }}
            >
              <Typography textAlign="center" fontSize={14} color="#64748B">
                Pertanyaan akan muncul setelah Anda menekan tombol <b>Start</b>
              </Typography>
            </Box>
          )}
        </Box>

        {/* Video */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: '100%',
              maxWidth: '1000px',
              aspectRatio: '16/9',
              borderRadius: 4,
              overflow: 'hidden',
              backgroundColor: 'black',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}
          >
            {activeRecordings.map(recording => (
              <video
                key={recording.id}
                ref={recording.webcamRef}
                autoPlay
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecordInterviews;