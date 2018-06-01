<template>
  <el-container>
      <el-header height="80px">
        <span style="color: #fff;font-size: 22px">
          米粒儿金融管理平台2.0
        </span>
      </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          :unique-opened="isUnique" >
          <el-submenu :index="String(menu.actionId)" v-for="menu in menuList" :key="menu.actionId">
            <template slot="title" >{{ menu.actionName }}</template>
            <el-menu-item :index="menu.actionId + '-' + submenu.actionId" v-for="submenu in menu.actionList" :key="submenu.actionId">{{ submenu.actionName }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
        <el-main style="height:790px">
          <nuxt/>
        </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import { MLE_GET_OK } from '~/assets/constsUtil.js'
  export default {
    data() {
      return {
        isUnique: true,
        menuList: []
      }
    },
    created() {
        let self = this
        this.$axios.$get('/v2/menus','')
          .then((res) =>{
              self.menuList = res.item
          })
    }
  }
</script>
<style >
  body{
    margin:0
  }
  .el-header{
    line-height: 80px;
    background-color: rgb(64, 158, 255);
  }
  .el-menu{
    height: 100%;
  }
</style>
