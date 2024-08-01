// src/pages/SignupPage.js
import React, { useState, useMemo, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchOrganizations } from '../services/api';
import debounce from 'lodash.debounce'; // Import debounce utility
import EmojiBackground from '../components/EmojiBackground'; // Import the new EmojiBackground component

const SignupPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [form, setForm] = useState({ email: '', first_name: '', last_name: '', password: '', org: '', username: '' });
    const [organizationOptions, setOrganizationOptions] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Debounced function to fetch organizations
    const fetchOrganizationsDebounced = useMemo(() => debounce(async (name) => {
        try {
            const response = await fetchOrganizations(name);
            if (response.data) {
                setOrganizationOptions(response.data.map(org => ({
                    id: org.id,
                    name: org.name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
                })));
            } else {
                setOrganizationOptions([]);
            }
        } catch {
            setOrganizationOptions([]);
        }
    }, 300), []); // Debounce for 300ms

    useEffect(() => {
        if (form.org.length >= 3) {
            fetchOrganizationsDebounced(form.org);
        } else {
            setOrganizationOptions([]);
        }
    }, [form.org, fetchOrganizationsDebounced]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
        if (name === 'org') {
            setSelectedOrganization(null);
        }
    };

    const handleOrganizationChange = (event, value) => {
        setSelectedOrganization(value);
        setForm(prevForm => ({
            ...prevForm,
            org: value ? value.name : ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
            password: form.password,
            ...(selectedOrganization ? { organization_id: selectedOrganization.id } : { org: form.org })
        };
        dispatch(signup(payload))
            .unwrap()
            .then(() => {
                navigate('/login');
            })
            .catch(() => {
                setOpenSnackbar(true); // Show snackbar on error
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                backgroundColor: 'white',
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <EmojiBackground /> {/* Use the imported EmojiBackground component */}
            <Box
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                    width: '100%',
                    maxWidth: '600px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        value={form.email}
                        fullWidth
                        margin="normal"
                    />
                    <Autocomplete
                        options={organizationOptions}
                        getOptionLabel={(option) => option.name}
                        value={selectedOrganization}
                        onChange={handleOrganizationChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Organization"
                                onChange={handleChange}
                                name="org"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <TextField
                        name="first_name"
                        label="First Name"
                        onChange={handleChange}
                        value={form.first_name}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        onChange={handleChange}
                        value={form.last_name}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange}
                        value={form.username}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        value={form.password}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Button
                    onClick={handleLoginRedirect}
                    variant="outlined"
                    sx={{ mt: 2, display: 'block', textAlign: 'center' }}
                >
                    Have an account? Login
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message="Signup failed"
                autoHideDuration={6000}
            />
        </Container>
    );
};

export default SignupPage;
