import InterviewCardLoading from '@/components/InterviewCardLoading';
import { Box, Stack, Typography } from '@mui/material';
import CreateInterviewCard from '../../components/CreateInterviewCard';
import InterviewCard from '../../components/InterviewCard';
import useInterviews from './Interviews.hooks';
import InterviewModal from './components/interview-modal';

const InterviewsPage = () => {
  const { openModal, handleOpenModal, interviewData, isLoading } =
    useInterviews();

  console.log({ interviewData });
  return (
    <Box flexGrow={1}>
      <Stack gap={3}>
        <Typography fontSize={24} fontWeight={600}>
          My Interview
        </Typography>
        <Box display="flex" gap={3} flexWrap="wrap">
          <CreateInterviewCard handleClick={handleOpenModal} />
          {!isLoading &&
            interviewData.map(interview => (
              <InterviewCard key={interview.id} data={interview} />
            ))}

          {isLoading &&
            [...Array(3)].map((_, index) => (
              <InterviewCardLoading key={index} />
            ))}
        </Box>
      </Stack>

      <InterviewModal open={openModal} handleClose={handleOpenModal} />
    </Box>
  );
};

export default InterviewsPage;
