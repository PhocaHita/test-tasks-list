import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "add" */ '../views/Edit.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
