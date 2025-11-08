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
    Chip,
    IconButton,
    Tooltip,
    Stack,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import './Goals.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/Api';

const Goal = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [goals, setGoals] = useState([]);

    const [editing, setEditing] = useState({
        isEditing: false,
        record: null,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            steps: null,
            date: '',
            waterIntake: '',
            email: ''
        },
    });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/goals`);
            setGoals(response?.data ?? []);
        } catch (error) {
            console.error(error);
            alert('Error fetching goals');
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setEditing({ isEditing: false, record: null });
        reset({ steps: null, date: '', waterIntake: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const getNextId = () => {
        if (!goals || goals.length === 0) return 1;
        const maxId = goals.reduce((max, a) => (Number(a.id) > max ? Number(a.id) : max), 0);
        return maxId + 1;
    };

    const onSubmit = async (data) => {
        try {
            if (editing.isEditing && editing.record) {
                const payload = {
                    ...editing.record,
                    ...data,
                    date: data.date, // keep as YYYY-MM-DD
                };
                const res = await axios.put(`${API_BASE_URL}/goals/${editing.record.id}`, payload);
                if (!res) {
                    alert('Error updating appointment');
                    return;
                }
            } else {
                // CREATE with client-generated id (json-server)
                const newGoal = {
                    id: getNextId(),
                    ...data,
                    status: 'scheduled',
                    date: data.date,
                };
                const res = await axios.post(`${API_BASE_URL}/goals`, newGoal);


                let patientGoals = await axios.get(`${API_BASE_URL}/appointments`);
                patientGoals = patientGoals?.data?.map(e => e.email === newGoal.email) || [];
                if (patientGoals) {
                    const patientGoal = patientGoals.find(e => e.date === newGoal.date);
                    console.log(patientGoal)
                    const newAppointment = {
                        ...patientGoal,
                        status: 'Achieved',
                    };
                    const res = await axios.patch(`${API_BASE_URL}/appointments/${patientGoal.id}`, newAppointment);

                }
            }
            await fetchGoals();
            handleCloseDialog();
        } catch (error) {
            console.error(error);
            alert(editing.isEditing ? 'Error updating appointment' : 'Error adding appointment');
        }
    };

    const handleEdit = (appt) => {
        const dateForInput = (() => {
            if (!appt?.date) return '';
            if (/^\d{4}-\d{2}-\d{2}$/.test(appt.date)) return appt.date;
            try {
                return format(new Date(appt.date), 'yyyy-MM-dd');
            } catch {
                return '';
            }
        })();

        setEditing({ isEditing: true, record: appt });
        reset({
            steps: appt.steps,
            date: dateForInput,
            waterIntake: appt.waterIntake || '',
            email: appt.email || ''
        });
        setOpenDialog(true);
    };

    const handleDelete = async (appt) => {
        const ok = window.confirm(
            `Delete appointment with Dr. ${appt.steps} on ${(() => {
                try {
                    return format(new Date(appt.date), 'MMM dd, yyyy');
                } catch {
                    return appt.date;
                }
            })()}?`
        );
        if (!ok) return;

        try {
            const res = await axios.delete(`${API_BASE_URL}/goals/${appt.id}`);
            if (!res) {
                alert('Error deleting appointment');
                return;
            }
            // Optimistic local update
            setGoals((prev) => prev.filter((a) => a.id !== appt.id));
        } catch (error) {
            console.error(error);
            alert('Error deleting appointment');
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
        <div className="goals">
            <Grid container className="goals__header" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <h2 className="goals__header-title">Goals</h2>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
                        Add Goal
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} className="goals__table">
                <Table>
                    <TableHead>
                        <TableRow className="goals__table-header">
                            <TableCell>Steps</TableCell>
                            <TableCell>Water Intake</TableCell>
                            <TableCell>Date</TableCell>

                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goals
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((appointment) => (
                                <TableRow key={appointment.id} className="goals__table-row">
                                    <TableCell className="goals__table-cell">{appointment.steps}</TableCell>
                                    <TableCell className="goals__table-cell">{appointment.waterIntake}</TableCell>
                                    <TableCell className="goals__table-cell">
                                        {(() => {
                                            try {
                                                return format(new Date(appointment.date), 'MMM dd, yyyy');
                                            } catch {
                                                return appointment.date;
                                            }
                                        })()}
                                    </TableCell>
                                    {/* <TableCell className="goals__table-cell">
                                        <Chip
                                            label={appointment.status}
                                            color={getStatusChipColor(appointment.status)}
                                            className={`goals__table-status goals__table-status--${appointment.status}`}
                                        />
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Tooltip title="Edit">
                                                <IconButton size="small" onClick={() => handleEdit(appointment)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton size="small" onClick={() => handleDelete(appointment)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={goals.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth className="appointment-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle className="appointment-form__title">
                        {editing.isEditing ? 'Edit Goal' : 'Add New Goal'}
                    </DialogTitle>
                    <DialogContent className="appointment-form__content">

                        <Controller
                            name="steps"
                            control={control}
                            rules={{ required: 'Steps is required' }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Steps"
                                        type='number'
                                        fullWidth
                                        error={!!errors.steps}
                                        helperText={errors.steps?.message}
                                    />
                                </div>
                            )}
                        />



                        <Controller
                            name="waterIntake"
                            control={control}
                            rules={{ required: 'Water Intake is required' }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Water Intake"
                                        type='number'
                                        fullWidth
                                        error={!!errors.waterIntake}
                                        helperText={errors.waterIntake?.message}
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
                                },
                            }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Goal Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                        error={!!errors.date}
                                        helperText={errors.date?.message}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required' }}
                            render={({ field }) => (
                                <div className="appointment-form__field">
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type='email'
                                        fullWidth
                                        error={!!errors.steps}
                                        helperText={errors.steps?.message}
                                    />
                                </div>
                            )}
                        />
                    </DialogContent>
                    <DialogActions className="appointment-form__actions">
                        <Button onClick={handleCloseDialog} color="inherit">
                            Cancel
                        </Button>
                        <Button type=" " variant="contained" color="primary">
                            {editing.isEditing ? 'Save Changes' : 'Add Goal'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Goal;
