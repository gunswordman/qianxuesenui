<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/teahome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预览</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item label="应评教人数">{{stnum}}</el-descriptions-item>
                <el-descriptions-item label="已评教人数">{{stnumed}}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card>
            <div slot="header">
                <span>综合评分统计</span>
            </div>
            <div id="main" class="chart" style="width: 800px; height: 300px"></div>
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
      stnum: 0,
      stnumed: 0
    }
  },
  created () {
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
      myChart.on('click', (params) => {
        this.$router.push({
          name: 'prepoint',
          params: { name: params.name }
        })
      })
      this.$http.get('tea/preview')
        .then((res) => {
          this.bar = res.data.bar
          this.stnum = res.data.stnum
          this.stnumed = res.data.stnumed
          myChart.setOption({
            series: [
              {
                type: 'bar',
                data: this.bar
              }
            ]
          })
        })
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
