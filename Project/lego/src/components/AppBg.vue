
<style scoped>
	.bg_tab{padding: 10px 0 20px;}
    .file {position: relative;display: inline-block;background: #eee;border: 1px solid #ddd;padding: 4px 12px;overflow: hidden;color: #333;text-decoration: none;text-indent: 0;line-height: 20px;}
	.file input {position: absolute;font-size: 100px;left: 0;top: 0;opacity: 0;}
	.file:hover {background: #ddd;text-decoration: none;}
</style>


<template>
<div>
	<h3 class="setting-title">背景样式设置</h3>
	<div class="bg_tab" >
		<ul class="nav nav-tabs" role="tablist" id="bgTab">
		  <li role="presentation" class="active"><a id="single" @click="bgTab" href="javascript:void(0);">单一颜色</a></li>
		  <li role="presentation" ><a id="gradient" @click="bgTab" href="javascript:void(0);">渐变颜色</a></li>
		  <li role="presentation" ><a id="image" @click="bgTab" href="javascript:void(0);">图片背景</a></li>
		</ul>
	</div>
	<ul class="tabdiv" id="tabdiv">
		<li v-el:single>
			<div class="form-group" >
			    <input type="text" class="form-control" id="" v-model="configStyle.single.background" placeholder="请输入颜色值（如：#ffffff）">
			</div>
		</li>
		<li style="display: none;" v-el:gradient>
			<div class="form-group" >
			    <input type="text" class="form-control" id="" v-model="configStyle.gradient.backgroundTop" placeholder="请输入渐变开始颜色值（如：#ffffff）">
			</div>
			<div class="form-group" >
			    <input type="text" class="form-control" id="" v-model="configStyle.gradient.backgroundBottom" placeholder="请输入渐变结束颜色值（如：#ffffff）">
			</div>
		</li>
		<li style="display: none;" v-el:image>
			<div class="form-group" >
			    <a class="file"><input type="file" accept="image/*" @change="upPic">图片</a>
			</div>
			<div class="form-group" >
			     <input class="form-control" id="disabledInput" v-model="configStyle.image.background" type="text" placeholder="请点击图片上传" disabled>
			</div>
		</li>			
	</div>

	<div class="form-group setting-btn" >
	    <div>
	      <button type="submit" class="btn btn-primary" @click="saveBg">确定</button>
	      <button type="button" class="btn btn-default" @click="cancelBg">取消</button>
	    </div>
    </div>
</div>
</template>

<script>
var server = require('../axios/server')
export default{
	props:['componentInfo'],
	data(){
		return{
			targetTab:'single',
			configStyle:{
				single:{
					background:''
				},
				gradient:{
					backgroundTop:'',
					backgroundBottom:''
				},
				image:{
					background:''
				}
			},
			style:''

		}
	},
	methods:{
		upPic(event){
			let dataURL,
				_this = this,
				oFReader = new FileReader(),
				file = event.target.files[0],
				newoFReader = oFReader.readAsDataURL(event.target.files[0])
				
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
		            	_this.configStyle.image.background = response.data.dataURL
		            },function(response){
		              console.log('fail'+response.status+','+response.request)
		            })
		          }
		        }
	      	}else{
	        	alert('至少要选择一张图片！')
	      	}
		},
		saveBg(){
			switch(this.targetTab){
				case 'single':
					this.style = '.viewportinner{background:' + this.configStyle.single.background + ';}'
					break
				case 'gradient':
					this.style = '.viewportinner{background:-webkit-gradient(linear, 0 0, 0 bottom, from('+ this.configStyle.gradient.backgroundTop +'), to('+ this.configStyle.gradient.backgroundBottom +'));}'
					break
				case 'image':
					this.style = '.viewportinner{background:url('+ this.configStyle.image.background +') no-repeat; background-size:100% auto;}'
					break
			}
			this.$dispatch('appBg', this.style)
		},
		cancelBg(){
			this.$dispatch('cancelComponentSetting')
		},
		bgTab(event){
			let targetTab = event.target.getAttribute('id')
			let tabArray = document.getElementById('bgTab').getElementsByTagName('li')
			let divArray = document.getElementById('tabdiv').getElementsByTagName('li')
			for (let i = 0; i < tabArray.length; i++) {
				tabArray[i].className = ''
			}
			for (let i = 0; i < divArray.length; i++) {
				divArray[i].style.display='none'
			}
			this.targetTab = targetTab
			event.target.parentNode.setAttribute('class','active')
			this.$els[targetTab].style.display='block'
		}
	}
}
</script>
