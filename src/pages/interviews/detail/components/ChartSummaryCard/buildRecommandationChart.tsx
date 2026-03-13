import { useTheme } from "@mui/material";

export function buildRecommendationChart(
  summary: any,
  purpose: string,
) {
    const theme = useTheme();
  if (!summary) return [];

  if (purpose === "HIRING") {
    return [
      {
        id: 1,
        value: summary.strongHire ?? 0,
        label: `Strong Hire (${summary.strongHire ?? 0})`,
        color: theme.palette.success.dark,
      },
      {
        id: 2,
        value: summary.hire ?? 0,
        label: `Hire (${summary.hire ?? 0})`,
        color: theme.palette.success.main,
      },
      {
        id: 3,
        value: summary.consider ?? 0,
        label: `Consider (${summary.consider ?? 0})`,
        color: theme.palette.warning.main,
      },
      {
        id: 4,
        value: summary.reject ?? 0,
        label: `Reject (${summary.reject ?? 0})`,
        color: theme.palette.error.main,
      },
    ];
  }

  return [
    {
      id: 1,
      value: summary.readyForPromotion ?? 0,
      label: `Ready For Promotion (${summary.readyForPromotion ?? 0})`,
      color: theme.palette.success.main,
    },
    {
      id: 2,
      value: summary.meetsCurrentLevel ?? 0,
      label: `Meets Current Level (${summary.meetsCurrentLevel ?? 0})`,
      color: theme.palette.info.main,
    },
    {
      id: 3,
      value: summary.needsImprovement ?? 0,
      label: `Needs Improvement (${summary.needsImprovement ?? 0})`,
      color: theme.palette.warning.main,
    },
    {
      id: 4,
      value: summary.significantImprovementRequired ?? 0,
      label: `Significant Improvement (${summary.significantImprovementRequired ?? 0})`,
      color: theme.palette.error.main,
    },
  ];
}