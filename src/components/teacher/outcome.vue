<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teahome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评教列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="院系" prop="cl_school"></el-table-column>
      <el-table-column label="课程编号" prop="cl_cid"></el-table-column>
      <el-table-column label="课程名称" prop="cl_name"></el-table-column>
      <el-table-column label="教师" prop="teacher"> </el-table-column>
      <el-table-column label="参评人数" prop="num"> </el-table-column>
      <el-table-column label="综合得分" prop="point"> </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="btnscope">
          <el-button type="text" @click="todetails(btnscope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
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
        pagenum: 1,
        pagesize: 10
      },
      list: [],
      total: null
    }
  },
  created () {
    if (sessionStorage.getItem('outcomepagenum') != null) {
      this.queryInfo.pagenum = window.sessionStorage.getItem('outcomepagenum')
    }
    this.getList()
  },
  methods: {
    todetails (id) {
      window.sessionStorage.setItem('id', id)
      window.sessionStorage.setItem('outcomepagenum', this.queryInfo.pagenum)
      this.$router.push('/details')
    },
    async getList () {
      const res = await this.$http.get('tea/list', { params: this.queryInfo })
      if (res.data.status === 'failed') return this.$message.error('获取选课信息失败！')
      this.list = res.data.list
      this.total = res.data.total
    },
    handleCurrentChange (newpage) {
      // console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>>
