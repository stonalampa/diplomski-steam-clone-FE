import { useState } from 'react';
import { IObject, PopupModalType } from '../Common/CommonTypes';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PopupModal from '../Common/PopupModal';

const Library = ({ libraryGames }: { libraryGames: Array<IObject> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const handleOpen = (title: string) => {
    setSelectedItem(title);
    setIsOpen(true);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, backgroundColor: 'white' }}>
      {libraryGames.map((item, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar alt={item.title} src={item.screenshots[1]} />
          </ListItemAvatar>
          <ListItemText primary={item.title} secondary={item.description} />
          <Button variant='contained' color='primary' onClick={() => handleOpen(item.title)}>
            Download
          </Button>
        </ListItem>
      ))}
      <PopupModal
        text={selectedItem}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        timeout={3000}
        type={PopupModalType.Download}
      ></PopupModal>
    </List>
  );
};

export default Library;
