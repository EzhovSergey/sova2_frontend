import Axios from 'axios'

export default {
  actions: {
    async testResults ({ commit }, testId) {
      await Axios.get(`http://sova-app-backend.herokuapp.com/${sessionStorage.getItem('token')}/result/${testId}`, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataTestResults', res)
      })
    }
  },
  mutations: {
    updateDataTestResults (state, res) {
      state.testResults = res.data
    }
  },
  state: {
    testResults: []
  },
  getters: {
    getTestsResultsAll: state => state.testResults
  }
}
