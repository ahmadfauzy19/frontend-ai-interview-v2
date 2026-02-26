import { Box, Skeleton } from '@mui/material';

const InterviewCardLoading = () => {
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
          borderRadius: '8px 8px 0 0 ',
          padding: 3,
          width: '100%',
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton variant="rectangular" width={250} height={130} />
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
        <Skeleton width={150} />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          width="100%"
          marginTop={3}
        >
          <Skeleton />
          <Skeleton />
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewCardLoading;
