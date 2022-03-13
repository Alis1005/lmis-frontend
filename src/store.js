import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thisVue : {},
    user: null
  },
  mutations: {
    setThisVue(state, payload){
      state.thisVue = payload;
  },
  setUserData(state, data){
    state.user = data
  }
  },
  actions: {
    setThisVue(context, payload){
      context.commit('setThisVue', payload);
  },
    setUser(context, data){
      // let _this = context.state.thisVue;
      context.commit('setUserData', data);
      
    }
  }
})