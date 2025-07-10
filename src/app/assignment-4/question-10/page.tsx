'use client';

import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '@/context/ThemeProvider';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const FormWithValidation: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert('Form submitted successfully!');
      setSubmitSuccess(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: theme === 'light' ? '#fff' : '#000',
      }}
    >
      <Typography variant="h5" mb={2}>
        Registration Form
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Submit
      </Button>
    </Box>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <FormWithValidation />
    </ThemeProvider>
  );
};

export default App;
