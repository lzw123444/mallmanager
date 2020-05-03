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
           <el-input @clear="resetUsers()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
             <el-button @click="searchUsers()" slot="append" icon="el-icon-search"></el-button>
           </el-input>
           <el-button  @click="addUsersDio()" type="primary">添加用户</el-button>
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
               <el-switch
               v-model="scope.row.mg_state"
               active-color="#13ce66"
               inactive-color="#ff4949"
               @change="changeMg_state(scope.row)">
               </el-switch>
             </template>
         </el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditUserDiog(scope.row)"
              ></el-button>
              <el-button
              size="mini"
              plain type="success"
              icon="el-icon-check"
              circle
              @click="showRevisedUserRoleDiog(scope.row)">
              </el-button>
              <el-button
              size="mini"
              plain type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteUser(scope.row.id)">
              </el-button>
            </template>
         </el-table-column>
       </el-table>
       <!-- 4.分页 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
    </el-pagination>
    <!-- 5.添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="密 码" label-width="100">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" label-width="100">
          <el-input v-model="form.email" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="电话" label-width="100">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
           <el-button type="primary" @click="addUsers()">确 定</el-button>
         </div>
      </el-dialog>
   <!-- 6.修改用户 -->
      <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="邮箱" label-width="100">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="电话" label-width="100">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
      </el-dialog>
     <!-- 7.修改用户角色 -->
      <el-dialog title="修改用户角色" :visible.sync="dialogFormVisibleRole">
        <el-form :model="form">
          <el-form-item label="用户名:" label-width="100">
            {{currusername}}
          </el-form-item>
          <el-form-item label="角色:" label-width="100">
            <el-select v-model="currUserRoleId" >
              <el-option label="请选择" :value="-1" ></el-option>
              <el-option :label="item.roleName" :value="item.id"
              v-for= "(item,i) in userRoles" :key="i" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="changeUserRole()">确 定</el-button>
        </div>
      </el-dialog>
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
      userlist: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currusername: '',
      currUserRoleId: '',
      userRoles: [],
      currUserId: ''
    }
  },
  // 钩子函数，用于调用getUserList方法
  created () {
    this.getUserList()
  },
  methods: {
    async changeUserRole () {
      this.dialogFormVisibleRole = false
      const res = await this.$http.put(`users/${this.currUserId}/role`,
        {rid: this.currUserRoleId})
      // console.log(res)
      const {meta: { msg, status }} = res.data
      if (status === 200) {
        // 提示更新成功
        this.$message.success(msg)
      }
    },
    // 显示修改用户角色的对话框
    async showEditUserRoleDiog (currUser) {
      this.dialogFormVisibleRole = true
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.userRoles = res.data.data
      const res2 = await this.$http.get(`users/${currUser.id}`)
      // console.log(res2)
      this.currusername = res2.data.data.username
      this.currUserRoleId = res2.data.data.rid
      this.currUserId = currUser.id
    },
    // 修改用户状态
    async changeMg_state (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
    },
    // 显示修改用户信息
    showEditUserDiog (userdata) {
      this.dialogFormVisibleEdit = true
      this.form = userdata
    },
    async editUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      this.dialogFormVisibleEdit = false
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 更新视图
        this.getUserList()
        // 提示更新成功
        this.$message.success(msg)
      }
    },
    // 删除用户
    deleteUser (userId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // 以传参形式获得用户id
      }).then(async () => {
        const res = await this.$http.delete(`users/${userId}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          // 回到pagenum=1
          this.pagenum = 1
          // 更新视图
          this.getUserList()
          // 提示信息
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 显示添加用户对话框
    addUsersDio () {
      this.dialogFormVisibleAdd = true
      this.form = {}
    },
    // 添加用户方法
    async addUsers () {
      const res = await this.$http.post('users', this.form)
      console.log(res)
      const {meta: {status, msg}} = res.data
      // 关闭弹框
      this.dialogFormVisibleAdd = false
      if (status === 201) {
        // 提示创建成功
        this.$message.success(msg)
        // 更新视图
        this.getUserList()
        // 清空弹框
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击清空按钮时重置所有用户
    resetUsers () {
      this.getUserList()
    },
    // 搜索用户的方法
    searchUsers () {
      this.getUserList()
    },
    // 分页的方法
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()
    },
    // 获取用户列表
    async getUserList () {
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // 解构赋值，获取数据
      const {data: {users, total}, meta: {status}} = res.data
      if (status === 200) {
        // 给数据列表赋值
        this.userlist = users
        // 给total赋值
        this.total = total
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
