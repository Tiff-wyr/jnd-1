<template>
 <div class="guid">
   <el-collapse accordion>
     <el-collapse-item title="怎么办贷款？" name="1">
       <div>
         办理贷款首先需要选择渠道，渠道分为银行、贷款机构（担保公司、小额贷款公司、典当行、信托公司、
         信用社等）、民间借贷。用户根据自身的资金需求、个人资质等情况选择具体的渠道和贷款产品办理贷款申请。
         不同的渠道、贷款产品所需的用户资料、对资质的要求、贷款流程、
         放款金额和利率等各不相同。
       </div>

     </el-collapse-item>
     <el-collapse-item title="为什么选择9能贷？" name="2">
       <div>
         客户自己办理贷款往往需要相对专业的知识，并且要对各渠道各贷款产品有较全面的了解，才能办理到适合自己的贷款。
         另外很多渠道（如银行）不仅对用户的资质有严格要求，还会严格审核用户的资金用途。另一方面，客户本身也没有时
         间精力去研究或办理贷款，会导致融资成本过高，自己亲自办理也要多次在各渠道间往返折腾。因此借贷者需要到9能
         贷找专业的融资顾问根据其个人的情况针对性的制定合适的贷款方案，帮助客户在拿到所需的资金同时，也能降低贷款
         成本和节省时间（很多中间流程都有专人代为办理）。
       </div>
       <div>
        9能贷是国内专业的贷款服务平台，平台内的顾问经过专业的培训和多年的市场磨炼，完全可以独挡一面，解决客户所
         面对的贷款难题。
       </div>

     </el-collapse-item>
     <el-collapse-item title="贷款流程是怎样的？" name="3">
       <div>1）申请贷款（拨经纪人或机构电话、主动找经纪人咨询或在就能贷网站填写您的贷款信息均可）。</div>
       <div>2）电话沟通确认用户资金需求、个人资质（资产和征信）、所需材料；初步确认用户是否可以办理。</div>
       <div>3）与融资顾问面谈，进一步沟通具体需求、贷款方案等事项。</div>
       <div>4）双方签约达成合作协议。</div>
       <div>5）提供相应资料。</div>
       <div>6）等待放款。</div>
     </el-collapse-item>
     <el-collapse-item title="办贷款，我需要准备哪些资料？" name="4">
       <div>办贷款所需的材料视具体情况而定：</div>
       <div>无抵押贷款资料：身份证、收入证明，银行流水等；</div>
       <div>房产抵押贷款资料：身份证、户口薄、结婚证、产权证、国土证（或大国土）、银行流水等；</div>
       <div>车贷资料：身份证、机动车辆登记证书、购置发票及税票、保险单、备用钥匙（如需抵押）等。</div>
     </el-collapse-item>
     <el-collapse-item title="办理贷款，金额多久可以到账？" name="5">
       <div>决定贷款到账时间的因素有很多，其中起决定性的是客户的资质情况以及办理相关贷款所需的资料是否完备。
         另外不同的产品所需的流程各不相同，在相应资料完备、 办理顺利的情况下，从签约到放款最快可以1小时内到账。
       </div>
     </el-collapse-item>
   </el-collapse>
   <div class="position_div"></div>
 </div>
</template>

<script>
    export default {
        name: "guide",
      data(){
          return {
            tableData:[]
          }
      }
    }
</script>

<style scoped>
.guid{
  width:902px;
  padding: 20px 50px;
  box-sizing: border-box;
  background:rgba(255,255,255,1)
}
  /deep/ .el-collapse {
    border-top: none;
  }

</style>
