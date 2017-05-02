<style scoped>
	.text-editWrap{width: 100%; height: 200px; border:1px solid #eee; border-radius: 4px; padding: 7px 13px; margin-bottom: 10px; overflow: auto;}
	.editTab{margin:0; padding:0  0 15px;}
	.editTab:after{content:''; display:block; clear:both;}
	.editTab a{height:30px; line-height:30px; padding:0 7px; float:left;color:#444; background:#eee; cursor:pointer;list-style-type:none;margin-right:2px; border:1px solid #ddd; }
	.editTab a:hover{background:#ddd;}
	.editTab .form-control{height: 30px;}
	.editTab .btn{padding: 4px 12px;}
	.row{margin: 0; display: table-cell; padding-bottom: 15px;}
	.col-lg-6{width: 50%; display: table-cell; padding: 0;}
	.text-row .tooltip{top: 30px;}
</style>

<template>
<div>
	<h3 class="setting-title">正文组件设置</h3>
	<div id="text-setting">
		<div class="editTab">
	        <a href="javascript:void(0);" id="bold" @click="changeText">加粗</a>
	        <a href="javascript:void(0);" id="italic" @click="changeText">斜体</a>
	    </div>
	    <div class="row text-row">
		  <div class="col-lg-6">
		    <div class="input-group">
		      <span class="input-group-btn">
		        <button class="btn btn-default" type="button" id="color" @click="changeText">字体颜色</button>
		      </span>
		      <input type="text" class="form-control" v-model="color" placeholder="如：#ffffff"  @click="editColor">
		      <div class="bs-example bs-example-tooltip">
			    <div class="tooltip bottom" role="tooltip" v-el:color>
			      <div class="tooltip-arrow"></div>
			      <div class="tooltip-inner">
			        字体颜色值不能为空！
			      </div>
			    </div>
			  </div>
		    </div><!-- /input-group -->
		  </div><!-- /.col-lg-6 -->
		  <div class="col-lg-6">
		    <div class="input-group">
		      <span class="input-group-btn">
		        <button class="btn btn-default" type="button" id="link" @click="changeText">链接</button>
		      </span>
		      <input type="text" class="form-control" v-model="link" placeholder="如：http://example.com"  @click="editLink">
		      <div class="bs-example bs-example-tooltip">
			    <div class="tooltip bottom" role="tooltip" v-el:link>
			      <div class="tooltip-arrow"></div>
			      <div class="tooltip-inner">
			        链接不能为空！
			      </div>
			    </div>
			  </div>
		    </div><!-- /input-group -->
		  </div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
		<div class="text-editWrap" contenteditable="true" v-el:edit>{{componentData.text}}</div>
		<div class="form">
			<label for="exampleInputEmail1">正文样式设置</label>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">上边距</div>
			      <input class="form-control" type="text" v-model="configStyle.text.paddingTop" placeholder="请输入上边距大小值（如：16）">
			    </div>
  			</div>
			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">下边距</div>
			      <input class="form-control" type="text" v-model="configStyle.text.paddingBtm" placeholder="请输入下边距大小值（如：16）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">左右边距</div>
			      <input class="form-control" type="text" v-model="configStyle.text.paddingLR" placeholder="请输入左右边距大小值（如：16）">
			    </div>
  			</div>
  			<div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon">正文位置</div>
			      <input class="form-control" type="text" v-model="configStyle.text.align" placeholder="请输入正文位置（如：center、left、right）">
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
				text: '请输入正文内容'
			},
			configStyle:{
				text:{
					align:'',
					paddingTop:'',
					paddingBtm:'',
					paddingLR:''
				}
			},
			color:'',
			link:''
		}
	},
	methods:{
		editLink(){
			this.$els.link.style.opacity = 0
		},
		editColor(){
			this.$els.color.style.opacity = 0
		},
		boldF(){
			document.execCommand('Bold',false,'#f00')
		},
		italicF(){
			document.execCommand ('italic', false, null)
		},
		linkF(){
			if (this.link != '') {
				document.execCommand('CreateLink',false,this.link)
			}else{
				this.$els.link.style.opacity = 1
			}
		},
		colorF(){
			if (this.color != '') {
				document.execCommand('ForeColor',false,this.color)
			}else{
				this.$els.color.style.opacity = 1
			}
		},
	    changeText(event){
	      let sel = window.getSelection()
	      let type = event.target.getAttribute('id')
	      if(window.getSelection){
	        //判断是否存在选中内容
	        if(sel.isCollapsed){
	          alert ("请选择内容")
	        }else{
	          //判断选中的内容是否是编辑器内的
	          if(this.$els.edit.innerHTML.indexOf(sel.toString()) >= 0){
	          		switch(type){
	          			case 'bold':
	          				this.boldF()	
	          			break
	          			case 'italic':
	          				this.italicF()	
	          			break
	          			case 'link':
	          				this.linkF()
	          			break
	          			case 'color':
	          				this.colorF()
	          			break
	          		}
	          }else{
	            alert ("没选中内容！")
	          }
	          sel.removeAllRanges ();
	        }
	      }else{
	        alert ("您的浏览器不支持这个编辑器！")
	      }
	    },
		save(){
			let style
			let componentData = this.componentInfo 
			this.componentData.styleClass = this.componentInfo.name + this.componentInfo.id
			style = '#'+ this.appId +' .'+ this.componentData.styleClass +' p{text-align: ' + this.configStyle.text.align + '; padding-top:' + this.configStyle.text.paddingTop +'px; padding-bottom: '+ this.configStyle.text.paddingBtm +'px; padding-left: '+ this.configStyle.text.paddingLR +'px; padding-right: '+ this.configStyle.text.paddingLR +'px;}'
			this.componentData.text = this.$els.edit.innerHTML
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
