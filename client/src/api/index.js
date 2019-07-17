import axios from 'axios';

import { BASE_URL } from '../app.constants';
const url = path => `${BASE_URL}/api/${path}`;

export const getUser = () => axios.get(url('user'));

export default { getUser };