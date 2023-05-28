export interface IObject extends Object {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export enum PopupModalType {
  Download = 'DOWNLOAD',
  Buy = 'BUY',
}

export interface PopupModalProps {
  text: string;
  open: boolean;
  onClose: () => void;
  timeout?: number;
  type: PopupModalType;
}
