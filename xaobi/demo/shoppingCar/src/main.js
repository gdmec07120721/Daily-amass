import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Index from './Index'
import ShoppingCar from './components/ShoppingCar'

//注册路由插件
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[{
     path: '/', component: Index
  },{
     path: '/carView', name: 'carView', component: ShoppingCar
  },{
     path: '/carEdit', name: 'carEdit', component: ShoppingCar
  }]
})

new Vue({
  el: '#app',    //这里绑定的是index.html中的id为app的div元素
  router,
  render:(function(h){
  	return h(App)
  })
})