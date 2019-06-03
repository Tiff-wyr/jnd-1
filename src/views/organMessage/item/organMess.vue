<template>
  <div class="person">
    <div class="clearfix title">
      <div class="title-text fll">机构信息</div>
      <div>
        <div class="flr edit" v-if="!isEdit" @click="edit">编辑</div>
        <div v-else class="clearfix">
          <div class="flr edit" @click="abandonPerson" style="margin-left: 10px">放弃</div>
          <div class="flr edit" @click="savePerson(resultData.examineState)">保存</div>
        </div>
      </div>
    </div>
    <el-form :class="{'border-show': !isEdit}" ref="organMessData" :model="organMessData" :rules="organMessRules" label-position="right" label-width="120px">
      <el-form-item label="机构名称" prop="agencyName">
        <el-input v-if="isEdit" v-model="organMessData.agencyName" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyName }}</span>
      </el-form-item>
      <el-form-item label="机构代码" prop="agencyCode">
        <el-input v-if="isEdit" v-model="organMessData.agencyCode" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyCode }}</span>
      </el-form-item>
      <el-form-item label="机构介绍" prop="agencyIntroduction">
        <el-input type="textarea" v-if="isEdit" v-model="organMessData.agencyIntroduction" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyIntroduction }}</span>
      </el-form-item>
      <el-form-item label="营业执照" prop="agencyLicense">
        <div v-if="resultData.examineState != 1 && isEdit">
          <personImg
            v-model="organMessData.agencyLicense"
            :phone="phone"
            @success="uploadSuccess"
          ></personImg> &nbsp;&nbsp;<span>只能上传jpg/png文件，且不超过2MB</span>
        </div>
        <a v-else :href="resultData.agencyLicense" target="_blank">
          <img :src="resultData.agencyLicense" alt="" style="width: 80px;height: 80px;">
        </a>
      </el-form-item>
      <el-form-item label="成立年限" prop="agencyAgeLimit">
        <el-input v-if="isEdit" v-model="organMessData.agencyAgeLimit" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyAgeLimit }}年</span>
      </el-form-item>
      <el-form-item label="营业期限" prop="businessTime">
        <div v-if="isEdit">
          <el-date-picker
            v-model="organMessData.startBusiness"
            :disabled="!isEdit"
            type="date"
            placeholder="开始日期"
            style="width: 135px;"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-date-picker
            style="width: 135px;"
            v-model="organMessData.endBusiness"
            :disabled="!isEdit"
            type="date"
            placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <span v-else>{{ resultData.startBusiness }}~{{ resultData.endBusiness }}</span>
      </el-form-item>
      <el-form-item label="机构电话" prop="agencyPhone">
        <el-input v-if="isEdit" v-model="organMessData.agencyPhone" class="input-item" @change="checkOrgan"></el-input>
        <span v-else>{{ resultData.agencyPhone }}</span>
      </el-form-item>
      <el-form-item label="机构网址" prop="agencyURL">
        <el-input v-if="isEdit" v-model="organMessData.agencyURL" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyURL ? resultData.agencyURL : '' }}</span>
      </el-form-item>
      <el-form-item label="所属公司" prop="companyOwned">
        <el-input v-if="isEdit" v-model="organMessData.companyOwned" class="input-item"></el-input>
        <span v-else>{{ resultData.companyOwned ? resultData.companyOwned : '' }}</span>
      </el-form-item>
      <el-form-item label="所在地区" prop="address">
        <div v-if="isEdit">
          <el-select
            style="width: 100px;"
            @change="getCity"
            @visible-change="clearCity"
            v-model="organMessData.agencyAddress"
          >
            <el-option
              v-for="item in provinceData"
              :key="item.pid"
              :label="item.provincial"
              :value="item.pid"
              style="width: 100px;"
            ></el-option>
          </el-select>
          <el-select
            style="margin-left: 10px;width: 100px;"
            v-model="organMessData.agencyAddress1"
          >
            <el-option
              style="width: 100px;"
              v-for="item in cityData"
              :key="item.cid"
              :label="item.city"
              :value="item.cid"
            ></el-option>
          </el-select>
        </div>
        <span v-else>{{provinceFilter(resultData.agencyAddress)}} {{cityFilter(resultData.agencyAddress1)}}</span>
      </el-form-item>
      <el-form-item label="填写人姓名" prop="agencyUsername">
        <el-input v-if="isEdit" v-model="organMessData.agencyUsername" class="input-item"></el-input>
        <span v-else>{{ resultData.agencyUsername }}</span>
      </el-form-item>
      <el-form-item label="填写人身份" prop="agencyIdentity">
        <div v-if="isEdit">
          <el-radio-group v-model="organMessData.agencyIdentity" :disabled="true">
            <el-radio :label="1">法定代表人</el-radio>
            <el-radio :label="2">代理人</el-radio>
          </el-radio-group>
        </div>
        <span v-else>{{ resultData.agencyIdentity | identityFilter }}</span>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-if="isEdit" :disabled="true" v-model="organMessData.phone" class="input-item"></el-input>
        <span v-else>{{ resultData.phone }}</span>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-if="isEdit" :disabled="true" v-model="organMessData.email" class="input-item"></el-input>
        <span v-else>{{ resultData.email }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import personImg from "@/component/imgUpload";
import { mapMutations } from "vuex";
import { randomWord } from "@/util/util";
import { validaterName, validaterOragnName } from "@/util/validate";
export default {
  name: "organMess",
  components: {
    personImg
  },
  filters: {
    identityFilter(val) {
      const statusMap = {
        1: '法定代表人',
        2: '代理人'
      }
      return statusMap[val]
    }
  },
  data() {
    const validateStartBusiness = (rule, value, callback) => {
      if (this.organMessData.startBusiness && this.organMessData.endBusiness) {
        if (this.organMessData.endBusiness <= this.organMessData.startBusiness) {
          callback(new Error("开始时间不能大于过期时间"));
        } else {
          callback();
        }
      } else {
        callback(new Error("营业期限不能为空"));
      }
    };
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback();
        } else {
          callback(new Error("填写人姓名格式错误"));
        }
      } else {
        callback(new Error("填写人姓名不能为空"));
      }
    };
    const validateOrganName = (rule, value, callback) => {
      if (value) {
        if (validaterOragnName(value)) {
          callback();
        } else {
          callback(new Error("机构名称格式错误，正确格式为汉字或英文"));
        }
      } else {
        callback(new Error("机构名称不能为空"));
      }
    };
    
    const validateAdress = (rule, value, callback) => {
      if (this.organMessData.agencyAddress && this.organMessData.agencyAddress1) {
        callback()
      } else {
        callback(new Error('请选择所在地区'))
      }
    };
    return {
      phone: "",
      loading: false,
      isEdit: false,
      //省
      provinceData: [],
      //市 区
      cityData: [],
      organMessData: {
        agencyId: "",
        agencyName: "",
        agencyCode: "",
        agencyIntroduction: "",
        agencyLicense: "",
        agencyAgeLimit: "",
        startBusiness: "",
        endBusiness: "",
        agencyURL: "",
        agencyPhone: "",
        companyOwned: "",
        agencyAddress: "",
        agencyAddress1: "",
        agencyUsername: "",
        agencyIdentity: "",
        phone: "",
        email: ""
      },
      resultData: {},
      organMessRules: {
        agencyName: [{ required: true, trigger: 'change', validator: validateOrganName }],
        agencyCode: [{ required: true, message: '机构代码不能为空', trigger: 'change' }],
        agencyLicense: [{ required: true, message: '营业执照不能为空', trigger: 'change' }],
        businessTime: [{ required: true, trigger: "change", validator: validateStartBusiness }],
        agencyPhone: [{ required: true, message: '机构电话不能为空', trigger: 'change' }],
        agencyIntroduction: [{ required: true, message: '机构介绍不能为空', trigger: 'change' }],
        address: [{ required: true, trigger: 'change', validator: validateAdress }],
        agencyUsername: [{ required: true, trigger: "change", validator: validateName }],
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERNAME"]),
    provinceFilter(val) {
      for (let i = 0; i < this.provinceData.length; i++) {
        if (this.provinceData[i].pid === val) {
          return this.provinceData[i].provincial
        }
      }
    },
    cityFilter(val) {
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].cid === val) {
          return this.cityData[i].city
        }
      }
    },
    checkOrgan() {
      // let test=^[0-9]*$
      let value = this.organMessData.agencyPhone;
      if (!/^[0-9]*$/.test(value)) {
        this.$message.warning("不符合规范");
        this.organMessData.agencyPhone = "";
      }
    },
    //编辑
    edit() {
      this.isEdit = !this.isEdit;
    },
    //保存
    savePerson(val) {
      this.loading = true;
      this.$refs.organMessData.validate(valid => {
        if (valid) {
          delete this.organMessData.examineState
          if (this.organMessData.agencyAgeLimit === '') {
            this.organMessData.agencyAgeLimit = 0
          }
          let data = new FormData();
          for (let item in this.organMessData) {
            data.append(item, this.organMessData[item]);
          }
          this.$axios.post("userAgency/updateUserAgency", data).then(res => {
            if (res.status === 500) {
              this.$message.warning(res.msg);
              this.getData();
            }
            if (res.status === 200) {
              this.loading = false;
              this.$message.success(res.msg);
              this.getData();
              this.SET_USERNAME(this.organMessData.agencyName);
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
      this.$refs.organMessData.clearValidate()
    },
    //获取省
    getProvince() {
      this.$axios.get("city/getShengHot").then(res => {
        this.provinceData = res;
      });
    },
    //获取 市 区
    getCity(val) {
      this.$axios.get(`city/getCityHot/${val}`).then(res => {
        this.cityData = res;
      });
    },
    clearCity(val) {
      if (!val) {
        this.organMessData.agencyAddress1 = "";
      }
    },

    getData() {
      this.$axios
        .get(`userAgency/updateUserAgencyById/${this.$store.state.userInfo.id}`)
        .then(res => {
          this.resultData = res
          let {
            agencyId,
            agencyName,
            agencyCode,
            agencyIntroduction,
            agencyLicense,
            agencyAgeLimit,
            startBusiness,
            endBusiness,
            agencyURL,
            agencyPhone,
            companyOwned,
            agencyAddress,
            agencyAddress1,
            agencyUsername,
            agencyIdentity,
            phone,
            email,
            examineState
          } = res;
          this.organMessData = {
            agencyId,
            agencyName,
            agencyCode,
            agencyIntroduction,
            agencyLicense,
            agencyAgeLimit,
            startBusiness,
            endBusiness,
            agencyURL,
            agencyPhone,
            companyOwned,
            agencyAddress,
            agencyAddress1,
            agencyUsername,
            agencyIdentity,
            phone,
            email,
            examineState
          };
          this.getCity(this.organMessData.agencyAddress);
        });
    },
    uploadSuccess(file) {
      this.organMessData.agencyLicense = file;
      this.resultData.agencyLicense = file
    }
  },
  created() {
    this.phone = new Date().getTime() + randomWord(false, 10);
    this.getData();
    this.getProvince();
  }
};
</script>

<style scoped lang="scss">

.input-item {
  width: 200px;
}
.person {
  width: 882px;
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