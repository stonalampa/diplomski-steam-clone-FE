import * as Yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useAuthContext } from '../AuthComponents/useAuthContext';

const theme = createTheme();
theme.typography.h1 = {
  fontSize: '1.5rem',
  fontWeight: 500,
  lineHeight: '1.2',
  letterSpacing: '0.025em',
};

export default function AdminLogin() {
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(
          {
            email: values.email,
            password: values.password,
          },
          true,
        );
        // navigate('/admin/home');
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
        resetForm();
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h1'>
            Admin sign in
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              {...formik.getFieldProps('email')}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password ? true : false}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
