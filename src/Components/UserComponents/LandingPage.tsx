import { Button } from '@mui/material';
import { GetGames } from '../../Providers/GamesProvider';
// import axios from "axios"
export const LandingPage = () => {
  return (
    <div>
      <h1>STOLE</h1>
      <Button onClick={handleClick}></Button>
    </div>
  );
};

const handleClick = async () => {
  const x = await GetGames(6);
  console.log(x.data);
};