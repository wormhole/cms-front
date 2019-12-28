import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api';

export default axios;