<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teahome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/outcome' }"
        >评教列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item label="教师姓名">{{
          teacher
        }}</el-descriptions-item>
        <el-descriptions-item label="讲授课程">{{
          cl_name
        }}</el-descriptions-item>
        <el-descriptions-item label="开课院系">{{
          cl_school
        }}</el-descriptions-item>
        <el-descriptions-item label="评教人员">学生</el-descriptions-item>
        <el-descriptions-item label="教学建议信息"
          >共计{{ advnum }}条</el-descriptions-item
        >
        <el-descriptions-item label="参评人数">{{ num }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="chart-card">
      <div slot="header">
        <span>各分段统计</span>
      </div>
      <div id="main" class="chart" style="width: 800px; height: 300px"></div>
    </el-card>

    <el-card>
      <div slot="header">
        <span>建议</span>
      </div>
      <el-table
        :data="list"
        border
        max-height="500px"
        style="width: 100%"
        :show-header="false"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="adv" label="建议"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent])
export default {
  data () {
    return {
      // 指定图表的配置项和数据
      option: {
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['60以下', '60-70', '70-80', '80-90', '90-100']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [1, 2, 3, 4, 5]
          }
        ]
      },
      queryInfo: {
        id: '3'
      },
      teacher: '空',
      cl_name: '空',
      cl_school: '空',
      num: 0,
      advnum: 0,
      list: [
        { adv: '空' }
      ],
      bar: []
    }
  },
  created () {
    this.queryInfo.id = window.sessionStorage.getItem('id')
    console.log(this.queryInfo.id)
    if (this.id) return this.$message.error('获取选课信息失败,请重试尝试！')
    this.getDetails()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
      this.$http.get('tea/charts', { params: this.queryInfo })
        .then((res) => {
          this.bar = res.data.bar
          myChart.setOption({
            series: [
              {
                type: 'bar',
                data: this.bar
              }
            ]
          })
        })
    },
    async getDetails () {
      const { data: res } = await this.$http.get('tea/details', { params: this.queryInfo })
      if (res.status === 'failed') return this.$message.error('获取详细信息失败！请重新尝试')
      this.teacher = res.teacher
      this.cl_name = res.cl_name
      this.cl_school = res.cl_school
      this.num = res.num
      this.advnum = res.advnum
      this.list = res.list
    }
  }
}
</script>

<style scoped>
.chart-card {
  width: 100%;
  text-align: center;
}
.chart {
  margin: 0 auto;
}
</style>
