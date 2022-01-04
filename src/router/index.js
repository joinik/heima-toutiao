import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'

Vue.use(VueRouter)







// 清空路由规则
const routes = [
    // 带有 name名称的路由规则，叫做“命名路由”
    {path: '/login', component: Login, name: 'login'}
];



const router = new VueRouter({
    routes
})

export default router;
    
