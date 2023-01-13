import axios from 'axios';

export const BackendApi = axios.create({
  baseURL: 'http://localhost:3030/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
