import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';

// const useStyles = makeStyles((theme: any) => ({
//   loadingContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     width: '100%',
//   },
// }));

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  //   const classes = useStyles();

  // Simulate a delay for the loading screen
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        // Render your app content here
        <h1>Hello World!</h1>
      )}
    </>
  );
};

export default LoadingScreen;
