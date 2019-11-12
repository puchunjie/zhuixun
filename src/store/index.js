import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import city from './city'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules: {
    city,
    user
  }
})


export default store
