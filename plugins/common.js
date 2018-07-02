import Vue from 'vue'
import moment from 'moment'

//日期格式化函数 (行对象row，列对象column，单元格值cellValue，索引index)
var common = {
  install(Vue){
    Vue.prototype.common = {
      elTableDateFormat:function(row, column,cellValue){
        if (cellValue) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        }
        return ""
      }
    };

  }
}

Vue.use(common);
