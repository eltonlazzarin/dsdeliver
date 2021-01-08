import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dsdeliver-sprint-api.herokuapp.com',
});

export default api;
