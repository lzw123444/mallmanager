<template>
    <!-- 引入卡片作为小容器 -->
    <el-card class="cardSize">
      <!-- 1.面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 2.搜索 -->
      <el-row class="inputRow">
        <el-col >
           <el-input  placeholder="请输入内容" v-model="query" class="inputSearch">
             <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
           <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 3.表格 -->
       <el-table :data="tableData" style="width: 100%">
         <el-table-column label="#"  type="index">
         </el-table-column>
         <el-table-column prop="name" label="姓名" width="180">
         </el-table-column>
         <el-table-column prop="e-mail" label="邮箱" width="180">
         </el-table-column>
         <el-table-column prop="name" label="电话">
         </el-table-column>
         <el-table-column prop="name" label="创建日期">
         </el-table-column>
          <el-table-column prop="name" label="用户状态">
         </el-table-column>
          <el-table-column prop="name" label="操作">
         </el-table-column>
       </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  // 钩子函数，用于调用getUserList方法
  created () {
    this.getUserList()
  },
  methods: {
  // 获取用户列表
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
    }
  }
}
</script>

<style>
.inputSearch {
  width: 300px;
}
.inputRow {
  margin-top: 20px;
}
.cardSize{
  height: 100%;
}
</style>
