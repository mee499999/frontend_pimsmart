import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../../components/DataAdminTable';
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CustomTabCards from '@/app/register/components/CustomTabCards';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { Student } from '@/types/Register';

// Define your columns and data
const initialColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'faculty', headerName: 'Faculty', width: 150 },
    { field: 'year', headerName: 'Year', width: 110 },
];

const initialData = [
    { id: 1, name: 'John Doe', faculty: 'Engineering', year: '2' },
    { id: 2, name: 'Jane Smith', faculty: 'Science', year: '3' },
    { id: 3, name: 'Robert Brown', faculty: 'Arts', year: '1' },
];


const Register:    React.FC = () => {
    const formMethods = useForm<Student>();
    const { handleSubmit, register, formState: { errors } } = formMethods;


    const [open, setOpen] = useState(false);

    // Handler function for creating a new student
    const handleCreateStudent = () => {
        setOpen(true);
    };

    // Handler function for closing the dialog
    const handleClose = () => {
        setOpen(false);
        formMethods.reset(); // Reset the form when closing the dialog
    };

    // Handler function for submitting the form
    const onSubmit = (data: Student) => {
        // Implement your logic to handle the new student creation here
        console.log('Creating student:', data);

        // Close dialog after submission
        setOpen(false);
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <h1>Register</h1>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateStudent}
                >
                    Create
                </Button>
            </Grid>
            <Grid item xs={12}>
                <DataTable
                    rows={initialData} // Pass the mock student data
                    initialColumns={initialColumns} // Pass the column structure
                />
            </Grid>

            {/* Dialog for creating a new student */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Create New Student</DialogTitle>
                <DialogContent>
                    <FormProvider {...formMethods}>
                        {/* <form onSubmit={handleSubmit(onSubmit)}                        > */}
                            <CustomTabCards formMethods={formMethods} />
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                {/* <Button type="submit" color="primary">
                                    Create
                                </Button> */}
                            </DialogActions>
                        {/* </form> */}
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default Register;
