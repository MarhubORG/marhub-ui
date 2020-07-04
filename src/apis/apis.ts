import axios from 'axios';

export const marhubUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://www.monadashboard.org:8080'
    : 'http://localhost:8080';

export const marhubApi = axios.create({
  baseURL: marhubUrl,
});
