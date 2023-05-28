import { useEffect } from 'react';
import { Button, CircularProgress, Modal, Typography, styled } from '@mui/material';
import { PopupModalProps, PopupModalType } from './CommonTypes';

const ModalContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalContent = styled('div')`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled(Button)`
  margin-top: 1rem;
`;

const PopupModal = ({ text, open, timeout, type, onClose }: PopupModalProps) => {
  let typographyElement;
  let closeButtonElement;
  switch (type) {
    case PopupModalType.Buy:
      typographyElement = (
        <Typography variant='h6' component='div'>
          Success: {text}
        </Typography>
      );
      closeButtonElement = (
        <CloseButton variant='contained' color='primary' onClick={onClose}>
          Close
        </CloseButton>
      );
      break;
    case PopupModalType.Download:
      typographyElement = (
        <Typography variant='h6' component='div' color='warning'>
          Your download of <strong>{text}</strong> will start shortly!
        </Typography>
      );
      closeButtonElement = null;
      break;
    default:
      typographyElement = (
        <Typography variant='h6' component='div'>
          {text}
        </Typography>
      );
      closeButtonElement = (
        <CloseButton variant='contained' color='primary' onClick={onClose}>
          Close
        </CloseButton>
      );
  }

  useEffect(() => {
    if (open && timeout) {
      const timer = setTimeout(onClose, timeout);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, timeout]);

  return (
    <Modal open={open} onClose={onClose} component={ModalContainer}>
      <ModalContent>
        {typographyElement}
        <CircularProgress size={20} />
        {closeButtonElement}
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
