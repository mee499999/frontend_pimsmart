import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CustomColumnDialog from '@/components/CustomColumnDialog';

interface DataTableProps {
  rows: any[]; // Define a more specific type if possible
  initialColumns: GridColDef[];
}

const DataAdminTable: React.FC<DataTableProps> = ({ rows, initialColumns }) => {
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

  // Custom toolbar with the button
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        onClick={handleOpenDialog}
        variant="outlined"
        startIcon={<AppRegistrationIcon />}
        sx={{ marginBottom: 2 }}
      >
        Customize Columns
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        components={{ Toolbar: CustomToolbar }} // Use the custom toolbar
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

export default DataAdminTable;
