import axios from 'axios';

export const marhubUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://34.227.15.55:8080/'
    : 'http://localhost:8080';

export const marhubApi = axios.create({
  baseURL: marhubUrl,
});
