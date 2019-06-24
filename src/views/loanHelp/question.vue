<template>
  <div class="guid">
    <el-collapse v-model="select" accordion>
      <el-collapse-item title="哪些情况不能办理贷款？" name="1">
        <div>一般来讲，出现以下情况可能无法办理贷款：</div>
        <div>1）年龄未满18周岁，或在65周岁以上。</div>
        <div>2）无民事行为能力（不能辨认自己行为的精神病人）。</div>
        <div>
          3）个人信用记录不良（包括：存在被起诉、被法院执行的记录；长期拖欠水、电、话费等费用而造成的不良记录；
          信用卡有严重的逾期记录；个人贷款有严重的违约记录等）。
        </div>
        <div>4）个人或家庭负债过高的情况。</div>
        <div>5）无收入无资产的情况。</div>
        <div>
          注：各金融渠道根据自身风险偏好或其他方面的要求，对以上情况做出的评价并不一样，
          具体情况需要由专业的融资顾问帮助做出评价。
        </div>
      </el-collapse-item>
      <el-collapse-item title="哪些情况会导致贷款失败？" name="2">
        <div>
          1）贷款资料存在失误 ——借款人申请贷款时，不小心将贷款资料填写错误，
          因为“资料不完整”或者“无法核实”被拒之门外。
        </div>
        <div>2）产权时间和贷款申请时间较近。</div>
        <div>
          3）虚假浮夸 ——金融渠道并不会认为只要客户具备贷款的物质条件就有义务必须放款，在他们看来客户的诚信和素质
          也是非常重要的贷款条件，
          所以在申请贷款的过程中切勿夸夸其谈，如实反映情况会争取到更多的信任。
        </div>
        <div>
          4）征信太差 ——金融机构非常看重征信，如果当前有逾期是最致命的，所以为了顺利批贷，一定要保持良好的信用记录。
          如个人征信不慎出现不良记录，请向融资顾问咨询，他们会给您专业的建议和解决方案。
        </div>
        <div>
          5）贷款用途不实或不在放款机构的许可范围 ——一般来讲，放款机构出于风险把控的考虑，除了对客户的财产、信用记录、
          还款能力等有严格的要求外，还对客户的资金用途有一定要求。如果放款机构在与客户在交流过程中发现客户对资金用途的说法不真实，
          或者闪烁其词，前后矛盾，那么很可能会被认为客户不诚信或放款有风险而被拒绝。
        </div>
        <div>
          6）资产被查封或者借款人名下有被执行记录 ——被查封的资产是无法办理抵押手续的，因此在申请的初期就会被告知贷款失败。同时，
          借款人名下有经济官司或者被执行记录也会直接影响贷款的成败。
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="position_div"/>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {
      tableData: [],
      select: ''
    }
  },
  created() {
    if (location.href.split('?')[1]) {
      const id = location.href.split('?')[1].split('=')[1]
      this.select = id
    }
  }
}
</script>

<style scoped>
.guid {
  width: 902px;
  padding: 20px 50px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
}
/deep/ .el-collapse {
  border-top: none;
}
</style>
