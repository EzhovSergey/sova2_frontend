import Axios from 'axios'

export default {
  actions: {
    async tests ({ commit }) {
      await Axios.get(`http://localhost:8081/${sessionStorage.getItem('token')}/tests`, {
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
    getAll: state => state.tests
  }
}
