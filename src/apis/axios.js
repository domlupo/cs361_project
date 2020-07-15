import axios from 'axios';
import { isDevelopment } from '../util/util';

// baseURL: replace with backend url
export default axios.create({
  baseURL: isDevelopment() ? 'http://localhost:3001' : '/',
  headers: {
    headerType: 'example header type',
  },
});
