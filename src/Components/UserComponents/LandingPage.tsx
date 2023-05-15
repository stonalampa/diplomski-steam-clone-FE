import { Button } from '@mui/material';

export const LandingPage = () => {
  return (
    <div>
      <h1>STOLE</h1>
      <Button
        onClick={() => {
          console.log('stole');
        }}
      ></Button>
    </div>
  );
};
