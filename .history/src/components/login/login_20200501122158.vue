<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // handleLogin () {
    //   this.$http.post('login', this.formData).then(res => {
    // 希望让异步代码看起来像同步代码---async和await
    async handleLogin () {
      const res = await this.$http.post('login', this.formData)
      // 解构赋值，取出res中数据
      const {
        data,
        meta: {msg, status}
      } = res.data
      if (status === 200) {
        // 登陆成功
        // 保存token
        console.log(data.token)
        sessionStorage.setItem('token', data.token)
        // 跳转home
        this.$router.push({name: 'home'})
        // 提示成功
        this.$message.success(msg)
      } else {
      // 提示不成功
        this.$message.error(msg)
      }
    }
  }
}
</script>
<style>
.login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-wrap .login-form{
    width: 30%;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 30px;
}
.login-wrap .login-btn{
      width: 100%;
}
</style>
