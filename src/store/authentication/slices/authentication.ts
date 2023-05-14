import { createSlice } from '@reduxjs/toolkit';

export interface AuthenticationState {
  jwtToken: string | undefined;
  isAdmin: boolean | undefined;
}

const initialState: AuthenticationState = {
  jwtToken: '',
  isAdmin: false,
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
  },
});

export const { setJwtToken, setIsAdmin } = slice.actions;

export default slice.reducer;
