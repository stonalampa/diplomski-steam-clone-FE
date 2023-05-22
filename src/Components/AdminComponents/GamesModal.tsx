import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Modal, TextField, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FormikProps, GamesModalProps } from './GamesTypes';

const ModalContentWrapper = styled(Box)(({ theme }) => ({
  maxHeight: 900,
  overflowY: 'auto',
  paddingRight: 15,
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
  },
}));

const GamesModal = ({
  open,
  isAdd,
  isEdit,
  rowData,
  isLoading,
  handleClose,
  submit,
}: GamesModalProps) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    developer: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    publisher: Yup.string().required('Required'),
    score: Yup.number().required('Required'),
    numberOfScores: Yup.number().required('Required'),
    screenshots: Yup.string().required('Required'),
    discount: Yup.string().required('Required'),
    discountExpDate: Yup.string().required('Required'),
    releaseDate: Yup.string().required('Required'),
  });

  const initialValues: FormikProps = {
    id: '',
    title: '',
    price: 0.0,
    developer: '',
    publisher: '',
    description: '',
    score: 0.0,
    numberOfScores: 0,
    screenshots: '',
    discount: 0.0,
    discountExpDate: '',
    releaseDate: '',
  };

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
        title: rowData.title,
        price: rowData.price,
        developer: rowData.developer,
        publisher: rowData.publisher,
        description: rowData.description,
        score: rowData.score,
        numberOfScores: rowData.numberOfScores,
        screenshots: rowData.screenshots.join(', '),
        discount: rowData.discount,
        discountExpDate: rowData.discountExpDate,
        releaseDate: rowData.releaseDate,
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
      <ModalContentWrapper
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
            id='title'
            label='Title'
            autoComplete='title'
            {...formik.getFieldProps('title')}
            error={formik.touched.title && formik.errors.title ? true : false}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin='normal'
            required
            type='number'
            fullWidth
            id='price'
            label='Price'
            autoComplete='price'
            autoFocus
            {...formik.getFieldProps('price')}
            error={formik.touched.price && formik.errors.price ? true : false}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='developer'
            label='Developer'
            autoComplete='developer'
            {...formik.getFieldProps('developer')}
            error={formik.touched.developer && formik.errors.developer ? true : false}
            helperText={formik.touched.developer && formik.errors.developer}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='publisher'
            label='Publisher'
            autoComplete='publisher'
            autoFocus
            {...formik.getFieldProps('publisher')}
            error={formik.touched.publisher && formik.errors.publisher ? true : false}
            helperText={formik.touched.publisher && formik.errors.publisher}
          />
          <TextField
            margin='normal'
            fullWidth
            id='description'
            label='Description'
            autoComplete='description'
            {...formik.getFieldProps('description')}
            error={formik.touched.description && formik.errors.description ? true : false}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            type='number'
            id='score'
            label='Score'
            autoComplete='score'
            {...formik.getFieldProps('score')}
            error={formik.touched.score && formik.errors.score ? true : false}
            helperText={formik.touched.score && formik.errors.score}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            type='number'
            id='numberOfScores'
            label='Number of scores'
            autoComplete='numberOfScores'
            {...formik.getFieldProps('numberOfScores')}
            error={formik.touched.numberOfScores && formik.errors.numberOfScores ? true : false}
            helperText={formik.touched.numberOfScores && formik.errors.numberOfScores}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='screenshots'
            label='Screenshots'
            autoComplete='screenshots'
            {...formik.getFieldProps('screenshots')}
            error={formik.touched.screenshots && formik.errors.screenshots ? true : false}
            helperText={formik.touched.screenshots && formik.errors.screenshots}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            type='number'
            id='discount'
            label='Discount'
            autoComplete='discount'
            {...formik.getFieldProps('discount')}
            error={formik.touched.discount && formik.errors.discount ? true : false}
            helperText={formik.touched.discount && formik.errors.discount}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Discount expiration date'
              value={formik.values.discountExpDate ? dayjs(formik.values.discountExpDate) : null}
              onChange={(date) =>
                formik.setFieldValue('discountExpDate', date?.toISOString() ?? '')
              }
            />
            <DatePicker
              label='Release date'
              value={formik.values.releaseDate ? dayjs(formik.values.releaseDate) : null}
              onChange={(date) => formik.setFieldValue('releaseDate', date?.toISOString() ?? '')}
            />
          </LocalizationProvider>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 1 }}>
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
          <Button onClick={handleClose} fullWidth variant='outlined' sx={{ mb: 2 }}>
            Close
          </Button>
        </Box>
      </ModalContentWrapper>
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

export default GamesModal;
