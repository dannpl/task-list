import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.todo.ootz.com.br',
  headers: {
    apikey: '038DFC6F768ECFE63F3B7E2D035EA69E07908F3177708F5ED2C52A15EB084E77'
  }
});

export default api;
