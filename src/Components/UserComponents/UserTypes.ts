import { IObject } from '../Common/CommonTypes';

export interface FormInitialValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  dateOfBirth: string;
  username: string;
}

export interface GamesStoreAndWishlistProps {
  isWishlist: boolean;
  gamesData: Array<IObject>;
}
