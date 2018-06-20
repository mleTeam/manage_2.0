<template>
    <div id="goods-index">
      <el-form inline  class="demo-form-inline" size="small">
        <el-form-item label="物品名称">
          <el-input v-model="searchParam.goodsName" placeholder="物品名称"></el-input>
        </el-form-item>
        <el-form-item label="所需积分">
          <el-input v-model="searchParam.goodsScore" placeholder="所需积分"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchParam.goodsState" placeholder="状态">
            <el-option label="所有" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchParam.goodsType" placeholder="类型">
            <el-option label="所有" value=""></el-option>
            <el-option label="道具" value="1"></el-option>
            <el-option label="话费" value="2"></el-option>
            <el-option label="物品" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="info" icon="el-icon-download" size="small">导出</el-button><br><br>
      <el-table
        v-loading="loading"
        :data="list"
        size="mini"
        border
        height="757"
        style="width: 100%">
        <el-table-column
          prop="goodsId"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="物品名称"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="goodsState"
          label="状态"
          width="60"
          align="center"
          :formatter="stateFormat">
        </el-table-column>
        <el-table-column
          prop="goodsScore"
          label="兑换积分"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="goodsIspromotion"
          label="是否促销"
          width="70"
          align="center"
          :formatter="promotionFormat">
        </el-table-column>
        <el-table-column
          prop="goodsOldScore"
          label="促销积分"
          width="80">
        </el-table-column>
        <el-table-column
          prop="goodsDiscount"
          label="打折率"
          width="60"
          align="center"
          :formatter="discountFormat">
        </el-table-column>
        <el-table-column
          prop="goodsType"
          label="物品类型"
          width="70"
          align="center"
          :formatter="typeFormat">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="物品价格"
          width="70">
        </el-table-column>
        <el-table-column
          prop="goodsIncreaseType"
          label="道具类型"
          align="center"
          width="70"
          :formatter="increaseTypeFormat">
        </el-table-column>
        <el-table-column
          prop="goodsIncreasePercent"
          label="道具金额(利率)"
          width="70">
        </el-table-column>
        <el-table-column
          prop="goodsIncreaseMinMoney"
          label="道具投资金额"
          width="70">
        </el-table-column>
        <el-table-column
          prop="goodsIncreaseProductId"
          label="道具投资产品ID"
          width="70">
        </el-table-column>
        <el-table-column
          prop="goodsIncreaseDay"
          label="道具投资天数"
          width="70">
        </el-table-column>
        <el-table-column
          prop="goodsImage"
          label="物品照片"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="goodsContent"
          label="描述"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="goodsCreatetime"
          label="创建时间"
          width="160"
          :formatter="dateFormat"  >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="190">
          <template slot-scope="scope" >
            <el-button
              size="mini"
              type="info" v-if="scope.row.goodsState == 1">下架</el-button>
            <el-button
              size="mini"
              type="primary" v-if="scope.row.goodsState == 2">上架</el-button>
            <el-button
              size="mini"
              type="primary" icon="el-icon-edit"
              ></el-button>
            <el-button
              size="mini"
              type="danger" icon="el-icon-delete"
              ></el-button>
          </template>
        </el-table-column>
      </el-table><br>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
        :current-page="searchParam.page"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>

<script>
  import { MLE_GET_OK,MLE_PUT_OK,MLE_POST_OK } from '~/assets/constsUtil.js'
  import moment from 'moment'
  export default {
    data() {
      return {
        searchParam: {
          page: 1,
          limit: 20,
          goodsName: '',
          goodsScore: '',
          goodsState: '',
          goodsType: '',
          orderDirection: 'desc',
          orderField: 'goods_id',
        },
        loading: true,
        count: 0,
        list: []
      }
    },
    methods: {
      //将页数改为1后执行获取列表方法
      search() {
        let self = this
        self.searchParam.page = 1
        self.getList()
      },
      //根据查询参数获取列表信息
      getList() {
        console.log('kscx')
        let self = this
        self.loading = true
        this.$axios.$get('/v2/goods',{
          params:self.searchParam
        })
          .then((res) =>{
            if(MLE_GET_OK == res.statuc_code){
              self.list = res.items
              self.count = res.count
            } else {
              self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
            }
          })
          .catch((err) =>{
            self.showMessage(error.response ? error.response.data.message : '系统异常！', 'error')
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
      //分页选择每页条数回调函数 (条数)
      sizeChange(size) {
        let self = this
        self.searchParam.limit = size
        self.searchParam.page = 1
        self.getList()
      },
      //分页选择页码回调函数 (当前选择页码)
      currentChange(current) {
        let self = this
        self.searchParam.page = current
        self.getList()
      },
      //日期格式化函数 (行对象row，列对象column，单元格值cellValue，索引index)
      dateFormat(row, column,cellValue) {
        if (cellValue) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        }
        return ""
      },
      typeFormat(row) {
        switch(row.goodsType) {
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
      increaseTypeFormat(row) {
        if(row.goodsType == 1) {
          switch(row.goodsIncreaseType) {
            case 1:
              return '加息券'
              break
            case 2:
              return '小米券'
              break
          }
        }
      },
      stateFormat(row) {
        switch(row.goodsState) {
          case 1:
            return '上架'
            break
          case 2:
            return '下架'
            break
        }
      },
      promotionFormat(row) {
        switch(row.goodsIspromotion) {
          case 0:
            return '否'
            break
          case 1:
            return '是'
            break
        }
      },
      discountFormat(row) {
        let discount = row.goodsDiscount
        return discount ? discount + '折' : ''
      }
    },
    created() {
      this.getList()
    }
  }
</script>
