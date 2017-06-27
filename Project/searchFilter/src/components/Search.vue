<style scoped>
	ul,li{list-style-type: none; padding: 0; margin: 0;}
	.wrap{position: relative; display: inline-block;}
	.search_filter{width: 300px; padding: 5px 7px; border: 1px solid #ddd;}
	.drop_down_box{width: 300px; max-height: 200px; display: block; border: 1px solid #ddd; overflow-y: auto; overflow-x: hidden;}
	.show{display: block;}
	.noShow{display: none;}
	option:hover{background: #eee;}
</style>

<template>
	<div class="wrap">
		<input type="text" name="searchFilter" class="search_filter" placeholder="输入英文名" v-model="inputValue" @keyup.8="deleteValue">
		<select v-model="selected" multiple class="drop_down_box" :class="isShow ? 'show' : 'noShow'" @click="select" @keyup.13="select">
		    <option v-for="(item, index) in newData">{{item}}</option>
		</select>
		{{selected}}
	</div>

</template>

<script>
	export default{
		props:{
			data: {
				type: Array,
        default: []
			}
		},
		data(){
			return{
				newData: this.data, //所有数据
				selected: [], //匹配后选中的值 
				inputValue: '', //输入框的值
				isShow: false //下拉列表是否显示
			}
		},
		watch: {
			inputValue(val){
				this.filter()
			}
		},
		methods:{
			deleteValue(e){
				this.filter()				
			},
			//过滤列表数据，根据输入的字符获取符合的数据
			filter(){
				let reg, 
					patt = this.inputValue.match(/(?=[^;]+$).+/)//获取最后一个分号后面的所有字符

				if (patt != null) {
					reg = new RegExp('^'+ patt[0])//创建以指定字符为开头正则

					//根据输入的字符获取符合的数据
					this.newData = this.data.filter(item => reg.test(item))

					//判断是否有符合是数据存在
					this.isShow = this.newData.length > 0 ? true : false
				}
			},
			//选择下拉列表选项
			select(e){		
				let reg, isExist,
					selectedVal = this.selected.toString(), //获取下拉列表选中值是否并将数组转为字符串
					newIv = this.inputValue.match(/.+(?=[^;]+$)/) //获取最后一个分号前面的所有字符

				//判断最后一个分号前面的所有字符是否存在
				this.inputValue = newIv != null ? newIv[0] : '' 

				//判断目前选中值是否已存在
				isExist = this.inputValue.split(';').every((item) => item != selectedVal)

				this.inputValue += isExist ? selectedVal + ';' : ''
				this.isShow = false

				//触发当前'breck'事件,并传值回调
				this.$emit('breck', this.inputValue.split(';'))
			}
		}

	}
</script>
 
