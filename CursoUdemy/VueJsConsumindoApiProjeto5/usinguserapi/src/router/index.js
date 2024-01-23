import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import UsersView from '../views/UsersView.vue';
import axios from 'axios';

function adminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    const req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    console.log(req);
    axios.post('http://localhost:8080/validate', {}, req).then(res => {
      console.log(res);
      next();
    }).catch(error => {
      console.error(error);
      next('/login');
    })
  } else {
    next('/login');
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: UsersView,
    beforeEnter: adminAuth
  },
  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
