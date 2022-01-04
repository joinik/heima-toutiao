import Vue from 'vue'
import Vuex from 'vuex'


// 按需要导入 API 接口
import {getUserInfoAPI, getUserProfileAPI} from '@/api/userAPI.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
         // 用来存储token信息的对象，将来这个对象中会包含两个属性 {token, refresh_token}
        tokenInfo: {token: '', refresh_token: ''},
        // 用户的基本信息
        userInfo: {},
        // 用户的简介
        userProfile: {}

    },
    mutations: {
        updateTokenInfo(state, payload) {
            state.tokenInfo = payload
            
            // 只要更新tokeInfo对象，就调用
            this.commit('saveStateToStorage')
        }, 
        saveStateToStorage(state) {
            // 把state 持久化存储到本地
            localStorage.setItem('state', JSON.stringify(state))
        },
        // 更新用户的基本信息， 
        updateUserInfo(state, payload) {
            state.userInfo = payload

        },
        // 更新用户的简介信息
        updateUserProfile(state, payload) {
            state.userProfile = payload
        },
        // 清空state 和 用户的信息
        cleanState(state) {
            state.tokenInfo = {}
            state.userInfo = {}
            state.userProfile = {}
        }
    },
    actions: {
        // 初始化用户的基本信息
        async initUserInfo(ctx) {
            const { data: resp } = await getUserInfoAPI()
            if (resp.message == "OK") {
                ctx.commit('updateUserInfo', resp.data)
            }
        },

        async initUserProfile(ctx) {
            const { data: resp} = await getUserProfileAPI()
            if (resp.message == "OK") {
                ctx.commit('updateUserProfile', resp.data)
            }
        }
    },
    getters: {
        avatar(state) {
            return state.userInfo.photo || 'https://img.yzcdn.cn/vant/cat.jpeg'
        }
    },
    modules: {

    } 

})