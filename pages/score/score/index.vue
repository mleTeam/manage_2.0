<template>
    <div id="score-index">
      <el-form inline class="demo-form-inline" size="small">
        <el-form-item label="用户ID">
          <el-input v-model="userId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model="score" placeholder="积分"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userPhone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="scoreType" placeholder="类型">
            <el-option label="所有" value=""></el-option>
            <el-option label="注册" value="1"></el-option>
            <el-option label="购买" value="2"></el-option>
            <el-option label="兑换" value="3"></el-option>
            <el-option label="抽奖" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item><br>
        <el-form-item label="起始创建时间">
          <el-date-picker
            v-model="createStartTime"
            type="datetime"
            placeholder="起始创建时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束创建时间">
          <el-date-picker
            v-model="createEndTime"
            type="datetime"
            placeholder="结束创建时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-tag type="success">总获得积分:{{totalScore}}</el-tag>&nbsp;
        <el-tag type="info">总使用积分:{{totalUsed}}</el-tag>&nbsp;
        <el-tag type="warning">总剩余积分:{{totalSurplus}}</el-tag>
      </el-form>
      <el-button type="info" icon="el-icon-download" @click="exportList" size="small">导出</el-button><br><br>
      <el-table
        v-loading="loading"
        :data="list"
        size="mini"
        border
        height="757"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="score"
          label="积分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="scoreType"
          label="类型"
          width="80"
          align="center"
          :formatter="getScoreTypeString">
        </el-table-column>
        <el-table-column
          prop="scoreName"
          label="积分描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="this.common.elTableDateFormat"  >
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          :formatter="this.common.elTableDateFormat"  >
        </el-table-column>
      </el-table><br>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
        :current-page="page"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>

<script>
  import { MLE_GET_OK } from '~/assets/constsUtil.js'
  export default {
    data() {
      return {
        page: 1,
        limit: 20,
        count: 0,
        userId: '',
        score: '',
        userPhone: '',
        scoreType: '',
        createStartTime: '',
        createEndTime: '',
        list: [],
        loading: true,
        totalScore:'',
        totalUsed: '',
        totalSurplus: ''
      }
    },
    methods: {
      //将页数改为1后执行获取列表方法
      search() {
        let self = this
        self.page = 1
        self.getList()
      },
      //根据查询参数获取列表信息
      getList() {
        let self = this
        self.loading = true
        let para =  {
          page: self.page,
          limit: self.limit,
          userId: self.userId,
          score: self.score,
          userPhone: self.userPhone,
          scoreType: self.scoreType,
          createStartTime: self.createStartTime,
          createEndTime: self.createEndTime
        }
        this.$axios.$get('/v2/scores',{
          params:para
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.list = res.items
              self.count = res.count
            }
          })
          .catch((err) =>{
            self.showErrorMessage(err.response.data.message)
          });
        self.loading = false
        self.getTotalScore(para)
        self.getTotalUsed(para)
        self.getTotalSurplus(para)
      },
      //根据查询参数获取总获得积分
      getTotalScore(para){
        let self = this
        this.$axios.$get('/v2/scores/totalScore',{
          params:para
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.totalScore = res.item
            }
          })
      },
      //根据查询参数获取总使用积分
      getTotalUsed(para){
        let self = this
        this.$axios.$get('/v2/scores/totalUsed',{
          params:para
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.totalUsed = res.item
            }
          })
      },
      //根据查询参数获取总剩余积分
      getTotalSurplus(para){
        let self = this
        this.$axios.$get('/v2/scores/totalSurplus',{
          params:para
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.totalSurplus = res.item
            }
          })
      },
      //根据查询参数将列表导出为Excel
      exportList() {
        let self = this
        let para =  {
          page: self.page,
          limit: self.limit,
          userId: self.userId,
          score: self.score,
          userPhone: self.userPhone,
          scoreType: self.scoreType,
          createStartTime: self.createStartTime,
          createEndTime: self.createEndTime
        }
        this.$axios.$get('/v2/scores/export', {
          params: para,
          headers: {
            'Content-Type': 'application/vnd.ms-excel'
          }
        })
      },
      //显示错误信息 (信息内容)
      showErrorMessage(msg) {
        this.$message({
          message: msg,
          type: 'error'
        });
      },
      //格式化类型列内容 (行对象row，列对象column，单元格值cellValue，索引index)
      getScoreTypeString(row,column){
        switch(row.scoreType) {
          case 1:
            return '注册'
            break
          case 2:
            return '购买'
            break
          case 3:
            return '兑换'
            break
          case 4:
            return '抽奖'
            break
        }
      },
      //分页选择每页条数回调函数 (条数)
      sizeChange(size) {
        let self = this
        self.limit = size
        self.page = 1
        self.getList()
      },
      //分页选择页码回调函数 (当前选择页码)
      currentChange(current) {
        let self = this
        self.page = current
        self.getList()
      }
    },
    created() {
      this.getList()
    }
  }
</script>
