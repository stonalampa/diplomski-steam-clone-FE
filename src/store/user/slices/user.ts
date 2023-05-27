import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: string;
  password: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

const initialState: any = {};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      console.log(action.payload);
      const { ID, password, username, email, dateOfBirth, name, paymentCards } = action.payload;
      state.id = ID;
      state.password = password;
      state.username = username;
      state.name = name;
      state.email = email;
      state.dateOfBirth = dateOfBirth;
      // state.paymentCard = paymentCards[0];
    },
    setLibraryAndWishlist: (state, action) => {
      const { library, wishlist } = action.payload;
      state.library = library;
      state.wishlist = wishlist;
    },
  },
});

export const { setUserState } = slice.actions;

export default slice.reducer;
