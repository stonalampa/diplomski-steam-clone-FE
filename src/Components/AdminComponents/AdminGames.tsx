import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Card } from '@mui/material';
import {
  useCreateGameMutation,
  useDeleteGameMutation,
  useGetAllGamesQuery,
  useUpdateGameMutation,
} from '../../providers/GamesProvider';

import { IObject } from '../Common/CommonTypes';
import GamesModal from './GamesModal';

const columns = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'developer', headerName: 'Developer', width: 150 },
  { field: 'publisher', headerName: 'Publisher', width: 150 },
  { field: 'description', headerName: 'Description', width: 150 },
  { field: 'score', headerName: 'Score', width: 150 },
  { field: 'numberOfScores', headerName: 'Number of scores', width: 150 },
  { field: 'screenshots', headerName: 'Screenshots', width: 150 },
  { field: 'discount', headerName: 'Discount', width: 150 },
  { field: 'discountExpDate', headerName: 'Discount exp date', width: 150 },
  { field: 'releaseDate', headerName: 'Release date', width: 150 },
];

export default function AdminGames() {
  const { data, isLoading, refetch } = useGetAllGamesQuery();
  const [createGame] = useCreateGameMutation();
  const [updateGame] = useUpdateGameMutation();
  const [deleteGame] = useDeleteGameMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IObject | undefined>(undefined);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const handleSelectionChange = (
    rowSelectionModel: GridRowSelectionModel,
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    details: GridCallbackDetails,
  ) => {
    if (rowSelectionModel.length > 0) {
      const game = data?.find((game) => {
        return game.ID === rowSelectionModel[0];
      });
      setSelectedRow(game);
    } else {
      setSelectedRow(undefined);
    }
  };
  const handleOpenAddNewDialog = () => {
    setIsAdd(true);
    setOpen(true);
  };
  const handleOpenEditDialog = () => {
    setIsEdit(true);
    setOpen(true);
  };
  const handleOpenDeleteDialog = () => {
    setOpen(true);
  };

  const handleSubmit = async (data: IObject) => {
    setIsLoadingButton(true);
    let msg = '';
    let result: IObject;
    try {
      if (isAdd) {
        msg = 'ADD';
        data.screenshots = data.screenshots.split(',');
        result = await createGame(data);
      } else if (isEdit) {
        msg = 'UPDATE';
        data.screenshots = data.screenshots.split(',');
        result = await updateGame(data);
      } else {
        msg = 'DELETE';
        result = await deleteGame(data.ID);
      }

      if (result.error) {
        enqueueSnackbar(`Error while "${msg}" game`, { variant: 'error' });
      } else {
        refetch();
        enqueueSnackbar(`Game successfully ${msg}ED`, { variant: 'success' });
      }
      handleClose();
      setIsLoadingButton(false);
      setSelectedRow(undefined);
    } catch (error) {
      console.warn(error);
      let msg = '';
      if (isAdd) {
        msg = 'ADD';
      } else if (isEdit) {
        msg = 'UPDATE';
      } else {
        msg = 'DELETE';
      }
      setIsLoadingButton(false);
      handleClose();
      enqueueSnackbar(`Error while "${msg}" game`, { variant: 'error' });
    }
  };

  const handleClose = () => {
    setIsAdd(false);
    setIsEdit(false);
    setOpen(false);
  };

  return (
    { isLoading } && (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Card
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5) ',
            maxWidth: '2000px',
            width: '100%',
            overflow: 'scroll',
            p: 4,
            margin: '0 auto',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: 4, alignSelf: 'flex-end', p: 2 }}>
            <Button variant='contained' color='success' onClick={handleOpenAddNewDialog}>
              Add new user
            </Button>
            <Button
              variant='contained'
              color='info'
              disabled={!selectedRow}
              onClick={handleOpenEditDialog}
              sx={{ ml: 2 }}
            >
              Edit user
            </Button>
            <Button
              variant='contained'
              color='error'
              disabled={!selectedRow}
              onClick={handleOpenDeleteDialog}
              sx={{ ml: 2 }}
            >
              Delete user
            </Button>
          </Box>
          <Box sx={{ backgroundColor: 'rgba(265, 265, 265, 0.1)' }}>
            <DataGrid
              sx={{
                color: 'white',
                '& .MuiTablePagination-toolbar ': {
                  color: 'white',
                },
                '& .MuiDataGrid-row.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5) ',
                },
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              getRowId={(row) => {
                return row.ID;
              }}
              rows={data || []}
              columns={columns}
              pageSizeOptions={[10, 20, 50]}
              rowSelectionModel={selectedRow ? [selectedRow.ID] : []}
              onRowSelectionModelChange={handleSelectionChange}
            />
          </Box>
          <GamesModal
            open={open}
            isAdd={isAdd}
            isEdit={isEdit}
            handleClose={handleClose}
            submit={handleSubmit}
            isLoading={isLoadingButton}
            rowData={selectedRow || {}}
          ></GamesModal>
        </Card>
      </Box>
    )
  );
}
