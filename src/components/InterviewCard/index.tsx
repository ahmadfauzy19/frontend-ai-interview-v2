import { Icon } from '@iconify/react';
import { Box, Typography, useTheme } from '@mui/material';
import { ButtonComponent } from '../ButtonComponent';

const InterviewCard = ({
  interviewName,
  responseTotal,
}: {
  interviewName: string;
  responseTotal: number;
}) => {
  const theme = useTheme();

  const displayTitle =
    interviewName.split(' ').length > 3
      ? interviewName.split(' ').slice(0, 3).join(' ') + '...'
      : interviewName;
  return (
    <Box
      sx={{
        width: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: '8px 8px 0 0 ',
          padding: 3,
          width: '100%',
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="white" fontWeight={600} textAlign="center">
          {displayTitle}
        </Typography>
      </Box>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        width="100%"
        boxSizing="border-box"
      >
        <Box display="flex" gap={0.5}>
          <Typography fontWeight={500} fontSize={14}>
            Responses:{' '}
          </Typography>
          <Typography fontWeight={500} fontSize={14}>
            {responseTotal}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <ButtonComponent
            variant="contained"
            size="small"
            sx={{ borderRadius: 1, fontSize: 12 }}
            fullWidth
            startIcon={<Icon icon="mdi:camera-outline" />}
          >
            Start Interview
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            size="small"
            sx={{
              borderRadius: 1,
              fontSize: 12,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 2,
              },
            }}
            fullWidth
            startIcon={<Icon icon="solar:document-linear" />}
          >
            See interview result
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewCard;
