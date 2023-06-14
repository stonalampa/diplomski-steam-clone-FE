import { useState } from 'react';
import { IObject, PopupModalType } from '../Common/CommonTypes';
import {
  Avatar,
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PopupModal from '../Common/PopupModal';

const Library = ({ libraryGames }: { libraryGames: Array<IObject> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const handleOpen = (title: string) => {
    setSelectedItem(title);
    setIsOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <List sx={{ width: '100%', maxWidth: 700 }}>
        {libraryGames.map((item, index) => (
          <Card sx={{ backgroundColor: 'rgba(265,265,265, 0.6)', mb: 2 }} key={index}>
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={item.title} src={item.screenshots[1]} />
              </ListItemAvatar>
              <Box sx={{ maxHeight: '100px' }}>
                <ListItemText primary={item.title} secondary={item.description} />
              </Box>
              <Box sx={{ display: 'block' }}>
                <Button variant='contained' color='success' onClick={() => handleOpen(item.title)}>
                  Download
                </Button>
              </Box>
            </ListItem>
          </Card>
        ))}
        <PopupModal
          text={selectedItem}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          timeout={3000}
          type={PopupModalType.Download}
        ></PopupModal>
      </List>
    </Box>
  );
};

export default Library;
