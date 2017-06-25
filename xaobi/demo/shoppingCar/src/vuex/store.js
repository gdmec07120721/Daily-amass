import Vue from 'vue'
import Vuex from 'vuex'

//告诉vue“使用”vuex
Vue.use(Vuex)

//创建一个对象来保存应用启动时的初始状态
const state = {
  //放置初始状态
  user:'',
  app:''
}

//创建一个对象储存一系列我们接下来要mutation（变更）函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  USER(state,userValue){
  	state.user = userValue
  },
  APPSTORE(state, appValue){
  	state.app = appValue
  }
  
}


//整合初始状态和变更函数，我们就得到了所需的store
//至此，这个store就可以连到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})