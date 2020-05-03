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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-s-custom"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-s-custom"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-user"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-s-promotion"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-s-promotion"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-s-promotion"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-s-check"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-s-data"></i>
              <span>数据报表</span>
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
