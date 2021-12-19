<template>
  <div class="pwContainer">
    <el-form
      ref="pwFormref"
      :model="pwForm"
      :rules="pwFormRules"
      label-width="150px"
      class="pwForm"
    >
      <el-form-item label="密码" prop="oldpw">
        <el-input
          v-model="pwForm.oldpw"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpw">
        <el-input
          v-model="pwForm.newpw"
          prefix-icon="el-icon-lock"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="againpw">
        <el-input
          v-model="pwForm.againpw"
          prefix-icon="el-icon-lock"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="info" @click="resetloginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pwForm: {
        username: '',
        oldpw: '',
        newpw: '',
        againpw: ''
      },
      pwFormRules: {
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        newpw: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        againpw: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.pwForm.username = window.sessionStorage.getItem('stu')
  },
  methods: {
    resetloginForm () {
      this.$refs.pwFormref.resetFields()
    },
    submit () {
      this.$refs.pwFormref.validate(async vaild => {
        if (!vaild) return
        if (this.pwForm.newpw !== this.pwForm.againpw) return this.$message.error('两次输入不一致！')
        const result = await this.$http.post('stu/resetpwd', this.pwForm)
        console.log(result)
        if (result.data.status === 'failed') return this.$message.error('设置失败，请重试')
        this.$message.success('设置成功')
        this.$router.push('/stuhome')
      })
    }
  }
}
</script>

<style scoped>
.pwContainer{
  width: 500px;
  height: 300px;
  background-color: azure;
  border-radius: 3px;
  position: absolute;
  left: 0%;
  right: 0;
  top: 0%;
  bottom: 0;
  margin: auto;
}
.pwForm{
  position: absolute;
  left: 0%;
  right: 10%;
  top: 10%;
  bottom: 0;
  margin: auto;
  box-sizing: border-box;
}
</style>>
