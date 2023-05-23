import { createSlice } from '@reduxjs/toolkit';

export interface AuthenticationState {
  jwtToken: string | undefined;
  isAdmin: boolean | undefined;
  userId: string | undefined;
}

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
