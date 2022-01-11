import request from '@/utils/request'

// 请求用户频道列表的数据 API 
export const getUserChannelAPI = () => {
    return request.get('/v1_0/user/channels')
}

