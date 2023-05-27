TODO:

CSS:

1. Sredi games komponentu celu sa formama
2. Sredi register imas formu
3. Sredi login, dodaj samo background kao i admin i isti oblik ali belo ostavi
4. Dodaj formu za user sredi
5. Sredi formu za reset
6. Sredi landing page admin, samo ga ubaci na sredi neki kurac

FUNC:

1. Dodaj samo wishlist add/remove
2. Dodaj library listu
3. Dodaj download
4. Dodaj buy
5. Dodaj buy email

- Test all
- Resi bug sa edit user
- Mozda i validacija fieldova jos
- CSS ostatak sa milicom
- Refaktorisi tipove i slicno
- Dodaj za tabele header boldovan
- Dodaj za tabele boolean -> label
- Sredi lint

??? Mozda dodaj i add comment

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
