<template>
  <div class="app-container">
    <div class="consult-list">
      <div class="left">
        <ul>
          <li v-for="(item, index) in navList" :key="index" :class="{active: navIndex === index}" class="nav-item" @click="handleNav(index)">
            <h3 class="title">{{ item.label }} <i class="caret"/> </h3>
            <div class="toogle-box">
              <p v-for="i in item.list" :key="i.id" :class="{ active: navId === i.id }" class="item" @click="handleArticle(i)">{{ i.label }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="center">
        <h3 class="title p12">{{ navName }}</h3>
        <div class="article-list">
          <dl v-for="(item, index) in resultList" :key="index" class="article-item p12" @click="handleDetail(item)">
            <dt class="article-img">
              <img :src="item.image" alt="">
            </dt>
            <dd class="article-content">
              <div>
                <h3 :title="item.topic" class="article-title" style="margin-bottom: 16px;">{{ item.topic }}</h3>
                <p :title="item.introduction" class="instroduce">{{ item.introduction }}</p>
              </div>

              <acticle-footer :source="item.source" :num="item.viewNumber" :time="item.releaseTime"/>
            </dd>
          </dl>
        </div>
      </div>
      <div class="right">
        <recommend-article :list="top9List" title="大家都在看"/>
        <recommend-article :list="newList" title="最新文章" style="margin-top: 30px;"/>
      </div>
      <div class="page-container">
        <el-pagination
          :current-page="listQuery.page"
          :page-size="listQuery.pageSize"
          :pager-count="5"
          :total="total"
          background=""
          layout="prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
    <footerSame/>
    <bottomTap/>
  </div>
</template>
<script>
import footerSame from '@/component/footerSame'
import bottomTap from '@/component/bottomTap'
import tabbar from './components/tabbar'
import acticleFooter from './components/acticleFooter'
import recommendArticle from './components/recommendArticle'
import { fetchAtricle, viewTop9Article, getNewArticle } from '@/api/consult.js'

const navList = [
  {
    id: 0,
    label: '银行咨讯',
    list: [
      { label: '中信银行', id: 1 },
      { label: '工商银行', id: 2 },
      { label: '建设银行', id: 3 },
      { label: '交通银行', id: 4 },
      { label: '农业银行', id: 5 },
      { label: '中国银行', id: 6 }
    ]
  }, {
    id: 1,
    label: '贷款资讯',
    list: [
      { label: '个人贷款', id: 7 },
      { label: '小额贷款', id: 8 },
      { label: '抵押贷款', id: 9 },
      { label: '信用贷款', id: 10 },
      { label: '新手贷款', id: 11 },
      { label: '贷款攻略', id: 12 }
    ]
  }, {
    id: 2,
    label: '贷款百科',
    list: [
      { label: '日利率', id: 13 },
      { label: '等额本息', id: 14 },
      { label: '住房公积金', id: 15 },
      { label: '小额贷款', id: 16 },
      { label: '银行贷款', id: 17 },
      { label: '个人征信', id: 18 },
      { label: '政策解读', id: 19 },
      { label: '信贷周报', id: 20 },
      { label: '信贷月报', id: 21 },
      { label: '经验分享', id: 22 },
      { label: '贷款防骗', id: 23 },
      { label: '申请样本', id: 24 }
    ]
  }

]
export default {
  name: 'ConsultList',
  components: {
    footerSame,
    bottomTap,
    tabbar,
    acticleFooter,
    recommendArticle
  },
  data() {
    return {
      navList,
      navIndex: 0,
      navId: 1,
      listQuery: {
        page: 1,
        pageSize: 10,
        id: 1
      },
      resultList: [],
      top9List: [],
      newList: [],
      total: 0,
      navName: '中信银行'
    }
  },
  created() {
  },
  mounted() {
    const id = Number(location.href.split('?')[1].split('=')[1])
    console.log(id)
    this.navIndex = id
    this.navName = this.navList[id].list[0].label
    this.navId = this.navList[id].list[0].id
    this.listQuery.id = this.navList[id].list[0].id
    this.getList()
    this.getTop9()
    this.getNew()
  },
  methods: {
    getList() {
      fetchAtricle(this.listQuery).then(res => {
        this.resultList = res.data.data.rows
        this.total = res.data.data.total
        window.scrollTo(0, 0)
      })
    },
    getTop9() {
      viewTop9Article().then(res => {
        this.top9List = res.data
      })
    },
    getNew() {
      getNewArticle().then(res => {
        this.newList = res.data
      })
    },
    handleDetail(item) {
      this.$router.push({ path: '/consultDetail', query: { id: item.id }})
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleNav(index) {
      this.navIndex = index
      console.log(this.navIndex)
    },
    handleItem(item) {
      this.navId = item.id
    },
    handleArticle(item) {
      this.navName = item.label
      this.navId = item.id
      this.listQuery.id = item.id
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
ul, li {
  list-style: none;
}
.p12 {
  padding: 12px;
}
.app-container {
  background: #F5F5F5;
  padding-top: 30px;
}
.consult-list {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  // display: flex;
  // justify-content: space-between;
  position: relative;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    width: 154px;
    background: #fff;
    padding: 30px 24px;
    box-sizing: border-box;
    .nav-item {
      margin-bottom: 30px;
      &.active {
        .title {
          color: #A80E0E;
          .caret {
            transform: rotate(180deg) translateY(4px);
            border-color: #A80E0E transparent transparent transparent;
          }
        }
        .toogle-box {
          height: auto!important;
        }
      }
    }
    .title {
      color: #515151;
      font-size: 20px;
      font-weight:500;
      cursor: pointer;
      .caret {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: #515151 transparent transparent transparent;
        vertical-align: middle;
      }
    }
    .toogle-box {
      font-size:16px;
      font-weight:400;
      color: #515151;
      line-height:20px;
      margin-top: 20px;
      height: 0;
      overflow: hidden;
      transition: all .5s;
      .item {
        box-sizing: border-box;
        padding-left: 14px;
        cursor: pointer;
        margin: 10px 0;
        border-left: 2px solid transparent;
        &:hover {
          color: #A80E0E;
          border-left: 2px solid #A80E0E;
        }
        &.active {
          color: #A80E0E;
          border-left: 2px solid #A80E0E;
        }
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    width: 206px;
  }
  .center {
    width: 780px;
    margin-left: 184px;
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      &:before {
        display: inline-block;
        content: '';
        width: 4px;
        height: 20px;
        background: #A80E0E;
        margin-right: 16px;
      }
    }
    .article-list {
      .article-item {
        display: flex;
        align-items: center;
        border-top: 1px solid #e9e9e9;
        cursor: pointer;
        .article-img {
          width: 140px;
          height: 140px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .article-content {
          width: 450px;
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
          .article-title {
            color: #515151;
            font-size:20px;
            font-weight:500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .instroduce {
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 14px;
            color: #9B9B9B;
            font-weight:400;
          }
        }
      }
    }
  }
  .page-container {
    text-align: right;
    margin-top: 30px;
    margin-right: 100px;
  }
}
</style>
