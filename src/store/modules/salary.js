import { fetch } from '@/utils'

const state = {
  salary: null
}

const getters = {
  salaryList: state => state.salary
}

const actions = {
  getSalaryList ({ commit }, { id, error, success }) {
    fetch(`human/salary/${id}`, 'get', {}, (res) => {
      commit('saveSalaryList', res.data)
      success && success()
    }, (err) => {
      if (err.response) {
        commit('errorHandle')
        error && error()
      }
    })
  }
}

const mutations = {
  saveSalaryList (state, data) {
    state.salary = data
  },
  errorHandle (state) {
    state.salary = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

