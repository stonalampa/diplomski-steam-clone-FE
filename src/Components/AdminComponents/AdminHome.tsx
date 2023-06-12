import { Box, Card, Typography } from '@mui/material';

const AdminHome = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', pt: 10 }}>
      <Card
        sx={{
          height: '30%',
          backgroundColor: 'rgba(0, 0, 0, 0.5) ',
          maxWidth: '1200px',
          width: '100%',
          p: 4,
          margin: '0 auto',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4' component='h1' align='center' gutterBottom>
          <b>Welcome to the Steam clone admin page</b>
        </Typography>
      </Card>
    </Box>
  );
};

export default AdminHome;
