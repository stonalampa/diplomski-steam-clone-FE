import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  CircularProgress,
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
    <Box
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
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          User profile
        </Typography>

        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            autoComplete='username'
            sx={{
              '& input': {
                backgroundColor: 'transparent',
              },
              '& fieldset': {
                borderColor: 'white',
                backgroundColor: 'transparent',
              },
              '& .Mui-disabled': {
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
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
            sx={{
              '& input': {
                backgroundColor: 'transparent',
                color: 'white',
              },
              '& fieldset': {
                borderColor: 'white',
                backgroundColor: 'transparent',
              },
              '& .Mui-disabled': {
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',

                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
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
                    sx={{ color: 'white' }}
                    onClick={() => setShowConfirmPassword((prevShowPassword) => !prevShowPassword)}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& input': {
                backgroundColor: 'transparent',
                color: 'white',
              },
              '& fieldset': {
                borderColor: 'white',
                backgroundColor: 'transparent',
              },
              '& .Mui-disabled': {
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',

                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
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
            sx={{
              '& input': {
                backgroundColor: 'transparent',
              },
              '& fieldset': {
                borderColor: 'white',
                backgroundColor: 'transparent',
              },
              '& .Mui-disabled': {
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
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
            sx={{
              '& input': {
                backgroundColor: 'transparent',
                color: 'white',
              },
              '& fieldset': {
                borderColor: 'white',
                backgroundColor: 'transparent',
              },
              '& .Mui-disabled': {
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
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
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Date of birth'
              value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
              onChange={(date) => formik.setFieldValue('dateOfBirth', date?.toISOString() ?? '')}
              disabled={!isEditing}
              sx={{
                width: '100%',
                mt: 2,
                '& .MuiInputBase-root': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiPickersDay-daySelected': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiIconButton-root': {
                  color: 'white',
                },
                '& .Mui-disabled': {
                  WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                },
              }}
            />
          </LocalizationProvider>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              mt: 3,
            }}
          >
            {!isEditing ? (
              <Button
                variant='contained'
                color='info'
                onClick={handleIsEditing}
                sx={{ maxWidth: '250px', width: '100%' }}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant='outlined'
                color='info'
                onClick={() => {
                  handleIsEditing();
                  formik.resetForm();
                }}
                disabled={isLoading}
                sx={{ maxWidth: '250px', width: '100%' }}
              >
                Cancel
              </Button>
            )}
            <Button
              variant='contained'
              color='success'
              type='submit'
              disabled={!isEditing}
              sx={{
                maxWidth: '250px',
                width: '100%',
                '&.Mui-disabled': {
                  WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
