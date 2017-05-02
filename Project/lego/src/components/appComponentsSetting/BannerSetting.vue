<style scoped>
	.file {position: relative;display: inline-block;background: #eee;border: 1px solid #ddd;padding: 4px 12px;overflow: hidden;color: #333;text-decoration: none;text-indent: 0;line-height: 20px;}
	.file input {position: absolute;font-size: 100px;left: 0;top: 0;opacity: 0;}
	.file:hover {background: #ddd;text-decoration: none;}
</style>

<template>
<div>
	<h3 class="setting-title">图片组件设置</h3>
	<div id="banner-setting">
		<div class="form-group" >
		    <a class="file"><input type="file" accept="image/*" @change="upPic">图片</a>
		</div>
		<div class="form-group" >
		     <input class="form-control" id="disabledInput" v-model="componentData.imgUrl" type="text" placeholder="请点击图片上传" disabled>
		</div>
		<div class="form">
			<label for="exampleInputEmail1">Banner样式设置</label>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">上边距</div>
			      <input class="form-control" type="text" v-model="configStyle.banner.paddingTop" placeholder="请输入上边距大小值（如：16）">
			    </div>
  			</div>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">下边距</div>
			      <input class="form-control" type="text" v-model="configStyle.banner.paddingBtm" placeholder="请输入下边距大小值（如：16）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">左右边距</div>
			      <input class="form-control" type="text" v-model="configStyle.banner.paddingLR" placeholder="请输入左右边距大小值（如：16）">
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
require('../../assets/js/jquery-1.8.3.min.js')
var server = require('../../axios/server')
var axios = require('axios')
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
				imgUrl: require('../../assets/images/test.png')
			},
			configStyle:{
				banner:{
					paddingTop:'',
					paddingBtm:'',
					paddingLR:''
				}
			}
		}
	},
	methods:{
		upPic(event){
			let dataURL,
				_this = this,
				oFReader = new FileReader(),
				file = event.target.files[0],
				newoFReader = oFReader.readAsDataURL(file)//将文件读取为DataURL
				
			if (file) {
		        if (window.URL) {
		          oFReader.onload = function (oFREvent) {
		            dataURL = oFREvent.target.result
		            
					let data ={
						funNum: '007',
						postData:{
							dataURL: dataURL
						}
					}
		            server({
		              method: 'post',
		              data: data
		            }).then(function(response){
		            	_this.componentData.imgUrl = response.data.dataURL
		            },function(response){
		              console.log('fail'+response.status+','+response.request)
		            })
		          }
		        }
	      	}else{
	        	alert('至少要选择一张图片！')
	      	}
		},
		save(){
			let style
			let componentData = this.componentInfo 
			this.componentData.styleClass = this.componentInfo.name + this.componentInfo.id
			style = '#'+ this.appId +' .'+ this.componentData.styleClass +'{padding-top:' + this.configStyle.banner.paddingTop +'px; padding-bottom: '+ this.configStyle.banner.paddingBtm +'px; padding-left: '+ this.configStyle.banner.paddingLR +'px; padding-right: '+ this.configStyle.banner.paddingLR +'px;}'
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
