TODO:

1. Dodaj username za toolbar

1. Buying
1. Email
1. Wishlist

1. Ista komponenta za wishlist i store
1. Druga komponenta za libray + download

1. Komentari + da ne moze vise od 1 vidi to na kraju kako

Vikend:

- Fix form update after user profile refresh

- Testiraj sve

- Refaktorisi tipove i slicno
- DODAJ SVIMA VALIDACIJU ZA SVE INPUT PROPERTIJE DETALJNIJE ZA NUMBERS I TAKO TO
- Dodaj za tabele header boldovan
- Dodaj za tabele boolean -> label

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

<!-- Svi podaci,
Trailer sa svim slikama
Image ovaj samo
Add to wishlist
Buy -->
