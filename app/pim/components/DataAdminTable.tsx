import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CustomColumnDialog from '@/components/CustomColumnDialog';

// Define the type for pagination model
interface PaginationModel {
  page: number;
  pageSize: number;
}

interface DataTableProps {
  rows: any[]; // Define a more specific type if possible
  rowCount: number; 
  initialColumns: GridColDef[];
  paginationModel: PaginationModel; // Add this line
  onPaginationModelChange: (model: PaginationModel) => void; // Add this line
}

const DataAdminTable: React.FC<DataTableProps> = ({ rows, initialColumns,rowCount, paginationModel, onPaginationModelChange }) => {
  const [columns, setColumns] = useState<GridColDef[]>(initialColumns);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmColumns = (newColumns: GridColDef[], hiddenColumns: string[]) => {
    setColumns(newColumns.filter(col => !hiddenColumns.includes(col.field))); // Update columns based on visibility
    handleCloseDialog();
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    onPaginationModelChange({ page: 0, pageSize: newPageSize }); // Reset to page 0 when page size changes
  };

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
    <Paper sx={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel} // Use paginationModel here
        rowCount={rowCount} // Use the rowCount prop here
        pageSizeOptions={[5, 10]} // Add pageSizeOptions here
        onPaginationModelChange={onPaginationModelChange} // Pass the pagination model change handler
        checkboxSelection
        pagination
        slots={{ toolbar: CustomToolbar }}
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
