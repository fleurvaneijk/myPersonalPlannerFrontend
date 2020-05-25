import {authHeader} from "../services/auth.header";

const axios = require('axios').default;
const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_SERVER,
  timeout: 1000,
  headers: authHeader.getHeader()
});

export const requests = {
  getInstance
}
function getInstance() {
  return instance;
}

