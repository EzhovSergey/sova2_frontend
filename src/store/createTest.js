import Axios from 'axios'

export default {
  actions: {
    async createTest ({ commit }, formDataCreateTest) {
      await Axios.post(`http://sova-app-backend.herokuapp.com/${sessionStorage.getItem('token')}/tests`, formDataCreateTest, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataCreateTest', res)
      })
    }
  },
  mutations: {
    updateDataCreateTest (state, res) {
      state.testId = res.data.test_id
    }
  },
  state: {
    testId: ''
  },
  getters: {
    getIdTest: state => state.testId
  }
}
