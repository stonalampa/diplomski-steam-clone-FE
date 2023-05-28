import { RootState } from '../../store';

export const userState = (state: RootState) => state.user;

export const wishlistState = (state: RootState) => state.user.wishlist;

export const libraryState = (state: RootState) => state.user.library;
