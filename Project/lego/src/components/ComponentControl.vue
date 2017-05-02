<style scoped>
	ol, ul{margin-left: 0; padding: 0;}
	li{list-style-type: none;}
	.comWrap li{position: relative;}
	.addcp_btn{text-align: right; white-space: nowrap; position: absolute; left: 345px; top: 38%;}
	.comAddBtn{background: none; display: inline-block; border-radius: 50%;}
	.comAddBtn a{ padding: 2px 7px;}
	.comWrap .dlbtn {position: static;}
</style>
<template>
	<div class="comWrap">
		<ul>
			<li>
				<Banner></Banner>
				<div class="addcp_btn">
					<a href="javascript:void(0);" class="comAddBtn"  id="Banner" @click="addComponent"><span class="glyphicon glyphicon-plus" id="Banner"></span><span id="Banner">添加图片组件</span></a>
				</div>
			</li>
			<li>
				<Title></Title>
				<div class="addcp_btn">
					<a href="javascript:void(0);" class="comAddBtn"  id="Title" @click="addComponent"><span class="glyphicon glyphicon-plus" id="Title"></span><span id="Title">添加标题组件</span></a>
				</div>
			</li>
			<li>
				<Text></Text>
				<div class="addcp_btn">
					<a href="javascript:void(0);" class="comAddBtn"  id="Text" @click="addComponent"><span class="glyphicon glyphicon-plus" id="Text"></span><span id="Text">添加正文组件</span></a>
				</div>
			</li>
			<li>
				<Dlbutton></Dlbutton>
				<div class="addcp_btn">
					<a href="javascript:void(0);" class="comAddBtn"  id="Dlbutton" @click="addComponent"><span class="glyphicon glyphicon-plus" id="Dlbutton"></span><span id="Dlbutton">添加下载按钮组件</span></a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Title from './appComponents/Title'
	import Banner from './appComponents/Banner'
	import Text from './appComponents/Text'
	import Dlbutton from './appComponents/Dlbutton'

	export default{
		props:['componentNum'],
		components:{
				Title:Title,
				Banner:Banner,
				Text:Text,
				Dlbutton:Dlbutton
		},
		data(){
			return {
				componentId:''
			}
		},
		methods:{
			addComponent:function(event){
				this.componentId = new Date().getTime()
				let componentInfo = {
					id: this.componentId,
					name: event.target.id,
					settingName: event.target.id + 'setting',
					config: {}
				}
				this.$dispatch('addComponentSetting',componentInfo)
			}
		}
	}
</script>