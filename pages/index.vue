<template>
  <div class="wrapper">
    <div class="container">
      <h1>欢迎登录</h1>
      <form method="post">
        <input name="adminName" id="adminName" type="text" placeholder="用户名" v-model="admin.adminName">
        <input name="adminPwd" id="adminPwd" type="password" placeholder="密码" v-model="admin.adminPwd">
        <el-button type="primary" id="login-button" @click="login()" style="background-color:#96D6C4;border-color:#C9E9E0;font-size:18px">登录</el-button>
      </form>
    </div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import '~/static/css/styles.css'
import { MLE_POST_OK, MLE_COOKIE, MLE_COOKIE_TIME } from '~/assets/constsUtil.js'
export default {
  layout: 'login',
  data() {
    return {
      admin:{
        adminName: "",
        adminPwd: ""
      }

    }
  },
  methods: {
      login() {
        let self = this
        if(self.admin.adminName == ""){
          self.showErrorMessage("用户名不得为空！")
          return
        }
        if(self.admin.adminPwd == ""){
          self.showErrorMessage("密码不得为空！")
          return
        }
        this.$axios.$post('/v2/login', self.admin, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            if( MLE_POST_OK ==  response.statuc_code) {
              let token = response.item.accessToken
              let d = new Date()
              d.setTime(d.getTime() + (MLE_COOKIE_TIME))//cookie生效时间
              let expires = 'expires=' + d.toUTCString()
              document.cookie = MLE_COOKIE + '=' + token + '; Path=/; Domain=milibanking.com; ' + expires
              location.href = '/home'
            }else {
              self.showErrorMessage('系统异常！')
            }
          })
          .catch(function (error) {
            self.showErrorMessage(error.response ? error.response.data.message : '系统异常！')
          });
      },
      showErrorMessage(msg) {
        this.$message({
          message: msg,
          type: 'error'
        });
      }
    }
}
</script>
