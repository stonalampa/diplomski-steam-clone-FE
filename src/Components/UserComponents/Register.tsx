import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import { useRegisterUserMutation } from '../../providers/UsersProvider';

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [register, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    dateOfBirth: Yup.string().required('Required'),
    fullName: Yup.string().required('Required'),
    cardNumber: Yup.string().required('Required'),
    expirationDate: Yup.string().required('Required'),
    cvc: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      dateOfBirth: '',
      fullName: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: async (data, { resetForm }) => {
      try {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...dataWithoutDoublePasswords } = data;
        const response = await register(dataWithoutDoublePasswords);

        if ('error' in response) {
          enqueueSnackbar('User registration failed!', { variant: 'error' });
        } else {
          enqueueSnackbar('User registered successfully!', { variant: 'success' });
        }
        resetForm();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
        resetForm();
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth='sm'>
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h4' align='center'>
                Register
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email'
                fullWidth
                margin='normal'
                required
                id='email'
                autoComplete='email'
                {...formik.getFieldProps('email')}
                error={formik.touched.email && formik.errors.email ? true : false}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Username'
                fullWidth
                margin='normal'
                required
                id='username'
                autoComplete='username'
                {...formik.getFieldProps('username')}
                error={formik.touched.username && formik.errors.username ? true : false}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                fullWidth
                margin='normal'
                required
                id='password'
                autoComplete='password'
                type={showPassword ? 'text' : 'password'}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Confirm password'
                fullWidth
                margin='normal'
                required
                id='confirmPassword'
                autoComplete='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                {...formik.getFieldProps('confirmPassword')}
                error={
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false
                }
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword((prevShowPassword) => !prevShowPassword)
                        }
                        edge='end'
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label='Date of birth'
                value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
                onChange={(date) => formik.setFieldValue('dateOfBirth', date?.toISOString() ?? '')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Full name'
                fullWidth
                margin='normal'
                required
                id='fullName'
                autoComplete='fullName'
                {...formik.getFieldProps('fullName')}
                error={formik.touched.fullName && formik.errors.fullName ? true : false}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Card number'
                fullWidth
                margin='normal'
                required
                id='cardNumber'
                autoComplete='cardNumber'
                {...formik.getFieldProps('cardNumber')}
                error={formik.touched.cardNumber && formik.errors.cardNumber ? true : false}
                helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='Expiration date'
                value={formik.values.expirationDate ? dayjs(formik.values.expirationDate) : null}
                onChange={(date) =>
                  formik.setFieldValue('expirationDate', date?.toISOString() ?? '')
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='CVC'
                fullWidth
                margin='normal'
                type='number'
                required
                id='cvc'
                autoComplete='cvc'
                {...formik.getFieldProps('cvc')}
                error={formik.touched.cvc && formik.errors.cvc ? true : false}
                helperText={formik.touched.cvc && formik.errors.cvc}
              />
            </Grid>
          </Grid>
          <Button type='submit'>{isLoading ? <CircularProgress size={20} /> : 'Register'}</Button>
          <Button href={'/home'}>
            {isLoading ? <CircularProgress size={20} /> : 'Go to landing page'}
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
