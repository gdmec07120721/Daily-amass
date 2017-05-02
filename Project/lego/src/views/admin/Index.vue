<template>
  <div id="index_wrapper" class="index_wrapper">
	<div class="lego_wrap">
		<header class="header">
			<nav class="clearfix">
				<span class="logo"><span>L</span>ego</span>
				<ul class="menu" id="menu">
					<li><a href="javascript:void(0);" v-el:apptab v-link="'/lego/app'">全部应用</a></li>
					<li><a href="javascript:void(0);" v-el:pagetab v-link="'/lego/page'">单页面</a></li>
					<li><a href="javascript:void(0);" v-el:teamtab v-link="'/lego/team'">我的团队</a></li>
				</ul>
				<div class="user">
					<span>{{user.name}}</span>
					<a href="javascript:void(0);" id="{{user.id}}" @click="logout">退出</a>
				</div>
			</nav>
		</header>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
  </div>
</template>

<script>
var server = require('../../axios/server')

export default{
	ready(){
		let _this = this
		let data = {
				funNum:'002',
				postData:''
			}
		server({
			method: 'post',
			data:data
        }).then(function(response){
          	if(response.status == 200){
          		if (!response.data) {
          			_this.$route.router.go({ path: '/'})	
          		}else{
          			_this.user.id = response.data.user.id
					_this.user.name = response.data.user.name
					_this.user.role = response.data.user.role
					_this.userStore(_this.user)
          		}
			}
        },function(response){
          console.log('fail'+response.status+','+response.request)
        })
	},
	data(){
		return{
			user:{
				id:'',
				name:''
			}
		}
	},
	events:{
		changeNav(routerPath){
			var liArray = document.getElementById('menu').getElementsByTagName('a')
			for (let i = 0; i < liArray.length; i++) {
				liArray[i].style.background='none'
			}
			this.$els[routerPath].style.background='#000'
		}
	},
	methods:{
		logout(event){
			//event.target.id =>id
			let _this = this
			let data = {
					funNum:'003',
					postData:''
				}
			server({
				method: 'post',
				data: data
            }).then(function(response){
              	if(response.status == 200){
              		_this.$route.router.go({ path: '/'})
				}
            },function(response){
              console.log('fail'+response.status+','+response.request)
            })
		}
	},
	vuex:{
		actions:{
			userStore: function({dispatch},userValue){
				dispatch('USER',userValue)
			}
		}
	}
}

</script>
