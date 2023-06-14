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
  refetchLibrary: () => void;
  refetchGames: () => void;
}

export interface GameModalProps {
  isOpen: boolean;
  game?: IObject;
  handleClose: () => void;
  refetchLibrary: () => void;
  refetchGames: () => void;
}
