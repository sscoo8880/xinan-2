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
    path: '/menu4manager',
    name: 'menu4manager',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4manager/menu4manager.vue'),
  },
  {
    path: '/menu4user',
    name: 'menu4user',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user/menu4user.vue'),
  },
  {
    path: '/menu4lessee',
    name: 'menu4lessee',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4lessee/menu4lessee.vue'),
  },
  {
    path: '/menu4answer',
    name: 'menu4answer',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4answer/menu4answer.vue'),
  },
  {
    path: '/design_questionnaire',
    name: 'design_questionnaire',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user/design_questionnaire.vue'),
  },
  {
    path: '/user_manage_answer',
    name: 'user_manage_answer',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user/user_manage_answer.vue'),
  },
  {
    path: '/to_answer_questionnaire',
    name: 'to_answer_questionnaire',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4answer/to_answer_questionnaire.vue'),
  },
  {
    path: '/user_qTemplate_detail',
    name: 'user_qTemplate_detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user/user_qTemplate_detail.vue'),
  },
  {
    path: '/echartsPage',
    name: 'echartsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/tryecharts/echartsPage.vue'),
  },
  {
    path: '/send_url',
    name: 'send_url',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/menu4user/user_send_url.vue'),
  },
  {
    path: '/test4',
    name: 'test4',
    component: () => import(/* webpackChunkName: "about" */ '../views/trysounds/test4.vue'),
  },
  {
    path: '/wjll',
    name: 'wjll',
    component: () => import(/* webpackChunkName: "about" */ '../views/trymenu2/wenjuanliulan.vue'),
  },
  // 用户界面分析问卷中分析操作都得展开新的页面

  //   //测试用页面
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/auts/test.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
