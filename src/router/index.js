import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const components = {
  home: () => import('@/views/Home'),
  loans: () => import('@/views/Loans'),
  agent: () => import('@/views/Agent'),
  organization: () => import('@/views/Organization'),
  help: () => import('@/views/Help'),
  aboutUs: () => import('@/views/aboutUs'),
  newDetail: () => import('@/views/aboutUs/newDetail'),
  consult: () => import('@/views/consult/consult'),
  consultDetail: () => import('@/views/consult/consultDetail'),
  layout: () => import('@/layout/layout'),

  myMessage: () => import('@/views/myMessage'),
  personMessage: () => import('@/views/personMessage'),
  myCollect: () => import('@/views/myCollect'),
  emailCenter: () => import('@/views/emailCenter'),
  applyRecordMy: () => import('@/views/applyRecordMy'),
  messageCenter: () => import('@/views/messageCenter'),
  secureCenter: () => import('@/views/secureCenter'),
  accessRecord: () => import('@/views/accessRecord'),
  userRegister: () => import('@/views/userRegister'),
  agentRegister: () => import('@/views/agentRegister'),
  organRegister: () => import('@/views/organRegister'),

  agentDetail: () => import('@/views/agentDetail'),
  organDetail: () => import('@/views/organDetail'),
  productDetail: () => import('@/views/productDetail'),
  userDetail: () => import('@/views/userDetail'),
  productList: () => import('@/views/productList'),

  findPassword: () => import('@/views/findPassword/index'),
  applyVictory: () => import('@/views/applyVictory'),
  registerJump: () => import('@/views/jump/registerJump'),

  organMessage: () => import('@/views/organMessage/organMessage'),
  accessRec: () => import('@/views/organMessage/item/accessRec'),
  emailCen: () => import('@/views/organMessage/item/emailCen'),
  memberCen: () => import('@/views/organMessage/item/memberCen'),
  organMess: () => import('@/views/organMessage/item/organMess'),
  payRes: () => import('@/views/organMessage/item/payRes'),
  productCen: () => import('@/views/organMessage/item/productCen'),
  resourceCen: () => import('@/views/organMessage/item/resourceCen'),
  secuCen: () => import('@/views/organMessage/item/secuCen'),
  messCen: () => import('@/views/organMessage/item/messCen'),
  applyRecord: () => import('@/views/organMessage/item/applyRecord'),

  agentCollect: () => import('@/views/myCollect/agentCollect'),
  organCollect: () => import('@/views/myCollect/organCollect'),
  productCollect: () => import('@/views/myCollect/productCollect'),

  guide: () => import('@/views/loanHelp/guide'),
  matter: () => import('@/views/loanHelp/matter'),
  question: () => import('@/views/loanHelp/question'),

  weixin: () => import('@/views/payType/weixin'),
  aliPay: () => import('@/views/payType/aliPay'),

  agentMessage: () => import('@/views/agentMessage/agentMessage'),
  agentAccess: () => import('@/views/agentMessage/item/agentAccess'),
  agentEmail: () => import('@/views/agentMessage/item/agentEmail'),
  agentMember: () => import('@/views/agentMessage/item/agentMember'),
  agentPersonal: () => import('@/views/agentMessage/item/agentPersonal'),
  agentMessageCenter: () => import('@/views/agentMessage/item/agentMessageCenter'),
  agentPay: () => import('@/views/agentMessage/item/agentPay'),
  agentProduct: () => import('@/views/agentMessage/item/agentProduct'),
  agentResource: () => import('@/views/agentMessage/item/agentResource'),
  agentSecure: () => import('@/views/agentMessage/item/agentSecure'),
  applyRecordAg: () => import('@/views/agentMessage/item/applyRecordAg'),
  agreement: () => import('@/views/agreement'),
  NotFoundComponent: () => import('@/views/404')
}

export default new Router({

  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      component: components.layout,
      redirect: '/',
      name: 'Ahome',
      children: [
        {
          path: '/',
          name: 'home',
          component: components.home,
          meta: {
            classify: 'home',
            setSeo: true,
            seoKey: 'home'
          }
        },
        {
          path: 'loans',
          name: 'loans',
          component: components.loans,
          meta: {
            classify: 'loans',
            setSeo: true,
            seoKey: 'loans'
          }
        },
        {
          path: 'agent',
          name: 'agent',
          component: components.agent,
          meta: {
            classify: 'agent',
            setSeo: true,
            seoKey: 'agent'
          }
        },
        {
          path: 'organization',
          name: 'organization',
          component: components.organization,
          meta: {
            classify: 'organ',
            setSeo: true,
            seoKey: 'organization'
          }
        },
        {
          path: 'consult',
          name: 'consult',
          component: components.consult,
          meta: {
            classify: 'consult',
            setSeo: true,
            seoKey: 'consult'
          }
        },
        {
          path: 'consultDetail',
          name: 'consultDetail',
          component: components.consultDetail
        },
        {
          path: 'aboutUs',
          name: 'aboutUs',
          cache: true,
          component: components.aboutUs,
          meta: {
            classify: 'aboutUs'
          }
        },
        {
          path: 'newDetail',
          name: 'newDetail',
          component: components.newDetail
        },
        {
          path: 'help',
          name: 'help',
          component: components.help,
          meta: {
            classify: 'help',
            setSeo: true,
            seoKey: 'help'
          },
          redirect: '/guide',
          children: [
            {
              path: 'question',
              name: 'question',
              component: components.question,
              alias: '/question',
              meta: {
                classify: 'help',
                setSeo: true,
                seoKey: 'help'
              }
            },
            {
              path: 'guide',
              name: 'guide',
              alias: '/guide',
              component: components.guide,
              meta: {
                classify: 'help',
                setSeo: true,
                seoKey: 'help'
              }
            },
            {
              path: 'matter',
              name: 'matter',
              component: components.matter,
              alias: '/matter',
              meta: {
                classify: 'help',
                setSeo: true,
                seoKey: 'help'
              }
            }
          ]

        },
        {
          path: '/productList',
          component: components.productList,
          meta: {
            classify: 'loans'
          }
        },
        {
          path: '/agentDetail',
          component: components.agentDetail,
          meta: {
            classify: 'agent'
          }
        },
        {
          path: '/userDetail',
          component: components.userDetail
        },
        {
          path: '/organDetail',
          component: components.organDetail,
          meta: {
            classify: 'organ'
          }
        },
        {
          path: '/productDetail',
          component: components.productDetail,
          meta: {
            classify: 'loans'
          }
        },

        {
          path: 'myMessage/:id',
          component: components.myMessage,
          redirect: '/personMessage/:id',
          children: [
            {
              path: 'personMessage',
              alias: '/personMessage/:id',
              component: components.personMessage
            },
            {
              path: 'applyRecordMy',
              alias: '/applyRecordMy/:id',
              component: components.applyRecordMy
            },
            {
              path: 'myCollect',
              component: components.myCollect,
              redirect: '/myMessage/:id/myCollect/agentCollect',
              children: [
                {
                  path: 'agentCollect',
                  component: components.agentCollect
                },
                {
                  path: 'organCollect',
                  component: components.organCollect
                },
                {
                  path: 'productCollect',
                  component: components.productCollect
                }
              ]
            },
            {
              path: 'accessRecord',
              component: components.accessRecord
            },
            {
              path: 'messageCenter',
              component: components.messageCenter

            },
            {
              path: 'emailCenter',
              component: components.emailCenter
            },
            {
              path: 'secureCenter',
              component: components.secureCenter
            }
          ]
        },
        {
          path: 'organMessage/:id',
          component: components.organMessage,
          redirect: '/organMessage/:id/resourceCen',
          children: [
            {
              path: 'productCen',
              component: components.productCen
            },
            {
              path: 'messCen',
              component: components.messCen
            },
            {
              path: 'secuCen',
              component: components.secuCen
            },
            {
              path: 'resourceCen',
              component: components.resourceCen
            },
            {
              path: 'emailCen',
              component: components.emailCen
            },
            {
              path: 'memberCen',
              component: components.memberCen
            },
            {
              path: 'organMess',
              component: components.organMess
            },
            {
              path: 'accessRec',
              component: components.accessRec
            },
            {
              path: 'payRes',
              component: components.payRes
            },
            {
              path: 'applyRecord',
              component: components.applyRecord
            }
          ]
        },
        {
          path: 'agentMessage/:id',
          component: components.agentMessage,
          redirect: '/agentMessage/:id/agentResource',
          children: [
            {
              path: 'agentPersonal',
              component: components.agentPersonal
            },
            {
              path: 'agentAccess',
              component: components.agentAccess
            },
            {
              path: 'agentEmail',
              component: components.agentEmail
            },
            {
              path: 'agentMember',
              component: components.agentMember
            },
            {
              path: 'agentMessageCenter',
              component: components.agentMessageCenter
            },
            {
              path: 'agentPay',
              component: components.agentPay
            },
            {
              path: 'agentProduct',
              component: components.agentProduct
            },
            {
              path: 'agentResource',
              component: components.agentResource
            },
            {
              path: 'agentSecure',
              component: components.agentSecure
            },
            {
              path: 'applyRecordAg',
              component: components.applyRecordAg
            }
          ]
        }
      ]
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: components.findPassword
    },
    {
      path: '/applyVictory',
      name: 'applyVictory',
      component: components.applyVictory
    },
    {
      path: '/registerJump',
      name: 'registerJump',
      component: components.registerJump
    },
    {
      path: '/weixin',
      name: 'weixin',
      component: components.weixin
    },
    {
      path: '/aliPay',
      name: 'aliPay',
      component: components.aliPay
    },
    {
      path: '/agreement',
      component: components.agreement
    },

    {
      path: '/userRegister',
      component: components.userRegister
    },
    {
      path: '/agentRegister',
      component: components.agentRegister
    },
    {
      path: '/organRegister',
      component: components.organRegister
    },
    { path: '*', component: components.NotFoundComponent }

  ]
})
