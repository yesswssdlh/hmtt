import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/LoginView.vue')
const Layout = () => import(/* webpackChunkName: "Layout" */ '@/views/layout/LayoutView.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/home/HomeView.vue')
const User = () => import(/* webpackChunkName: "User" */ '@/views/user/UserView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'user',
        name: 'user',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
