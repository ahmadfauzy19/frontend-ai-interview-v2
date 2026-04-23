import { ButtonComponent } from '@/components/ButtonComponent';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Typography,
  useTheme,
  Chip,
  FormControlLabel,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DetailInterviewLayout from '../layout/DetailInterviewLayout';
import useInterviewAnswer from './InterviewAnswer.hooks';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import SwitchComponent from '@/components/Form/SwitchComponent';

const InterviewAnswerPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const { 
    answerCandidate,
    isLoading, 
    id,
    isLoadingDownload,
    editMode,
    loadingSave,
    loadingValidate,
    control,
    handleCancel,
    handleDownload,
    handleEdit,
    handleSave,
    handleValidateToggle,
  } = useInterviewAnswer();

  const handleBack = () => {
    if (from) {
      navigate(from);
    } else {
      // fallback default (admin/interviewer)
      navigate(`/interviews/${id}`);
    }
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

  const getScoreColor = (score?: number | null) => {
    if (!score) return theme.palette.grey[500];

    if (score >= 85) return theme.palette.success.main;
    if (score >= 70) return theme.palette.info.main;
    if (score >= 55) return theme.palette.warning.main;

    return theme.palette.error.main;
  };

  const getRecommendationColor = (rec?: string | null) => {
    if (!rec) return theme.palette.grey[500];

    if (rec.toLowerCase() === 'hire') return theme.palette.success.main;
    if (rec.toLowerCase() === 'consider') return theme.palette.warning.main;

    return theme.palette.error.main;
  };

  const style = {
    card: {
      background: theme.palette.background.paper,
      borderRadius: 3,
      padding: 3,
      boxShadow: '0px 2px 10px rgba(0,0,0,0.06)',
    },
  };

  return (
    <DetailInterviewLayout>
      <Box display="flex" flexDirection="column" gap={4}>

        {/* HEADER */}
        <Box sx={style.card}>
          <Box display="flex" justifyContent="space-between" alignItems="center">

            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                {...stringAvatar(answerCandidate?.name || '')}
                sx={{
                  width: 50,
                  height: 50,
                  fontWeight: 700,
                }}
              />

              <Box>
                {isLoading ? (
                  <Skeleton width={120} />
                ) : (
                  <Typography fontSize={18} fontWeight={700}>
                    {answerCandidate?.name}
                  </Typography>
                )}

                <Typography fontSize={13} color="text.secondary">
                  AI Interview Result
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

          <Divider sx={{ my: 2 }} />

          {/* SUMMARY */}
          <Typography fontSize={18} fontWeight={700} mb={2}>
            Interview Summary
          </Typography>

          <Box display="flex" gap={3} flexWrap="wrap">

            {/* TOTAL SCORE */}
            <Box
              sx={{
                background: theme.palette.primary.main,
                color: '#fff',
                borderRadius: 3,
                padding: 3,
                minWidth: 180,
              }}
            >
              <Typography fontSize={12}>Total Score</Typography>

              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                <Typography fontSize={30} fontWeight={700}>
                  {answerCandidate?.totalScore ?? 0}
                </Typography>
              )}
            </Box>

            {/* RECOMMENDATION */}
            <Box
              sx={{
                background: getRecommendationColor(
                  answerCandidate?.recommendation
                ),
                color: '#fff',
                borderRadius: 3,
                padding: 3,
                minWidth: 180,
              }}
            >
              <Typography fontSize={12}>Recommendation</Typography>

              {isLoading ? (
                <Skeleton width={80} />
              ) : (
                <Typography fontSize={20} fontWeight={700}>
                  {answerCandidate?.recommendation || '-'}
                </Typography>
              )}
            </Box>
          </Box>

          {/* SUMMARY REASON */}
          {!isLoading && answerCandidate?.summaryReason && (
            <Box mt={3}>
              <Typography fontWeight={600} mb={1}>
                AI Analysis
              </Typography>

              <Typography color="text.secondary">
                {answerCandidate.summaryReason}
              </Typography>
            </Box>
          )}
        </Box>

        {/* ANSWERS */}
        <Box sx={style.card}>
          <Typography fontSize={18} fontWeight={700} mb={3}>
            Candidate Answers
          </Typography>

          {isLoading && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Skeleton height={120} />
              <Skeleton height={120} />
            </Box>
          )}

          {!isLoading &&
            answerCandidate?.answers
              ?.slice() // biar tidak mutate data asli
              .sort((a, b) => a.questionNumber - b.questionNumber)
              .map((item, index) => (
              <Box key={item.questionId} mb={4}>

                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: '1fr',
                    md: '420px 1fr',
                  }}
                  gap={3}
                >
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

                  {/* CONTENT */}
                  <Box display="flex" flexDirection="column" gap={2}>

                    {/* SCORES */}
                    <Box display="flex" gap={1} flexWrap="wrap">

                      <Chip
                        label={`Technical: ${item.technicalFundamentalScore}`}
                        sx={{
                          background: getScoreColor(
                            item.technicalFundamentalScore
                          ),
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />

                      <Chip
                        label={`Problem Solving: ${item.problemSolvingScore}`}
                        sx={{
                          background: getScoreColor(
                            item.problemSolvingScore
                          ),
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />

                      <Chip
                        label={`Communication: ${item.communicationScore}`}
                        sx={{
                          background: getScoreColor(
                            item.communicationScore
                          ),
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    {/* QUESTION */}
                    <Box>
                      <Typography fontWeight={700}>
                        Question {item.questionNumber}
                      </Typography>

                      <Typography color="text.secondary">
                        {item.questionText}
                      </Typography>
                    </Box>

                    {/* ANSWER (SELALU MUNCUL) */}
                    <Box>
                      <Typography fontWeight={700}>
                        Candidate Answer
                      </Typography>

                      {editMode[item.questionId] ? (
                        <TextfieldComponent
                          name={`answer_${item.questionId}`}
                          control={control}
                          fullWidth
                          multiline
                          minRows={4}
                        />
                      ) : (
                        <Typography color="text.secondary">
                          {item.answerTranscript}
                        </Typography>
                      )}
                    </Box>

                    {/* VALIDATION + ACTION */}
                    <Box
                      display="flex"
                      alignItems="center"
                      mb={1}
                    >
                      <FormControlLabel
                        sx={{ 
                          gap: 2,
                         }}
                        control={
                          <SwitchComponent
                            checked={item.isValidated}
                            onChange={(e) =>
                              handleValidateToggle(
                                item.participantId,
                                item.questionId,
                                e.target.checked
                              )
                            
                            }
                            disabled={loadingValidate[item.questionId] || answerCandidate?.totalScore != null}
                          />
                        }
                        label={item.isValidated ? 'Validated' : 'Not Validated'}
                      />

                      <Box display="flex" gap={1}>
                        {!item.isValidated && !editMode[item.questionId] && (
                          <ButtonComponent
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleEdit(item.questionId, item.answerTranscript)
                            }
                          >
                            Edit
                          </ButtonComponent>
                        )}

                        {!item.isValidated && editMode[item.questionId] && (
                          <>
                            <ButtonComponent
                              size="small"
                              variant="contained"
                              onClick={() => handleSave(item.participantId, item.questionId)}
                              loading={loadingSave[item.questionId]}
                            >
                              Save
                            </ButtonComponent>

                            <ButtonComponent
                              size="small"
                              variant="outlined"
                              onClick={() => handleCancel(item.questionId)}
                              disabled={loadingSave[item.questionId]}
                            >
                              Cancel
                            </ButtonComponent>
                          </>
                        )}
                      </Box>
                    </Box>
                        {answerCandidate?.totalScore != null && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            mt={0.5}
                            display="block"
                          >
                            Note : Penilaian sudah dilakukan. Jawaban bersifat read-only dan tidak dapat diubah.
                          </Typography>
                        )}
                  </Box>
                </Box>

                {index !== answerCandidate.answers.length - 1 && (
                  <Divider sx={{ mt: 4 }} />
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </DetailInterviewLayout>
  );
};

export default InterviewAnswerPage;