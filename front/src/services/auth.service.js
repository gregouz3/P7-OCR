import axios from 'axios';


const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
  deleteAccount(id) {
    return axios.delete(API_URL + `${id}`)
  }
  deleteAll() {
    return  axios.delete(API_URL)
  }
  mvAccount(id, data) {
    return axios.put(API_URL + `${id}`, data)
  }
  findAll() {
    return axios.get(API_URL )
  }
  findOne(id) {
    return axios.get(API_URL + `${id}`)
  }
 
}

export default new AuthService();