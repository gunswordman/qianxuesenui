<template>
  <div>
    <el-table height="250" border style="width: 100%">
      <el-table-column label="课程编号"></el-table-column>
      <el-table-column label="课程名称"></el-table-column>
      <el-table-column label="教师"> </el-table-column>
      <el-table-column label="参评人数"> </el-table-column>
      <el-table-column label="评教状态"> </el-table-column>
      <el-table-column label="综合得分"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.pagenun"
      :page-size="queryInfo.pagesize"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        // 当前页码
        pagenun: 1,
        pagesize: 2
      },
      list: [],
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const res = this.$http.get('tea/list', { params: this.queryInfo })
      if (res.data.status === 'failed') return this.$message.error('获取选课信息失败！')
      this.list = res.data.list
    },
    handleSizeChange (newsize) {
      console.log(newsize)
    },
    handleCurrentChange (newpage) {
      console.log(newpage)
    }
  }
}
</script>

<style scoped>
</style>>
