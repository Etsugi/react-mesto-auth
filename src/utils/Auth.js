const BASE_URL = 'https://api.kiprin.students.nomoredomains.icu';

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
}; 

function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.status;
  })
}

export default {
  register,
  authorize,
  checkToken
}