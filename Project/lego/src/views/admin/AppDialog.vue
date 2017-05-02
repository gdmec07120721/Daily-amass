<template>
	<div id="myModal" class="modal fade in " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block;"><div class="modal-backdrop fade in"></div>
	    <div class="modal-dialog">
	      <div class="modal-content">

	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" @click="cancel"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
	          <h4 class="modal-title" id="myModalLabel">创建应用</h4>
	        </div>
	        <div class="modal-body">
	           <div class="form-group">
			    <label for="exampleInputEmail1">应用名：</label>
			    <input type="text" class="form-control" v-model="appname" @focus="appnamefocus">
			    <div class="bs-example bs-example-tooltip">
				    <div class="tooltip bottom" role="tooltip" v-el:appname>
				      <div class="tooltip-arrow"></div>
				      <div class="tooltip-inner">
				        应用名称不能为空
				      </div>
				    </div>
				  </div>
			   </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" @click="cancel">取消</button>
	          <button type="button" class="btn btn-primary" @click="confirm">确定</button>
	        </div>

	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	  </div>	
</template>

<script>
var server = require('../../axios/server')
export default{
	data(){
		return{
			authorId:'',
			author:'',
			appname:''
		}
	},
	methods:{
		appnamefocus(event){
			this.$els.appname.style.opacity = 0
		},
		confirm(event) {
			let _this = this
			let data = {
				funNum: '005',
				postData:{
					authorId:this.user.id,
					author:this.user.name,
					appname:this.appname
				}
			}
			if (this.appname.length != 0) {
				server({
					method: 'post',
					data: data
				}).then(function(response){
					if(response.status == 200){
						let appId = response.data._id
						_this.$route.router.go({ name: 'appmodule',params:{appId:appId}})
					}
					console.log(response)
				},function(response){
					console.log('fail'+response.status+','+response.request)
				})
				_this.appname = ''
			}else{
				this.$els.appname.style.opacity = 1
			}

		},
		cancel(event) {
			this.appname = ''
			this.$dispatch('closeDialog','')
		}		
	},
	vuex:{
		getters:{
			user:function(state){
				return state.user
			}
		}
	}
}

</script>