import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/auts/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'phonerep',
    component: () => import(/* webpackChunkName: "about" */ '../views/auts/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/auts/Register.vue')
  },
  {
    path: '/repasswd',
    name: 'repasswd',
    component: () => import(/* webpackChunkName: "about" */ '../views/auts/repasswd.vue')
  },
  {
    path: '/uphonelogin',
    name: 'uphonelogin',
    component: ()=>import(/* webpackChunkName: "about" */ '../views/auts/Login.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu/menu.vue'),
  },
  {
    path: '/big_view',
    name: 'big_view',
    component: () => import(/* webpackChunkName: "about" */ '../views/tryecharts/big_view.vue'),
  },
  {
    path: '/news_dataset_detail',
    name: 'news_dataset_detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu/news_dataset_detail.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
