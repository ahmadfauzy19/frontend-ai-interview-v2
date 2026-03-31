import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const columns = [
  'Process ID',
  'Interview Name',
  'Candidate Name',
  'Task Name',
  'Start Date',
  'End Date',
  'Status',
  'Error Message',
];

const MonitoringTableLoading = () => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* 🔍 Search Skeleton */}
      <Box
        sx={{
            width:'300px',
            height:'40px',
            mb: 'px'
        }}
      />

      <TableContainer>
        <Table sx={{ minWidth: 1200 }}>
          {/* HEADER */}
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width="60%" height={20} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          px: 1,
        }}
      >
        <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="rounded" width={200} height={30} />
      </Box>
    </Box>
  );
};

export default MonitoringTableLoading;