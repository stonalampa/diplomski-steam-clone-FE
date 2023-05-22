import { useEffect } from 'react';
import { Button, Modal, Typography, styled } from '@mui/material';
import { PopupModalProps } from './CommonTypes';

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

const PopupModal = ({ text, open, timeout, onClose }: PopupModalProps) => {
  useEffect(() => {
    if (open && timeout) {
      const timer = setTimeout(onClose, timeout);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, timeout]);

  return (
    <Modal open={open} onClose={onClose} component={ModalContainer}>
      <ModalContent>
        <Typography variant='h6' component='div'>
          {text}
        </Typography>
        <CloseButton variant='contained' color='primary' onClick={onClose}>
          OK
        </CloseButton>
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
