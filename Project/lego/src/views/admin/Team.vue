<style scoped>
	.team_table{text-align: center; padding-top: 80px;}
	.team_table .table{border: 1px solid #ddd;}
	.team_table .table thead{background: #f5f5f5; font-weight: bold;}
	.edit{padding-right: 10px;}
</style>

<template>
	<div class="team_page">
		<a v-if="my.role == 0" href="javascript:void(0);" class="apply_add" title="添加人员" @click="adddialog">
			<span class="glyphicon glyphicon-plus" ></span>
		</a>
		<div class="team_table">
			<table class="table table-hover">
				<thead>
					  <td>序号</td>
					  <td>用户名</td>
					  <td>密码</td>
					  <td>角色</td>
					  <td v-if="my.role == 0">操作</td>
				</thead>
				<tbody>
					<tr v-for="user in users" id="{{user._id}}">
					  <td>{{$index+1}}</td>
					  <td>{{user.name}}</td>
					  <td>**********</td>
					  <td>
					  	<span v-if="user.role == '0'">管理员</span>
					  	<span v-if="user.role == '1'">成员</span>
					  </td>
					  <td v-if="my.role == 0">
						<a href="javascript:void(0);" class="glyphicon glyphicon-pencil edit" title="修改" @click="editUser($index)"></a>
						<a href="javascript:void(0);" class="glyphicon glyphicon-trash" title="删除"  @click="deleteUser($index)"></a>
					  </td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="dialog">
			<component :is="dialog" :dialogdata="dialogdata" ></component>
		</div>
		
	</div>
</template>

<script>
	var server = require('../../axios/server')
	import UserDialog from './UserDialog'
	export default{
		ready(){
			this.$dispatch('changeNav','teamtab')
			this.findUser()
		},
		data(){
			return{
				users:'',
				dialog:'',
				dialogdata:''
			}
		},
		components:{
			UserDialog:UserDialog
		},
		methods:{
			findUser(){
				let _this = this
				let data ={
					funNum: '010',
					postData:''
				}
				server({
					method:'post',
					data:data
				}).then(function(response) {
					_this.$set('users',response.data)
				},function(response){
					console.log('fail'+response.status+','+response.request)
				})	
			},
			adddialog(){
				this.dialog = 'UserDialog'
				this.dialogdata = {
					_id: '',
					name: '',
					password: '',
					role: '0'
				}
			},
			editUser(index){
				this.dialog = 'UserDialog'
				this.dialogdata = this.users[index]
			},
			deleteUser(index){
				let _this = this
				let data ={
					funNum: '012',
					postData:{
						id: this.users[index]._id
					}
				}
				server({
					method:'post',
					data:data
				}).then(function(response) {
					if (response.data == 'ok') {
						_this.users.splice(index, 1)
					}
				},function(response){
					console.log('fail'+response.status+','+response.request)
				})
				
			}
		},
		events:{
			success(user){
				this.findUser()
			},
			closeDialog(){
				this.dialog = ''
			}
		},
		vuex:{
			getters:{
				my:function(state){
					return state.user
				}
			}
		}
	}

</script>