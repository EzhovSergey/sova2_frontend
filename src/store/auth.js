import Axios from 'axios'

export default {
  actions: {
    async statusNull ({ commit }) {
      await commit('updateStatus')
    },

    async auth ({ commit }, formDataAuth) {
      await Axios.post('http://sova-app-backend.herokuapp.com/auth', formDataAuth, {
        headers: {
          mode: 'no-cors'
        }
      })
        .then(res => {
          commit('updateDataAuth', res)
        })
        .catch(e => {
          console.log(e)
          commit('updateError')
        })
    },

    async register ({ commit }, formDataRegister) {
      await Axios.post('http://sova-app-backend.herokuapp.com/register', formDataRegister, {
        headers: {
          mode: 'no-cors'
        }
      })
        .then(res => {
          commit('updateDataRegister', res)
        })
        .catch(e => {
          console.log(e)
          commit('updateError')
        })
    }
  },
  mutations: {
    updateDataAuth (state, res) {
      state.fio = res.data.fio
      state.token = res.data.token
      state.status = res.status
    },
    updateDataRegister (state, res) {
      state.token = res.data.token
      state.status = res.status
    },
    updateError (state) {
      state.status = 500
    },
    updateStatus (state) {
      state.status = 0
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
