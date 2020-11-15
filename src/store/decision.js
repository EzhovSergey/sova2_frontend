import Axios from 'axios'

export default {
  actions: {
    async decisionTest ({ commit }, testId) {
      await Axios.get(`http://localhost:8081/tests/${testId}`, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataDecisionTest', res)
      })
    }
  },
  mutations: {
    updateDataDecisionTest (state, res) {
      state.fieldsTest = res.data
    }
  },
  state: {
    fieldsTest: {}
  },
  getters: {
    getFieldsTestAll: state => state.fieldsTest
  }
}
