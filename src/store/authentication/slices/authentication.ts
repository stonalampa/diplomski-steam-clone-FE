import { createSlice } from '@reduxjs/toolkit';
import { AuthenticationState } from '../../StoreTypes';

const initialState: AuthenticationState = {
  jwtToken: '',
  isAdmin: false,
  userId: '',
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setJwtToken, setIsAdmin, setUserId } = slice.actions;

export default slice.reducer;
