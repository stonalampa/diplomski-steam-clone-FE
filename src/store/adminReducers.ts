import { GAMES_API_REDUCER_KEY, gamesApi } from '../providers/GamesProvider';
import { ADMIN_USERS_API_REDUCER_KEY, adminUsersApi } from '../providers/UsersProvider';

const adminReducers = {
  [ADMIN_USERS_API_REDUCER_KEY]: adminUsersApi.reducer,
  [GAMES_API_REDUCER_KEY]: gamesApi.reducer,
};

export default adminReducers;
