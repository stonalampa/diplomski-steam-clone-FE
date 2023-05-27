import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { useAuthContext } from '../AuthComponents/useAuthContext';
import { userState } from '../../store/user/selectors/userSelector';

const RootAppBar = styled(AppBar)(() => ({
  flexGrow: 1,
}));

const Title = styled(Typography)(() => ({
  flexGrow: 1,
  textAlign: 'left',
}));

const RootDiv = styled('div')(() => ({
  flexGrow: 1,
}));

export default function TopMenu() {
  const { logout } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const isAdmin = window.location.pathname.includes('admin');
  const navigate = useNavigate();
  const user = useSelector(userState);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState<boolean>(false);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
    setIsMenuOpen(false);
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuAvatar = (event: any) => {
    setAnchorElAvatar(event.currentTarget);
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const handleMenuAvatarClose = () => {
    setAnchorElAvatar(null);
    setIsAvatarMenuOpen(false);
  };

  return isAuthenticated ? (
    <RootDiv>
      <RootAppBar position='static'>
        <Toolbar>
          {isAdmin && (
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
          )}
          <Title variant='h6'>Steam clone {isAdmin ? 'admin' : ''} </Title>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>{isAdmin ? 'Admin' : user.name}</Typography>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenuAvatar}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar1'
              anchorEl={anchorElAvatar}
              open={isAvatarMenuOpen}
              onClose={handleMenuAvatarClose}
              onClick={handleMenuAvatar}
              MenuListProps={{ 'aria-labelledby': 'account-menu' }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
          <Menu
            id='menu-appbar2'
            anchorEl={anchorElMenu}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenu}
            MenuListProps={{ 'aria-labelledby': 'account-menu' }}
          >
            <MenuItem onClick={() => navigate('/admin/')}>Home</MenuItem>
            <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
            <MenuItem onClick={() => navigate('/admin/games')}>Games</MenuItem>
          </Menu>
        </Toolbar>
      </RootAppBar>
    </RootDiv>
  ) : null;
}
