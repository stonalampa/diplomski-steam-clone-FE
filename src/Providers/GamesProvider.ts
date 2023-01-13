import { BackendApi } from '../helpers/BackendApi';

export const GetGames = async (numberOfRecords: number) => {
  return BackendApi.get('games', { params: { records: numberOfRecords } });
};
