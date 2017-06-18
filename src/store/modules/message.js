import { fetch } from '@/utils'

const state = {
  message: []
}

const getters = {
  messageList: state => state.message,
  hasNotRead: state => (state.message.filter((el) => !el.status).length > 0)
}

const actions = {
  getMessageList ({ commit }, { id, error, success }) {
    fetch(`human/message/${id}`, 'get', {}, (res) => {
      commit('saveMessageList', res.data)
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
  saveMessageList (state, data) {
    state.message = data
  },
  errorHandle (state) {
    state.message = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

