import { fetch } from '@/utils'

const state = {
  attendance: []
}

const getters = {
  attendanceList: state => state.attendance
}

const actions = {
  getAttendanceList ({ commit }, { id, error, success }) {
    fetch(`human/attendances/${id}`, 'get', {}, (res) => {
      commit('saveAttendanceList', res.data)
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
  saveAttendanceList (state, data) {
    state.attendance = data
  },
  errorHandle (state) {
    state.attendance = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

