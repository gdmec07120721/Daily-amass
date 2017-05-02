
<style scoped>
	.viewportinner{font:14px/24px  Arial, "Microsoft YaHei"; color:#282828; background:#fff; -webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none; min-width:320px; max-width: 750px; margin: 0 auto; background: #fafafa; min-height: 100vh;}
	.page_wrapper {position: relative;}
	.page_share{position: absolute; right: 0px; bottom: 100px; z-index: 10000}
	.page_share .fa{display: block; padding: 5px; color: #009c7b; }
</style>

<template>
	<style>
		{{app.style}}
	</style>
	<div id="page_wrapper" class="page_wrapper">
		<div class="viewportinner" id="{{id}}">
			<div v-el:componentview style="display: block;">
				<div v-for="componentItem in app.components" >
					<div class="componentItem">
						<component :is="componentItem.name" :componentdata="componentItem.config"></component>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
var server = require('../../axios/server')

import Title from '../../components/appComponents/Title'
import Banner from '../../components/appComponents/Banner'
import Text from '../../components/appComponents/Text'
import Dlbutton from '../../components/appComponents/Dlbutton'

	export default{
		ready(){
			this.$dispatch('changeNav','pagetab')
			let _this = this
			let appId = this.$route.params.appId
			let data ={
				funNum: '006',
				postData:{
					appId: appId
				}
			}
			server({
				method:'post',
				data:data
			}).then(function(response) {
				_this.$set('app',response.data)
				_this.id = _this.app._id.replace(/[0-9]/g,'')
			},function(response){
				console.log('fail'+response.status+','+response.request)
			})	
		},
		data(){
			return{
				app: '',
				id:''
			}
		},
		components:{
			Title:Title,
			Banner:Banner,
			Text:Text,
			Dlbutton:Dlbutton
		}
	}

</script>