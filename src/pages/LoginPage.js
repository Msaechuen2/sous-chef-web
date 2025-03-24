import React, { useState } from 'react';
import { Box, Container, Typography, Button, TextField, Link, Grid, Paper } from '@mui/material';
import { useAuth } from '../providers/AuthContextProvider';
import { ChefHatLogo } from '../components/ChefHatLogo';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
  const [input, setInput] = useState({ username: '', password: '' });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username && input.password) {
      auth.loginAction(input);
    } else {
      alert("Please provide a valid input.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Logo and Brand Name at Top Left, Linked to Homepage */}
      <Box
        component={RouterLink}
        to="/home"
        sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 5, textDecoration: 'none', color: 'inherit' }}
      >
        <ChefHatLogo />
        <Typography variant="h4" fontWeight="bold" sx={{ ml: 1, fontFamily: 'Roboto, sans-serif' }}>
          Sous Chef
        </Typography>
      </Box>

      {/* Main Content with Left and Right Sections */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        {/* Left Section - Welcome Message */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold" sx={{ color: 'black', mb: 3 }}>
              Welcome to Sous Chef
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Your personal cooking assistant, here to make meal planning and recipe discovery easy and enjoyable.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
              Join us to explore a world of recipes, plan your meals, and get personalized cooking advice!
            </Typography>
          </Box>
        </Grid>

        {/* Right Section - Login Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
            <form onSubmit={handleSubmitEvent}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#333' }}>
                Log in to Sous Chef
              </Typography>
              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleInput}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleInput}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, backgroundColor: '#ff6347' }}>
                Login
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
                Don't have an account?{' '}
                <Link onClick={() => navigate('/register')} sx={{ color: '#ff6347', cursor: 'pointer' }}>
                  Sign up
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
