// 插件模块
// 导入axios库
import axios from 'axios'
// 声明一个对象
const myHttpServer = {}
// 将axios写为一个vue的插件
myHttpServer.install = (vue) => {
  // 设置接口基准地址
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
  //  添加实例方法
  vue.prototype.$http = axios
}
// 导出写好的插件
export default myHttpServer
