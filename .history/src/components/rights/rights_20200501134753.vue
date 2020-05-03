<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 2.权限列表表格 -->
    <el-table
    height="600px"
    :data="rightsList"
    border
    style="width: 100%">
      <el-table-column type="index" label="#" width="100">
      </el-table-column>
      <el-table-column prop="rightsList.authName" label="权限名称" width="280">
      </el-table-column>
      <el-table-column prop="rightsList.path" label="路径" >
      </el-table-column>
      <el-table-column prop="rightsList.level" label="层级" width="280">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const res = await this.$http.get(`rights/list`)
      console.log(res)
      this.rightsList = res.data.data
    }
  }
}
</script>

<style>

</style>
