
<style scoped>
	.title{margin: 0; padding: 0 15px; border: 0;}
	.title h1{font-size: 22px; color: #009c7b; margin: 0; padding: 15px 0;}
	.title small{font-size: 15px;}
</style>


<template>
	<div class="page-header title {{ComponentData.styleClass}}">
	  <h1>{{ComponentData.title}}<small>{{ComponentData.smallTitle}}</small></h1>
	</div>
</template>

<script>
	
	export default{
		props:['componentdata'],
		ready(){
			if (this.componentdata != undefined && JSON.stringify(this.componentdata) != '{}') {
				this.ComponentData = this.componentdata
			}
		},
		data(){
			return{
				ComponentData:{
					styleClass:'',
					title:'Example page header',
					smallTitle:'Subtext for header'
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