import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CustomColumnDialog from './CustomColumnDialog'; // Adjust the import path as necessary

interface DataTableProps {
  rows: any[]; // Define a more specific type if possible
  initialColumns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ rows, initialColumns }) => {
  const [columns, setColumns] = useState<GridColDef[]>(initialColumns);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmColumns = (newColumns: GridColDef[], hiddenColumns: string[]) => {
    setColumns(newColumns.filter(col => !hiddenColumns.includes(col.field))); // Update columns based on visibility
    handleCloseDialog();
  };

  // Pagination settings
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Button onClick={handleOpenDialog} variant="outlined" sx={{ marginBottom: 2 }}>
        Customize Columns
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <CustomColumnDialog
        open={openDialog}
        columns={initialColumns}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmColumns}
      />
    </Paper>
  );
};

export default DataTable;
