import axios from 'axios';

export const marhubUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://monabot-api-staging.herokuapp.com'
    : 'http://localhost:8080';

export const marhubApi = axios.create({
  baseURL: marhubUrl,
});
