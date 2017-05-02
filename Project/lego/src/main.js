import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './App.vue'

import Login from './views/admin/Login'
import LogeIndex from './views/admin/Index'
import App from './views/admin/App'
import Page from './views/admin/Page'
import Team from './views/admin/Team'
import AppModule from './views/admin/AppModule'
import PageApp from './views/admin/PageApp'

import PageView from './views/page/Page'

//注册路由插件
Vue.use(VueResource)
Vue.use(VueRouter)

//定义router常量
const router = new VueRouter()

router.map({
	'/':{
		component:Login
	},
	'/lego':{
		component:LogeIndex,
		subRoutes:{
			'/app':{
				component:App
			},
			'/page':{
				component:Page,
			},
			'/page/:appId':{
				name:'pageapp',
				component:PageApp
			},
			'/team':{
				component:Team
			},
			'/appmodule/:appId':{
				name:'appmodule',
				component:AppModule
			}
			
		}
	},
	'/page/:appId':{
		name:'pageview',
		component:PageView
	}
})

router.redirect({
	/*'*':'/error404'*/
})

router.start(Index, '#app')