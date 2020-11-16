import Axios from 'axios'

export default {
  actions: {
    async result ({ commit }, formData) {
      await Axios.post(`http://localhost:8081/tests/${formData.id}`, formData.formDataResultTest, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataResultTest', res)
      })
    }
  },
  mutations: {
    updateDataResultTest (state, res) {
      state.mark = res.data.mark
    }
  },
  state: {
    mark: -1
  },
  getters: {
    getMark: state => state.mark
  }
}
