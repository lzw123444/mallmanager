// 插件模块
// 导入axios库
import axios from 'axios'
// 声明一个对象
const myHttpServer = {}
// 将axios写为一个vue的插件
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})
myHttpServer.install = (vue) => {
  // 设置接口基准地址
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
  //  添加实例方法
  vue.prototype.$http = axios
}
// 导出写好的插件
export default myHttpServer
