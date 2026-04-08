import TableComponent from '@/components/Table/TableComponent';
import type { TableHeader } from '@/components/Table/TableComponent/TableComponent.interfaces';
import { useMonitoring, type MonitoringHistory } from '../hook/monitoring.hooks';
import {
  TextField,
  Box,
  InputAdornment,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState, useMemo, useDeferredValue } from 'react';
import MonitoringTableLoading from '../monitoringTableLoading';
import FilterSortButton from './FilterSortButton';

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'success':
      return 'success';
    case 'failed':
      return 'error';
    case 'running':
      return 'warning';
    default:
      return 'default';
  }
};

const tableHeader: TableHeader<MonitoringHistory>[] = [
  { key: 'processId', label: 'Process ID' },
  { key: 'interviewName', label: 'Interview Name' },
  { key: 'candidateName', label: 'Candidate Name' },
  { key: 'taskName', label: 'Task Name' },
  {
    key: 'startDate',
    label: 'Start Date',
    render: (row) =>
      new Date(row.startDate).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
  },
  {
    key: 'endDate',
    label: 'End Date',
    render: (row) => {
      if (!row.endDate) return '-';

      return new Date(row.endDate).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    },
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Chip
        label={row.status}
        color={getStatusColor(row.status) as any}
        size="small"
        sx={{ fontWeight: 600 }}
      />
    ),
  },
  {
    key: 'messageError',
    label: 'Error Message',
    render: (row) => (
      <Typography
        variant="body2"
        color={row.messageError ? 'error' : 'text.secondary'}
        sx={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        {row.messageError ?? '-'}
      </Typography>
    ),
  },
];

const TableMonitoring = () => {
  const {
    data,
    page,
    rowsPerPage,
    totalData,
    loading,
    setSearch,
    setRowsPerPage,
    setPage,
    setSortBy,
    setDirection,
  } = useMonitoring();

  const [searchInput, setSearchInput] = useState('');
  const [sortConfig, setSortConfig] = useState<
    { field: string; direction: 'asc' | 'desc' }[]
  >([]);
  const deferredSearch = useDeferredValue(searchInput);

  useEffect(() => {
    setSearch(deferredSearch);
  }, [deferredSearch, setSearch]);

  useEffect(() => {
    if (sortConfig.length > 0) {
      setSortBy(sortConfig.map((s) => s.field));
      setDirection(sortConfig.map((s) => s.direction));
      setPage(1);
    } else {
      setSortBy(undefined);
      setDirection(undefined);
    }
  }, [sortConfig]);

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
        Monitoring Process
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
  
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            gap: 2,
          }}
        >
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search monitoring..."
            size="small"
            sx={{
              width: 320,
              background: '#fff',
              borderRadius: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={20} />
                </InputAdornment>
              ),
            }}
          />

          <FilterSortButton
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />
        </Box>

        {/* TABLE */}
        <Box sx={{ position: 'relative' }}>
          {loading ? (
            <Box
              sx={{ overflowX: 'auto', opacity: loading ? 0.5 : 1 }}
            >
              <MonitoringTableLoading />
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto', opacity: loading ? 0.5 : 1 }}>
              <TableComponent
                tableHeader={
                  tableHeader as unknown as TableHeader<Record<string, unknown>>[]
                }
                tableData={tableData}
                minWidth="1200px"
                totalData={totalData}
                page={page}
                pageSize={rowsPerPage}
                onPageChange={setPage}
                onPageSizeChange={setRowsPerPage}
              />
            </Box>
          )}

        </Box>
      </Paper>
    </Box>
  );
};

export default TableMonitoring;