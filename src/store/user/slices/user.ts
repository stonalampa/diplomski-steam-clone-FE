import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../StoreTypes';

const initialState: User = {
  id: '',
  username: '',
  password: '',
  name: '',
  email: '',
  dateOfBirth: '',
  paymentCard: {
    cardNumber: '',
    expDate: '',
    cvc: 0,
  },
  library: [],
  wishlist: [],
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      const { ID, password, username, email, dateOfBirth, name, paymentCards } = action.payload;
      state.id = ID;
      state.password = password;
      state.username = username;
      state.name = name;
      state.email = email;
      state.dateOfBirth = dateOfBirth;
      state.paymentCard = paymentCards.length > 0 ? paymentCards[0] : initialState.paymentCard;
    },
    setLibraryAndWishlist: (state, action) => {
      const { gameIds, wishlistIds } = action.payload;
      state.library = gameIds;
      state.wishlist = wishlistIds;
    },
  },
});

export const { setUserState, setLibraryAndWishlist } = slice.actions;

export default slice.reducer;
