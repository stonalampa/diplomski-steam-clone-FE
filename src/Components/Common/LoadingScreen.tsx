import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const LoadingScreen = () => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <h1>Hello World!</h1>
      )}
    </>
  );
};

export default LoadingScreen;
