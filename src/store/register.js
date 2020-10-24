import Axios from 'axios'

export default {
  actions: {
    async register ({ commit }, { formDataRegister }) {
      await Axios.post('http://localhost:8081/register',
        {
          // mode: 'no-cors',
          data: () => (formDataRegister)
        }
      )
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
