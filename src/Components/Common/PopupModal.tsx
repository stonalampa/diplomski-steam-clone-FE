import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@mui/styles';
import { Button, Modal, Typography, styled } from '@mui/material';

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

const PopupModal = ({ text, open, onClose, timeout }: any) => {
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
