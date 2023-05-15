import { DataGrid } from '@mui/x-data-grid';
import { useGetAllGamesQuery } from '../../providers/GamesProvider';

const columns = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'developer', headerName: 'Developer', width: 150 },
  { field: 'description', headerName: 'Description', width: 150 },
  { field: 'score', headerName: 'Score', width: 150 },
  { field: 'numberOfScores', headerName: 'Number of scores', width: 150 },
  { field: 'screenshots', headerName: 'Screenshots', width: 150 },
  { field: 'discount', headerName: 'Discount', width: 150 },
  { field: 'discountExpDate', headerName: 'Discount exp date', width: 150 },
  { field: 'releaseDate', headerName: 'Release date', width: 150 },
];

export default function AdminUsers() {
  const { data, isLoading, isError, refetch } = useGetAllGamesQuery();

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
