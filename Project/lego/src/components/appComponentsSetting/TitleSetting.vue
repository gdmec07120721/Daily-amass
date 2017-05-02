<style scoped>
	
</style>

<template>
<div>
	<h3 class="setting-title">标题组件设置</h3>
	<div id="title—setting">
		<div class="form-group">
		    <label for="exampleInputEmail1">标题</label>
		    <input type="text" class="form-control" id="" v-model="componentData.title" placeholder="请输入标题">
		</div>
		<div class="form-group">
		    <label for="exampleInputEmail1">副标题</label>
		    <input type="text" class="form-control" id="" v-model="componentData.smallTitle" placeholder="请输入副标题">
		</div>
		<div class="form">
			<label for="exampleInputEmail1">标题样式设置</label>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">标题字体大小</div>
			      <input class="form-control" type="text" v-model="configStyle.title.size" placeholder="请输入标题字体大小值（如：16）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">标题字体颜色</div>
			      <input class="form-control" type="text" v-model="configStyle.title.color" placeholder="请输入标题字体颜色值（如：#ffffff）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">标题位置</div>
			      <input class="form-control" type="text" v-model="configStyle.title.align" placeholder="请输入标题位置（如：center、left、right）">
			    </div>
  			</div>
		</div>
		<div class="form">
			<label for="exampleInputEmail1">副标题样式设置</label>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">副标题字体大小</div>
			      <input class="form-control" type="text" v-model="configStyle.smallTitle.size" placeholder="请输入副标题字体大小值（如：16）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">副标题字体颜色</div>
			      <input class="form-control" type="text" v-model="configStyle.smallTitle.color" placeholder="请输入副标题字体颜色值（如：#ffffff）">
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
				title:'',
				smallTitle:''
			},
			configStyle:{
				title:{
					size:'',
					color:'',
					align:''
				},
				smallTitle:{
					size:'',
					color:''
				}
			}
		}
	},
	methods:{
		save(){
			let style,titleStyle,smallTitleStyle
			let componentData = this.componentInfo 

			this.componentData.styleClass = this.componentInfo.name + this.componentInfo.id

			titleStyle ='#'+ this.appId +' .'+ this.componentData.styleClass +' h1{font-size: '+ this.configStyle.title.size +'px; color: '+ this.configStyle.title.color +'; text-align:'+ this.configStyle.title.align +';}'
			smallTitleStyle ='#'+ this.appId + ' .'+ this.componentData.styleClass +' small{font-size: '+ this.configStyle.smallTitle.size +'px; color: '+ this.configStyle.smallTitle.color +';}'
			style = titleStyle + smallTitleStyle


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
