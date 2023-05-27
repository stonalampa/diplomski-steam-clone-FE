import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { FormikProps, UsersModalProps } from './UsersTypes';

const initialValues: FormikProps = {
  id: '',
  username: '',
  email: '',
  password: '',
  name: '',
  dateOfBirth: '',
};

const UsersModal = ({
  open,
  isAdd,
  isEdit,
  rowData,
  isLoading,
  handleClose,
  submit,
}: UsersModalProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    dateOfBirth: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  useEffect(() => {
    if (isAdd) {
      formik.setValues(initialValues);
    }

    if (isEdit) {
      formik.setValues({
        id: rowData.ID,
        username: rowData.username,
        email: rowData.email,
        password: rowData.password,
        name: rowData.name,
        dateOfBirth: rowData.dateOfBirth,
      });
    }
  }, [isAdd, isEdit, rowData]);

  return isAdd || isEdit ? (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2) ',
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
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
        <Typography id='modal-modal-title' variant='h4' component='h2'>
          {isEdit ? 'Edit User' : 'Add New User'}
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            margin='normal'
            required
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
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
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
            id='name'
            label='Full name'
            autoComplete='name'
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
            {...formik.getFieldProps('name')}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Date of birth'
              sx={{
                width: '100%',
                mt: 2,
                '& .MuiInputBase-root': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
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
              }}
              value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
              onChange={(date) => formik.setFieldValue('dateOfBirth', date?.toISOString() ?? '')}
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
            <Button
              type='submit'
              variant='contained'
              color='success'
              sx={{ maxWidth: '250px', width: '100%' }}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Save'}
            </Button>
            <Button
              onClick={handleClose}
              variant='outlined'
              color='inherit'
              sx={{ maxWidth: '250px', width: '100%' }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5) ',
        backgroundBlendMode: 'difference',
      }}
    >
      <Card
        sx={{
          backgroundColor: 'white',
          maxWidth: '800px',
          width: '100%',
          p: 4,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h2' sx={{ fontWeight: '800' }}>
          Delete User
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            You are about to delete user <strong>{rowData.name}</strong>
          </Typography>
          <Typography>
            ID: <strong>{rowData.ID}</strong> and email: <strong>{rowData.email}</strong>
          </Typography>
          <Typography>Are you sure? This action cannot be undone!</Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            mt: 3,
          }}
        >
          <Button
            onClick={() => submit(rowData)}
            variant='contained'
            color='error'
            sx={{ maxWidth: '250px', width: '100%' }}
          >
            {isLoading ? <CircularProgress size={20} /> : 'Confirm'}
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{ maxWidth: '250px', width: '100%' }}
          >
            Cancel
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default UsersModal;
