import MenuComponent from '@/components/MenuComponent';
import type {
  MenuComponentItemData,
  MenuComponentProps,
} from '@/components/MenuComponent/MenuComponent.interfaces';
import PaginationComponent from '@/components/Table/PaginationComponent';
import type {
  TableComponentProps,
  TableHeader,
  TableSorting,
} from '@/components/Table/TableComponent/TableComponent.interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  TableSortLabel,
  Typography,
  useTheme,
  type SxProps,
  type TableCellProps,
  type Theme,
} from '@mui/material';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';

const TableComponent: React.FC<TableComponentProps> = ({
  tableHeader = [],
  tableData = [],
  isLoading = false,
  onSort,
  collapseRender,
  renderPagination = true,
  page = 1,
  pageSize = 10,
  onPageSizeChange,
  onPageChange,
  selectedData = [],
  onSelectedDataChange,
  borderRadius = '10px',
  totalData = 1,
  minWidth = '1200px',
  maxWidth = 'auto',
  ...tableProps
}) => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState<TableSorting>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [openCollapse, setOpenCollapse] = useState<
    Record<string | number, boolean>
  >({});

  const handleToggleCollapse = (rowId: string | number) => {
    setOpenCollapse(prev => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  useEffect(() => {
    if (tableData.length > 0) {
      setOpenCollapse({});
    }
  }, [tableData]);

  const handlePageChange = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    if (onPageSizeChange) onPageSizeChange(pageSize);
  };

  const handleSelectedCheckbox = (rowData: Record<string, unknown>) => {
    const exists = selectedData.includes(rowData);
    const updatedData = exists
      ? selectedData.filter(data => data !== rowData)
      : [...selectedData, rowData];
    if (onSelectedDataChange) onSelectedDataChange(updatedData);
  };

  const handleSelectedSingleCheckbox = (rowData: Record<string, unknown>) => {
    const exists = selectedData.includes(rowData);
    const updatedData = exists ? [] : [rowData];

    if (onSelectedDataChange) onSelectedDataChange(updatedData);
  };

  const handleSelectedAll = (data: Record<string, unknown>[]) => {
    if (onSelectedDataChange) onSelectedDataChange(data);
  };

  const isSelected = (rowData: Record<string, unknown>) =>
    selectedData.includes(rowData);

  const styTableContainer = {
    backgroundColor: theme.palette.background.paper,
    borderStyle: 'solid',
    borderWidth: tableProps.borderWidth
      ? tableProps.borderWidth
      : '1px 1px 1px 1px',
    borderColor: theme.palette.divider,
    borderRadius: renderPagination
      ? `${borderRadius} ${borderRadius} 0 0`
      : borderRadius,
    [theme.breakpoints.down('md')]: {
      overflowX: 'auto',
    },
    display: tableData.length < 1 ? 'flex' : 'blocks',
    flexGrow: 1,
    ...(tableProps.isPaper && {
      pb: 2,
      px: 2,
    }),
    ...(tableProps.maxHeight && { maxHeight: tableProps.maxHeight }),
    ...(maxWidth && { maxWidth: maxWidth }),
    ...(tableProps.minHeight && { minHeight: tableProps.minHeight }),
  };

  const styTableHead = {
    '& .MuiTableCell-root': {
      backgroundColor: tableProps.headerBackgroundColor
        ? tableProps.headerBackgroundColor
        : 'inherited',
      fontWeight: 700,
      paddingX: 2,
      paddingY: 1,
    },
  };

  const [anchorElActionMenu, setAnchorElActionMenu] =
    useState<null | HTMLElement>(null);
  const [itemDataActionMenu, setItemDataActionMenu] = useState<
    MenuComponentProps['items']
  >([]);
  const open = Boolean(anchorElActionMenu);

  const handleClickActionMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    actionOptions: MenuComponentItemData[]
  ) => {
    setItemDataActionMenu(actionOptions);
    setAnchorElActionMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElActionMenu(null);
  };

  const handleSelectAllChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tableData: Record<string, unknown>[]
  ) => {
    const { checked } = e.target;
    const newSelection = checked ? tableData.map(row => row) : [];
    handleSelectedAll(newSelection);
  };

  const onSortChange = (headerName: string) => {
    if (!onSort) return;

    if (sortBy?.sort !== headerName) {
      const ascSort: TableSorting = { order: 'asc', sort: headerName };
      setSortDirection('asc');
      setSortBy(ascSort);
      onSort(ascSort);
    } else if (sortDirection === 'asc') {
      const descSort: TableSorting = { order: 'desc', sort: headerName };
      setSortDirection('desc');
      setSortBy(descSort);
      onSort(descSort);
    } else if (sortDirection === 'desc') {
      const resetSort: TableSorting = { order: '', sort: '' };
      setSortBy(resetSort);
      onSort(resetSort);
    }
  };

  const callRowSx = (sx: TableHeader['sx'], row: Record<string, unknown>) =>
    typeof sx === 'function'
      ? (sx as (r?: Record<string, unknown>) => TableCellProps['sx'])(row)
      : (sx ?? {});

  const renderLoading = () => (
    <MuiTableBody>
      <MuiTableRow>
        <MuiTableCell
          id="table-circular-loading"
          align="center"
          colSpan={100}
          sx={{
            borderBottom: 'none',
            height: '15vw',
          }}
        >
          <CircularProgress />
        </MuiTableCell>
      </MuiTableRow>
    </MuiTableBody>
  );

  const renderExpandButton = (
    rowId: string | number,
    isOpen: boolean,
    onToggle: (id: string | number) => void
  ) => (
    <IconButton
      id={`table-expand-collapse-${rowId}`}
      onClick={() => onToggle(rowId)}
      sx={{
        marginRight: 2,
      }}
    >
      {
        <Icon
          icon={
            isOpen
              ? 'solar:square-alt-arrow-down-linear'
              : 'solar:square-alt-arrow-right-linear'
          }
          style={{ fontSize: '24px' }}
          color={isOpen ? '#175AE5' : theme.palette.text.secondary}
        />
      }
    </IconButton>
  );

  const renderTableHeader = () => (
    <>
      {tableHeader?.map((header, idx) => {
        if (header.type === 'checkbox') {
          return (
            <MuiTableCell
              key={`table-header-${header.key}`}
              sx={callRowSx(header.sx, tableData[idx])}
            >
              <Checkbox
                id={`table-checkbox-header-${header.key}`}
                indeterminate={
                  selectedData &&
                  selectedData?.length > 0 &&
                  selectedData?.length < tableData.length
                }
                checked={
                  tableData.length > 0 &&
                  selectedData?.length === tableData.length
                }
                onChange={e => handleSelectAllChange(e, tableData)}
                disabled={header.isDisabled}
              />
            </MuiTableCell>
          );
        }

        const isActionHeader = header.type === 'action';

        return (
          <MuiTableCell
            key={`table-header-${header.key}`}
            sx={callRowSx(header.sx, tableData[idx])}
          >
            <TableSortLabel
              id={`table-header-${header.key}`}
              active={sortBy?.sort === header.key}
              direction={sortBy?.sort === header.key ? sortDirection : 'asc'}
              hideSortIcon={!header.sort}
              key={`${header.label}`}
              onClick={() => {
                if (header.sort) {
                  onSortChange(header.key);
                }
              }}
              sx={{
                display: 'flex',
                justifyContent: isActionHeader
                  ? 'center'
                  : (header.labelAlign ?? 'flex-start'),
                cursor: header.sort ? 'pointer' : 'default',
                pointerEvents: header.sort ? 'auto' : 'none',
              }}
            >
              {header.label}
            </TableSortLabel>
          </MuiTableCell>
        );
      })}
    </>
  );

  const renderTableCell = (
    data: Record<string, unknown>,
    index: number,
    header: TableHeader
  ) => {
    const rowId: string | number =
      (data as { id?: string | number })?.id ?? index;
    if (header.type === 'checkbox') {
      return (
        <MuiTableCell
          key={`table-cell-${header.key}`}
          sx={callRowSx(header.sx, tableData[index])}
        >
          <Checkbox
            id={`table-checkbox${index}`}
            color="primary"
            checked={isSelected?.(data) ?? false}
            onChange={() => handleSelectedCheckbox(data)}
            slotProps={{
              input: { 'aria-label': 'controlled' },
            }}
            disabled={header.isDisabled}
          />
          {collapseRender &&
            header === tableHeader[0] &&
            renderExpandButton(
              rowId,
              !!openCollapse[rowId],
              handleToggleCollapse
            )}
        </MuiTableCell>
      );
    }

    if (header.type === 'single-checkbox') {
      return (
        <MuiTableCell
          key={`table-cell-${header.key}`}
          sx={callRowSx(header.sx, tableData[index])}
        >
          <Checkbox
            id={`table-single-checkbox${index}`}
            checked={isSelected?.(data) ?? false}
            onChange={() => handleSelectedSingleCheckbox(data)}
            icon={
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: '15px',
                  border: `1px solid ${theme.palette.text.secondary}`,
                }}
              />
            }
            checkedIcon={
              <Icon
                icon={'solar:check-circle-bold'}
                style={{ fontSize: '22px' }}
                color={
                  header.isDisabled
                    ? theme.palette.text.secondary
                    : theme.palette.primary.main
                }
              />
            }
            disabled={header.isDisabled}
          />
          {collapseRender &&
            header === tableHeader[0] &&
            renderExpandButton(
              rowId,
              !!openCollapse[rowId],
              handleToggleCollapse
            )}
        </MuiTableCell>
      );
    }

    if (header.type === 'action') {
      const headerSxFromProps = callRowSx(header.sx, tableData[index]);
      const headerSx = {
        textAlign: 'center',
        ...headerSxFromProps,
      } as SxProps<Theme>;

      const actionOptions =
        typeof header.actionOptions === 'function'
          ? header.actionOptions(data)
          : (header.actionOptions ?? []);

      return (
        <MuiTableCell key={`action${index}`} padding="none" sx={headerSx}>
          <IconButton
            id={`table-action${index}`}
            onClick={e => handleClickActionMenu(e, actionOptions ?? [])}
            sx={{
              color: theme.palette.text.primary,
              borderRadius: 2,
              padding: 1,
            }}
            disabled={actionOptions.length === 0}
          >
            <Icon
              icon={'carbon:overflow-menu-horizontal'}
              style={{ fontSize: '24px' }}
            />
          </IconButton>
          <MenuComponent
            id={`table-menu${index}`}
            open={open}
            anchorEl={anchorElActionMenu}
            onClose={handleClose}
            items={itemDataActionMenu}
            onClick={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          />
        </MuiTableCell>
      );
    }

    if (header.render) {
      return (
        <MuiTableCell
          key={`table-cell-${header.key}`}
          sx={callRowSx(header.sx, tableData[index])}
        >
          {collapseRender &&
            header === tableHeader[0] &&
            renderExpandButton(
              rowId,
              !!openCollapse[rowId],
              handleToggleCollapse
            )}
          {header.render(data, index)}
        </MuiTableCell>
      );
    }

    return (
      <MuiTableCell
        id={`table-cell-${header.key}`}
        key={`table-cell-${header.key}`}
        sx={callRowSx(header.sx, tableData[index])}
      >
        {collapseRender &&
          header === tableHeader[0] &&
          renderExpandButton(
            rowId,
            !!openCollapse[rowId],
            handleToggleCollapse
          )}
        {data?.[header.key] as React.ReactNode}
        {header.type === 'number' && index + 1}
      </MuiTableCell>
    );
  };

  const getFlatHeaders = (headers: TableHeader[]): TableHeader[] => {
    const processHeader = (header: TableHeader): TableHeader[] => {
      if (header.children && header.children.length > 0) {
        return header.children.flatMap(child => processHeader(child));
      }
      return [header];
    };

    return headers.flatMap(h => processHeader(h));
  };

  const renderTableBody = () => (
    <MuiTableBody>
      {tableData.length < 1 && (
        <MuiTableRow>
          <MuiTableCell
            colSpan={100}
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                py: 10,
              }}
            >
              <Typography fontSize={'18px'} fontWeight={700}>
                No data
              </Typography>
            </Box>
          </MuiTableCell>
        </MuiTableRow>
      )}
      {tableData?.map((data, index) => {
        const rowId = (data?.id as string) ?? index;
        const isOpen = openCollapse[rowId] ?? false;
        const flatHeaders = getFlatHeaders(tableHeader);

        return (
          <React.Fragment key={`table-row-${rowId}`}>
            <MuiTableRow
              key={`table-row${rowId}`}
              sx={{
                '& > .MuiTableCell-root': {
                  borderBottom: collapseRender
                    ? 'none'
                    : `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              {flatHeaders.map(header => renderTableCell(data, index, header))}
            </MuiTableRow>

            {collapseRender && (
              <MuiTableRow>
                <MuiTableCell
                  colSpan={100}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    padding: '0px 15px 0px 15px',
                  }}
                >
                  <Collapse
                    id={`table-collapse${rowId}`}
                    key={`table-collapse${rowId}`}
                    in={isOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    {collapseRender(data, index)}
                  </Collapse>
                </MuiTableCell>
              </MuiTableRow>
            )}
          </React.Fragment>
        );
      })}
    </MuiTableBody>
  );

  const getColSpan = (header: TableHeader): number => {
    if (!header.children || header.children.length === 0) {
      return 1;
    }
    return header.children.reduce((acc, child) => acc + getColSpan(child), 0);
  };

  const processHeaderChildrenAtLevel = (
    headers: TableHeader[],
    level: number,
    currentLevel: number
  ): TableHeader[] => {
    const result: TableHeader[] = [];

    for (const header of headers) {
      if (header.children && header.children.length > 0) {
        if (currentLevel + 1 === level) {
          result.push(...header.children);
        } else {
          result.push(
            ...processHeaderChildrenAtLevel(
              header.children,
              level,
              currentLevel + 1
            )
          );
        }
      }
    }

    return result;
  };

  const getHeadersByLevel = (
    headers: TableHeader[],
    level: number,
    currentLevel: number = 1
  ): TableHeader[] => {
    if (currentLevel === level) {
      return headers;
    }
    return processHeaderChildrenAtLevel(headers, level, currentLevel);
  };

  const hasMultipleLevelHeaders = tableHeader.some(header => header.children);
  const secondLevelHeaders = getHeadersByLevel(tableHeader, 2);
  const thirdLevelHeaders = getHeadersByLevel(tableHeader, 3);

  const hasThirdLevelHeaders = thirdLevelHeaders.length > 0;
  const hasSecondLevelHeaders = secondLevelHeaders.length > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <MuiTableContainer sx={styTableContainer}>
        <MuiTable stickyHeader sx={{ minWidth: minWidth, maxWidth: maxWidth }}>
          <MuiTableHead sx={styTableHead}>
            {hasMultipleLevelHeaders ? (
              <>
                <MuiTableRow>
                  {tableHeader.map((header, idx) => {
                    const colspan = getColSpan(header);
                    const getRowSpan = () => {
                      if (header.children && header.children.length > 0) {
                        return 1;
                      }
                      if (hasThirdLevelHeaders) {
                        return 3;
                      }
                      if (hasSecondLevelHeaders) {
                        return 2;
                      }
                      return 1;
                    };
                    const rowspan = getRowSpan();

                    return (
                      <MuiTableCell
                        key={`parent-header-${header.key}`}
                        colSpan={colspan}
                        rowSpan={rowspan}
                        sx={{
                          ...callRowSx(header.sx, tableData[idx]),
                          cursor: header.sort ? 'pointer' : 'default',
                        }}
                        align={header.children ? 'center' : 'left'}
                      >
                        {header.sort && colspan === 1 ? (
                          <TableSortLabel
                            id={`table-header-${header.key}`}
                            active={sortBy?.sort === header.key}
                            direction={
                              sortBy?.sort === header.key
                                ? sortDirection
                                : 'asc'
                            }
                            hideSortIcon={!header.sort}
                            onClick={() => {
                              if (header.sort) {
                                onSortChange(header.key);
                              }
                            }}
                            sx={{
                              display: 'flex',
                              justifyContent: header.labelAlign ?? 'flex-start',
                              cursor: header.sort ? 'pointer' : 'default',
                              pointerEvents: header.sort ? 'auto' : 'none',
                            }}
                          >
                            {header.label?.toUpperCase()}
                          </TableSortLabel>
                        ) : (
                          header.label?.toUpperCase()
                        )}
                      </MuiTableCell>
                    );
                  })}
                </MuiTableRow>

                {hasSecondLevelHeaders && (
                  <MuiTableRow>
                    {secondLevelHeaders.map((child, idx) => {
                      const colspan = getColSpan(child);
                      const getRowspanForLevel2 = () => {
                        if (!child.children || child.children.length === 0) {
                          return hasThirdLevelHeaders ? 2 : 1;
                        }
                        return 1;
                      };
                      const rowspan = getRowspanForLevel2();

                      return (
                        <MuiTableCell
                          key={`child-header-2-${child.key}`}
                          colSpan={colspan}
                          rowSpan={rowspan}
                          sx={callRowSx(child.sx, tableData[idx])}
                          align={child.children ? 'center' : 'left'}
                        >
                          {child.sort && colspan === 1 ? (
                            <TableSortLabel
                              id={`table-header-2-${child.key}`}
                              active={sortBy?.sort === child.key}
                              direction={
                                sortBy?.sort === child.key
                                  ? sortDirection
                                  : 'asc'
                              }
                              hideSortIcon={!child.sort}
                              onClick={() => {
                                if (child.sort) {
                                  onSortChange(child.key);
                                }
                              }}
                              sx={{
                                display: 'flex',
                                justifyContent:
                                  child.labelAlign ?? 'flex-start',
                                cursor: child.sort ? 'pointer' : 'default',
                                pointerEvents: child.sort ? 'auto' : 'none',
                              }}
                            >
                              {child.label?.toUpperCase()}
                            </TableSortLabel>
                          ) : (
                            child.label?.toUpperCase()
                          )}
                        </MuiTableCell>
                      );
                    })}
                  </MuiTableRow>
                )}

                {hasThirdLevelHeaders && (
                  <MuiTableRow>
                    {thirdLevelHeaders.map((child, idx) => (
                      <MuiTableCell
                        key={`child-header-3-${child.key}`}
                        sx={callRowSx(child.sx, tableData[idx])}
                      >
                        <TableSortLabel
                          id={`table-header-3-${child.key}`}
                          active={sortBy?.sort === child.key}
                          direction={
                            sortBy?.sort === child.key ? sortDirection : 'asc'
                          }
                          hideSortIcon={!child.sort}
                          onClick={() => {
                            if (child.sort) {
                              onSortChange(child.key);
                            }
                          }}
                          sx={{
                            display: 'flex',
                            justifyContent: child.labelAlign ?? 'flex-start',
                            cursor: child.sort ? 'pointer' : 'default',
                            pointerEvents: child.sort ? 'auto' : 'none',
                          }}
                        >
                          {child.label?.toUpperCase()}
                        </TableSortLabel>
                      </MuiTableCell>
                    ))}
                  </MuiTableRow>
                )}
              </>
            ) : (
              <MuiTableRow>{renderTableHeader()}</MuiTableRow>
            )}
          </MuiTableHead>

          {isLoading ? renderLoading() : renderTableBody()}
        </MuiTable>
      </MuiTableContainer>

      {renderPagination && !isLoading && tableData.length >= 1 && (
        <Box
          sx={{
            py: 1,
            px: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `0 0 ${borderRadius} ${borderRadius}`,
            backgroundColor: theme.palette.background.paper,
            borderWidth: '0px 1px 1px 1px',
          }}
        >
          <PaginationComponent
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handlePageSizeChange}
            totalData={totalData}
          />
        </Box>
      )}
    </Box>
  );
};

export default TableComponent;
