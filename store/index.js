import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    token: ''
  },
  mutations: {
    setToken (state, text) {
      state.token = text
    },
    removeToken(state) {
      state.token = ""
    }
  },
  getters: {
    token: state => state.token
  }
})

export default store
