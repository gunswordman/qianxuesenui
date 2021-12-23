<template>
  <el-container class="home_container">
    <el-header class="header">
      <div class=“header_class”>
        <img height="100%" src="../../assets/banner.png"  alt="baner">
        <span class="head_title">南京理工大学钱学森学院</span>
        <span class="welcome">
          欢迎您,{{ this.username }}&emsp;
          <el-button @click="logout">退出</el-button>
        </span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true">
          <el-menu-item index="/outcome">
            <i class="el-icon-location"></i>
            <span slot="title">查看评教信息</span>
          </el-menu-item>
          <el-menu-item index="/teapw">
            <i class="el-icon-location"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.username = '老师'
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.welcome {
  position: absolute;
  right: 2%;
}
.head_title {
  position: absolute;
  font-size: 20px;
  text-align: left;
}

.home_container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
