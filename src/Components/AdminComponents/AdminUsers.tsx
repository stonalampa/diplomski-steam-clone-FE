import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../providers/UsersProvider';
import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { IObject } from '../Common/CommonTypes';
import UsersModal from './UsersModal';

const columns = [
  { field: 'ID', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'dateOfBirth', headerName: 'Date of birth', width: 150 },
  { field: 'isActive', headerName: 'Active', width: 75 },
  { field: 'isAdmin', headerName: 'Admin', width: 75 },
];

export default function AdminUsers() {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
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
      const user = data?.find((user) => {
        return user.ID === rowSelectionModel[0];
      });
      setSelectedRow(user);
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
        result = await createUser(data);
      } else if (isEdit) {
        msg = 'UPDATE';
        result = await updateUser(data);
      } else {
        msg = 'DELETE';
        result = await deleteUser(data.ID);
      }

      if (result.error) {
        enqueueSnackbar(`Error while "${msg}" user`, { variant: 'error' });
      } else {
        refetch();
        enqueueSnackbar(`User successfully ${msg}ED`, { variant: 'success' });
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
      enqueueSnackbar(`Error while "${msg}" user`, { variant: 'error' });
    }
  };

  const handleClose = () => {
    setIsAdd(false);
    setIsEdit(false);
    setOpen(false);
  };

  return (
    { isLoading } && (
      <Container>
        <Grid>
          <Grid item>
            <Button onClick={handleOpenAddNewDialog}>Add new user</Button>
            <Button disabled={!selectedRow} onClick={handleOpenEditDialog}>
              Edit user
            </Button>
            <Button disabled={!selectedRow} onClick={handleOpenDeleteDialog}>
              Delete user
            </Button>
          </Grid>
          <Grid item>
            <DataGrid
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
          </Grid>
        </Grid>
        <UsersModal
          open={open}
          isAdd={isAdd}
          isEdit={isEdit}
          handleClose={handleClose}
          submit={handleSubmit}
          isLoading={isLoadingButton}
          rowData={selectedRow || {}}
        ></UsersModal>
      </Container>
    )
  );
}
