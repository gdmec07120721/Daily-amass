<!--
 Created by xaobi on 2018/2/28.
 -->

<style type="text/css" scoped>
	label{margin: 0; font-weight: 400; font-size: 14px;}
	.checkbox{margin: 5px 0;}
	.no-i-crright{display: inline-block; vertical-align: middle;}
	.i-icon{padding:0 6px; width: 16px; display: inline-block;}
	.i-crright:after,
	.i-crdown:after{content: ''; display: inline-block; vertical-align: middle; width: 0;height: 0; }
	.i-crright:after{border-top: 4px solid transparent; border-left: 4px solid #ababab;border-bottom: 4px solid transparent;}
	.i-crdown:after{border-top: 4px solid #ababab; border-left: 4px solid transparent; border-right: 4px solid transparent;}
    .tree-content li{position: relative;}
    .tree-item{display: block; color: #657180;}
    .tree-item:hover{background: #f5f7fa;}
    .tree-operat{position: absolute; right: 0; top: 0.3em;}
    .tree-input{padding-left: 38px;}
    .tree-input input{max-width: 200px; display: inline-block;}
    .checkbox input[type=checkbox]{margin: 0;}
    .checkbox input[type=checkbox]:checked + .checkbox-inner{background: #39f; border: 1px solid #39f;}
    .checkbox input[type=checkbox]:checked + .checkbox-inner:after{content: ''; display: table; width: 4px; height: 8px; position: absolute; top: 1px; left: 4px; border: 2px solid #fff; border-top: 0; border-left: 0; transform: rotate(45deg) scale(1); transition: all .2s ease-in-out;}
    .checkbox-wrapper-disabled .checkbox-inner {
	    border-color: #d7dde4;
	    background-color: #f3f3f3;
	}
</style>


<template>
	<ul class="tree-content" :style="styleObject">
		<li v-if="model.length == 0">
			暂无数据
		</li>
		<template v-else>
		<li v-for="(item, index) in list">
			<a href="javascript:;" class="tree-item" @click.self="toggle(index)">
				<i class="i-icon" :class="{'i-crright' : (item.isFolder && !item.open), 'i-crdown' : (item.isFolder && item.open)}" @click.self="toggle(index)"></i>
				<template v-if="showCheckbox">
					<label class="checkbox-wrapper checkbox-wrapper-checked" :class="item.disabled ? 'checkbox-wrapper-disabled' : ''">
		                <span class="checkbox">
		                	<input type="checkbox" class="checkbox-input" @click="checked(item, $event)" :value="item[nodeKey]" v-model="checked_value" :disabled="item.disabled">
		                	<span class="checkbox-inner"></span> 
		               	</span>
		                {{item.label}}
		            </label>
	            </template>
	            <template v-else>
					<label class="checkbox-wrapper checkbox-wrapper-checked" @click.self="toggle(index)">{{item.label}}</label>	            	
	            </template>
	            <div class="tree-operat" v-if="customTree">
	            	<a href="javascript:;" @click="add(item, index)"><i class="iconfont i-add"></i></a>
	            	<a href="javascript:;" @click="delect(item, index)"><i class="iconfont i-minus"></i></a>
	            </div>
			</a>
			<Tree :model="item.children" v-if="item.isFolder" v-show="item.open" v-model="checked_value" :nodeKey="nodeKey" :defaultProps="defaultProps" :showCheckbox="showCheckbox" @operat="operation" :style="style_object" :filterNode="filterNode" :customTree="customTree"></Tree>
			<div class="tree-input ptb-sm" v-if="!!tree_input.index.toString() && tree_input.index == index">
				<form class="form-horizontal"  @submit.prevent="ok(item, index)">
					<input type="text" class="form-control input-sm" v-model="tree_input.text" placeholder="text" required>
					<button class="pl-sm btn-xs btn btn-primary" type="submit">确定</button>
		            <a href="javascript:;" class="pl-sm" @click="cancel">取消</a>
	            </form>
			</div>
		</li>
		</template>
			
	</ul>
</template>

<script>

	export default {
		name: 'Tree',
		props: {
			//展示数据
			model: {
				type: Array,
				default: () => {
					return [];
				}
			},
			//被勾选的节点key的数组
			value: {
				type: Array,
				default: () => {
					return [];
				}
			},
			//唯一标识的属性
			nodeKey: {
				type: String,
				default: 'id'
			},
			//节点是否可被选择
			showCheckbox: {
				type: Boolean,
				default: false
			},
			//自定义节点内容
			customTree: {
				type: Boolean,
				default: false
			},
			//通过关键字过滤树节点
			filterNode: {
				type: String,
				default: ''
			},
			//指定节点标签的属性
			defaultProps: {
				type: Object,
				default: () => {
					return {
						children: 'children',
                    	label: 'label'
					}
				}
			},
			//节点ul标签的样式对象
			styleObject: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		watch: {
			value(value){
				this.checked_value = value;
			},
			checked_value(value){
				this.$emit('input', value);
			},
			model(list){
				this.defaultList();
			},
			filterNode(value){
				if (value) {
					this.filterOpenParent();
				}
			}
		},
		data() {
			return {
				list: [],
				checked_value: [], //被勾选的节点key的数组
				tree_input: {
					index: '',
					text: ''
				},
				style_object: {
					paddingLeft: '20px'
				}
			}
		},
		created(){
			this.checked_value = this.value;
			this.defaultList();
		},
		methods: {
			//初始化数据列表
			defaultList(){
				let self = this;

				//初始化源数据，每个元素添加isFolder是否有子元素属性和open控制是否展开子元素属性
				this.list = this.model.map(item => {
					let def = {
						id: item[self.nodeKey],
						label: item[self.defaultProps.label],
						children: item[self.defaultProps.children],
						open: item.open ? item.open : false,
						disabled: item.disabled,
						isFolder: (item[self.defaultProps.children] && item[self.defaultProps.children].length) ? true : false 
					}

					return Object.assign({}, def);
				});
			},
			//是否显示子节点
			toggle(index){
				this.list[index].open = !this.list[index].open;
			},
			//对选中节点的子节点进行操作
			checked(item, e){
				let self = this;

				//判断当前选中复选框是否有子元素
				if (item.children && item.children.length) {
					let arr = this.getChildrenValue(item.children, self.nodeKey);

					//判断复选框状态
					if (e.target.checked) {
						//选中时，其子元素全部选中
						this.checked_value = [...new Set([...arr, ...this.checked_value])];
					}else{
						//反则，其子元素全部不选中
						arr.forEach(i => {
							let index = self.checked_value.findIndex(t => t === i);

							if (index > -1) {
								self.checked_value.splice(index , 1);
							}
						});
					}
				}	
			},
			//获取所有子元素指定的key字段值
			getChildrenValue(list, key){
				let self = this, _list = [];

				list.forEach(item => {
					if (item.children && item.children.length) {
						//递归
						let arr = self.getChildrenValue(item.children, key);

						_list = [..._list, ...arr, item[key]];
					}else{
						_list.push(item[key]);
					}
				});
				return _list;
			},
			//添加子节点
			add(item, index){
				item.open = true;
				this.tree_input.index = index;
			},
			//删除该节点
			delect(item, index){
				this.model.splice(index, 1);
				this.$emit('operat', {type: 'delect', node: item});
			},
			//确定添加字节点的内容
			ok(item, index){
				if (this.tree_input.text) {
					let children = this.list[index].children ? this.list[index].children : [];
					let	node = {
							id: new Date().getTime(),
							label: this.tree_input.text,
						}

					children.push(node);
					this.$set(this.model[index], 'children', children);
					this.$emit('operat', {type: 'add', node: item, node_children: node});
					this.cancel();
				}else{
					this.$
				}
			},
			//取消添加子节点
			cancel(){
				this.tree_input.index = '';
				this.tree_input.text = '';
			},
			//递归触发父节点中的operat事件
			operation(obj){
				this.$emit('operat', obj);
			},
			//打开父节点
			filterOpenParent(){
				let self = this;

				this.list = this.list.map(item => {
					let children_val = '';

					//获取子节点所有label值
					if (item.children && item.children.length > 0) {
						children_val = JSON.stringify(self.getChildrenValue(item.children, 'label'));
					}

					//判断子节点是否存在过滤字符
					if (children_val.indexOf(self.filterNode) > -1) {
						item.open = true;
					}else{
						item.open = false;
					}

					return item;
				});
			}
		}
	}
</script>