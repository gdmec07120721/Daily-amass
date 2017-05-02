<style scoped>
	.page_wrap .void_wrap{border: 0; cursor: default;}
</style>

<template>
	<div class="page_wrap">
		<div v-if="applists.length > 0" class="apply_wrap">
			<ul class="apply_lists" id="applylists">
				<li v-for="applist in applists" id="{{applist._id}}">
					<div class="apply_img_wrap">
						<img :src="applist.image">
						<div class="apply_img_shade">
							<a href="javascript:void(0);" v-link="{name:'pageapp',params:{appId:applist._id}}">预览</a>
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
		<div v-if="applists.length <= 0" class="void_wrap">
			<span class="glyphicon glyphicon-zoom-in"></span>
			<p>你还没有任何应用哦，快去创建吧！</p>
		</div >
	</div>
</template>

<script>
var server = require('../../axios/server')
	export default{
		ready(){
			this.$dispatch('changeNav','pagetab')
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
				applists:''
			}
		}
	}

</script>