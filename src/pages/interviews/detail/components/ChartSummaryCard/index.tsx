import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Icon } from "@iconify/react";

interface PieData {
  id: number;
  value: number;
  label: string;
  color?: string;
}

interface ChartSummaryCardProps {
  title: string;
  icon: string;
  tooltip?: string;
  total?: number;
  data: PieData[];
  width?: number;
  height?: number;
}

const ChartSummaryCard = ({
  title,
  icon,
  tooltip,
  total,
  data,
  width = 150,
  height = 150,
}: ChartSummaryCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Header */}
      <Box display="flex" gap={1} justifyContent="center">
        <Icon icon={icon} width={25} height={25} />

        <Typography fontWeight={600}>{title}</Typography>

        {tooltip && (
          <Tooltip title={tooltip} placement="top">
            <Icon
              icon="material-symbols:info-outline"
              width={12}
              height={12}
              color={theme.palette.primary.main}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </Box>

      {/* Total */}
      {typeof total === "number" && (
        <Typography fontSize={14}>Total Response: {total}</Typography>
      )}

      {/* Chart */}
      <PieChart
        series={[
          {
            data,
          },
        ]}
        width={width}
        height={height}
      />
    </Box>
  );
};

export default ChartSummaryCard;