'use client';

import { Paper } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridPaginationModel
} from '@mui/x-data-grid';

type TableComponentProps<T> = {
  columns: GridColDef[];
  rows: T[];
  paginationActive?: boolean;
  pageSize: number;
  page?: number; // Optional page prop for controlled pagination
  setPage?: (newPage: number) => void;
  setPageSize: (newSize: number) => void;
  rowHeight?: number;
  showCheckbox?: boolean;
  loading?: boolean;
  headerStyle?: {
    backgroundColor?: string;
    fontWeight?: string | number;
  };
  onRowClick?: (params: GridRowParams) => void;
};

export default function MuiTableComponent<T>({
  columns,
  rows,
  pageSize,
  setPageSize,
  paginationActive,
  page = 0, // Default to 0 if not provided
  setPage,
  rowHeight,
  showCheckbox,
  headerStyle,
  loading = false,
  onRowClick
}: TableComponentProps<T>) {
  const handlePaginationChange = (model: GridPaginationModel) => {
    if (setPage) {
      return setPage(model.page); // update page
    }
    setPageSize(model.pageSize); // update page size
  };

  const handleRowClick = (params: GridRowParams) => {
    onRowClick?.(params);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Paper className="w-full min-w-[600px] overflow-hidden">
        <div style={{ height: 400, width: '100%', overflowX: 'auto' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={[5, 10, 20, 50]}
            checkboxSelection={showCheckbox}
            disableColumnFilter
            disableColumnMenu
            disableRowSelectionOnClick
            rowHeight={rowHeight}
            onRowClick={handleRowClick}
            loading={loading}
            pagination={paginationActive ? true : undefined}
            sx={{
              border: 0,
              paddingLeft: 2,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: headerStyle?.backgroundColor ?? 'transparent'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: headerStyle?.fontWeight ?? 'normal'
              },
              '& .MuiDataGrid-row': {
                cursor: `${onRowClick && 'pointer'}`
              }
            }}
          />
        </div>
      </Paper>
    </div>
  );
}
