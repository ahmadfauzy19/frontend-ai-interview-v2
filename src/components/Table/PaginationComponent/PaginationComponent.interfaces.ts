interface RowsPerPageOptions {
  value: number;
  label: string;
}

export interface PaginationComponentProps {
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (page: number) => void;
  totalData: number;
  rowsPerPageOptions?: RowsPerPageOptions[];
}
