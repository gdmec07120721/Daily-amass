
<style scoped>
	.banner{margin: 0; padding: 0 0px 15px; border: 0;}
	.banner img{width: 100%; display: block;}
</style>


<template>
	<div class="banner {{ComponentData.styleClass}}">
	  <img :src="ComponentData.imgUrl">
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
					imgUrl: require('../../assets/images/test.png')
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