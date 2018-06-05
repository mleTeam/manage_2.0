<template>
    <div id="index">
       <el-table
           :data="tableData3"
           height="250"
           border
           style="width: 100%">
           <el-table-column
             prop="date"
             label="日期"
             width="180">
           </el-table-column>
           <el-table-column
             prop="name"
             label="姓名"
             width="180">
           </el-table-column>
           <el-table-column
             prop="address"
             label="地址">
           </el-table-column>
         </el-table>
    </div>
</template>

<script>
export default {
  data() {
        return {
          tableData3: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          list:[]
        }
      },
  methods: {
    getAdmins() {
      this.$axios.$get('/v2/admins','')
        .then((res) =>{
          console.log(res)
        })
        .catch((err) =>{
          console.log(err)
        });
    }
  },
  created() {
    this.getAdmins()
  }
}
</script>

<style>

</style>
