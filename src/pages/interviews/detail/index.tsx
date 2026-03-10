import { useState } from "react";
import TableComponent from '@/components/Table/TableComponent';
import type { TableHeader } from '@/components/Table/TableComponent/TableComponent.interfaces';
import { Icon } from '@iconify/react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Link, useLocation } from 'react-router-dom';
import { dummyOverall } from './DetailInterview.const';
import useDetailInterview from './DetailInterview.hooks';
import type { OverallScore } from './DetailInterview.interfaces';
import DetailInterviewLayout from './layout/DetailInterviewLayout';
import {
  Button
} from "@mui/material";

import InterviewDetailModal from "./components/InterviewDetailModal";

const InterviewDetailPage = () => {
  const theme = useTheme();
  const { method, handleSortChange, detailInterview, candidateList } = useDetailInterview();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

  console.log(candidateList);

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
      key: 'finalRecommendation',
      label: 'Summary',
      sx: { width: 'auto' },
      labelAlign: 'center',
      render: row => {
        const r = row as unknown as OverallScore;
        return <Typography fontSize={12}>{r.finalRecommendation}</Typography>;
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
          <Typography fontSize={18} fontWeight={600}>
            Overall Analysis
          </Typography>

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
            // tableData={dummyOverall as unknown as Record<string, string>[]}
            tableData={candidateList as unknown as Record<string, string>[]}
            minWidth="900px"
            renderPagination={false}
            maxHeight="30vh"
            page={method.watch('page')}
            pageSize={method.watch('size')}
            onPageChange={page => method.setValue('page', page)}
            onPageSizeChange={pageSize => method.setValue('size', pageSize)}
            onSort={handleSortChange}
            totalData={dummyOverall.length}
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

          <Box
            sx={{
              ...style.cardSummary,
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box display="flex" gap={1} justifyContent="center">
              <Icon icon="lucide:circle-user" width={25} height={25} />
              <Typography fontWeight={600}>Candidate Status</Typography>
              <Tooltip
                title="Breakdown of the candidate selection status"
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
            <Typography fontSize={14}>Total Response: 1</Typography>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 1,
                      value: 1,
                      label: `Selected (${1})`,
                      color: theme.palette.success.light,
                    },
                    { id: 2, value: 0, label: `Potential (${0})` },
                    {
                      id: 3,
                      value: 0,
                      label: `Not Selected (${0})`,
                      color: theme.palette.error.main,
                    },
                    {
                      id: 4,
                      value: 0,
                      label: `No Status (${0})`,
                      color: theme.palette.grey[400],
                    },
                  ],
                },
              ]}
              width={150}
              height={150}
            />
          </Box>
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
