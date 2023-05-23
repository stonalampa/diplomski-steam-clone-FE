import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

import Wishlist from './Wishlist';
import UserProfile from './UserProfile';
import Library from './Library';
import GamesStore from './GamesStore';
import { useGetUserDataQuery } from '../../providers/UsersProvider';
import { setUserState } from '../../store/user/slices/user';
import { useSelector } from 'react-redux';
import { userId } from '../../store/authentication/selectors/authenticationSelector';
import { dispatch } from '../../store/store';

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
  const { data } = useGetUserDataQuery(useSelector(userId) as string);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTabChange = (event: unknown, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (data?.user) {
      dispatch(setUserState(data?.user));
    }
  }, [data]);

  return (
    <StyledPageContainer>
      <StyledTabsContainer>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <StyledTab label='Store' />
          <StyledTab label='Library' />
          <StyledTab label='Wishlist' />
          <StyledTab label='Profile' />
        </Tabs>
        <Box p={2}>
          {selectedTab === 0 && <GamesStore />}
          {selectedTab === 1 && <Library />}
          {selectedTab === 2 && <Wishlist />}
          {selectedTab === 3 && <UserProfile />}
        </Box>
      </StyledTabsContainer>
    </StyledPageContainer>
  );
};

export default Home;
