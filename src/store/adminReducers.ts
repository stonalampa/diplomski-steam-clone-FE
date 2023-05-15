import { GAMES_API_REDUCER_KEY, gamesApi } from '../providers/GamesProvider';
import { USERS_API_REDUCER_KEY, usersApi } from '../providers/UsersProvider';

const adminReducers = {
  [USERS_API_REDUCER_KEY]: usersApi.reducer,
  [GAMES_API_REDUCER_KEY]: gamesApi.reducer,
};

export default adminReducers;
