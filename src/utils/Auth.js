const BASE_URL = 'https://auth.nomoreparties.co';

function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email, 
      password: data.password
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.status;
  })
  .catch((err) => 
    alert(err));
}; 

function authorize(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email, 
      password: data.password
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.status;
  })
  .catch((err) => 
    alert(err));
}; 

function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.status;
  })
  .catch((err) => 
    alert(err));
}

export default {
  register,
  authorize,
  checkToken
}