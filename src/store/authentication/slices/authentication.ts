import { createSlice } from '@reduxjs/toolkit';

export interface AuthenticationState {
  jwtToken: string | undefined;
}

const initialState: AuthenticationState = {
  jwtToken: '',
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setJwtToken: (state, action) => {
      console.log('EVO GA', state, action);
      state.jwtToken = action.payload;
    },
  },
});

export const { setJwtToken } = slice.actions;

export default slice.reducer;
