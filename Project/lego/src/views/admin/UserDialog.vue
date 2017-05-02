<style scoped>
	.modal-dialog{top: 100px;}
</style>


<template>
	<div id="myModal" class="modal fade in " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block;"><div class="modal-backdrop fade in"></div>
	    <div class="modal-dialog">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" @click="cancel"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
	          <h4 class="modal-title" id="myModalLabel">添加人员</h4>
	        </div>
	        <div class="modal-body">
	           <div class="form-group">
			    <label for="exampleInputEmail1">用户名：</label>
			    <input type="text" class="form-control" v-model="teamUser.name" @focus="namefocus">
			    <div class="bs-example bs-example-tooltip">
				    <div class="tooltip bottom" role="tooltip" v-el:name>
				      <div class="tooltip-arrow"></div>
				      <div class="tooltip-inner">
				        用户名不能为空
				      </div>
				    </div>
				  </div>
			   </div>
			   <div class="form-group">
			    <label for="exampleInputEmail1">密码：</label>
			    <input type="password" class="form-control" v-model="teamUser.password" @focus="passwordfocus">
			    <div class="bs-example bs-example-tooltip">
				    <div class="tooltip bottom" role="tooltip" v-el:password>
				      <div class="tooltip-arrow"></div>
				      <div class="tooltip-inner">
				        密码必须由6到20个字母、数字、下划线组成的字符串
				      </div>
				    </div>
				  </div>
			   </div>
			   <div class="form-group">
			    <label for="exampleInputEmail1">角色：</label>
			    <div>
			    	<label class="radio-inline">
					  <input type="radio" value="0" v-model="teamUser.role"> 管理员
					</label>
					<label class="radio-inline">
					  <input type="radio" value="1" v-model="teamUser.role"> 成员
					</label>
			    </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" @click="cancel">取消</button>
	          <button type="button" class="btn btn-primary" @click="confirm">确定</button>
	        </div>

	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	  </div>	
</template>

<script>
var server = require('../../axios/server')
export default{
	props:['dialogdata'],
	ready(){
		this.teamUser = {
			_id: this.dialogdata._id,
			name: this.dialogdata.name,
			password: '',
			role: this.dialogdata.role
		}
	},
	data(){
		return{
			teamUser:{
				name:'',
				password:'',
				role:'0'
			}
		}
	},
	methods:{
		namefocus(event){
			this.$els.name.style.opacity = 0
		},
		passwordfocus(event){
			this.$els.password.style.opacity = 0
		},
		confirm(event) {
			let reg = /^[\da-zA-Z]\w{5,19}$/
			console.log(reg.test(this.teamUser.password))
			let _this = this
			let data = {
				funNum: '011',
				postData:{
					user: this.teamUser
				}
			}
			if (this.teamUser.name.length != 0 && reg.test(this.teamUser.password)) {
				server({
					method: 'post',
					data: data
				}).then(function(response){
					if(response.status == 200){
						let user = {
							_id: response.data._id,
							name: response.data.name,
							password: response.data.password,
							role: response.data.role,
						}
						_this.$dispatch('success',user)
						_this.$dispatch('closeDialog')
						_this.teamUser.name = ''
						_this.teamUser.password = ''
						_this.teamUser.role = '0'
						_this.teamUser._id = ''
					}
				},function(response){
					console.log('fail'+response.status+','+response.request)
				})
			}else{
				if (!reg.test(this.teamUser.password)) {
					this.$els.password.style.opacity = 1
				}else if(this.teamUser.name.length == 0){
					this.$els.name.style.opacity = 1
				}
			}

		},
		cancel(event) {
			this.appname = ''
			this.$dispatch('closeDialog')
		}		
	},
	vuex:{
		getters:{
			user:function(state){
				return state.user
			}
		}
	}
}

</script>