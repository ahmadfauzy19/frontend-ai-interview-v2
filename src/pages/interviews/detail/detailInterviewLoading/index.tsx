import { Box, Skeleton, useTheme } from "@mui/material";
import DetailInterviewLayout from "../layout/DetailInterviewLayout";

const DetailInterviewLoading = () => {
  const theme = useTheme();

  return (
    <DetailInterviewLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.primary.light,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Skeleton width={180} height={24} />
            <Skeleton width={220} height={28} />
          </Box>
          <Skeleton width={120} height={36} />
        </Box>

        {/* Description */}
        <Skeleton width="60%" height={20} />

        {/* Table */}
        <Box
          padding={2}
          borderRadius={3}
          bgcolor={theme.palette.background.paper}
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={42} sx={{ mb: 1 }} />
          ))}
        </Box>

        {/* Cards */}
        <Box display="flex" gap={3} justifyContent="center">
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                padding: 2,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                width: 200,
                height: 150,
              }}
            >
              <Skeleton width="80%" />
              <Skeleton width="60%" height={40} />
              <Skeleton width="70%" />
            </Box>
          ))}
        </Box>
      </Box>
    </DetailInterviewLayout>
  );
};

export default DetailInterviewLoading;