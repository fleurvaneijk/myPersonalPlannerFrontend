import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
