<template>
    <div class="input-wrap">
      <div class="code_wrap" v-if="isCode">
        <p>请用绑定的{{name}}{{number}}获取验证码</p>
        <button class="code_btn">获取验证码</button>
        <br>
        <input type="text" class="code_input" v-model="code" placeholder="输入验证码">
        <span class="input-rule">{{rule}}</span>
      </div>
      <div v-else>
        <p>请输入您绑定的{{name}}</p>
        <p>{{number}}</p>
        <div class="num_wrap">
          <input class="number" v-model="inputNumber" type="text" :placeholder="`完整的${name}号`">
          <span class="input-rule">{{rule}}</span>
        </div>
      </div>
      <div class="btn_wrap">
        <button class="btn" @click="HandleSubmit">确认</button>
        <p class="change_type_wrap">
          记不清了？<span class="change_type" @click="changeType">更换其他方式</span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'selectType',
  props: {
    type: String
  },
  data () {
    return {
      name: '',
      number: '',
      rule: '',
      inputNumber: '',
      isCode: false,
      code: '',
      phone: '17538532297',
      email: '1053221101@qq.com'
    }
  },
  methods: {
    initData () {
      let str = ''
      switch (this.type) {
        case 'phone':
          this.name = '手机'
          str = this.phone.slice(0, 3)
          this.number = str + '********'
          break
        case 'email':
          this.name = '邮箱'
          let emails = this.email.split('@')
          str = emails[0].slice(0, 3) + '****' + emails[0].slice(emails[0].length - 3, emails[0].length) + '@' + emails[1]
          this.number = str
          break
        default:
          break
      }
    },
    // 点击确认执行
    HandleSubmit () {
      if (this.isCode) {
        if (this.code) {
          this.$emit('success')
        } else {
          this.rule = '*不能为空'
        }
      } else {
        if (this.inputNumber === '' || this.inputNumber === null) {
          this.rule = '*不能为空'
        } else if (this.inputNumber !== this.phone && this.inputNumber !== this.email) {
          this.rule = `*${this.name}错误，请重新输入`
          this.inputNumber = ''
        } else {
          this.isCode = true
          this.rule = ''
        }
      }
    },
    // 更换方式
    changeType () {
      this.isCode = false
      this.inputNumber = ''
      this.name = ''
      this.number = ''
      this.rule = ''
      this.$emit('error')
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped lang="scss">
.input-wrap {
  .code_wrap {
    width: 160px;
    margin: auto;
    text-align: left;
    white-space: nowrap;
    .code_btn {
      width:90px;
      height:30px;
      border-radius:2px;
      border:1px solid rgba(208,172,86,1);
      outline: none;
      background: #fff;
      color: rgba(208,172,86,1);
      cursor: pointer;
    }
    .code_input {
      margin-top: 10px;
      width:100px;
      height:30px;
      padding-left: 10px;
      border-radius:2px;
      border:1px solid rgba(155,155,155,1);
    }
    .code_input::-webkit-input-placeholder {
      color:rgba(217,217,217,1);
    }
  }
  p {
    width: 160px;
    height:14px;
    margin:10px auto;
    white-space: nowrap;
    font-size:14px;
    text-align: left;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,155,155,1);
    line-height:14px;
  }
  .input-rule {
    margin-left: 12px;
    font-size:12px;
    font-family:PingFangSC-Light;
    font-weight:500;
    color:rgba(168,14,14,1);
    line-height:12px;
  }
  .num_wrap {
    width:160px;
    height:30px;
    margin: auto;
    white-space: nowrap;
    .number {
      width:160px;
      height:30px;
      box-sizing: border-box;
      border-radius:2px;
      padding-left: 10px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      line-height:14px;
      border:1px solid rgba(155,155,155,1);
    }
    .number::-webkit-input-placeholder {
      color:rgba(217,217,217,1);
    }
  }
  .btn_wrap {
    width: 160px;
    margin:20px auto;
    text-align: left;

    .btn {
      width:60px;
      height:30px;
      background:rgba(208,172,86,1);
      font-size:14px;
      border: none;
      outline: none;
      cursor: pointer;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:14px;
    }
    .change_type_wrap {
      margin-top: 5px;
      font-size:12px;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(155,155,155,1);
      line-height:12px;

      .change_type {
        color: rgba(208,172,86,1);
        cursor: pointer;
      }
    }
  }
}
</style>
