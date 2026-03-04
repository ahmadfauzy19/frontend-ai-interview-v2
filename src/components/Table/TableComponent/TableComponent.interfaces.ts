import type { MenuComponentItemData } from '@/components/MenuComponent/MenuComponent.interfaces';
import type { TableCellProps } from '@mui/material';

export interface TableComponentProps<T = Record<string, unknown>> {
  id?: string;
  currentPage?: number | null;
  footer?: React.ReactNode;
  handlePageChange?: (page: number) => void;
  isLoading?: boolean;
  isPaper?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  borderWidth?: string;
  onPageSizeChange?: (pageSize: number) => void;
  onSort?: (sortValue: TableSorting) => void;
  pageSize?: number;
  tableData: T[];
  tableHeader: TableHeader<T>[];
  headerBackgroundColor?: string;
  setTableData?: (data: T[]) => void;
  collapseRender?: (row?: T, index?: number) => React.ReactNode;
  renderPagination?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  selectedData?: T[];
  onSelectedDataChange?: (selectedData: T[]) => void;
  headerDivider?: boolean;
  headerBorder?: boolean;
  borderRadius?: string;
  totalData?: number;
  emptyMessage?: string;
}

export interface Options<T = Record<string, unknown>> {
  iconName: string;
  onClick: (data: T, index: number) => void;
  isDisabled?: boolean | ((data: T) => boolean);
  isLoading?: boolean | ((data: T) => boolean);
  isHidden?: boolean | ((data: T) => boolean);
}

export interface TableHeader<T = Record<string, unknown>> {
  label?: string;
  labelAlign?: 'flex-start' | 'center' | 'flex-end';
  key: string;
  type?:
    | 'index'
    | 'action'
    | 'checkbox'
    | 'single-checkbox'
    | 'status'
    | 'date'
    | 'textHtml'
    | 'multiple-autocomplete'
    | 'date-only'
    | 'number';
  sort?: boolean;
  isDisabled?: boolean;
  isHidden?: (row: T) => boolean;
  actionOptions?:
    | MenuComponentItemData[]
    | ((row: T) => MenuComponentItemData[]);
  render?: (row: T, index: number) => React.ReactNode;
  sx?: ((row?: T) => TableCellProps['sx']) | TableCellProps['sx'];
  children?: TableHeader<T>[];
}

export interface TableSorting {
  order: 'asc' | 'desc' | '';
  sort: string;
}
