import { useState } from "react";
import TableComponent from '@/components/Table/TableComponent';
import type { TableHeader } from '@/components/Table/TableComponent/TableComponent.interfaces';
import { Icon } from '@iconify/react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Link, useLocation } from 'react-router-dom';
import useDetailInterview from './DetailInterview.hooks';
import type { OverallScore } from './DetailInterview.interfaces';
import DetailInterviewLayout from './layout/DetailInterviewLayout';
import {
  Button
} from "@mui/material";
import { ButtonComponent } from '@/components/ButtonComponent';
import InterviewDetailModal from "./components/InterviewDetailModal";
import { useNavigate } from 'react-router-dom';
import ChartSummaryCard from "./components/ChartSummaryCard";
import { buildRecommendationChart } from "./components/ChartSummaryCard/buildRecommandationChart";
import DetailInterviewLoading from "./detailInterviewLoading";


const InterviewDetailPage = () => {
  const theme = useTheme();
  const { method, handleSortChange, detailInterview, candidateList, summaryRecommandation, isLoadingCandidateList } = useDetailInterview();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/interviews`);
  };

  const tableHeader: TableHeader[] = [
    {
      key: 'name',
      label: 'Name',
      sort: true,
      sx: { width: '30%' },
      labelAlign: 'center',
      render: row => {
        const r = row as unknown as OverallScore;
        return (
          <Box display="flex" gap={1}>
            <Link to={`${currentPath}/answer/${r.candidateId}`}>
              <Icon
                icon="lucide:external-link"
                width={20}
                height={20}
                color={theme.palette.primary.main}
              />
            </Link>
            <Typography fontSize={14}>{r.name}</Typography>
          </Box>
        );
      },
    },
    {
      key: 'totalScore',
      label: 'Total Score',
      sort: true,
      sx: { width: '16%', textAlign: 'center' },
      labelAlign: 'center',
    },
    {
      key: 'recommendation',
      label: 'Recommendataion',
      sx: { width: 'auto' },
      labelAlign: 'center',
      render: row => {
        const r = row as unknown as OverallScore;
        return <Typography fontSize={12}>{r.recommendation}</Typography>;
      },
    },{
      key: 'summaryReason',
      label: 'Summary',
      sx: { width: 'auto' },
      labelAlign: 'center',
      render: row => {
        const r = row as unknown as OverallScore;
        return <Typography fontSize={12}>{r.summaryReason}</Typography>;
      },
    },
  ];

  const style = {
    cardSummary: {
      padding: 2,
      borderRadius: 3,
      backgroundColor: theme.palette.background.paper,
      boxShadow: 2,
      display: 'flex',
      flexDirection: 'column',
    },
    cardResult: {
      backgroundColor: theme.palette.primary.light,
      paddingY: 1,
      paddingX: 2,
      borderRadius: 3,
      width: 'fit-content',
    },
  };

  const summaryData = buildRecommendationChart(
    summaryRecommandation,
    detailInterview?.purpose ?? "",
  );

  const totalResponse = summaryData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  if (isLoadingCandidateList) {
    return <DetailInterviewLoading />;
  }
  return (
    <DetailInterviewLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <ButtonComponent
              variant="text"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                padding: 0,
                fontSize: 14,
                width: 'fit-content',
                marginBottom: 2
              }}
              startIcon={<Icon icon="bx:left-arrow-alt" />}
              onClick={handleBack}
            >
              Back to Interviews
            </ButtonComponent>
            <Typography fontSize={18} fontWeight={600}>
              Overall Analysis
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={handleOpenDetail}
            startIcon={<Icon icon="lucide:eye" />}
          >
            Lihat Detail
          </Button>
        </Box>
        <Box display="flex" gap={0.5}>
          <Typography fontSize={14}>Interview Description:</Typography>
          <Typography fontSize={14} fontWeight={600}>
            {detailInterview?.context}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          padding={2}
          borderRadius={3}
          bgcolor={theme.palette.background.paper}
          minHeight={'30vh'}
        >
          <TableComponent
            tableHeader={tableHeader}
            tableData={candidateList as unknown as Record<string, string>[]}
            minWidth="900px"
            renderPagination={false}
            maxHeight="60vh"
            page={method.watch('page')}
            pageSize={method.watch('size')}
            onPageChange={page => method.setValue('page', page)}
            onPageSizeChange={pageSize => method.setValue('size', pageSize)}
            onSort={handleSortChange}
            totalData={candidateList.length}
          />
        </Box>
        <Box display="flex" gap={3} justifyContent="center">
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              sx={{
                ...style.cardSummary,
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Box display="flex" gap={0.5}>
                <Typography fontWeight={600}>Average Duration</Typography>
                <Tooltip
                  title="Average time users took to complete an interview"
                  placement="top"
                >
                  <Icon
                    icon="material-symbols:info-outline"
                    width={12}
                    height={12}
                    color={theme.palette.primary.main}
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
              <Box sx={style.cardResult}>
                <Typography fontWeight={600} fontSize={24} color={'primary'}>
                  1m 35s
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                ...style.cardSummary,
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Box display="flex" gap={0.5}>
                <Typography fontWeight={600}>
                  Interview Completion Rate
                </Typography>
                <Tooltip
                  title="Percentage of interviews completed successfully"
                  placement="top"
                >
                  <Icon
                    icon="material-symbols:info-outline"
                    width={12}
                    height={12}
                    color={theme.palette.primary.main}
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
              <Box sx={style.cardResult}>
                <Typography fontWeight={600} fontSize={24} color={'primary'}>
                  100%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              ...style.cardSummary,
            }}
          >
            <Box display="flex" gap={1} justifyContent="center">
              <Icon icon="lucide:smile" width={25} height={25} />
              <Typography fontWeight={600}>Candidate Sentiment</Typography>
              <Tooltip
                title="Distribution of user sentiments during interviews"
                placement="top"
              >
                <Icon
                  icon="material-symbols:info-outline"
                  width={12}
                  height={12}
                  color={theme.palette.primary.main}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            </Box>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 1,
                      value: 0,
                      label: `Positive (${0})`,
                      color: theme.palette.success.light,
                    },
                    { id: 2, value: 1, label: `Neutral (${1})` },
                    {
                      id: 3,
                      value: 0,
                      label: `Negative (${0})`,
                      color: theme.palette.error.main,
                    },
                  ],
                },
              ]}
              width={150}
              height={150}
            />
          </Box>

          <ChartSummaryCard
            title="Candidate Recommendation"
            icon="lucide:circle-user"
            tooltip="Breakdown of AI hiring recommendation results"
            total={totalResponse}
            data={summaryData}
          />
        </Box>
      </Box>
      <InterviewDetailModal
        open={openDetail}
        onClose={handleCloseDetail}
        detailInterview={detailInterview}
      />
    </DetailInterviewLayout>
  );
};

export default InterviewDetailPage;
