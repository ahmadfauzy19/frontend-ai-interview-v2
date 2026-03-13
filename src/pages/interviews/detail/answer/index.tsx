import { ButtonComponent } from '@/components/ButtonComponent';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Divider,
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
    if (isLoading || !name) return { children: '' };

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
      gap: 3,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 3,
      padding: 3,
      boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
    },
  };

  const getScoreColor = (score?: number | null) => {
    if (!score) return theme.palette.grey[500];

    if (score >= 85) return theme.palette.success.main;
    if (score >= 70) return theme.palette.info.main;
    if (score >= 55) return theme.palette.warning.main;

    return theme.palette.error.main;
  };

  return (
    <DetailInterviewLayout>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        maxHeight="100vh"
        overflow="auto"
      >
        {/* HEADER */}
        <Box sx={style.cardContainer}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                {...stringAvatar(answerCandidate?.name || '')}
                sx={{ width: 48, height: 48 }}
              />

              <Box>
                {isLoading ? (
                  <Skeleton width={120} />
                ) : (
                  <Typography fontSize={16} fontWeight={600}>
                    {answerCandidate?.name}
                  </Typography>
                )}

                <Typography fontSize={13} color="text.secondary">
                  Candidate Interview Result
                </Typography>
              </Box>
            </Box>

            <ButtonComponent
              variant="outlined"
              startIcon={<Icon icon="bx:left-arrow-alt" />}
              onClick={handleBack}
            >
              Back
            </ButtonComponent>
          </Box>

          <Divider />

          {/* SUMMARY */}
          <Typography fontSize={18} fontWeight={600}>
            Interview Summary
          </Typography>

          <Box display="flex" gap={3} flexWrap="wrap">
            <Box
              sx={{
                background: theme.palette.primary.main,
                color: '#fff',
                borderRadius: 2,
                padding: 2,
                minWidth: 160,
              }}
            >
              <Typography fontSize={12}>Total Score</Typography>

              {isLoading ? (
                <Skeleton width={40} />
              ) : (
                <Typography fontSize={26} fontWeight={700}>
                  {answerCandidate?.totalScore || 0}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                background: theme.palette.success.main,
                color: '#fff',
                borderRadius: 2,
                padding: 2,
                minWidth: 160,
              }}
            >
              <Typography fontSize={12}>Recommendation</Typography>

              {isLoading ? (
                <Skeleton width={80} />
              ) : (
                <Typography fontSize={18} fontWeight={700}>
                  {answerCandidate?.finalRecommendation || '-'}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* TRANSCRIPT */}
        <Box sx={style.cardContainer}>
          <Typography fontSize={18} fontWeight={600}>
            Transcript
          </Typography>

          {isLoading && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Skeleton height={120} />
              <Skeleton height={120} />
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
                <Box display="grid" gridTemplateColumns="420px 1fr" gap={3}>
                  {/* VIDEO */}
                  <Box>
                    <video
                      width="100%"
                      style={{ borderRadius: 12 }}
                      controls
                    >
                      <source src={item.videoUrl} />
                    </video>

                    <Box mt={1}>
                      <ButtonComponent
                        variant="outlined"
                        startIcon={<Icon icon="lucide:download" />}
                        onClick={() => handleDownload(item.fileName)}
                        loading={isLoadingDownload}
                      >
                        Download Video
                      </ButtonComponent>
                    </Box>
                  </Box>

                  {/* DETAILS */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight={600}>Score</Typography>

                      <Box
                        sx={{
                          background: getScoreColor(item.score),
                          color: '#fff',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: 12,
                          fontWeight: 700,
                          minWidth: 36,
                          textAlign: 'center',
                        }}
                      >
                        {item.score || 0}
                      </Box>
                    </Box>

                    <Box>
                      <Typography fontWeight={600} fontSize={14}>
                        Question {index + 1}
                      </Typography>

                      <Typography fontSize={14} color="text.secondary">
                        {item.questionText}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography fontWeight={600} fontSize={14}>
                        Candidate Answer
                      </Typography>

                      <Typography fontSize={14}>
                        {item.answerTranscript}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {index !== answerCandidate.answers.length - 1 && (
                  <Divider sx={{ borderColor: theme.palette.divider }} />
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </DetailInterviewLayout>
  );
};

export default InterviewAnswerPage;