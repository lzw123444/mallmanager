<template>
  <el-card>
      <!-- 2.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 2.表格 -->
    <el-table :data="rolesList" style="width: 100%">
         <el-table-column label="#"  type="index">
         </el-table-column>
         <el-table-column prop="roleName" label="角色名称" width="180">
         </el-table-column>
         <el-table-column prop="roleDes" label="角色描述" width="180">
         </el-table-column>
          <el-table-column  label="操作">
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
              @click="showEditUserRoleDiog(scope.row)">
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.rolesList = res.data.data
    }
  }
}
</script>

<style>

</style>
