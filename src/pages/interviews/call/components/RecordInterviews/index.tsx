import { Box, Stack, Typography, useTheme } from '@mui/material';
import type { Question } from '../../CallInterview.interfaces';
import { useEffect, useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam';

const RecordInterviews = ({ questions }: { questions: Question[] }) => {
  const theme = useTheme();
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [recordId, setRecordId] = useState('');
  console.log({ recordId });

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
    // download,
    clearAllRecordings,
  } = useRecordWebcam();

  const recordVideo = async () => {
    const recording = await createRecording();

    console.log({ recording });

    if (!recording) return;
    setRecordId(recording.id);

    await openCamera(recording.id);
    await startRecording(recording.id);
  };

  const nextRecord = async () => {
    const recorded = await stopRecording(recordId);
    // await download(recordId);
    // TODO :: UPLOAD RECORDED HERE
    console.log({ recorded });

    await clearAllRecordings();

    const newRecording = await createRecording();
    if (newRecording) {
      setRecordId(newRecording.id);
      await openCamera(newRecording.id);
      await startRecording(newRecording.id);
    }
  };

  const handleChangeQuestion = (index: number) => {
    setActiveQuestion(index);
    nextRecord();
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
                    return handleChangeQuestion(questionOrder);
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
        <Box>
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
      </Box>
    </Box>
  );
};

export default RecordInterviews;
