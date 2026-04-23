import { ButtonComponent } from '@/components/ButtonComponent';
import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
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

  const [failedUpload, setFailedUpload] = useState<{
        blob: Blob;
        questionId: string;
        fileName: string;
      } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

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

  // =========================
  // 🧠 UTIL FUNCTIONS
  // =========================

  const stopMediaStream = (recording: any) => {
    try {
      const stream = recording?.webcamRef?.current?.srcObject;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach(track => track.stop());
      }

      if (recording?.webcamRef?.current) {
        recording.webcamRef.current.srcObject = null;
      }
    } catch (err) {
      console.warn('Failed stopping media stream', err);
    }
  };

  const uploadWithRetry = async (
    url: string,
    formData: FormData,
    retries = 2
  ): Promise<any> => {
    try {
      abortControllerRef.current = new AbortController();

      return await axiosUtils.post(url, formData, {
        signal: abortControllerRef.current.signal,
      });

    } catch (err: any) {
      if (err.name === 'CanceledError') {
        throw err;
      }

      if (retries > 0) {
        await new Promise(r => setTimeout(r, 1000));
        return uploadWithRetry(url, formData, retries - 1);
      }

      throw err;
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
    showSnackbar('Upload dibatalkan', 'info');
  };

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

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  // =========================
  // 🚀 INIT
  // =========================

  useEffect(() => {
    setCurrentQuestion(questions[activeQuestion - 1]);
  }, [activeQuestion]);

  useEffect(() => {
    initRecording();
    startBreakTimer();

    return () => {
      stopTimer();
      stopBreakTimer();
      if (currentRecording) stopMediaStream(currentRecording);
    };
  }, []);

  const initRecording = async () => {
    const recording = await createRecording();
    if (!recording) return;
    setRecordId(recording.id);
    await openCamera(recording.id);
  };

  // =========================
  // 🎥 RECORD CONTROL
  // =========================

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

  // =========================
  // SUBMIT RECORD (FINAL FIX)
  // =========================

  const submitRecord = async (index: number, type: 'next' | 'finish') => {
    if (!currentRecording?.blob) {
      showSnackbar('Recording tidak ditemukan', 'error');
      return;
    }

    setIsLoading(true);
    const blobBackup = currentRecording.blob;

    try {
      stopMediaStream(currentRecording);

      const videoFile = new File(
        [blobBackup],
        `${currentQuestion.id.replace(/\s+/g, '_')}-${userData.userId}-${Date.now()}.webm`,
        { type: 'video/webm' }
      );

      if (videoFile.size > 200 * 1024 * 1024) {
        showSnackbar('Video maksimal 200MB', 'error');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('breakTime', breakTime.toString());
      formData.append('answerTime', timer.toString());

      await uploadWithRetry(
        `/answers/upload?questionId=${currentQuestion.id}&userId=${userData.userId}`,
        formData
      );

      setAllQuestion(prev =>
        prev.map(q =>
          q.id === currentQuestion.id ? { ...q, isDone: true } : q
        )
      );

      resetBreakTimer();
      setTimer(0);

      await clearAllRecordings();
      await new Promise(res => setTimeout(res, 300));

      if (type === 'finish') {
        setInterviewState('END');
        return;
      }

      setActiveQuestion(index);

      const newRecording = await createRecording();
      if (newRecording) {
        setRecordId(newRecording.id);
        await openCamera(newRecording.id);
      }

      startBreakTimer();

    } catch (error: any) {
      console.error(error);
      if (error.name === 'CanceledError') {
        showSnackbar('Upload dibatalkan user', 'info');
        return;
      }

      setFailedUpload({
        blob: blobBackup,
        questionId: currentQuestion.id,
        fileName: `${currentQuestion.questionText.replace(/\s+/g, '_')}-${userData.userId}-${Date.now()}.webm`
      });

      let errorMessage = 'Upload gagal, coba lagi';

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage = 'Server tidak merespon';
      } else if (error.message) {
        errorMessage = error.message;
      }

      showSnackbar(errorMessage, 'error');
      return; // penting: jangan clear biar bisa retry

    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const resendUpload = async () => {
    if (!failedUpload) return;

    setIsLoading(true);

    try {
      const videoFile = new File(
        [failedUpload.blob],
        failedUpload.fileName,
        { type: 'video/webm' }
      );

      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('breakTime', breakTime.toString());
      formData.append('answerTime', timer.toString());

      await uploadWithRetry(
        `/answers/upload?questionId=${failedUpload.questionId}&userId=${userData.userId}`,
        formData
      );

      setAllQuestion(prev =>
        prev.map(q =>
          q.id === failedUpload.questionId ? { ...q, isDone: true } : q
        )
      );

      showSnackbar('Upload berhasil!', 'success');

      setFailedUpload(null);

      // reset timer
      resetBreakTimer();
      setTimer(0);

      // lanjut flow (next / finish)
      if (isLastQuestion) {
        setInterviewState('END');
        return;
      }

      const nextIndex = activeQuestion + 1;
      setActiveQuestion(nextIndex);

      // init recording baru
      await clearAllRecordings();
      await new Promise(res => setTimeout(res, 300));

      const newRecording = await createRecording();
      if (newRecording) {
        setRecordId(newRecording.id);
        await openCamera(newRecording.id);
      }

      startBreakTimer();

    } catch (err) {
      showSnackbar('Retry gagal lagi', 'error');
    } finally {
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

            {!isLastQuestion && isStopped && !failedUpload && (
              <ButtonComponent
                onClick={() => submitRecord(activeQuestion + 1, 'next')}
                loading={isLoading}
                disabled={isLoading}
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
            {/* Saat sedang upload */}
            {isLoading && (
              <Box display="flex" gap={2}>
                <ButtonComponent
                  onClick={cancelUpload}
                  sx={{ backgroundColor: '#64748B', color: 'white' }}
                >
                  Cancel
                </ButtonComponent>
              </Box>
            )}

            {/* Saat gagal upload */}
            {failedUpload && !isLoading && (
              <Box display="flex" gap={2}>
                <ButtonComponent
                  onClick={resendUpload}
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
                  Reupload & next
                </ButtonComponent>
              </Box>
            )}
            {failedUpload && !isLoading && isLastQuestion && isStopped && (
              <Box display="flex" gap={2}>
                <ButtonComponent
                  onClick={resendUpload}
                  loading={isLoading}
                  sx={{ 
                    backgroundColor: '#1976D2',
                    '&:hover': {
                      backgroundColor: '#1565C0',
                    }, 
                  }}
                >
                  Reupload & finish
                </ButtonComponent>
              </Box>
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