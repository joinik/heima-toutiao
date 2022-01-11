import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Login/Main.vue'
import Home from '@/views/Login/Home.vue'
import User from '@/views/Login/User.vue'
Vue.use(VueRouter)







// 清空路由规则
const routes = [
    // 带有 name名称的路由规则，叫做“命名路由”
    {path: '/login', component: Login, name: 'login'},
    {path: '/', component: Main,
        children: [
            // path 为空的自路由规则，叫做"默认子路由"
            {path: '', component: Home, name: 'home'},
            {path: '/user', component: User, name: 'user'},
        ]
    },

];



const router = new VueRouter({
    routes
})

export default router;
    
