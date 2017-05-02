
<style scoped>
	.dlbtn{margin: 0;  border: 0; position: fixed; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; padding: 15px;}
	.dlbtn a{width: 100%; display: block; background: #009c7b; padding: 10px 0; text-align: center; color: #fff; border-radius: 5px;}
</style>


<template>
	<div class="dlbtn {{ComponentData.styleClass}}">
	  <a href="{{ComponentData.link}}" target="_blank">{{ComponentData.text}}</a>
	</div>
</template>

<script>
	
	export default{
		props:['componentdata'],
		ready(){
			if (this.componentdata != undefined && JSON.stringify(this.componentdata) != '{}') {
				this.ComponentData = this.componentdata
				let channel = this.$route.query.channel
				let local = this.$route.query.local
				let sign = this.$route.query.sign
				let client, dlink
				let system = this.isIosOrAndroid()
				switch(system){
					case 0:
          				client = '/p0'
          			break
          			case 1:
          				client = '/p1'
          			break
          			case null:
          				client = '/p'
          			break
				}
				if(channel === undefined || local === undefined || sign === undefined){
					dlink = this.componentdata.link;
				}else{
					dlink = appDownLink+"/c"+channel+"/l"+local+"/s"+sign+client;
				}
				this.ComponentData.link = dlink
			}
		},
		data(){
			return{
				ComponentData:{
					styleClass:'',
					link: 'javascript:void(0);',
					text:'下载APP'
				}
			}
		},
		methods:{
			isIosOrAndroid(){
				var u = navigator.userAgent; 
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android缁堢 
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios缁堢 
				if(isAndroid){
					return 0;
				}else if(isIOS){
					return 1;
				}else{
					return null;
				}
			}
		},
		watch:{
			'componentdata':function(val,oldVal){
				this.ComponentData = this.componentdata
			}
		}
	}

</script>