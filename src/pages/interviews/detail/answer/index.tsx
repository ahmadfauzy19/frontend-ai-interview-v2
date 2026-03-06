import { ButtonComponent } from '@/components/ButtonComponent';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DetailInterviewLayout from '../layout/DetailInterviewLayout';
import useInterviewAnswer from './InterviewAnswer.hooks';

const InterviewAnswerPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { answerCandidate, isLoading, id, handleDownload, isLoadingDownload } =
    useInterviewAnswer();

  const handleBack = () => {
    navigate(`/interviews/${id}`);
  };

  function stringAvatar(name: string) {
    if (isLoading || !name) {
      return { children: '' };
    }

    const parts = name.trim().split(' ');
    const firstInitial = parts[0]?.[0] || '';
    const secondInitial = parts[1]?.[0] || '';

    return {
      children: `${firstInitial}${secondInitial}`.toUpperCase(),
    };
  }

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
            <Avatar {...stringAvatar(answerCandidate?.name || '')} />
            <Box>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <Typography fontSize={14} fontWeight={600}>
                  {answerCandidate?.name}
                </Typography>
              )}
              {/* <Typography fontSize={14}>{dummyDetailAnswer.email}</Typography> */}
            </Box>
          </Box>
          <Typography fontSize={18} fontWeight={600}>
            Interview Summary
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5}>
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              <Typography fontSize={14}>
                Total Score: {answerCandidate?.totalScore || 0}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              <Typography fontSize={14}>
                Final Recommendation:{' '}
                {answerCandidate?.finalRecommendation || '-'}
              </Typography>
            )}
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
              {isLoading && (
                <Box display="flex" flexDirection="column" gap={1}>
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton height={100} />
                </Box>
              )}
              {!isLoading &&
                answerCandidate?.answers.map((item, index) => (
                  <Box
                    key={item.questionId}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                  >
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Box display="flex" gap={1} flexDirection="column">
                        <Box display="flex" gap={1}>
                          <Typography fontSize={14} fontWeight={600}>
                            Score:
                          </Typography>
                          <Typography fontSize={14}>
                            {item.score || 0}
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                          <Typography fontSize={14} fontWeight={600}>
                            Question {index + 1}:
                          </Typography>
                          <Typography fontSize={14}>
                            {item.questionText}
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                          <Grid size={1}>
                            <Typography fontSize={14} fontWeight={600}>
                              Answer {index + 1}:
                            </Typography>
                          </Grid>
                          <Grid size={11}>
                            <Typography fontSize={14}>
                              {item.answerTranscript}
                            </Typography>
                          </Grid>
                        </Box>
                      </Box>
                      <Box display="flex" gap={1}>
                        <video width="400" controls>
                          <source src={item.videoUrl} />
                        </video>
                        <Box display="flex" alignItems="flex-end">
                          <ButtonComponent
                            variant="icon"
                            onClick={() => handleDownload(item.fileName)}
                            loading={isLoadingDownload}
                          >
                            <Icon
                              icon="lucide:download"
                              width={22}
                              height={22}
                            />
                          </ButtonComponent>
                        </Box>
                      </Box>
                    </Box>
                    {index !== answerCandidate?.answers.length - 1 && (
                      <Divider color="black" />
                    )}
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
