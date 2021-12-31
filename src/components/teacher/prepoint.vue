<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teahome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/preview'}">预览</el-breadcrumb-item>
            <el-breadcrumb-item>分段详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item label="分段">{{queryInfo.interval}}</el-descriptions-item>
                <el-descriptions-item label="人数">{{total}}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-table :data="list" style="width: 100%">
            <el-table-column label="院系" prop="cl_school"></el-table-column>
            <el-table-column label="课程编号" prop="cl_cid"></el-table-column>
            <el-table-column label="课程名称" prop="cl_name"></el-table-column>
            <el-table-column label="班级号" prop="cl_id"></el-table-column>
            <el-table-column label="教师" prop="teacher"> </el-table-column>
            <el-table-column label="参评人数" prop="num"> </el-table-column>
            <el-table-column label="综合得分" prop="point"> </el-table-column>
            <!-- <el-table-column label="详情">
                <template slot-scope="btnscope">
                    <el-button type="text" @click="todetails(btnscope.row.id)">查看详情</el-button>
                </template>
            </el-table-column> -->
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
        interval: '',
        pagenum: 1,
        pagesize: 10
      },
      list: [],
      total: 0
    }
  },
  created () {
    this.queryInfo.interval = this.$route.params.name
    this.getInterval()
  },
  methods: {
    async getInterval () {
      const { data: res } = await this.$http.get('tea/interval', { params: this.queryInfo })
      if (res.status === 'failed') return this.$message.error('获取选课信息失败！')
      this.list = res.list
      this.total = res.total
    },
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getInterval()
    },
    handleCurrentChange (newpage) {
      // console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getInterval()
    }
  }
}
</script>
<style scoped>

</style>
