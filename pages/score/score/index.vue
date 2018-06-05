<template>
    <div id="score-index">
      <el-form :inline="true"  class="demo-form-inline">
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
          <el-button type="primary" @click="getAdmins">查询</el-button>
        </el-form-item><br>
        <el-form-item label="开始创建时间">
          <el-date-picker
            v-model="createTimeStart"
            type="datetime"
            placeholder="开始创建时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束创建时间">
          <el-date-picker
            v-model="createTimeEnd"
            type="datetime"
            placeholder="结束创建时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-table
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
          width="160">
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
          :formatter="getScoreTypeString">
        </el-table-column>
        <el-table-column
          prop="scoreName"
          label="积分描述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="dateFormat"  >
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          :formatter="dateFormat"  >
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
  import { MLE_GET_OK,formatDate } from '~/assets/constsUtil.js'
  import moment from 'moment'
  export default {
    data() {
      return {
        page: 1,
        limit: 20,
        count:0,
        userId: '',
        score: '',
        userPhone: '',
        scoreType: '',
        createTimeStart: '',
        createTimeEnd: '',
        list:[]
      }
    },
    methods: {
      getAdmins() {
        let self = this
        this.$axios.$get('/v2/scores',{
          params: {
            page: self.page,
            limit: self.limit,
            userId: self.userId,
            score: self.score,
            userPhone: self.userPhone,
            scoreType: self.scoreType,
            createTimeStart: self.createTimeStart,
            createTimeEnd: self.createTimeEnd
          }
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.list = res.items
              self.count = res.count
            }
          })
          .catch((err) =>{
            console.log(err.response.data.message)
          });
      },
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
      dateFormat(row, column) {
        let date = row[column.property];
        if (date) {
          return moment(date).format("YYYY-MM-DD HH:mm:ss")
        }
        return ""
      },
      sizeChange(size) {
        let self = this
        self.limit = size
        self.getAdmins()
      },
      currentChange(current) {
        let self = this
        self.page = current
        self.getAdmins()
      }
    },
    created() {
      this.getAdmins()
    }
  }
</script>
