import axios from 'axios';

export default axios.create({
  baseURL: 'http://37.46.165.87:8080/',
  withCredentials: true,
});
