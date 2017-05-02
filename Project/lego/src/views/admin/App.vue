<template>
	<div>
		<div v-if="applists.length > 0" class="apply_wrap">
			<a href="javascript:void(0)" class="apply_add"  @click="dialog" >
				<span class="glyphicon glyphicon-plus"></span>
			</a>
			<ul class="apply_lists" id="applylists">
				<li v-for="applist in applists" id="{{applist._id}}">
					<div class="apply_img_wrap">
						<img :src="applist.image">
						<div class="apply_img_shade">
							<a href="javascript:void(0);" v-link="{name:'appmodule',params:{appId:applist._id}}">编辑应用</a>
							<a href="javascript:void(0);" @click="deleteApp($index)">删除应用</a>
						</div>
					</div>
					<div class="apply_info">
						<p class="apply_title" title="我的第一个应用">{{applist.appname}}</p>
						<time class="apply_time">{{applist.date}}</time>
						<div class="apply_author" id="{{applist.authorId}}">
							<span class="glyphicon glyphicon-user"></span>
							<span>{{applist.author}}</span>
						</div>
					</div>
				</li>
				<li class="last"></li>
			</ul>
		</div>
		<div v-if="applists.length <= 0" class="void_wrap" @click="dialog">
			<span class="glyphicon glyphicon-plus"></span>
			<p>你还没有任何应用，点击这里创建一个</p>
		</div >
		<component :is="appdialog"></component>
	</div>
</template>

<script>
var server = require('../../axios/server')
import AppDialog from './AppDialog'
	export default{
		ready(){
			this.$dispatch('changeNav','apptab')
			let _this = this
			let data ={
				funNum: '004',
				postData:''
			}
			server({
				method:'post',
				data:data
			}).then(function(response) {
				_this.$set('applists',response.data)
			},function(response){
				console.log('fail'+response.status+','+response.request)
			})
		},
		data(){
			return{
				applists:'',
				appdialog:''
			}
		},
		created(){

		},
		components:{
			AppDialog:AppDialog
		},
		methods:{
			deleteApp(index){
				let _this = this
				let data ={
					funNum: '009',
					postData:{
						id: this.applists[index]._id
					}
				}
				server({
					method:'post',
					data:data
				}).then(function(response) {
					if (response.data == 'ok') {
						_this.applists.splice(index, 1)
					}
				},function(response){
					console.log('fail'+response.status+','+response.request)
				})
			},
			dialog(){
				this.appdialog = 'AppDialog'
			}
		},
		events:{
			closeDialog(val){
				this.appdialog = ''
			}
		}
	}

</script>