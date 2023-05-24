import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Link,
  Modal,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import YouTube from 'react-youtube';
import CloseIcon from '@mui/icons-material/Close';
const ModalContentWrapper = styled(Box)(() => ({
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

const videoOpts = {
  height: '360',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};

const GameModal = ({
  isOpen,
  game,
  handleClose,
}: {
  isOpen: boolean;
  game?: any;
  handleClose: () => void;
}) => {
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [trailer, setTrailer] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);

  const handleOpenModal = () => {
    setSelectedImage(images[slideIndex]);
    setImageDialogOpen(true);
  };

  const handleCloseModal = () => {
    setImageDialogOpen(false);
  };

  const handleSlideChange = (newIndex?: number, oldIndex?: number) => {
    if (newIndex === images.length - 1 && oldIndex === 0) {
      setSlideIndex(0);
    } else if (newIndex === 0 && oldIndex === images.length - 1) {
      setSlideIndex(images.length - 1);
    } else {
      setSlideIndex(newIndex ?? 0);
    }
  };

  const getVideoId = (url: string) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(?:\S+)?$/;
    const match = url.match(regex);
    return match?.[1] || '';
  };

  useEffect(() => {
    if (isOpen) {
      setTrailer(game.screenshots[0]);
      setCover(game.screenshots[1]);
      setImages(game.screenshots.slice(2));

      const videoId = getVideoId(trailer);
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`;
      iframe.width = '100%';
      iframe.height = '100%';

      playerRef.current?.appendChild(iframe);
    }
  }, [isOpen]);

  return isOpen ? (
    <Modal open={isOpen}>
      <ModalContentWrapper
        sx={{
          backgroundColor: 'white',
          boxShadow: 24,
          padding: '2rem',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component='img'
                src={cover}
                alt={game.title}
                sx={{ width: 250, height: 400 }}
              />
            </Card>
            <Button onClick={handleClose}>Close</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display='flex' flexDirection='column' height='100%'>
              <Typography variant='h4' gutterBottom>
                {game.title}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                {game.developer}
              </Typography>
              <Typography variant='body1' gutterBottom>
                {game.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' gutterBottom>
                Screenshots
              </Typography>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                gap={2}
                width={400}
                height={400}
                onClick={handleOpenModal}
              >
                <Carousel
                  autoPlay={true}
                  index={slideIndex}
                  onChange={handleSlideChange}
                  animation='slide'
                  navButtonsAlwaysVisible={false}
                  sx={{ width: 400, height: 400 }}
                >
                  {images.map((screenshot: string, index: number) => (
                    <Card key={index} sx={{ width: 400, height: 400 }}>
                      <CardMedia
                        sx={{ width: 400, height: 400 }}
                        component='img'
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                      />
                    </Card>
                  ))}
                </Carousel>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' gutterBottom>
                Trailer
              </Typography>
              <Card>
                <YouTube videoId={getVideoId(trailer)} opts={videoOpts} />
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={imageDialogOpen} onClose={handleCloseModal} maxWidth='md' fullWidth>
          <IconButton
            aria-label='close'
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <img
              src={selectedImage ?? ''}
              alt={`Image ${selectedImage}`}
              style={{ width: '100%' }}
            />
          </DialogContent>
        </Dialog>
      </ModalContentWrapper>
    </Modal>
  ) : null;
};

export default GameModal;
