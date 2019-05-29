<template>
  <div class="person">
    <div class="clearfix title">
      <div class="title-text fll">个人信息</div>
      <div>
        <div class="flr edit" v-if="!isEdit" @click="edit">编辑</div>
        <div v-else class="clearfix">
          <div class="flr edit" @click="abandonPerson" style="margin-left: 10px">放弃</div>
          <div class="flr edit" @click="savePerson">保存</div>
        </div>
      </div>
    </div>
    <div class="form-wrap">
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-position="right"
        label-width="120px"
        :class="{'border-show': !isEdit}"
      >
        <el-form-item label="姓名:" prop="borrowerName">
          <el-input
            class="input-item"
            placeholder="请输入姓名"
            v-model="form.borrowerName"
            v-if="isEdit"
          ></el-input>
          <span v-else>{{ form.borrowerName }}</span>
        </el-form-item>

        <el-form-item label="性别:" prop="borrowerSex">
          <el-radio-group v-model="form.borrowerSex" v-if="isEdit">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
          <span v-else>{{ form.borrowerSex | sexFilter }}</span>
        </el-form-item>

        <el-form-item label="年龄:" prop="borrowerAge">
          <el-select :disabled="!isEdit" v-model="form.borrowerAge" v-if="isEdit">
            <el-option v-for="item in ageList" :key="item.id" :value="item.id" :label="item.ageArea" ></el-option>
          </el-select>
          <span v-else>{{ age }}</span>
        </el-form-item>

        <el-form-item label="职业:" prop="borrowerJob">
          <el-select placeholder="请选择" v-model="form.borrowerJob" v-if="isEdit">
          <el-option
            v-for="item in jobData"
            :key="item.jobId"
            :label="item.jobName"
            :value="item.jobId"
          ></el-option>
        </el-select>
          <span v-else>{{ job }}</span>
        </el-form-item>

        <el-form-item label="月收入:" prop="income">
          <el-select placeholder="请选择" v-model="form.income" v-if="isEdit">
            <el-option v-for="item in monthMoneyData" :key="item.id" :label="item.incomeName" :value="item.id"></el-option>
          </el-select>
          <span v-else>{{ income }}</span>
        </el-form-item>

        <el-form-item label="所在地区:" prop="address">
          <el-select v-model="form.borrowerAddress" clearable placeholder="请选择省" @change="handleCity" v-if="isEdit" style="width: 120px;">
            <el-option v-for="item in provinceData" :key="item.pid" :label="item.provincial" :value="item.pid"></el-option>
          </el-select>

          <el-select v-model="form.borrower2" clearable placeholder="请选择城市" v-if="isEdit" style="width: 120px;">
            <el-option v-for="item in cityData" :key="item.cid" :label="item.city" :value="item.cid"></el-option>
          </el-select>
          <span v-else>{{ address }}</span>
        </el-form-item>
        
        <el-form-item label="手机号码">
          <el-input class="input-item" placeholder="请输入姓名" v-model="form.phone" v-if="isEdit" :disabled="true"></el-input>
          <span v-else>{{ form.phone }}</span>
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input class="input-item" placeholder="请输入邮箱" v-model="form.email" v-if="isEdit" :disabled="true"></el-input>
          <span v-else>{{ form.email }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "./api/filterData.js";
import { mapMutations } from "vuex";
import { validaterName,  } from "@/util/validate";
export default {
  name: "personMessage",
  filters: {
    sexFilter(val) {
      const statusMap = {
        0: "女",
        1: "男"
      };
      return statusMap[val];
    }
  },
  data() {
    
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback();
        } else {
          callback(new Error("姓名格式错误"));
        }
      } else {
        callback(new Error("姓名不能为空"));
      }
    };
    const validateAdress = (rule, value, callback) => {
      if (this.form.borrowerAddress !== '' && this.form.borrower2) {
        callback()
      } else {
        callback(new Error("请选择地区"));
      }
    }
    return {
      isEdit: false,
      ageList: "",
      //省
      provinceData: [],
      //市 区
      cityData: [],
      monthMoneyData: [],
      jobData: [],
      form: {
        borrowerName: "",
        borrowerSex: "",
        borrowerAge: "",
        borrowerJob: "",
        income: "",
        borrowerAddress: "",
        borrower2: "",
        phone: "",
        email: "",
        borrowerId: ""
      },
      formRules: {
        borrowerName: [{ required: true, trigger: "change", validator: validateName }],
        borrowerSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        borrowerAge: [{ required: true, message: "请选择年龄范围", trigger: "change" }],
        borrowerJob: [{ required: true, message: "请选择职业", trigger: "change" }],
        income: [{ required: true, message: "请选择月收入", trigger: "change" }],
        address: [{ required: true, trigger: "change", validator: validateAdress }]
      },
    };
  },
  computed: {
    age() {
      let str = "";
      for (let i = 0; i < this.ageList.length; i++) {
        if (this.ageList[i].id === this.form.borrowerAge) {
          str = this.ageList[i].ageArea;
        }
      }
      return str
    },
    job() {
      let str = "";
      for (let i = 0; i < this.jobData.length; i++) {
        if (this.jobData[i].jobId === this.form.borrowerJob) {
          str = this.jobData[i].jobName;
        }
      }
      return str
    },
    income() {
      let str = "";
      for (let i = 0; i < this.monthMoneyData.length; i++) {
        if (this.monthMoneyData[i].id === this.form.income) {
          str = this.monthMoneyData[i].incomeName;
        }
      }
      return str
    },
    address() {
      let str = "";
      for (let i = 0; i < this.provinceData.length; i++) {
        if (this.provinceData[i].pid === this.form.borrowerAddress) {
          str = this.provinceData[i].provincial;
        }
      }
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].cid === this.form.borrower2) {
          str += this.cityData[i].city;
        }
      }
      return str;
    }
  },
  methods: {
    ...mapMutations(["SET_USERNAME", "SET_SEX"]),
    getData() {
      this.$axios
        .get(
          `/userBorrower/updateBorrowerById/${this.$store.state.userInfo.id}`
        )
        .then(res => {
          let {
            borrowerName,
            borrowerId,
            borrowerSex,
            borrowerAge,
            borrowerJob,
            income,
            borrowerAddress,
            borrower2,
            phone,
            email
          } = res;
          this.form = {
            borrowerName,
            borrowerId,
            borrowerSex,
            borrowerAge,
            borrowerJob,
            income,
            borrowerAddress,
            borrower2,
            phone,
            email
          };
          this.getCity(this.form.borrowerAddress);
          this.getAge();
        });
    },
    getAge() {
      api.getAllAgeArea().then(response => {
        this.ageList = response.data;
      });
    },
    //获取省
    getProvince() {
      this.$axios.get("city/getAllProvincial").then(res => {
        this.provinceData = res;
      });
    },
    handleCity(val) {
      this.form.borrower2 = "";
      this.getCity(val);
    },
    //获取 市 区
    getCity(val) {
      this.$axios.get(`city/getAllCity/${val}`).then(res => {
        this.cityData = res;
      });
    },
    getMonthMoney() {
      this.$axios.get("get/getIncome").then(res => {
        this.monthMoneyData = res;
      });
    },
    getJob() {
      this.$axios.get("get/getJob").then(res => {
        res.forEach(item => {
          if (item.jobId === 0) {
            item.jobName = "其他";
          }
        });
        this.jobData = res;
      });
    },
    //编辑
    edit() {
      this.isEdit = !this.isEdit;
    },
    //保存
    savePerson() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = new FormData();
          for (let item in this.form) {
            data.append(item, this.form[item]);
          }
          this.$axios.post("userBorrower/updateUserBorrower", data).then(res => {
            if (res.status === 500) {
              this.$message.warning(res.msg);
              this.getData();
            }
            if (res.status === 200) {
              this.$message.success(res.msg);
              this.getData();
              this.SET_USERNAME(this.form.borrowerName);
              this.SET_SEX(this.form.borrowerSex)
            }
            this.isEdit = !this.isEdit;
          });
        } else {
          return false
        }
      })
    },
    //放弃修改
    abandonPerson() {
      this.getData();
      this.isEdit = false;
      this.$refs.form.clearValidate()
    }
  },
  created() {
    this.getData();
    this.getProvince();
    //月收入
    this.getMonthMoney();
    //职业
    this.getJob();
  }
};
</script>

<style scoped lang="scss">
.form-wrap {
  .input-item {
    width: 200px;
  }
}
.ml20 {
  margin-left: 20px;
}
.person {
  width: 882px;
  height: 723px;
  background: rgba(255, 255, 255, 1);
  .el-form-item {
    margin-bottom: 0;
    padding: 20px 10px;
  }
  .border-show {
    .el-form-item {
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .title {
    width: 100%;
    height: 70px;
    padding-left: 54px;
    padding-right: 90px;
    box-sizing: border-box;
    .title-text {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 70px;
    }
    .edit {
      height: 70px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(208, 172, 86, 1);
      line-height: 70px;
      cursor: pointer;
    }
  }
}
</style>
