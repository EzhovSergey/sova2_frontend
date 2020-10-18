export default {
  actions: {
    async fetch_loginInfo ({ commit }) {
      const res = await fetch('http://localhost:8081/test', {
        mode: 'no-cors'
      })
      console.log(res)
      const loginInfo = await res.json()
      console.log(loginInfo)
      commit('update_loginInfo', loginInfo)
    }
  },
  mutations: {
    update_loginInfo (state, loginInfo) {
      state.loginInfo = loginInfo
    }
  },
  state: {
    loginInfo: []
  },
  getters: {
    all_loginInfo (state) {
      return state.loginInfo
    }
  }
}
