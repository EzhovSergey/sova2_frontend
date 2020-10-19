import Axios from 'axios'

export default {
  actions: {
    // use camelCase !!!//
    async fetch_loginInfo ({ commit }) {
      await Axios.get('http://localhost:8081/test')
        .then(res => {
          const raw = res.data
          commit('update_loginInfo', raw)
        })
    }
  },
  mutations: {
    // use camelCase !!!//
    update_loginInfo (state, loginInfo) {
      console.log(loginInfo)
      state.loginInfo = loginInfo
    }
  },
  state: {
    loginInfo: []
  },
  getters: {
    // use camelCase !!!//
    all_loginInfo (state) {
      return state.loginInfo
    }
  }
}
