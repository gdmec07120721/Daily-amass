
<style scoped>
	.text{margin: 0; padding: 0 15px; border: 0;}
	.text p{margin: 0; padding: 15px 0;}
</style>


<template>
	<div class="text {{ComponentData.styleClass}}">
	  <p>{{{ComponentData.text}}}</p>
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
					text: 'Hello，这里是正文区域，请输入你的内容，它将在这里展示!'
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