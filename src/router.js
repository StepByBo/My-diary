import Vue from "vue";
import VueRouter from "vue-router";
import home from './pages/home.vue';
import login from './pages/login.vue';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;