import Axios from 'axios'

export default {
  actions: {
    async auth ({ commit }, formDataAuth) {
      await Axios.post('http://localhost:8081/auth', formDataAuth, {
        headers: {
          mode: 'no-cors'
        }
      })
        .then(res => {
          commit('updateDataAuth', res)
        })
    },

    async register ({ commit }, formDataRegister) {
      await Axios.post('http://localhost:8081/register', formDataRegister, {
        headers: {
          mode: 'no-cors'
        }
      })
        .then(res => {
          commit('updateDataRegister', res)
        })
    }
  },
  mutations: {
    updateDataAuth (state, res) {
      state.fio = res.data.fio
      state.token = res.data.token
      state.status = res.data.status
    },
    updateDataRegister (state, res) {
      state.token = res.data.token
      state.status = res.data.status
    }
  },
  state: {
    fio: '',
    token: '',
    status: 0
  },
  getters: {
    fio: state => state.fio,
    token: state => state.token,
    status: state => state.status
  }
}
