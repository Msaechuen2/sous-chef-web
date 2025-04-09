import React, { useState } from 'react';
import { Box, Container, Typography, Button, TextField, Link, Grid, Paper, Alert } from '@mui/material';
import { useAuth } from '../providers/AuthContextProvider';
import { ChefHatLogo } from '../components/ChefHatLogo';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const RegisterPage = () => {
  const [input, setInput] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleRegisterEvent = async (e) => {
    e.preventDefault();
    if (input.username && input.password && input.email) {
      try {
        await auth.registerAction(input);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
            <Box sx={{ p: 5, textAlign: 'center' }}>
             <Typography variant="h2" fontWeight="bold" sx={{ color: 'black', mb: 3 }}>
               Join Sous Chef
             </Typography>
             <Typography variant="h6" color="text.secondary">
               Discover, plan, and enjoy cooking with ease!
             </Typography>
             <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
               Sign up to access personalized recipes, meal planning tools, and exclusive culinary tips!
             </Typography>
           </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
            <form onSubmit={handleRegisterEvent}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#333' }}>
                Create an Account
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleInput}
              />
              <TextField
                label="Email"
                name="email"
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
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link onClick={() => navigate('/login')} sx={{ color: '#ff6347', cursor: 'pointer' }}>
                  Log in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;