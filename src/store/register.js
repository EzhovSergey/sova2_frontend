import Axios from 'axios'

export default {
  actions: {
    async register ({ commit }, formDataRegister) {
      await Axios.post('http://localhost:8081/register', formDataRegister, {
        headers: {
          mode: 'no-cors'
        }
      })
        .then(res => {
          commit('updateData', res)
        })
    }
  },
  mutations: {
    updateData (state, res) {
      state.token = res.data.token
      state.status = res.data.status
    }
  },
  state: {
    token: '',
    status: null
  },
  getters: {
    token: state => state.token,
    status: state => state.status
  }
}
