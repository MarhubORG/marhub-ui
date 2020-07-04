import axios from 'axios';

// export const marhubUrl =
//   process.env.NODE_ENV === 'production'
//     ? 'http://localhost:8080/'
//     : 'http://localhost:8080';

export const marhubUrl = 'http://localhost:8080';

export const marhubApi = axios.create({
  baseURL: marhubUrl,
});
