import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardMedia, Container, Typography } from '@mui/material';
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
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card
          sx={{
            width: '100%',
            p: 2,
            mt: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.5) ',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              sx={{ mr: 2 }}
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
          </Box>
          <Typography variant='h4' component='h1' textAlign={'center'} sx={{ mb: 3 }}>
            Welcome to the Steam clone
          </Typography>
        </Card>
        <Carousel
          sx={{ height: '70vh', maxWidth: '430px', width: '100%', mt: 4 }}
          autoPlay={false}
          index={slideIndex}
          onChange={handleSlideChange}
          animation='slide'
          navButtonsAlwaysVisible
        >
          {images?.map((image, index) => (
            <Card key={index} sx={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component='img'
                image={image}
                alt={`Image ${index + 1}`}
                sx={{ height: '100%', objectFit: 'contain', width: 'auto' }}
              />
            </Card>
          ))}
        </Carousel>
      </Container>
    )
  );
};

export default LandingPage;
