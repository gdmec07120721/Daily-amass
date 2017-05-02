<template>
	<div class="from_wrap">
		<div class="logo_wrap">
			<span class="logo"><span>L</span>ego</span>
		</div>
		<div class="input-group">
		  <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
		  <input type="text" class="form-control"  v-model="user.name" @blur="checkName" placeholder="用户名">
		  <div class="bs-example bs-example-tooltip">
		    <div class="tooltip right" role="tooltip" v-el:nametip>
		      <div class="tooltip-arrow"></div>
		      <div class="tooltip-inner">
		        用户名不能为空！
		      </div>
		    </div>
		  </div>
		</div>
		<div class="input-group">
		  <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
		  <input type="password" class="form-control" v-model="user.password" @blur="checkPsd" placeholder="密码">
		  <div class="bs-example bs-example-tooltip">
		    <div class="tooltip right" role="tooltip" v-el:psdtip>
		      <div class="tooltip-arrow"></div>
		      <div class="tooltip-inner">
		        密码不能为空！
		      </div>
		    </div>
		  </div>
		</div>
		<a href="javascript:void(0);" class="login_btn" @click="submit">登录</a>
	</div>
</template>

<script>
var server = require('../../axios/server')
	export default{
		ready(){

		},
		data(){
			return{
				user:{
					name:'',
					password:''
				}
			}
		},
		methods:{
			checkName: function () {
				if (this.user.name =='') {
					this.$els.nametip.style.opacity = 1
					return false
				}else{
					this.$els.nametip.style.opacity = 0
					return true
				}
			},
			checkPsd: function () {
				if (this.user.password =='') {
					this.$els.psdtip.style.opacity = 1
					return false
				}else{
					this.$els.psdtip.style.opacity = 0
					return true
				}
			},
			submit:function () {
				let _this = this
				let data = {
					funNum:'001',
					postData:this.user
				}
				if (this.checkName() && this.checkPsd()) {
					server({
					  method: 'post',
		              data: data
		            }).then(function(response){
		              if(response.status == 200){
		              		if (response.data.user) {
		              			_this.$route.router.go({ path: '/lego/app'})
		              		}else if(response.data == '00101'){
		              			alert('用户不存在')
		              			_this.$route.router.go({ path: '/'})
		              		}else if(response.data == '00102'){
		              			alert('密码错误')
		              			_this.$route.router.go({ path: '/'})
		              		}
							//存储localStorage
							/*localStorage.userId = response.data.user.id
							localStorage.userName = response.data.user.name*/
							//localStorage.clear()
							//sessionStorage
						}
		            },function(response){
		              console.log('fail'+response.status+','+response.request)
		            })
		            this.user = {
						name:'',
						password:''
					}
				}
				
			}
		}
	}

</script>