import { fetch } from '@/utils'

const state = {
  asset: []
}

const getters = {
  assetList: state => state.asset
}

const actions = {
  getAssetList ({ commit }, { id, error, success }) {
    fetch(`human/assets/${id}`, 'get', {}, (res) => {
      commit('saveAssetList', res.data)
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
  saveAssetList (state, data) {
    state.asset = data
  },
  errorHandle (state) {
    state.asset = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

