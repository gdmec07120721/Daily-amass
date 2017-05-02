<style scoped>
	.file {position: relative;display: inline-block;background: #eee;border: 1px solid #ddd;padding: 4px 12px;overflow: hidden;color: #333;text-decoration: none;text-indent: 0;line-height: 20px;}
	.file input {position: absolute;font-size: 100px;left: 0;top: 0;opacity: 0;}
	.file:hover {background: #ddd;text-decoration: none;}
</style>

<template>
<div>
	<h3 class="setting-title">下载按钮组件设置</h3>
	<div id="banner-setting">
		<div class="form-group">
		    <label for="exampleInputEmail1">按钮文本</label>
		    <input type="text" class="form-control" v-model="componentData.text" placeholder="请输入按钮文本">
		</div>
		<div class="form-group">
		    <label for="exampleInputEmail1">按钮链接</label>
		    <input type="text" class="form-control" v-model="componentData.link"  placeholder="请输入按钮链接 如：(http://example.com)">
		</div>
		<div class="form">
			<label for="exampleInputEmail1">按钮样式设置</label>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">字体颜色</div>
			      <input class="form-control" type="text" v-model="configStyle.btn.color" placeholder="请输入字体颜色值（如：#ffffff）">
			    </div>
  			</div>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">按钮背景颜色</div>
			      <input class="form-control" type="text" v-model="configStyle.btn.background" placeholder="请输入按钮背景颜色值（如：#ffffff）">
			    </div>
  			</div>
		</div>
	</div>
	<div class="form-group setting-btn" >
	      <button type="submit" class="btn btn-primary" @click="save">确定</button>
	      <button type="button" class="btn btn-default" @click="cancel">取消</button>
    </div>
</div>
</template>

<script>
var server = require('../../axios/server')
export default{
	props:['componentInfo','appId','componentId'],
	ready(){
		for (let i = 0; i < this.appGetter.components.length; i++) {
			if (this.appGetter.components[i].id == this.componentId) {
				this.componentData = this.appGetter.components[i].config
			}
		}
	},
	data(){
		return{
			componentData:{
				styleClass:'',
				text: '下载APP',
				link: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.gentou.gentouwang'
			},
			configStyle:{
				btn:{
					color:'',
					background:''
				}
			}
		}
	},
	methods:{
		save(){
			let style
			let componentData = this.componentInfo 
			this.componentData.styleClass = this.componentInfo.name + this.componentInfo.id
			style = '#'+ this.appId +' .'+ this.componentData.styleClass +' a{color:' + this.configStyle.btn.color +'; background:'+ this.configStyle.btn.background +'}'
			componentData.config = this.componentData
			this.$dispatch('componentSetting',componentData,style)
		},
		cancel(){
			this.$dispatch('cancelComponentSetting', this.componentInfo.id)
		}
	},
	vuex:{
		getters:{
			appGetter(state){
				return state.app
			}
		}
	}
}
</script>
