import { ButtonComponent } from '@/components/ButtonComponent';
import { Icon } from '@iconify/react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DetailInterviewLayout from '../layout/DetailInterviewLayout';
import { dummyDetailAnswer } from './InterviewAnswer.const';

const InterviewAnswerPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const style = {
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      backgroundColor: theme.palette.primary.light,
      borderRadius: 3,
      padding: 2,
    },
  };

  return (
    <DetailInterviewLayout>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        maxHeight="100vh"
        overflow="auto"
      >
        <Box sx={style.cardContainer}>
          <ButtonComponent
            variant="text"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              padding: 0,
              fontSize: 14,
              width: 'fit-content',
            }}
            startIcon={<Icon icon="bx:left-arrow-alt" />}
            onClick={handleBack}
          >
            Back to summary
          </ButtonComponent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>T</Avatar>
            <Box>
              <Typography fontSize={14} fontWeight={600}>
                {dummyDetailAnswer.name}
              </Typography>
              <Typography fontSize={14}>{dummyDetailAnswer.email}</Typography>
            </Box>
          </Box>
          <Typography fontSize={18} fontWeight={600}>
            Interview Recording
          </Typography>
          <Box display="flex" gap={0.5}>
            <audio controls>
              <source
                src={dummyDetailAnswer.interviewAudio}
                type="audio/mpeg"
              />
              Browser Anda tidak mendukung elemen audio.
            </audio>
            <ButtonComponent variant="icon">
              <Icon icon="lucide:download" width={22} height={22} />
            </ButtonComponent>
          </Box>
        </Box>

        <Box sx={style.cardContainer}>
          <Typography fontSize={18} fontWeight={600}>
            General Summary
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: 2,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              width: '35%',
              gap: 2,
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={14}>
                User Sentimental: {dummyDetailAnswer.userSentiment}{' '}
              </Typography>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: theme.palette.warning.light,
                  borderRadius: 3,
                }}
              />
            </Box>
            <Typography fontSize={14}>
              Call Summary: {dummyDetailAnswer.callSummary}
            </Typography>
          </Box>
        </Box>

        <Box sx={style.cardContainer}>
          <Typography fontSize={18} fontWeight={600}>
            Transcript
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: 2,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              {dummyDetailAnswer.transcript.map(item => (
                <Box key={item.id} display="flex" gap={1}>
                  <Typography fontSize={14} fontWeight={600}>
                    {item.name}:
                  </Typography>
                  <Typography fontSize={14}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </DetailInterviewLayout>
  );
};

export default InterviewAnswerPage;
