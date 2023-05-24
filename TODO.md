TODO:

DANAS:

2. Buy
3. Add to wishlist
4. Posle payment email
5. Posle payment tnx poruka
6. Download

7. Dodaj shared component koja ce biti kada se otvori igra gde ce sve ucitati, modal
8. Dodaj ostavljanje komentara, dodavanje u wish list najveca funkcionalnost
9. Dodaj library
10. Nakon paymenta kada se upise igra u DB onda da pozove email helper da posalje tnx for buying I koja igra i koja cena je placena

Vikend:

- Fix form update after user profile refresh
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

<!-- Svi podaci,
Trailer sa svim slikama
Image ovaj samo
Add to wishlist
Buy -->
