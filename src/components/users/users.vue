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
       <el-table :data="userlist" style="width: 100%">
         <el-table-column label="#"  type="index">
         </el-table-column>
         <el-table-column prop="username" label="姓名" width="180">
         </el-table-column>
         <el-table-column prop="email" label="邮箱" width="180">
         </el-table-column>
         <el-table-column prop="mobile" label="电话">
         </el-table-column>
         <el-table-column  label="创建日期">
           <!-- 如果单元格内容现实的不是字符串（文本），需要给被显示的内容外层包裹一个template标签 -->
           <template slot-scope="scope">
             <!-- template内部要用数据，需设置一个slot-scope属性,该属性的值为要用数据的数据源userlist，该数据源为el-table绑定的数据userlist -->
             <!-- scope.row是数组中的每个对象 -->
             <!-- slot-scope的值会自动去找上一级最外层标签的数据源作为自己的值 -->
            {{scope.row.create_time|fmtdate}}
           </template>
         </el-table-column>
         <el-table-column  label="用户状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
               </el-switch>
             </template>
         </el-table-column>
          <el-table-column prop="name" label="操作">
            <template>
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
            </template>
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
      total: 0,
      userlist: []
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
      // 解构赋值，获取数据
      const {data: {users, total}, meta: {msg, status}} = res.data
      if (status === 200) {
        // 给数据列表赋值
        this.userlist = users
        // 给total赋值
        this.total = total
        // 提示信息
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
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
