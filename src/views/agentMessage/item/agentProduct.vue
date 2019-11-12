<template>
  <div class="pro-center">
    <div class="title">产品中心</div>
    <div class="product clearfix fll" @click="addItem">
      <div class="clearfix my-up">
        <div class="add-num fll">+</div>
        <div class="add-pro fll">添加产品</div>
      </div>
    </div>
    <div
      v-for="(item,index) in tableData"
      :key="index"
      class="product-item fll"
      style="margin-right: 40px;margin-bottom: 29px"
    >
      <template v-if="item.save">
        <div class="clearfix mt20">
          <span class="close-save" @click="closeBox(item, index)">
            <b>&times;</b>
          </span>
          <div class="name fll">产品名称：</div>
          <div class="fll">
            <el-select
              :disabled="status == 'update'"
              v-model="item.loanName"
              style="width: 100px;height: 20px;"
            >
              <el-option
                v-for="pro in provinceData"
                :key="pro.id"
                :label="pro.loanName"
                :value="pro.id"
                style="width: 100px;"
              />
            </el-select>
          </div>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最高贷款额度：</div>
          <input
            :disabled="!item.save"
            v-model="item.loanAmount"
            type="text"
            class="fll pro-input"
          >&nbsp;&nbsp;万
        </div>
        <div class="clearfix mt20">
          <div class="name fll">利息区间：</div>
          <input
            :disabled="!item.save"
            v-model="item.minRate"
            type="number"
            class="fll"
            style="width: 40px;"
          >
          <span class="fll">~</span>
          <input
            :disabled="!item.save"
            v-model="item.maxRate"
            type="number"
            class="fll"
            style="width: 40px;"
          >
          <span class="fll" style="font-size: 15px;color: #555;">%</span>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最快放贷时间：</div>
          <input
            :disabled="!item.save"
            v-model="item.loanTime"
            type="text"
            class="fll"
            @change="checkloanTime(item, 'loanTime')"
          >&nbsp;&nbsp;天
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最长贷款期限：</div>
          <input
            :disabled="!item.save"
            v-model="item.loanTerm"
            type="text"
            class="fll"
            @change="checkloanTerm(item, 'loanTerm')"
          >&nbsp;&nbsp;年
        </div>
        <div v-if="item.save" class="clearfix">
          <button class="save-btn" @click="saveProduct(item, index)">保存</button>
        </div>
      </template>
      <template v-else>
        <div class="clearfix mt20">
          <div class="name fll">产品名称：</div>
          <div class="text fll">
            <span>{{ item.loanName }}</span>
          </div>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最高贷款额度：</div>
          <div class="text fll">
            <span>{{ item.loanAmount }}</span>万
          </div>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">利息区间：</div>
          <div class="text fll">
            <span>{{ item.rate }}</span>
          </div>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最快放贷时间：</div>
          <div class="text fll">
            <span>{{ item.loanTime }}</span>天
          </div>
        </div>
        <div class="clearfix mt20">
          <div class="name fll">最长贷款期限：</div>
          <div class="text fll">
            <span>{{ item.loanTerm }}</span>年
          </div>
        </div>
        <div class="clearfix">
          <div class="edit fll" @click="editProduct(item, index)">编辑</div>
          <div class="save fll" @click="delectProduct(item.id)">删除</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import validater from '../../../util/validater'
import { validaterLoanAmount, validaterFloat, validaterInter } from '@/util/validate'
export default {
  name: 'AgentProduct',
  data() {
    return {
      flag: true,
      isUpdate: true,
      tableData: [],
      provinceData: [],
      status: '',
      proName: '',
      proId: ''
    }
  },
  created() {
    // 根据信贷经理id查所贷产品
    this.getProduct()
    this.proSheng()
  },
  methods: {
    validateForm(item, attr) {
      const index = this.tableData.indexOf(item)
      const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
      const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
      if (
        regEn.test(this.tableData[index][attr]) ||
        regCn.test(this.tableData[index][attr])
      ) {
        this.$message.warning('名称不能包含特殊字符')
        this.tableData[index][attr] = ''
        return false
      }
    },
    validateRate(item, attr) {
      const index = this.tableData.indexOf(item)
      if (!validater.validateRate(item[attr])) {
        this.$message.warning('利率格式不正确')
        this.tableData[index][attr] = ''
      }
    },
    checkloanTerm(item, attr) {
      this.validateForm(item, attr)
    },
    checkloanTime(item, attr) {
      this.validateForm(item, attr)
    },
    addItem() {
      this.isUpdate = false
      if (this.flag) {
        this.flag = false
        this.status = 'create'
        this.tableData = this.tableData.map(item => {
          item.save = false
          return item
        })
        if (this.tableData.length < 4) {
          const product = {
            id: '',
            minRate: '',
            maxRate: '',
            loanTerm: '',
            loanAmount: '',
            loanTime: '',
            save: true
          }
          this.tableData.unshift(product)
        } else {
          this.$message.warning('产品已满')
        }
      }
    },
    editProduct(item, index) {
      if (this.isUpdate) {
        this.flag = false
        this.isUpdate = false
        this.proName = item.loanName
        this.proId = item.id
        this.status = 'update'
        this.$set(this.tableData[index], 'save', true)
      }
    },
    saveProduct(item, index) {
      const obj = { ...item }
      for (let i = 0; i < this.provinceData.length; i++) {
        if (this.provinceData[i].id === obj.loanName) {
          obj.id = this.provinceData[i].id
          obj.loanName = this.provinceData[i].loanName
        }
      }
      if (obj.id === '') {
        this.$message.warning('请选择产品名称')
      } else if (obj.loanAmount === '') {
        this.$message.warning('贷款额度不能为空')
      } else if (!validaterLoanAmount(obj.loanAmount)) {
        this.$message.warning('贷款额度正确格式为大于0的整数')
      } else if (obj.minRate === '' || obj.maxRate === '') {
        this.$message.warning('利率不能为空')
      } else if (!validaterFloat(obj.minRate) || !validaterFloat(obj.maxRate)) {
        this.$message.warning('利率正确格式为大于0的整数或2位小数')
      } else if (obj.minRate <= 0) {
        this.$message.warning('利率必须大于0')
      } else if (obj.minRate > obj.maxRate) {
        this.$message.warning('最低利率不能大于最高利率')
      } else if (obj.loanTime === '') {
        this.$message.warning('放款时间不能为空')
      } else if (!validaterInter(obj.loanTime)) {
        this.$message.warning('放款时间正确格式为大于0的整数')
      } else if (obj.loanTerm === '') {
        this.$message.warning('贷款期限不能为空')
      } else if (!validaterInter(obj.loanTerm) || obj.loanTerm > 30) {
        this.$message.warning('贷款期限正确格式为大于0且小于30的整数')
      } else {
        const data = new FormData()
        for (const key in obj) {
          data.append(key, obj[key])
        }
        data.delete('save')
        if (this.status === 'create') {
          data.append('brokerId', this.$store.state.userInfo.id)
          this.$axios.post(`loanInfo/saveLoanInfo`, data).then(res => {
            if (res.status === 200) {
              this.$message.success('添加成功')
              this.flag = true
              this.isUpdate = true
              this.getProduct()
            } else {
              this.$message.warning(res.msg)
              this.getProduct()
            }
          })
        } else {
          data.delete('rate')
          this.$axios.post(`loanInfo/modifyLoanInfo`, data).then(res => {
            if (res.status === 200) {
              this.$message.success('修改成功')
              this.getProduct()
              this.flag = true
              this.isUpdate = true
            } else {
              this.$message.warning(res.msg)
              this.getProduct()
            }
          })
        }
      }
    },
    closeBox(item) {
      if (!item.id) {
        const index = this.tableData.indexOf(item)
        this.tableData.splice(index, 1)
      } else {
        item.save = false
      }
      this.flag = true
      this.isUpdate = true
    },
    delectProduct(id) {
      this.$confirm('是否确认删除此产品？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(
              `loanInfo/removeLoanInfo/${id}/${this.$store.state.userInfo.id}`
            )
            .then(res => {
              if (res.status === 200) {
                this.$message.success('删除成功')
                this.getProduct()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getProduct() {
      this.$axios
        .get(
          `loanInfo/getAllLoanInfoByBrokerId/${this.$store.state.userInfo.id}`
        )
        .then(res => {
          if (res) {
            res = res.map(item => {
              const minRate = item.rate.split('~')[0]
              const maxRate = item.rate.split('~')[1].split('%')[0]
              return { ...item, save: false, minRate, maxRate }
            })
          }
          this.proSheng()
          this.tableData = res || []
        })
    },
    proSheng() {
      this.$axios
        .get(`loanInfo/showIdAndName/${this.$store.state.userInfo.id}`)
        .then(res => {
          this.provinceData = res
        })
    }
  }
}
</script>

<style scoped lang="scss">
.mb15 {
  margin-bottom: 15px;
}
.pro-center {
  width: 944px;
  height: 667px;
  background: rgba(255, 255, 255, 1);
  padding: 0 0 0 56px;
  box-sizing: border-box;
  .title {
    height: 66px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 66px;
  }
  .product-item {
    width: 252px;
    height: 255px;
    color: rgba(81, 81, 81, 1);
    font-size: 14px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(217, 217, 217, 1);
    margin-right: 36px;
    position: relative;
    box-sizing: border-box;
    padding-top: 10px;
    &:hover {
      box-shadow: 0px 0px 14px 0px rgba(217, 217, 217, 1);
    }
    .close-save {
      position: absolute;
      right: 5px;
      top: 0;
      font-size: 20px;
      cursor: pointer;
    }
    input {
      width: 60px;
      height: 20px;
      box-sizing: border-box;
      /*border: none;*/
      text-align: center;
    }
    /deep/ .el-input__inner {
      height: 20px;
      line-height: 20px;
    }
    .name {
      width: 84px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 20px;
      margin: 0 22px;
    }
    .text {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
    }
    .edit:hover,
    .save:hover {
      background: #e6a23c;
    }
    .edit,
    .save {
      text-align: center;
      height: 26px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      width: 50%;
      line-height: 26px;
      background: rgba(217, 217, 217, 1);
      color: rgba(255, 255, 255, 1);
      transition: all 0.5s;
    }
    .edit {
      position: absolute;
      left: 0;
      bottom: 0;
      cursor: pointer;
    }
    .save {
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }
  }
  .product {
    width: 252px;
    height: 255px;
    background: rgba(255, 255, 255, 1);
    border: 1px dashed rgba(217, 217, 217, 1);
    margin-right: 36px;
    position: relative;
    cursor: pointer;
    .my-up {
      position: absolute;
      left: 33%;
      top: 35%;
      .add-num {
        height: 53px;
        font-weight: 200;
        color: rgba(155, 155, 155, 1);
        line-height: 53px;
        font-size: 35px;
      }
      .add-pro {
        width: 64px;
        height: 53px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 53px;
        margin-left: 5px;
      }
    }
  }
  .save-btn {
    position: absolute;
    bottom: 0;
    display: block;
    cursor: pointer;
    height: 26px;
    width: 100%;
    color: #fff;
    border: none;
    background: rgba(208, 172, 86, 1);
    outline: none;
  }
}
/deep/ .el-select__caret {
  line-height: 20px;
}
</style>
