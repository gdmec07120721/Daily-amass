<style scoped>
	.page-header{position: relative;}
	.page-header h1{position: relative;}
	.nameEdit{position: absolute; right: 15px; top: 15px; display: none;}
	.page-header h1:hover .nameEdit{display: block; font-size: 14px;}
	.summary{padding-top: 10px}
	.operation{position: absolute; bottom: 9px; right: 0; text-align: center;}
	.operation .btn-group{}
	.viewport{width: 375px; height: 667px; display: inline-block; border: 15px solid transparent; border-radius: 12px; background:#333; background-clip: padding-box,border-box; box-shadow:1px 1px 5px black inset, 0 -1px white, 0 -1px 0 1px #bbb, 0 2px 0 1px #aaa, 0 2px 10px 1px rgba(0,0,0,.2); position: relative; }
	.viewportinner{height: 637px; overflow: auto;}
	.allocation-wrap{ width: 500px; height: 667px; float: right; border: 1px solid #eee; padding: 0 20px; position: relative;}
	.allocation-name{padding-bottom: 10px; border-bottom: 1px solid #eee; margin-bottom: 10px;}
	.sub{display: none;}
	.sub.open{display: block;}
	.componentWrap .comAddBtn{display: none;}
	.setting{position: relative;}
	.allocation{width: 500px; height: 667px; padding: 20px; position: absolute; right: 0; top: 0; z-index: 10}
	.comWrap{position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 10; border: 1px solid #262626; }
	.settingBg{position: absolute; right: -70px; top: -20px;}
	.settingBg span{display: inline-block; vertical-align: middle;}
	.addcp_btn{text-align: right; white-space: nowrap; position: absolute; right: 0px; bottom: 0; z-index: 1000;}
	.comAddBtn{background: none; display: inline-block; border-radius: 50%; }
	.comAddBtn a{ padding: 2px 7px;}
	.header-form-control{position: relative; font-size: 30px;}
	.header-form-control .form-control{font-size: inherit; height: auto;}
	.header-form-icon{position: absolute; right: 15px; top: 10px; color: #009c7b;}
	.viewport .dlbtn {position: absolute;}
	.componentItem{position: relative;}
	.componentItem.Dlbutton{position: absolute; bottom: 0; left: 0; right: 0;}
</style>

<template>
	<style>
		{{app.style}}
	</style>
	<div class="projectOne">
		<div class="page-header">
		  <div class="form-group header-form-control" style="display: none;" v-el:appnameinput>
			    <input type="text" class="form-control" id="" v-model="app.appname">
			    <span class="glyphicon glyphicon-ok header-form-icon" @click="saveAppName"></span>
		  </div>
		  <h1 v-el:appname>{{app.appname}} <div class="nameEdit" ><span class="glyphicon glyphicon-pencil" @click="editAppName"></span></div></h1>
		  <p class="summary" id="{{app.authorId}}">创建人：{{app.author}}</p>
		  <time>创建时间：{{app.date}}</time>
		  <div class="operation">
				<div class="btn-group" role="group">
				  <button type="button" class="btn btn-default" @click="addComponent">添加组件</button>
				  <button type="button" class="btn btn-default" @click="saveApp">保存并生成page</button>
				  <button type="button" class="btn btn-default" @click="cancel">取消</button>
				</div>
		  </div>
		</div>
		<div class="setting">
			<div class="viewport" >
				<div class="settingBg">
					<a href="javascript:void(0);" @click="settingBg"><span class="glyphicon glyphicon-cog"></span><span>设置背景</span></a>                    
				</div>
				<div style="display: none;" v-el:componentwrap >
					<Componentcontrol :component-num="app.components"></Componentcontrol>
				</div>
				<div class="viewportinner" id="{{id}}">
					<div v-el:componentview style="display: block;">
						<div v-for="componentItem in app.components" >
							<div v-if="componentItem.name == 'Dlbutton'" class="componentItem Dlbutton">
								<component :is="componentItem.name" :componentdata="componentItem.config"></component>
								<div class="addcp_btn">
									<a href="javascript:void(0);" class="comAddBtn"  id="{{componentItem.id}}" @click="editComponent($index)" title="修改"><span class="glyphicon glyphicon-pencil" id="{{componentItem.id}}"></span></a>
									<a href="javascript:void(0);" class="comAddBtn"  id="{{componentItem.id}}" @click="deleteComponent($index)" title="删除"><span class="glyphicon glyphicon-trash" id="{{componentItem.id}}"></span></a>
								</div>
							</div>
							<div v-else class="componentItem">
								<component :is="componentItem.name" :componentdata="componentItem.config"></component>
								<div class="addcp_btn">
									<a href="javascript:void(0);" class="comAddBtn"  id="{{componentItem.id}}" @click="editComponent($index)" title="修改"><span class="glyphicon glyphicon-pencil" id="{{componentItem.id}}"></span></a>
									<a href="javascript:void(0);" class="comAddBtn"  id="{{componentItem.id}}" @click="deleteComponent($index)" title="删除"><span class="glyphicon glyphicon-trash" id="{{componentItem.id}}"></span></a>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<div class="allocation-wrap">
				<div class="allocation">
					<component :is="componentControl.settingName" :component-info="componentControl" :app-id="id" :component-id="componentId"></component>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
require('../../assets/js/jquery-1.8.3.min.js')
require('../../assets/js/html2canvas.js')

var server = require('../../axios/server')

import Componentcontrol from '../../components/ComponentControl'
import Appbg from '../../components/AppBg'
import Title from '../../components/appComponents/Title'
import Titlesetting from '../../components/appComponentsSetting/TitleSetting'
import Banner from '../../components/appComponents/Banner'
import Bannersetting from '../../components/appComponentsSetting/BannerSetting'
import Text from '../../components/appComponents/Text'
import Textsetting from '../../components/appComponentsSetting/TextSetting'
import Dlbutton from '../../components/appComponents/Dlbutton'
import Dlbuttonsetting from '../../components/appComponentsSetting/DlbuttonSetting'

export default{
	ready(){
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
			_this.appStore(response.data)
			_this.id = _this.app._id.replace(/[0-9]/g,'')
		},function(response){
			console.log('fail'+response.status+','+response.request)
		})		
	},
	data(){
		return{
			app: '',
			id:'',
			componentId:'',
			componentControl:{
				id:'',
				name:'',
				settingName:''
			}
		}
	},
	components:{
		Appbg: Appbg,
		Componentcontrol:Componentcontrol,
		Title:Title,
		Titlesetting:Titlesetting,
		Banner:Banner,
		Bannersetting:Bannersetting,
		Text:Text,
		Textsetting:Textsetting,
		Dlbutton:Dlbutton,
		Dlbuttonsetting:Dlbuttonsetting,
	},
	events:{
		appBg(style){
			this.app.style += style
			this.componentControl = {}
		},
		addComponentSetting(componentInfo){
			this.componentControl = componentInfo
			this.app.components.push(componentInfo)
			this.$els.componentwrap.style.display = 'none'
			this.$els.componentview.style.display = 'block'
		},
		componentSetting(componentData,style){
			console.log(componentData)
			this.app.style += style
			for (let i = 0; i < this.app.components.length; i++) {
				if (this.app.components[i].id == componentData.id && this.app.components[i].name == componentData.name) {
					this.app.components[i].config = componentData.config
					this.appStore(this.app)
					this.app = this.appGetter
				}
			}
			this.componentControl = {}
			this.componentId = ''
		},
		cancelComponentSetting(id){
			for (let i = 0; i < this.app.components.length; i++) {
				if (this.app.components[i].id == id && JSON.stringify(this.app.components[i].config) == '{}') {
					this.app.components.splice(i,1)
					this.appStore(this.app)
				}
			}
			this.componentControl = {}
			this.componentId = ''
		}

	},
	methods:{
		saveAppName(){
			this.$els.appname.style.display = 'block'
			this.$els.appnameinput.style.display = 'none'
		},
		editAppName(){
			this.$els.appname.style.display = 'none'
			this.$els.appnameinput.style.display = 'block'
		},
		saveF(){
			let _this = this
			let data ={
				funNum: '008',
				postData:{
					app: this.app
				}
			}
			server({
				method:'post',
				data:data
			}).then(function(response) {
				let appId = response.data._id
				_this.$route.router.go({ name: 'pageapp',params:{appId:appId}})
			},function(response){
				console.log('fail'+response.status+','+response.request)
			})	
		},
		saveApp(){
			let _this = this
			if (JSON.stringify(this.app.components).indexOf('Banner') >= 0) {
				for (let i = 0; i < this.app.components.length; i++) {
					if (this.app.components[i].name == 'Banner') {
						_this.app.image = this.app.components[i].config.imgUrl
						_this.saveF()
						break
					}
				}
			}else{
				html2canvas($('.viewportinner'), {
		            allowTaint: true,
		            taintTest: false,
		            onrendered: function(canvas) {
		                canvas.id = "mycanvas"
		                _this.app.image = canvas.toDataURL()
		                _this.saveF()
		            }
		        })
			}
			
				
		},
		addComponent(){
			this.componentControl = {}
			this.componentId = ''
			this.$els.componentwrap.style.display = 'block'
			this.$els.componentview.style.display = 'none'
		},
		editComponent(index){
			this.componentId = this.app.components[index].id
			this.componentControl = this.app.components[index]
		},
		deleteComponent(index){
			this.app.components.splice(index, 1)
			this.appStore(this.app)
			this.componentControl = {}
			this.componentId = ''
		},
		settingBg(){
			let component = {
				id:'',
				name:'',
				settingName:'Appbg'
			}
			this.componentControl = component
			this.$els.componentwrap.style.display = 'none'
		},
		cancel(){
			this.$route.router.go({ path: '/lego/app'})
		}
	},
	vuex:{
		actions:{
			appStore({dispatch}, app){
				dispatch('APPSTORE',app)
			}
		},
		getters:{
			appGetter(state){
				return state.app
			}
		}
	}
}

</script>