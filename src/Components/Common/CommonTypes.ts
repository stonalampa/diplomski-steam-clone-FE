export interface IObject extends Object {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PopupModalProps {
  text: string;
  open: boolean;
  onClose: () => void;
  timeout?: number;
}
