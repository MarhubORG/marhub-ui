import axios from 'axios';

export const marhubUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://35.171.160.79:5000'
    : 'http://localhost:8080';

export const marhubApi = axios.create({
  baseURL: marhubUrl,
});
