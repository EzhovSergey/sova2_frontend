import Axios from 'axios'

export default {
  actions: {
    async decisionTest ({ commit }, testId) {
      await Axios.get(`http://sova-app-backend.herokuapp.com/tests/${testId}`, {
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
