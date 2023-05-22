import { IObject } from '../Common/CommonTypes';

export interface GamesModalProps {
  open: boolean;
  handleClose: () => void;
  isAdd: boolean;
  isEdit: boolean;
  rowData: IObject;
  isLoading: boolean;
  submit: (data: IObject) => void;
}
export interface FormikProps {
  id: string;
  title: string;
  price: number;
  developer: string;
  publisher: string;
  description: string;
  score: number;
  numberOfScores: number;
  screenshots: string;
  discount: number;
  discountExpDate: string;
  releaseDate: string;
}
