import axios from '@/utils/request'
import { getToken } from '@/utils/token'

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
// 频道-获取所有频道
export const getAllChannelLsAPI = () => axios({
  url: '/v1_0/channels',
  methods: 'GET'
})

// 登录接口
// axios内部，会把参数对象转成json字符串格式发送到后台
// axios内部，会自动携带请求参数（headers）里Content-Type:'application/json'帮你添加好
export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 获取用户选择的频道
// 用户没有登录，默认返回后台设置的默认频道列表，不强制登录
export const getUserChannelsAPI = () => axios({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken}`
  }
})
// 获取所有的文章列表
// eslint-disable-next-line camelcase
export const getAllArticleListAPI = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  methods: 'GET',
  headers: {
    Authorization: `Bearer ${getToken}`
  },
  params: { // 这里的参数axios会帮你拼接在URL？后面（这就叫查询字符串）
    channel_id,
    timestamp
  }
})
