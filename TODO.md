TODO:

Cetvrtak

- Dodaj CRUD za igre - admin
- Dodaj CRUD za korisnike - admin
- Dodaj sve ostale providere

Petak:

- Dodaj search
- Dodaj dodavanje komentara na igru
- Dodavanje i sklanjanje wishlista
- Kupovina igre
- CRUD profila
- Nakon paymenta kada se upise igra u DB onda da pozove email helper da posalje tnx for buying I koja igra i koja cena je placena

- Vikend:
- Testiraj sve
- Refaktorisi tipove i slicno
- Dodaj u seedove za igre - slike i video linkove (prave linkove)
- Posle toga: CSS sa milicom

<!-- Pop prosledi ga samo na payment i download sa odgovarajucim podacima
import React, { useState } from 'react';
import PopupModal from '../Common/PopupModal';
import { Button } from '@mui/material';

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <PopupModal text='' open={open} onClose={handleClose} timeout={3000} />
    </div>
  );
} -->
