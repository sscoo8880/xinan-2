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
    path: '/menu4user1',
    name: 'menu4user1',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user1/menu4user1.vue'),
  },
  {
    path: '/menu4user2',
    name: 'menu4user2',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user2/menu4user2.vue'),
  },
  {
    path: '/user_qTemplate_detail_user2',
    name: 'user_qTemplate_detail_user2',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user2/user_qTemplate_detail.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
