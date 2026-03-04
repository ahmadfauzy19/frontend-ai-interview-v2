import type { PaginationComponentProps } from '@/components/Table/PaginationComponent/PaginationComponent.interfaces';
import {
  Box,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  page = 1,
  rowsPerPage = 10,
  onPageChange,
  totalData = 1,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const start = (page - 1) * rowsPerPage + 1;
  const end =
    totalData < rowsPerPage
      ? totalData
      : Math.min(page * rowsPerPage, totalData);
  const totalPage = Math.ceil(totalData / rowsPerPage);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        px: 2,
        py: 1,
        gap: isMobile ? 2 : 0,
      }}
    >
      <Typography color={theme.palette.text.primary}>
        Show: {start}-{end} of {totalData}
      </Typography>

      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={1}
        sx={{
          color: theme.palette.text.primary,
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            fontWeight: 600,
          },
          '& .MuiPaginationItem-root.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
