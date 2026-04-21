import TableComponent from '@/components/Table/TableComponent';
import type { TableHeader } from '@/components/Table/TableComponent/TableComponent.interfaces';
import { useListAnswer, type CandidateAnswer } from '../hooks/ListAnswer.hooks';
import {
  Box,
  Typography,
  Chip,
  Paper,
  LinearProgress,
} from '@mui/material';
import { useMemo } from 'react';
import ListAnswerLoading from '../listResultTableLoading';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const getRecommendationColor = (rec: string) => {
  switch (rec?.toLowerCase()) {
    case 'accept':
      return 'success';
    case 'consider':
      return 'warning';
    case 'reject':
      return 'error';
    default:
      return 'default';
  }
};

const parseFraction = (value: string) => {
  const [num, total] = value.split('/').map(Number);
  const percent = total ? (num / total) * 100 : 0;
  return { num, total, percent };
};

const TableListAnswer = () => {
  const { data, loading } = useListAnswer();
  const navigate = useNavigate();

  const tableHeader: TableHeader<CandidateAnswer>[] = [
    {
      key: 'interviewName',
      label: 'Interview',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          {/* ICON LINK */}
          <Tooltip title="Lihat Detail Jawaban">
            <IconButton
              size="small"
              onClick={() =>
                navigate(
                  `/interviews/${row.interviewId}/answer/${row.candidateId}`, {state: { from: '/results' }}
                )
              }
            >
              <Icon icon="mdi:open-in-new" width={18} />
            </IconButton>
          </Tooltip>

          {/* TEXT */}
          <Typography fontWeight={500}>
            {row.interviewName}
          </Typography>

        </Box>
      ),
    },

    { key: 'name', label: 'Candidate Name' },

    {
      key: 'totalScore',
      label: 'Score',
      render: (row) => (
        <Typography fontWeight={600}>
          {row.totalScore ?? 0}
        </Typography>
      ),
    },

    {
      key: 'recommendation',
      label: 'Recommendation',
      render: (row) => (
        <Chip
          label={row.recommendation}
          color={getRecommendationColor(row.recommendation) as any}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },

    {
      key: 'progress',
      label: 'Progress',
      render: (row) => {
        const { percent, num, total } = parseFraction(row.progress);

        return (
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="caption">
              {num}/{total}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{ height: 6, borderRadius: 2 }}
            />
          </Box>
        );
      },
    },

    {
      key: 'validated',
      label: 'Validated',
      render: (row) => {
        const { percent, num, total } = parseFraction(row.validated);

        return (
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="caption">
              {num}/{total}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={percent}
              color="success"
              sx={{ height: 6, borderRadius: 2 }}
            />
          </Box>
        );
      },
    },

    {
      key: 'avgBreakTime',
      label: 'Avg Break (s)',
    },

    {
      key: 'avgAnswerTime',
      label: 'Avg Answer (s)',
    },
  ];

  const tableData = useMemo(() => {
    return data.map((item) => ({ ...item }));
  }, [data]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2, color: '#1e293b' }}
      >
        Candidate Interview Results
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
        }}
      >
        <Box sx={{ position: 'relative' }}>
            {loading ? (
                <ListAnswerLoading />
            ) : (
                <Box sx={{ overflowX: 'auto' }}>
                <TableComponent
                    tableHeader={
                    tableHeader as unknown as TableHeader<Record<string, unknown>>[]
                    }
                    tableData={tableData}
                    minWidth="1200px"
                />
                </Box>
            )}
            </Box>
      </Paper>
    </Box>
  );
};

export default TableListAnswer;