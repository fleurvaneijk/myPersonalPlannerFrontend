import {requests} from "../api/requests";

export const userService = {
  login,
  logout,
  isLoggedIn,
  getUsername,
  register,
  changeUsername,
  changePassword,
  deleteAccount,
  //getAll,
};

function login(username, password) {
  return requests.getInstance().post('/api/Authentication/authenticate', {
    Username: username,
    Password: password
  }).then(response => {
      if (response.data) {
        response.data.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(response.data));
        requests.makeInstance();
      }
      return response;
    });
}

function register(username, password) {
  return requests.getInstance().post('/api/User/signup', {
    Username: username,
    Password: password
  }).then(response => {
    if (response.data) {
      response.data.authdata = window.btoa(username + ':' + password);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });
}

function changeUsername(username, password, newUsername) {
  return requests.getInstance().post('/api/User/changeusername', {
    Username: username,
    Password: password,
    NewUsername: newUsername
  }).then(response => {
    if (response.data) {
      logout();
      login(newUsername, password).then(location.reload());
    }
    return response;
  });
}

function changePassword(username, password, newPassword) {
  return requests.getInstance().post('/api/User/changepassword', {
    Username: username,
    Password: password,
    NewPassword: newPassword
  }).then(response => {
    if (response.data) {
      logout();
      login(username, newPassword).then(location.reload());
    }
  });
}

function deleteAccount(username, password) {
  return requests.getInstance().delete('/api/User/deleteaccount', {
    data: {
      Username: username,
      Password: password,
    },
  }).then(() => {
    logout();
  });
}

function logout() {
  localStorage.removeItem('user');
  requests.makeInstance();
  // location.reload(true)
}

function getUsername() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user.username;
}

// function getAll() {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   };
//
//   return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//   if (!response.ok) {
//     if (response.status === 401) {
//       // auto logout if 401 response returned from api
//       logout();
//       location.reload(true);
//     }
//   }
// }

function isLoggedIn() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user != null;
}
