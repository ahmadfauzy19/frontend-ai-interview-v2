import { Box, Skeleton } from '@mui/material';

const ListAnswerLoading = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Skeleton
        variant="text"
        width={250}
        height={40}
        sx={{ mb: 2 }}
      />

      {/* Table wrapper */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Table Header */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns:
              '200px 200px 100px 150px 150px 150px 120px 120px 300px',
            gap: 2,
            mb: 2,
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} height={20} />
          ))}
        </Box>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <Box
            key={rowIdx}
            sx={{
              display: 'grid',
              gridTemplateColumns:
                '200px 200px 100px 150px 150px 150px 120px 120px 300px',
              gap: 2,
              mb: 2,
              alignItems: 'center',
            }}
          >
            {/* Interview */}
            <Skeleton height={20} />

            {/* Name */}
            <Skeleton height={20} />

            {/* Score */}
            <Skeleton height={20} width={50} />

            {/* Recommendation */}
            <Skeleton variant="rounded" height={28} width={90} />

            {/* Progress */}
            <Box>
              <Skeleton height={15} width={40} />
              <Skeleton height={6} />
            </Box>

            {/* Validated */}
            <Box>
              <Skeleton height={15} width={40} />
              <Skeleton height={6} />
            </Box>

            {/* Avg Break */}
            <Skeleton height={20} width={60} />

            {/* Avg Answer */}
            <Skeleton height={20} width={60} />

            {/* Summary */}
            <Skeleton height={40} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListAnswerLoading;