import * as Yup from 'yup';
import { Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { useResetPasswordMutation } from '../../providers/UsersProvider';

const ResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

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
        const data = await resetPasswordMutation(values.email);
        if ('error' in data) {
          enqueueSnackbar(`User password reset failed!`, { variant: 'error' });
        } else {
          enqueueSnackbar('New password has been sent!', { variant: 'success' });
        }
        resetForm();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Password reset failed - unknown error', { variant: 'error' });
        resetForm();
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Card
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5) ',
          maxWidth: '600px',
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
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3, width: '100%' }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Reset password
          </Typography>
          <TextField
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
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box sx={{ mt: 3, textAlign: 'end' }}>
            <Button type='submit' variant='outlined' color='secondary' sx={{ mr: 2 }}>
              test
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={!!formik.errors.email}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Reset password'}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ResetPassword;
