import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { userState } from '../../store/user/selectors/userSelector';
import { useGetUserDataQuery, useUpdateUserProfileMutation } from '../../providers/UsersProvider';
import { FormInitialValues } from './UserTypes';
import { dispatch } from '../../store/store';
import { setUserState } from '../../store/user/slices/user';

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateUser] = useUpdateUserProfileMutation();
  const user = useSelector(userState);
  const { data: userData, refetch } = useGetUserDataQuery(user.id);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    name: Yup.string().required('Required'),
    dateOfBirth: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
  });

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const formik = useFormik({
    initialValues: { ...user, confirmPassword: user.password } as FormInitialValues,
    validationSchema,
    onSubmit: async (data) => {
      setIsLoading(true);
      const response = await updateUser(data);
      if ('error' in response) {
        enqueueSnackbar('Updating user failed!', { variant: 'error' });
      } else {
        await refetch();
        if (!userData?.user) {
          enqueueSnackbar('Refetching user failed!', { variant: 'error' });
        } else {
          enqueueSnackbar('User updated successfully!', { variant: 'success' });
        }
      }

      handleIsEditing();
      setIsLoading(false);
    },
  });

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: 'white',
          boxShadow: 24,
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          User profile
        </Typography>
        {!isEditing ? (
          <Button variant='outlined' color='primary' onClick={handleIsEditing}>
            Edit
          </Button>
        ) : (
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              handleIsEditing();
              formik.resetForm();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            autoComplete='username'
            {...formik.getFieldProps('username')}
            error={formik.touched.username && formik.errors.username ? true : false}
            helperText={formik.touched.username && formik.errors.username}
            disabled={!isEditing}
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
            disabled={!isEditing}
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
          <TextField
            label='Confirm password'
            fullWidth
            margin='normal'
            required
            id='confirmPassword'
            autoComplete='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            disabled={!isEditing}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowConfirmPassword((prevShowPassword) => !prevShowPassword)}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
            disabled={!isEditing}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Full name'
            autoComplete='name'
            {...formik.getFieldProps('name')}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name}
            disabled={!isEditing}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Date of birth'
              value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
              onChange={(date) => formik.setFieldValue('dateOfBirth', date?.toISOString() ?? '')}
              disabled={!isEditing}
            />
          </LocalizationProvider>
          <Button variant='contained' color='primary' type='submit' disabled={!isEditing}>
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
