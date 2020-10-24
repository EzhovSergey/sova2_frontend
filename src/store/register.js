import Axios from 'axios'

export default {
  actions: {
    async register ({ commit }, formDataRegister) {
      console.log(formDataRegister)
      // const jsonForm = JSON.stringify(formDataRegister)
      await Axios({
        url: 'http://localhost:8081/register',
        method: 'post',
        data: { body: JSON.stringify(formDataRegister) },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

      })
        .then(res => {
          const raw = res.token
          const status = res.status
          commit('updateToken', raw, status)
        })
    }
  },
  mutations: {
    updateToken (state, newToken, newStatus) {
      state.token = newToken
      state.status = newStatus
    }
  },
  state: {
    token: '',
    status: ''
  },
  getters: {
    token: (state) => state.token,
    status: (state) => state.status
  }
}
