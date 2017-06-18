import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import salary from './modules/salary'
import asset from './modules/asset'
import attendance from './modules/attendance'
import message from './modules/message'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    salary,
    asset,
    attendance,
    message
  },
  strict: debug
})
