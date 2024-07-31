import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const LoginPage = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Center vertically
                padding: 2,
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    boxShadow: 1,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{ marginBottom: 2 }} // Margin between fields
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{ marginBottom: 2 }} // Margin between fields
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default LoginPage;
