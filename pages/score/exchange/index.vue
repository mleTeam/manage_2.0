<template>
    <div id="exchange-index">
      <el-form inline  class="demo-form-inline" size="small">
        <el-form-item label="用户ID">
          <el-input v-model="userId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model="exchangeScore" placeholder="积分"></el-input>
        </el-form-item>
        <el-form-item label="兑换类型">
          <el-select v-model="exchangeGoodsType" placeholder="兑换类型">
            <el-option label="所有" value=""></el-option>
            <el-option label="道具" value="1"></el-option>
            <el-option label="话费" value="2"></el-option>
            <el-option label="物品" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="exchangeState" placeholder="状态">
            <el-option label="所有" value=""></el-option>
            <el-option label="未发货" value="1"></el-option>
            <el-option label="已发货" value="2"></el-option>
            <el-option label="关闭" value="3"></el-option>
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
      </el-form>
      <el-button type="info" icon="el-icon-download" size="small" @click="exportList">导出</el-button><br><br>
      <el-table
        v-loading="loading"
        :data="list"
        size="mini"
        border
        height="757"
        style="width: 100%">
        <el-table-column
          prop="exchangeId"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="goodsId"
          label="物品ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="物品名称"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="exchangeState"
          label="状态"
          width="70"
          align="center"
          :formatter="stateFormat">
        </el-table-column>
        <el-table-column
          prop="exchangeGoodsType"
          label="物品类型"
          width="70"
          align="center"
          :formatter="typeFormat">
        </el-table-column>
        <el-table-column
          prop="exchangeScore"
          label="兑换积分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="exchangeIspromotion"
          label="是否促销"
          width="70"
          align="center"
          :formatter="promotionFormat">
        </el-table-column>
        <el-table-column
          prop="exchangeOldScore"
          label="促销积分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="exchangeDiscount"
          label="打折率"
          width="70"
          align="center"
          :formatter="discountFormat">
        </el-table-column>
        <el-table-column
          prop="exchangeContent"
          label="描述"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="exchangeAddress"
          label="收货地址"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="exchangePerson"
          label="收货人"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="exchangePhone"
          label="收货手机号"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="logisticsName"
          label="物流名称"
          width="80">
        </el-table-column>
        <el-table-column
          prop="logisticsNumber"
          label="物流单号"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="exchangeCreatetime"
          label="创建时间"
          width="160"
          :formatter="this.common.elTableDateFormat"  >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope" v-if="scope.row.exchangeState == 1">
            <el-button
              size="mini"
              type="primary"
              @click="deliverGoods(scope.row.exchangeId)">发货</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openCloseConfirm(scope.row.exchangeId)">关闭</el-button>
          </template>
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
      <el-dialog title="发货" :visible.sync="dialogDeliverGoodsForm" width="25%" center>
        <el-form inline :model="deliverGoodsForm" ref="deliverGoodsForm" >
          <el-form-item label="物流名称"
                        prop="logisticsName"
                        :rules="[
                                  { required: true, trigger: 'change', message: '物流公司不能为空'}
                                ]">
            <el-select v-model="deliverGoodsForm.logisticsName" placeholder="请选择物流公司" type="logisticsName">
              <el-option v-for="item in logisticsList" :label="item.logisticsName" :value="item.logisticsName" :key="item.logisticsId" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流单号"
                        prop="logisticsNumber"
                        :rules="[
                                  { required: true, trigger: 'change', message: '物流单号不能为空'}
                                ]">
            <el-input v-model="deliverGoodsForm.logisticsNumber"  placeholder="物流单号" clearable type="logisticsNumber"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeliverGoodsForm = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('deliverGoodsForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { MLE_GET_OK,MLE_PUT_OK } from '~/assets/constsUtil.js'
  import moment from 'moment'
  export default {
    data() {
      return {
        page: 1,
        limit: 20,
        count: 0,
        userId: '',
        exchangeScore: '',
        exchangeGoodsType: '',
        exchangeState: '',
        createStartTime: '',
        createEndTime: '',
        orderDirection: 'desc',
        orderField: 'exchange_id',
        list: [],
        loading: true,
        dialogDeliverGoodsForm: false,
        logisticsList: [],
        exchangeId: '',
        deliverGoodsForm: {
          logisticsName: '',
          logisticsNumber: ''
        }
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
          exchangeScore: self.exchangeScore,
          userPhone: self.userPhone,
          exchangeGoodsType: self.exchangeGoodsType,
          exchangeState: self.exchangeState,
          createStartTime: self.createStartTime,
          createEndTime: self.createEndTime,
          orderDirection: self.orderDirection,
          orderField: self.orderField
        }
        this.$axios.$get('/v2/exchanges',{
          params:para
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.list = res.items
              self.count = res.count
            }
          })
          .catch((err) =>{
            self.showMessage(err.response.data.message, 'error')
          })
        self.loading = false
      },
      //显示状态信息 (显示信息，弹框类型)
      showMessage(msg,type) {
        this.$message({
          message: msg,
          type: type
        });
      },
      //打开确认关闭弹框，确认后调用关闭兑换记录接口 (兑换记录ID)
      openCloseConfirm(exchangeId) {
        let self = this
        self.$confirm('此操作将关闭该兑换信息，积分返还用户', '确认关闭?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
        }).then(() => {
          this.$axios.$put('/v2/exchanges/close/'+exchangeId)
            .then(function (response) {
              if( MLE_PUT_OK == response.statuc_code) {
                self.showMessage('关闭成功！', 'success')
              }
              else {
                self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
              }
              self.getList()
            })
            .catch(function (error) {
              self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
            });
        })
      },
      //发货 (兑换记录ID)
      deliverGoods(exchangeId) {
        let self = this
        this.$axios.$get('/v2/logistics')
          .then(function (response) {
            if( MLE_GET_OK == response.statuc_code) {
              self.logisticsList = response.items
              self.exchangeId = exchangeId
              self.dialogDeliverGoodsForm = true
            }
            else {
              self.showMessage('获取物流列表异常！', 'error')
            }
            self.getList()
          })
          .catch(function (error) {
            self.showMessage(error.response ? error.response.data.message : '获取物流列表异常！', 'error')
          });
      },
      //发货表单提交
      submitForm(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if(valid) {
            self.dialogDeliverGoodsForm = false
            this.$axios.$put('/v2/exchanges/deliverGoods/'+self.exchangeId, self.deliverGoodsForm, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(function (response) {
                if( MLE_PUT_OK ==  response.statuc_code) {
                  self.showMessage('发货成功！', 'success')
                  self.resetForm(formName)
                  self.exchangeId = ''
                  self.getList()
                }else {
                  self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
                }
              })
              .catch(function (error) {
                self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
              });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      },
      typeFormat(row) {
        switch(row.exchangeGoodsType) {
          case 1:
            return '道具'
            break
          case 2:
            return '话费'
            break
          case 3:
            return '物品'
            break
        }
      },
      stateFormat(row) {
        switch(row.exchangeState) {
          case 1:
            return '未发货'
            break
          case 2:
            return '已发货'
            break
          case 3:
            return '关闭'
            break
        }
      },
      promotionFormat(row) {
        switch(row.exchangeIspromotion) {
          case 0:
            return '否'
            break
          case 1:
            return '是'
            break
        }
      },
      discountFormat(row) {
        let discount = row.exchangeDiscount
        return discount ? discount + '折' : ''
      },
      //根据查询参数将列表导出为Excel
      exportList() {
        let self = this
        let para =  {
          page: self.page,
          limit: self.limit,
          userId: self.userId,
          exchangeScore: self.exchangeScore,
          userPhone: self.userPhone,
          exchangeGoodsType: self.exchangeGoodsType,
          exchangeState: self.exchangeState,
          createStartTime: self.createStartTime,
          createEndTime: self.createEndTime,
          orderDirection: self.orderDirection,
          orderField: self.orderField
        }
        this.$axios.$get('/v2/exchanges/export', {
          params: para,
          headers: {
            'Content-Type': 'application/vnd.ms-excel'
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>
