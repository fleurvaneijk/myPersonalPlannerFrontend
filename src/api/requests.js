import {authHeader} from "../services/auth.header";

const axios = require('axios').default;
var instance;

makeInstance();

function makeInstance() {
  instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_SERVER,
    timeout: 1000,
    headers: authHeader.getHeader()
  });
}

export const requests = {
  getInstance,
  makeInstance
}
function getInstance() {
  return instance;
}

