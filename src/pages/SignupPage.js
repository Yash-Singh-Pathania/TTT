import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/authSlice';

const SignupPage = () => {
    const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(form));
    };

    return (
        <Container>
            <Typography variant="h4">Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="email" label="Email" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="firstName" label="First Name" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="lastName" label="Last Name" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
            </form>
        </Container>
    );
};

export default SignupPage;
