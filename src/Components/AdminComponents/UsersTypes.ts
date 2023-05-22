import { IObject } from '../Common/CommonTypes';

export interface UsersModalProps {
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
  username: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
}
