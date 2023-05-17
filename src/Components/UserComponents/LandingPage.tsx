import { Button, Container, Slide, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useGetGamesQuery } from '../../providers/GamesProvider';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const { data, isLoading, isError, refetch } = useGetGamesQuery(3);
  const [images, setImages] = useState<string[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const handleSlideChange = (oldIndex: any, newIndex: any) => {
    setSlideIndex(newIndex);
  };

  const navigate = useNavigate();
  useMemo(() => {
    setImages(data?.map((game) => game.screenshots[1]) || []);
  }, [data]);

  return (
    <Container>
      <Typography variant='h4' component='h1'>
        Welcome to the Steam clone
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          navigate('login');
        }}
      >
        Sign In
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          navigate('register');
        }}
      >
        Register
      </Button>
      <Carousel
        autoPlay={false}
        index={slideIndex}
        onChange={handleSlideChange}
        animation='slide'
        navButtonsAlwaysVisible
      >
        {images?.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default LandingPage;
