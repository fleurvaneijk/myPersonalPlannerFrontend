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
  getAgendaLink,
  changeAgendaLink,
  getUserFromLocalstorage
};

function login(username, password) {
  return requests.getInstance().post('/api/Authentication/authenticate', {
    Username: username,
    Password: password
  }).then(response => {
      if (response.data) {
        response.data.authdata = window.btoa(username + ':' + password);
        setUserInLocalStorage(response.data);
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
      setUserInLocalStorage(response.data);
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
  removeFromLocalStorage()
  requests.makeInstance();
  // location.reload(true)
}

function getUsername() {
  let user = getUserFromLocalstorage()
  return user.username;
}

function getAgendaLink() {
  let user = getUserFromLocalstorage()
  return user.agendaLink;
}

function changeAgendaLink(agendaLink) {
  console.log(agendaLink);
  return requests.getInstance().post('/api/User/changeagenda', {
    AgendaLink: agendaLink
  }).then(()=>{
    let user = getUserFromLocalstorage()
    user.agendaLink = agendaLink;
    setUserInLocalStorage(user);
  });
}

function getUserFromLocalstorage(){
  if (localStorage)
    return JSON.parse(localStorage.getItem('user'));
  return null;
}

function setUserInLocalStorage(user) {
  if (localStorage)
    localStorage.setItem("user", JSON.stringify(user));
}

function removeFromLocalStorage() {
  if (localStorage)
    localStorage.clear();
}

function isLoggedIn() {
  let user = getUserFromLocalstorage()
  return user != null;
}
