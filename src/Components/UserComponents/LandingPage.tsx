import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardMedia, Container, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { useGetGamesQuery } from '../../providers/GamesProvider';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetGamesQuery(3);
  const [images, setImages] = useState<Array<string>>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleSlideChange = (newIndex?: number, oldIndex?: number) => {
    if (newIndex === images.length - 1 && oldIndex === 0) {
      setSlideIndex(0);
    } else if (newIndex === 0 && oldIndex === images.length - 1) {
      setSlideIndex(images.length - 1);
    } else {
      setSlideIndex(newIndex ?? 0);
    }
  };

  // * We know that the data cover art is always the second image in the screenshots array
  useMemo(() => {
    setImages(data?.map((game) => game.screenshots[1]) || []);
  }, [data]);

  return (
    { isLoading } && (
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
            <Card key={index}>
              <CardMedia component='img' image={image} alt={`Image ${index + 1}`} />
            </Card>
          ))}
        </Carousel>
      </Container>
    )
  );
};

export default LandingPage;
