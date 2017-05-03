import { fetch } from '@/utils'

const state = {
  user: null,
  loading: true
}

const getters = {
  getUser: state => state.user
}

const actions = {
  getUserDetail ({ commit }, { id, error }) {
    fetch(`human/users/${id}`, 'get', {}, (res) => {
      commit('saveUserDetail', res.data)
    }, (err) => {
      if (err.response) {
        commit('errorUserDetaol')
        error()
      }
    })
  }
}

const mutations = {
  saveUserDetail (state, data) {
    state.user = data
    state.loading = false
  },
  errorUserDetaol (state) {
    state.user = null
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

