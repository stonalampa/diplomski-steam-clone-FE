export interface AuthenticationState {
  jwtToken: string | undefined;
  isAdmin: boolean | undefined;
  userId: string | undefined;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  dateOfBirth: string;
  paymentCard: PaymentCard;
  libraryId: string;
  library: string[];
  wishlist: string[];
}

type PaymentCard = {
  cardNumber: string;
  expDate: string;
  cvc: number;
};
