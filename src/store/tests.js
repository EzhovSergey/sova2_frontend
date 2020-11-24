import Axios from 'axios'

export default {
  actions: {
    async tests ({ commit }) {
      await Axios.get(`http://sova-app-backend.herokuapp.com/${sessionStorage.getItem('token')}/tests`, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataTests', res)
      })
    }
  },
  mutations: {
    updateDataTests (state, res) {
      state.tests = res.data
    }
  },
  state: {
    tests: {}
  },
  getters: {
    getTestsAll: state => state.tests
  }
}
