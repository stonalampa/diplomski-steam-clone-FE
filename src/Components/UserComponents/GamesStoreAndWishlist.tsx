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

const GamesStoreAndWishlist = ({ isWishlist, gamesData }: GamesStoreAndWishlistProps) => {
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
        label='Search'
        variant='outlined'
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem' }}
      />
      <Box>
        <Grid container={false}>
          {paginatedItems?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Card>
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <CardMedia
                    component='img'
                    alt={item.title}
                    height='200'
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
          variant='outlined'
          color='primary'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </Button>
        <Button
          variant='outlined'
          color='primary'
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
      />
    </Container>
  );
};

export default GamesStoreAndWishlist;
