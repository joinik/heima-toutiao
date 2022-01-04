import axios from 'axios'
// 从vant 组件库中按需导入 Toast 提示消息组件
import { Toast } from 'vant'
// 导入 vuex 模块
import store from '@/store/index.js'
// 导入 router 模块
import router from '@/router/index.js'


// 这是线上地址
const root = 'http://www.liulongbin.top:8000'


// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  // baseURL: 'http://geek.itheima.net'
  baseURL: root
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...',    // 文本内容
      duration: 0   // 展示时长(ms), 值为0时，toast 不会消失
    })

    // 从vuex 中获取 token的值
    const tokenStr = store.state.tokenInfo.token
    if (tokenStr) {
      // 只有 tokenStr 的值存在，才有必要挂载到请求头的 Authorization 属性中
      config.headers.Authoriztion = 'Bearer ' + tokenStr

    }
    return config
  },
  error => {
    // 请求错误做些什么
    // 隐藏 loading 效果
    Toast.clear()
    return Promise.reject(error)
  }
)

// 响应拦截器中，隐藏loading提示效果
instance.interceptors.response.use(
  response => {
    Toast.clear()
    return response
  },
  error => {
    // 请求错误做些什么
    // 隐藏 loading 效果
    Toast.clear()

    // 从vuex 中获取 refreshToken的 值
    const refreshToken = store.state.tokenInfo.refreshToken
    // 如果 refreshToken 有值 ， 且响应状态码 为401 则应该执行换取 token
    if (error.response.status === 401 && refreshToken) {
      console.log('换取 token的 操作');
      try {
        // 
        const { data: res} = await axios({
          method: 'PUT',
          url: root + '/v1_0/authorizations',
          headers: {
            // 大坑3：Authorization 的值格式必须为 Bearer xxx

            Authoriztion: 'Bearer ' + refreshToken
          }
        })
        console.log('token 换取成功');
        console.log(res)
        // TODO1：用新 token 替换到 vuex 和 localStorage 中的旧 token

        store.commit('updateTokenInfo', {token: res.data.token, refresh_token: refreshToken})

        return request(error.config)
      } catch {
        // 只要能够执行到 catch 中的代码，证明 token 和 refresh_token 都过期了
        store.commit('cleanState')
        // 强制用户跳转到登录页
        router.replace('/login?pre=' + router.currentRoute.fullPath)
      }
    }
    return Promise.reject(error)
  }
)
export default instance