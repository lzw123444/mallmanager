<template>
  <el-card>
      <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 2.添加角色按钮 -->
    <el-row class="addRoleButton">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="rolesList" style="width: 100%">
         <el-table-column type="expand" width="50">
           <template slot-scope="scope">
             <el-row v-for="(item1,i) in scope.row.children" :key="i">
               <el-col :span="4">
                 <el-tag @close="deleteRight(scope.row,item1.id)" closable type="success">{{item1.authName}}</el-tag>
                 <i class="el-icon-arrow-right"></i>
               </el-col>
               <el-col :span="20">
                 <el-row v-for="(item2,i) in item1.children" :key="i">
                   <el-col :span="4">
                     <el-tag @close="deleteRight(scope.row,item2.id)" closable type="info">{{item2.authName}}
                     </el-tag>
                     <i class="el-icon-arrow-right"></i>
                   </el-col>
                   <el-col :span="20">
                     <el-tag @close="deleteRight(scope.row,item3.id)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">
                       {{item3.authName}}
                     </el-tag>
                   </el-col>
                 </el-row>
               </el-col>
             </el-row>
             <!-- 无权限的提示 -->
             <span v-if="scope.row.children.length===0">未分配权限</span>
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
              @click="showRoleRightDiog(scope.row)">
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
        <!-- :default-expanded-keys="[2, 3]"
             :default-checked-keys="arrCheck" -->
       <!-- 显示选择权限对话框 -->
       <el-dialog title="选择权限" :visible.sync="dialogFormVisibleRight">
          <el-tree
             :data="treeRightList"
             show-checkbox
             node-key="id"
             :default-expanded-keys="arrexpand"
             :default-checked-keys="arrCheck"
             :props="defaultProps">
           </el-tree>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
           <el-button type="primary" @click="setRoleRight ()">确 定</el-button>
         </div>
      </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      treeRightList: [],
      rolesList: [],
      dialogFormVisibleRight: false,
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      arrexpand: [],
      arrCheck: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    //   设置角色权限
    async setRoleRight () {
      this.dialogFormVisibleRight = false
    },
    async showRoleRightDiog (role) {
      const res = await this.$http.get(`rights/tree`)
      console.log(res)
      this.treeRightList = res.data.data
      //  获取所有权限id
      let allRoleId = []
      this.treeRightList.forEach(item1 => {
        // allRoleId.push(item1.id)
        item1.children.forEach(item2 => {
        //   allRoleId.push(item2.id)
          item2.children.forEach(item3 => {
            allRoleId.push(item3.id)
          })
        })
      })
      this.arrexpand = allRoleId
      //  获取当前角色的权限id
      let currRightId = []
      role.children.forEach(item1 => {
        // allRoleId.push(item1.id)
        item1.children.forEach(item2 => {
        //   allRoleId.push(item2.id)
          item2.children.forEach(item3 => {
            currRightId.push(item3.id)
          })
        })
      })
      this.arrCheck = currRightId
      this.dialogFormVisibleRight = true
    },
    //  删除角色权限
    async deleteRight (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      role.children = res.data.data
      //  this.getRoleList()
    },
    // 获得角色列表
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
