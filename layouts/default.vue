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
          <el-submenu index="1">
            <template slot="title" >导航一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-4">选项4</el-menu-item>
              <el-menu-item index="1-5">选项5</el-menu-item>
              <el-menu-item index="1-6">选项6</el-menu-item>
              <el-menu-item index="1-7">选项7</el-menu-item>
              <el-menu-item index="1-8">选项8</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">导航二</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
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
  export default {
    data() {
      return {
        isUnique: true
      };
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
