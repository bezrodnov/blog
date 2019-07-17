import axios from 'axios';

import { BASE_URL } from '../app.constants';
const url = path => `${BASE_URL}/api/${path}`;

const loadUser = () => axios.get(url('auth/user'));

const login = ({ email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  return axios.post(url('auth'), body, config);
};

const register = user => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(user);

  return axios.post(url('users'), body, config);
};

export default { loadUser, login, register };