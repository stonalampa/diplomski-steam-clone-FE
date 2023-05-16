import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useResetPasswordMutation } from '../../providers/UsersProvider';
const ResetPassword = () => {
  const resetPassword = async ({ email }: { email: string }) => {
    console.log(email);
  };
  const [resetPasswordMutation, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();
  const [email, setEmail] = useState('');
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await resetPasswordMutation(values.email);
        console.log('🚀 ~ file: ResetPassword.tsx:27 ~ onSubmit: ~ data:', data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Password reset failed', { variant: 'error' });
        resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={!!formik.errors.email}
        style={{ marginTop: '1rem' }}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPassword;
