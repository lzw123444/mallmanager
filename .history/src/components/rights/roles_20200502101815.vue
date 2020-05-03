<template>
  <el-card>
      <!-- 2.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 添加角色按钮 -->
    <el-row class="addRoleButton">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 2.表格 -->
    <el-table :data="rolesList" style="width: 100%">
         <el-table-column type="expand" width="50">
           <template slot-scope="scope">
              <el-row v-for="(item1,i) in scope.row.children" :key="i">
                  <el-col :span="4">
                      <el-tag  closable>{{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                      <el-row v-for="(item2,i) in item1.children" :key="i">
                          <el-col :span="4">
                              <el-tag  closable>{{item2.authName}}</el-tag>
                          </el-col>
                          <el-col :span="20"></el-col>
                      </el-row>
                  </el-col>
              </el-row>
           </template>
         </el-table-column>
         <el-table-column label="#"  type="index" width="150">
         </el-table-column>
         <el-table-column prop="roleName" label="角色名称" width="250">
         </el-table-column>
         <el-table-column prop="roleDesc" label="角色描述" width="250">
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
.addRoleButton{
  margin-top: 20px;
}
</style>
