<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/stuhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>选课列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="xuankelist" border>
      <el-table-column prop="cl_cid" label="课程编号"> </el-table-column>
      <el-table-column prop="cl_name" label="课程名称"> </el-table-column>
      <el-table-column prop="teacher" label="教师"> </el-table-column>
      <el-table-column prop="pingjiao" label="评教状态">
        <template slot-scope="pingjiaoscope">
          <el-button
            type="text"
            v-if="pingjiaoscope.row.ispj == false && pingjiaoscope.row.cl_name!=='毕业实习'"
            @click="
              pingjiaodialog(
                pingjiaoscope.row.cl_cid,
                pingjiaoscope.row.cl_name,
                pingjiaoscope.row.teacher,
                pingjiaoscope.$index
              )
            "
            >评教</el-button
          >
          <div v-else-if="pingjiaoscope.row.cl_name == '毕业实习'"></div>
          <div v-else>已评教</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 评教对话框 -->
    <el-dialog title="评教" :visible.sync="pingjiaodialogVisible" width="1026px">
      <span> 课程号：{{ addpj.cl_cid }}&emsp; </span>
      <span> 课程名：{{ addpj.cl_name }}&emsp; </span>
      <span> 任课教师：{{ addpj.teacher }} </span>
      <el-form :model="form" :rules="form.rules" ref="pjFormref" size="mini">
        <el-table
          :data="form.pingjiaolist"
          :span-method="objectSpanMethod"
          border
          style="width: 1000px; margin-top: 10px"
        >
          <el-table-column prop="kind" label="评教内容" width="120px"></el-table-column>
          <el-table-column prop="describe" label="评教指标" width="690"> </el-table-column>
          <el-table-column prop="totalscore" label="满分" width="55"> </el-table-column>
          <el-table-column label="评分" width="120">
            <template slot-scope="inputscope">
              <el-form-item
                v-if="
                  inputscope.$index == 2 ||
                  inputscope.$index == 9 ||
                  inputscope.$index == 10 ||
                  inputscope.$index == 11
                "
                :prop="'pingjiaolist.' + inputscope.$index + '.point'"
                :rules="form.rules.r2"
              >
                <el-input v-model.number="inputscope.row.point"></el-input>
              </el-form-item>
              <el-form-item
                v-else
                :prop="'pingjiaolist.' + inputscope.$index + '.point'"
                :rules="form.rules.r1"
              >
                <el-input v-model.number="inputscope.row.point"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="教学建议">
          <el-input type="textarea" v-model="form.advice" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="pingjiaodialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitpingjiao">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        st_id: ''
      },
      // 学生选课列表
      xuankelist: [],
      // 评教对话框是否可见
      pingjiaodialogVisible: false,
      // 评教表单
      form: {
        // 评教内容表
        pingjiaolist: [
          {
            kind: '教学基本情况',
            describe: '任课教师重视教学，课程准备充分，做好课堂教学秩序管理。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学基本情况',
            describe: '任课教师教学态度严谨，有明确的教学计划，不存在无故缺课、调课的情况。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学基本情况',
            describe: '任课教师提供或推荐了教学资料，并且这些资料有助于学生对该课程的学习。',
            totalscore: 5,
            point: null
          },
          {
            kind: '教学内容',
            describe: '在教学过程中，教师注重对学生世界观、人生观和价值观的培养，帮助学生树立了正确的社会主义核心价值观。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学内容',
            describe: '教学内容既包含基础知识介绍，也包含本领域的研究前沿。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学内容',
            describe: '讲授的基本概念、原理、术语阐述准确清楚，难点问题分析深入。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学内容',
            describe: '重视理论联系实际，能反映学科新发展。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学方法与手段',
            describe: '任课教师思路清晰，语言表述流畅、富有感染力。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学方法与手段',
            describe: '教学方法运用合理，教学富有启发性和交互性，能对学生的课堂发言或讨论做出及时反馈。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学方法与手段',
            describe: '教学过程中，注重创新意识和科学研究能力的培养。',
            totalscore: 5,
            point: null
          },
          {
            kind: '教学效果及考核',
            describe: '通过课程学习，增强了学生的历史使命感和社会责任心。',
            totalscore: 5,
            point: null
          },
          {
            kind: '教学效果及考核',
            describe: '课程学习对学生的知识、技能提升作用很大。',
            totalscore: 5,
            point: null
          },
          {
            kind: '教学效果及考核',
            describe: '任课教师的讲授，能激发学生的想象力和创造性思维。',
            totalscore: 8,
            point: null
          },
          {
            kind: '教学效果及考核',
            describe: '课程考核方法公平合理，评分公正明确。',
            totalscore: 8,
            point: null
          }
        ],
        // 评教表单验证规则
        rules: {
          r1: [
            { required: true, message: '请输入评分', trigger: 'change' },
            { type: 'number', min: 0, max: 8, message: '分数要在0-8之间', trigger: 'change' }
          ],
          r2: [
            { required: true, message: '请输入评分', trigger: 'change' },
            { type: 'number', min: 0, max: 5, message: '分数要在0-5之间', trigger: 'change' }
          ]
        },
        // 建议
        advice: ''
      },
      // 教室评价的内容评价的内容
      addpj: {
        cl_cid: '',
        cl_name: '',
        teacher: '',
        point: null,
        advice: '',
        st_id: '',
        cl_id: ''
      }
    }
  },
  created () {
    this.queryInfo.st_id = window.sessionStorage.getItem('stu')
    this.getxuanke()
  },
  methods: {
    async getxuanke () {
      const res = await this.$http.get('stu/xuanke', { params: this.queryInfo })
      if (res.data.status === 'failed') return this.$message.error('获取选课信息失败！')
      this.xuankelist = res.data.clist
    },
    pingjiaodialog (cid, name, tea, index) {
      if (this.pingjiaodialogVisible === false) this.pingjiaodialogVisible = true
      else this.pingjiaodialogVisible = false
      this.addpj.cl_cid = cid
      this.addpj.cl_name = name
      this.addpj.teacher = tea
      this.addpj.cl_id = this.xuankelist[index].cl_id
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex === 3) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 7) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex === 10) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    submitpingjiao () {
      this.$refs.pjFormref.validate(async valid => {
        if (!valid) return
        var i = 0
        // 重置分数和建议
        this.addpj.point = 0
        this.addpj.advice = ''
        // 设置建议和计算分数
        this.addpj.advice = this.form.advice
        for (i = 0; i < this.form.pingjiaolist.length; i++) this.addpj.point += this.form.pingjiaolist[i].point
        // 设置身份
        var stu = window.sessionStorage.getItem('stu')
        if (!stu) {
          this.$message.error('登录失效，请重新登录')
          this.$router.push('/login')
        }
        this.addpj.st_id = stu
        // 发起添加请求
        const result = await this.$http.post('/stu/pingjiao', this.addpj)
        if (result.data.status === 'failed') return this.$message.error('添加数据失败')
        this.$message.success('添加数据成功')
        this.$router.go(0)
        this.$refs.pjFormref.resetFields()
        this.pingjiaodialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>>
