<template>
  <div class="login_container">
    <!-- <img src ="../assets/login_bg.png" height="100%" width="100%"/> -->
    <div class="login_box">
      <span class="logintitle">南京理工大学钱学森学院课程教学评价系统</span>
      <el-form
        ref="loginFormref"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label-width="0" prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetloginForm () {
      this.$refs.loginFormref.resetFields()
    },
    login () {
      this.$refs.loginFormref.validate(async vaild => {
        if (!vaild) return
        const result = await this.$http.post('login', this.loginForm)
        if (result.data.status === 'failed') return this.$message.error('登录失败')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('role', result.data.role)
        if (result.data.role === 0) {
          window.sessionStorage.setItem('stu', result.data.username)
          this.$router.push('/stuhome')
        } else {
          window.sessionStorage.setItem('tea', result.data.username)
          this.$router.push('/teahome')
        }
      })
    }
  }
}
</script>

<style>
.login_container {
  height: 100%;
  background:rgb(211, 220, 230);
}
.login_box {
  width: 500px;
  height: 350px;
  background-color: azure;
  border-radius: 3px;
  position: absolute;
  left: 0%;
  right: 0;
  top: 0%;
  bottom: 0;
  margin: auto;
}
.btns {
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.loginForm {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 35%;
  bottom: 0;
  margin: auto;
  box-sizing: border-box;
}
.logintitle{
  position: absolute;
  padding: 7%;
  left: 5%;
  right: 5%;
  text-align: center;
  font-size: 20px;
}
</style>
