import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.ellabib.se',
  // baseURL: 'http://localhost:3000',
  withCredentials: true,
});
