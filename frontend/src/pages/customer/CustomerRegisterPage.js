// src/pages/customer/CustomerRegisterPage.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../api/authApi";  // API call

export default function CustomerRegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // ✅ Call backend API
            await registerCustomer({ name, email, password });

            // ✅ Show success message
            setSuccess("Registration successful! Redirecting to login...");

            // ✅ Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate("/customer-login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Customer Sign Up
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/customer-login">Login</Link>
                </Typography>
            </Paper>
        </Box>
    );
}
