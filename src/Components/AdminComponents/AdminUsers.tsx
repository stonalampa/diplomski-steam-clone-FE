import { DataGrid } from '@mui/x-data-grid';
import { useGetAllUsersQuery } from '../../providers/UsersProvider';

const columns = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'dateOfBirth', headerName: 'Date of birth', width: 150 },

  { field: 'isActive', headerName: 'Active', width: 150 },
  { field: 'isAdmin', headerName: 'Admin', width: 150 },
];

export default function AdminUsers() {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        getRowId={(row) => {
          return row.ID;
        }}
        rows={data || []}
        columns={columns}
        checkboxSelection
      />
    </div>
  );
}
