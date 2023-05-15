import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const AdminHome = () => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        Welcome to the Steam clone admin page
      </Typography>
      {/* <Typography variant='body1' align='center' gutterBottom>
        This is a generic home page created using Material-UI.
      </Typography> */}
      {/* <Button variant='contained' color='primary' fullWidth> */}
      {/* Get Started */}
      {/* </Button> */}
    </Container>
  );
};

export default AdminHome;
