import axios from 'axios';
import { isDevelopment } from '../util/util';

class API {
  constructor() {
    this.instance = axios.create({
      baseURL: isDevelopment() ? 'http://localhost:3001/api' : '/api',
    });
  }

  setAuthToken = (token) => {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  clearAuthToken = () => {
    delete this.instance.defaults.headers.common.Authorization;
  };
}

export default new API();
