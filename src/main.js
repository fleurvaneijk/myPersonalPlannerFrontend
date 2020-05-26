import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes.js'
import 'bootstrap/dist/css/bootstrap.css'
import {userService} from "./services/user.service";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (!(to.name === 'login' || to.name === 'signup') && ! userService.isLoggedIn()) next({ name: 'login' })
  else next()
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
