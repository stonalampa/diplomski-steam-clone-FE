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
  Card,
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
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
        resetForm();
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Card
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5) ',
          maxWidth: '800px',
          width: '100%',
          p: 4,
          margin: '0 auto',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'white', color: 'black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h3'>
          Admin sign in
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3, textAlign: 'center' }}
        >
          <Box sx={{ padding: '15px 0' }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              sx={{
                '& input': {
                  backgroundColor: 'transparent',
                },
                '& fieldset': {
                  borderColor: 'white',
                  backgroundColor: 'transparent',
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'white',
                },
              }}
              inputProps={{
                style: {
                  color: 'white',
                  borderColor: 'white',
                },
              }}
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
              sx={{
                '& fieldset': {
                  borderColor: 'white',
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'white',
                },
              }}
              inputProps={{
                style: {
                  color: 'white',
                  borderColor: 'white',
                },
              }}
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password ? true : false}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button type='submit' variant='outlined' color='inherit'>
            Sign In
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
