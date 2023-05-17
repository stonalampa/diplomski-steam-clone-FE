import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Wishlist from './Wishlist';
import UserProfile from './UserProfile';

import Library from './Library';
import GamesStore from './GamesStore';

const StyledPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTabsContainer = styled(Box)(({ theme }) => ({
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

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

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
