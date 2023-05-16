import { USERS_API_REDUCER_KEY, usersApi } from '../providers/UsersProvider';

const userReducers = {
  [USERS_API_REDUCER_KEY]: usersApi.reducer,
};

export default userReducers;
