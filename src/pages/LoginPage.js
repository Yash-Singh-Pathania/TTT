import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
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
        <Container>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="username" label="Username" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </Container>
    );
};

export default LoginPage;
