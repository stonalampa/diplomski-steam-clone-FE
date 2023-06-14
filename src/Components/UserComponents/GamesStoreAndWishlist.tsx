import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { IObject } from '../Common/CommonTypes';
import GameModal from './GameModal';
import { wishlistState } from '../../store/user/selectors/userSelector';
import { useSelector } from 'react-redux';
import { GamesStoreAndWishlistProps } from './UserTypes';

const itemsPerPage = 3;

const GamesStoreAndWishlist = ({
  isWishlist,
  gamesData,
  refetchLibrary,
  refetchGames,
}: GamesStoreAndWishlistProps) => {
  const wishlist = useSelector(wishlistState);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IObject>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wishlistData, setWishlistData] = useState<IObject[]>([]);

  const filteredItems = isWishlist
    ? wishlistData?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : gamesData?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const paginatedItems = filteredItems
    ? filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : isWishlist
    ? wishlistData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : gamesData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemClick = (item: IObject) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (isWishlist && wishlistData && wishlistData.length > 0) {
      setTotalPages(Math.ceil(wishlistData.length / itemsPerPage));
    } else if (!isWishlist && gamesData && gamesData.length > 0) {
      setTotalPages(Math.ceil(gamesData.length / itemsPerPage));
    }
  }, [wishlistData, gamesData, isWishlist]);

  useEffect(() => {
    if (isWishlist) {
      setWishlistData(gamesData?.filter((item) => wishlist?.includes(item.ID)) || []);
    }
  }, [gamesData, wishlist, isWishlist]);

  return (
    <Container>
      <TextField
        fullWidth
        label='Search'
        variant='outlined'
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          '& input': {
            backgroundColor: 'transparent',
          },
          '& fieldset': {
            borderColor: 'white',
            backgroundColor: 'transparent',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        inputProps={{
          style: {
            color: 'white',
            borderColor: 'white',
          },
        }}
      />
      <Box sx={{ mt: 4 }}>
        <Grid container columnGap={2} rowGap={2} sx={{ height: '80vh', justifyContent: 'center' }}>
          {paginatedItems?.map((item) => (
            <Grid item sm={12} md={5.5} lg={3.5} key={item.title}>
              <Card>
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <CardMedia
                    component='img'
                    alt={item.title}
                    height='500'
                    image={item.screenshots[1]}
                  />
                  <CardContent>
                    <Typography variant='h6' component='div'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.price} $
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Developer: {item.developer}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Publisher: {item.publisher}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Score: {(item.score / item.numberOfScores).toFixed(2)} / 5
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Button
          variant='contained'
          color='success'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </Button>
        <Button
          variant='contained'
          color='success'
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ marginLeft: '1rem' }}
        >
          Next
        </Button>
      </Box>
      <GameModal
        isOpen={isOpen}
        game={selectedItem}
        handleClose={() => {
          setIsOpen(false);
        }}
        refetchLibrary={refetchLibrary}
        refetchGames={refetchGames}
      />
    </Container>
  );
};

export default GamesStoreAndWishlist;
