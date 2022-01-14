import Vue from "vue";
import VueRouter from "vue-router";
import home from './pages/home.vue';
import login from './pages/login.vue';
import masterHome from './pages/masterHome.vue';
import masterNewDiary from './pages/masterNewDiary.vue';

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
    },
    {
        path: '/masterHome',
        name: 'masterHome',
        component: masterHome
    },
    {
        path: '/masterNewDiary',
        name: 'masterNewDiary',
        component: masterNewDiary
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;