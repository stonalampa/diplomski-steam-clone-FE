import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

import { useGetUserDataQuery } from '../../providers/UsersProvider';
import { setUserState, setLibraryAndWishlist } from '../../store/user/slices/user';
import { userId } from '../../store/authentication/selectors/authenticationSelector';
import { dispatch } from '../../store/store';
import { useGetLibraryDataQuery } from '../../providers/LibraryProvider';
import Wishlist from './Wishlist';
import UserProfile from './UserProfile';
import Library from './Library';
import GamesStoreAndWishlist from './GamesStoreAndWishlist';
import { useGetAllGamesQuery } from '../../providers/GamesProvider';
import { IObject } from '../Common/CommonTypes';

const StyledPageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTabsContainer = styled(Box)(() => ({
  width: '500px',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const id = useSelector(userId) as string;
  const { data } = useGetUserDataQuery(id);
  const { data: gamesData } = useGetAllGamesQuery();
  const { data: userLibrary } = useGetLibraryDataQuery(id);
  const [libraryGames, setLibraryGams] = useState<IObject[]>([]);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (data?.user) {
      dispatch(setUserState(data?.user));
    }
  }, [data]);

  useEffect(() => {
    if (userLibrary?.ID) {
      dispatch(setLibraryAndWishlist(userLibrary));
    }
  }, [userLibrary]);

  useEffect(() => {
    if (userLibrary?.ID && gamesData && gamesData.length > 0) {
      console.log(gamesData, userLibrary);
      setLibraryGams(gamesData?.filter((game) => userLibrary?.gameIds?.includes(game.ID)) || []);
    }
  }, [userLibrary, gamesData]);

  return (
    <StyledPageContainer>
      <StyledTabsContainer>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <StyledTab label='Store' />
          <StyledTab label='Wishlist' />
          <StyledTab label='Library' />
          <StyledTab label='Profile' />
        </Tabs>
        <Box p={2}>
          {selectedTab === 0 && (
            <GamesStoreAndWishlist isWishlist={false} gamesData={gamesData ?? []} />
          )}
          {selectedTab === 1 && (
            <GamesStoreAndWishlist isWishlist={true} gamesData={gamesData ?? []} />
          )}
          {selectedTab === 2 && <Library libraryGames={libraryGames} />}
          {selectedTab === 3 && <UserProfile />}
        </Box>
      </StyledTabsContainer>
    </StyledPageContainer>
  );
};

export default Home;
