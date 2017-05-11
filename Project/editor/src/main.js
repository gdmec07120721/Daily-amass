import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Hello from './components/Hello'
import Editor from './components/Editor'

//注册路由插件
Vue.use(VueResource)
Vue.use(VueRouter)

//Vue.http.options.root = 'http://218.17.158.113:13001/servlet/json'
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }

//定义router常量
const router = new VueRouter()

router.map({
	'/index':{
		component:Hello
	},
	'/new':{
		component:Editor
	}
})

router.redirect({
	'*':'/index'
})

router.start(App,'#app')