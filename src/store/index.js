/**
 * Created by Administrator on 2018/12/13 0013.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Store({
  state: {
    userInfo: null
  },
  mutations: {
    'SET_USER_VIP': (state, vip) => {
      state.userInfo = { ...state.userInfo, vip }
    },
    'SET_SEX': (state, sex) => {
      state.userInfo = { ...state.userInfo, sex }
    },
    'SET_USER_IMAGE': (state, image) => {
      state.userInfo = { ...state.userInfo, image }
    },
    'SET_USERNAME': (state, name) => {
      state.userInfo = { ...state.userInfo, name }
    },
    'SET_USER_PHONE': (state, phone) => {
      state.userInfo = { ...state.userInfo, phone }
    },
    'SET_USER_LEVEL': (state, level) => {
      state.userInfo = { ...state.userInfo, level }
    },
    'SET_USER': (state, userinfo) => {
      state.userInfo = userinfo
    }
  },
  actions: {
    setUid({ commit }, data) {
      commit('SET_UID', data)
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})
export default store
