<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 2.权限列表表格 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const res = await this.$http.get(`rights/list`)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
