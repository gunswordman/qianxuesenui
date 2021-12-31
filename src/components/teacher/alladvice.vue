<template>
<div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teahome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>所有建议</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="advlist" style="width: 100%">
      <el-table-column label="教师" prop="teacher" width="90px"></el-table-column>
      <el-table-column label="课程号" prop="cl_cid" width="90px"></el-table-column>
      <el-table-column label="班级" prop="cl_id" width="50px"></el-table-column>
      <el-table-column label="课程名" prop="cl_name" width="180px"></el-table-column>
      <el-table-column label="评价人" prop="st_name" width="90px"></el-table-column>
      <el-table-column label="学号" prop="st_id" width="130px"></el-table-column>
      <el-table-column label="评分" prop="point" width="50px"></el-table-column>
      <el-table-column label="建议" prop="adv"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="sizes"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>
<script>
export default {
  data () {
    return {
      sizes: [10, 20, 50, 100],
      queryInfo: {
        // 当前页码和大小
        pagenum: 1,
        pagesize: 10
      },
      advlist: [],
      total: 0
    }
  },
  created () {
    this.getadvList()
  },
  methods: {
    async getadvList () {
      const res = await this.$http.get('tea/advlist', { params: this.queryInfo })
      if (res.data.status === 'failed') return this.$message.error('获取建议信息失败！')
      this.advlist = res.data.list
      this.total = res.data.total
    },
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getadvList()
    },
    handleCurrentChange (newpage) {
      this.queryInfo.pagenum = newpage
      this.getadvList()
    }
  }
}
</script>
<style>

</style>
