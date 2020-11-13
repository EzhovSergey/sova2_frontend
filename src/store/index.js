import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import createTest from './createTest'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    createTest
  }
})
