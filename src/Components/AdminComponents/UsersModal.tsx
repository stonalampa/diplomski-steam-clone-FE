import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Container,
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
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
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
          {isEdit ? 'Edit User' : 'Add New User'}
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            autoComplete='username'
            autoFocus
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
            id='name'
            label='Full name'
            autoComplete='name'
            autoFocus
            {...formik.getFieldProps('name')}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Date of birth'
              value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
              onChange={(date) => formik.setFieldValue('dateOfBirth', date?.toISOString() ?? '')}
            />
          </LocalizationProvider>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 1 }}>
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
          <Button onClick={handleClose} fullWidth variant='outlined' sx={{ mb: 2 }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
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
          Delete User
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          You are about to delete user {rowData.name}. ID: {rowData.ID} and email: {rowData.email}{' '}
          Are you sure? This action cannot be undone!
        </Typography>
        <Button onClick={() => submit(rowData)} fullWidth variant='contained' sx={{ mt: 3, mb: 1 }}>
          {isLoading ? <CircularProgress size={20} /> : 'Save'}
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default UsersModal;
