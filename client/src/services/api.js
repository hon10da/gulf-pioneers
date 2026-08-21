import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gulf-pioneers-server.vercel.app/api',
  withCredentials: true,
});

export default api;
