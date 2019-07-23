<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="help clearfix">
          <div class="fll">
            <div v-for="(item, index) in leftList" :key="index" :class="{active: currentIndex === index}" class="help-left" @click="handleHelp(index, item.id)">
              <span>{{ item.name }}</span>
              <i class="el-icon-arrow-right flr"/>
            </div>
            <div class="add1"/>
          </div>
          <div class="fll ml30 main">
            <component :is="type"/>
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
    <bottomTap/>
  </div>
</template>

<script>
import bottomTap from '@/component/bottomTap'
import footerSame from '@/component/footerSame'
import { fetchParent } from '@/api/aboutUs'
import companyIno from './component/companyIno'
import newList from './component/newList'
import contactUs from './component/contactUs'
import wxxcx from './component/wxxcx'
export default {
  name: 'AboutUs',
  metaInfo: {
    title: '怎么办贷款_贷款逾期怎么办_贷款多久能办下来_买二手房怎么办贷款_9能贷款',
    meta: [{
      name: 'keyWords',
      content: '如何办贷款,办卡贷款吗,哪个机构贷款,贷款卡怎么办,怎么办抵押贷款,抵押贷款怎么办,无息贷款怎么办,贷款机构有哪些,贷款还不上怎么办,贷款办不下来怎么办,还不起贷款怎么办,怎么办信用卡贷款,网上贷款怎么办,买房子怎么办贷款,信用卡呢能办贷款吗,正规贷款机构有哪些,贷款买车需要什么手续,公积金贷款能贷多少,9能贷款'
    }, {
      name: 'description',
      content: '9能贷联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.办贷款手续,贷款买房流程,二手房贷款流程,公积金贷款流程,公积金贷款额度,住房公积金贷款条件,住房公积金贷款额度,住房公积金贷款利率.'
    }]
  },
  components: {
    footerSame,
    bottomTap,
    companyIno,
    newList,
    contactUs,
    wxxcx
  },
  data() {
    return {
      currentIndex: 0,
      leftList: [],
      type: 'companyIno'
    }
  },
  created() {
    this.getLeft()
  },
  methods: {
    getLeft() {
      fetchParent().then(res => {
        this.leftList = res.data
      })
    },
    handleHelp(val, id) {
      if (id === 1) {
        this.type = 'companyIno'
      } else if (id === 2) {
        this.type = 'newList'
      } else if (id === 3) {
        this.type = 'contactUs'
      } else {
        this.type = 'wxxcx'
      }
      this.currentIndex = val
    }
  }
}
</script>

<style scoped lang="scss">
.ml30{
  margin-left: 30px;
}
.help-left{
  width: 226px;
  height: 65px;
  background:rgba(255,255,255,1);
  padding: 45px 36px 0 36px;
  box-sizing: border-box;
  cursor: pointer;
  a{
    width:120px;
    height:20px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(81,81,81,1);
    line-height:20px;
  }
  i{
    line-height: 20px;
  }
  &.active{
    color:rgba(168,14,14,1);
  }
}
.main {
  width: 944px;
  background: #fff;
  padding: 30px 50px;
  box-sizing: border-box;
}
.add1{
  width: 226px;
  height: 55px;
  background:rgba(255,255,255,1);
}
</style>
