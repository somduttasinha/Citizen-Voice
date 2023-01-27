import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    response: null,
    currentQuestion: 1
  },
  mutations: {
    setResponse (state, response) {
      state.response = response
    },
    setCurrentQuestion (state, questionNumber) {
      state.currentQuestion = questionNumber
    }
  }
})
