import Axios from 'axios'

export default {
  actions: {
    async answer ({ commit }, formData) {
      await Axios.post(`http://localhost:8081/tests/${formData.id}`, formData.formDataAnswerTest, {
        headers: {
          mode: 'no-cors'
        }
      }).then(res => {
        commit('updateDataAnswerTest', res)
      })
    }
  },
  mutations: {
    updateDataAnswerTest (state, res) {
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
