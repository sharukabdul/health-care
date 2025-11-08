import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import './Appointment.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/Api';

const Appointment = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            doctorName: '',
            date: '',
            diseaseName: '',
        }
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(API_BASE_URL + '/appointments');
            if (response) {
                setAppointments(response.data ?? []);
            } else {
                alert("Error fetching appointments");
            }
        } catch (error) {
            alert('Error fetching appointments:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        reset();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const onSubmit = async (data) => {
        const newAppointment = {
            id: appointments.length + 1,
            ...data
        };
        try {
            const res = await axios.post(API_BASE_URL + '/appointments', newAppointment);
            if (!res) {
                alert("Error adding appointment");
            }
            fetchAppointments();
            handleCloseDialog();
        } catch (error) {
            alert("Error adding appointment", error);
        }


    };

    const getStatusChipColor = (status) => {
        switch (status) {
            case 'scheduled':
                return 'primary';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <div className="appointments">
            <Grid container className="appointments__header">
                <Grid item>
                    <h2 className="appointments__header-title">Appointments</h2>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                    >
                        Add Appointment
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} className="appointments__table">
                <Table>
                    <TableHead>
                        <TableRow className="appointments__table-header">
                            <TableCell>Doctor Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Disease</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((appointment) => (
                                <TableRow key={appointment.id} className="appointments__table-row">
                                    <TableCell className="appointments__table-cell">
                                        {appointment.doctorName}
                                    </TableCell>
                                    <TableCell className="appointments__table-cell">
                                        {format(new Date(appointment.date), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell className="appointments__table-cell">
                                        {appointment.diseaseName}
                                    </TableCell>
                                    <TableCell className="appointments__table-cell">
                                        <Chip
                                            label={appointment.status}
                                            color={getStatusChipColor(appointment.status)}
                                            className={`appointments__table-status appointments__table-status--${appointment.status}`}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                className="appointment-form"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle className="appointment-form__title">
                        Add New Appointment
                    </DialogTitle>
                    <DialogContent className="appointment-form__content">
                        <Controller
                            name="doctorName"
                            control={control}
                            rules={{ required: 'Doctor name is required' }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Doctor Name"
                                        fullWidth
                                        error={!!errors.doctorName}
                                        helperText={errors.doctorName?.message}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                required: 'Date is required',
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return selectedDate >= today || 'Cannot select a past date';
                                }
                            }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Appointment Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{
                                            min: new Date().toISOString().split('T')[0]
                                        }}
                                        error={!!errors.date}
                                        helperText={errors.date?.message}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name="diseaseName"
                            control={control}
                            rules={{ required: 'Disease name is required' }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Disease Name"
                                        fullWidth
                                        error={!!errors.diseaseName}
                                        helperText={errors.diseaseName?.message}
                                    />
                                </div>
                            )}
                        />


                    </DialogContent>
                    <DialogActions className="appointment-form__actions">
                        <Button onClick={handleCloseDialog} color="inherit">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add Appointment
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Appointment;
