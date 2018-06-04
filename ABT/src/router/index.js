import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/login'
import register from '@/components/register'
Vue.use(Router)
const router = new Router({
 mode: 'history',
 routes: [{
   path: '/',
   name: 'home',
   component: Home,
   meta: {
    requiresAuth: true
   }
  },
  {
   path: '/Home',
   name: 'Home',
   component: Home,
  },
  {
   path: '/login',
   name: 'login',
   component: login,
  },
  {
   path: '/register',
   name: 'register',
   component: register,
  },
 ]
});
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
 //判断要去的路由有没有requiresAuth
 if (to.meta.requiresAuth) {
  if (store.state.token != null) {
   next();
  } else {
   next({
    path: '/login',
    query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
   });
  }
 } else {
  next();
 }
});
export default router;