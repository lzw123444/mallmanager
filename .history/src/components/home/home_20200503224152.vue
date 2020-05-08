<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <img class="logo" src="../../assets/heima.png" alt="图片无法显示" />
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <h2 class="title">电商后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <a class="loginout" href="#" @click.prevent="handleSignout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu :unique-opened="true" :router="true">
          <el-submenu
          :index="''+item1.order"
          v-for="(item1, i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>{{item1.authName}}}</span>
            </template>
            <el-menu-item
            :index="item2.path"
            v-for="(item2, i) in item1.children" :key="i">
              <i class="el-icon-s-custom"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view>
          </router-view>
    </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default{
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.getMenus()
  },
  // newVue之前触发
  beforeCreate () {
    // 获取token
    const token = sessionStorage.getItem('token')
    // 若没有token，返回登录界面
    if (!token) {
      this.$router.push({
        name: 'login'
      })
    }
    // 若有token，继续渲染组件
  },
  methods: {
    async getMenus () {
      const res = await this.$http.get('menus')
      console.log(res)
      this.menus = res.data.data
    },
    handleSignout () {
      // 清除token
      sessionStorage.clear()
      // 提示退出
      this.$message.success('退出成功')
      // 返回登录界面
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dcd6;
}

.main {
  background-color: #e9eef3;
}

.title {
  text-align: center;
  line-height: 20px;
}

.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
