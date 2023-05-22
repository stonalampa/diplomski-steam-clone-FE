TODO:

Utorak:

1. Dodaj user edit sa providerom
2. Prikazi sve podatke userove

Sreda:

1. Dodaj shared component koja ce biti kada se otvori igra gde ce sve ucitati, modal
2. Dodaj ostavljanje komentara, dodavanje u wish list najveca funkcionalnost

Cetvrtak:

1. Dodaj library
2. Dodaj wishlist
3. Dodaj store

Petak:

1. Search games
2. Kupovina
3. Download
4. Nakon paymenta kada se upise igra u DB onda da pozove email helper da posalje tnx for buying I koja igra i koja cena je placena

Vikend:

- Testiraj sve
- Refaktorisi tipove i slicno
- Dodaj u seedove za igre - slike i video linkove (prave linkove)
- CSS sa milicom
- DODAJ SVIMA VALIDACIJU ZA SVE INPUT PROPERTIJE DETALJNIJE ZA NUMBERS I TAKO TO

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
