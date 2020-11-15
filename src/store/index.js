import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import createTest from './createTest'
import tests from './tests'
import decision from './decision'
import answer from './answer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    createTest,
    tests,
    decision,
    answer
  }
})
