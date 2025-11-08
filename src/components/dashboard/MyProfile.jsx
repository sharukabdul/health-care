// src/components/dashboard/MyProfile.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  Stack,
  TextField,
  IconButton,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const API = 'http://localhost:4000/user'; // json-server single resource (optional)

export default function MyProfile() {
  // initial static data (used if API is not present)
  const initialUser = {
    name: 'David Johnson',
    email: 'david.johnson@example.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '15 Mar 1995',
    bloodGroup: 'O+',
    height: '5\'10"',
    weight: '72 kg',
    address: '12, Green Park Avenue, Bengaluru, India',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
  };

  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true); // initial load (try fetch API)
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });

  // load from API if available; otherwise use initialUser
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          // API not present or returned non-200; use initialUser
          if (mounted) setUser(initialUser);
        } else {
          const data = await res.json();
          // json-server may return object or array; handle both
          const u = data && !Array.isArray(data) ? data : (Array.isArray(data) ? data[0] : data);
          if (mounted && u) setUser({ ...initialUser, ...u });
        }
      } catch (err) {
        // network error -> keep initialUser
        if (mounted) setUser(initialUser);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // open editor and prefill form
  function handleEditClick() {
    setForm({ ...user });
    setEditing(true);
  }

  // cancel edits
  function handleCancel() {
    setForm({ ...user });
    setEditing(false);
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // Save: try PATCH to API; fallback to local update
  async function handleSave() {
    // basic client-side validation
    if (!form.name?.trim() || !form.email?.trim()) {
      setSnack({ open: true, severity: 'error', message: 'Please fill required fields: name & email' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(API, {
        method: 'PATCH', // best-effort; json-server supports PATCH/PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        // server returned updated object
        const updated = await res.json().catch(() => form);
        setUser(prev => ({ ...prev, ...updated }));
        setForm(prev => ({ ...prev, ...updated }));
        setEditing(false);
        setSnack({ open: true, severity: 'success', message: 'Profile updated successfully' });
      } else {
        // fallback: update local state but show warning
        setUser(prev => ({ ...prev, ...form }));
        setEditing(false);
        setSnack({ open: true, severity: 'warning', message: 'Saved locally (server returned error)' });
      }
    } catch (err) {
      // network error: update locally and notify
      setUser(prev => ({ ...prev, ...form }));
      setEditing(false);
      setSnack({ open: true, severity: 'warning', message: 'No server — changes saved locally' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 4 }}>
        My Profile
      </Typography>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
            <Avatar
              src={form.avatar || user.avatar}
              alt={form.name || user.name}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {/* Full name */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Full name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                    required
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Full name</Typography>
                    <Typography variant="body1">{user.name}</Typography>
                  </>
                )}
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    fullWidth
                    required
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </>
                )}
              </Grid>

              {/* Phone */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">{user.phone}</Typography>
                  </>
                )}
              </Grid>

              {/* DOB */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Date of Birth"
                    value={form.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
                    <Typography variant="body1">{user.dob}</Typography>
                  </>
                )}
              </Grid>

              {/* Gender */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Gender"
                    value={form.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Gender</Typography>
                    <Typography variant="body1">{user.gender}</Typography>
                  </>
                )}
              </Grid>

              {/* Blood Group */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Blood Group"
                    value={form.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Blood Group</Typography>
                    <Typography variant="body1">{user.bloodGroup}</Typography>
                  </>
                )}
              </Grid>

              {/* Height */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Height"
                    value={form.height}
                    onChange={(e) => handleChange('height', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Height</Typography>
                    <Typography variant="body1">{user.height}</Typography>
                  </>
                )}
              </Grid>

              {/* Weight */}
              <Grid item xs={12} sm={6}>
                {editing ? (
                  <TextField
                    label="Weight"
                    value={form.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
                    <Typography variant="body1">{user.weight}</Typography>
                  </>
                )}
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                {editing ? (
                  <TextField
                    label="Address"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                    <Typography variant="body1">{user.address}</Typography>
                  </>
                )}
              </Grid>

              {/* Actions */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  {!editing ? (
                    <IconButton onClick={handleEditClick} color="primary" aria-label="edit profile">
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={handleCancel}
                        disabled={saving}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Contact Details card (mirrors above but editable for future use) */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Contact Details
          </Typography>
          <IconButton onClick={() => { setEditing(true); setForm({ ...user }); }}>
            <EditIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">Address</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{user.address}</Typography>

        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Paper>

      {/* Health Information */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Health Information
          </Typography>
          <IconButton onClick={() => { setEditing(true); setForm({ ...user }); }}>
            <EditIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Height</Typography>
            <Typography variant="body1">{user.height}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
            <Typography variant="body1">{user.weight}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
