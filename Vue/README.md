## Tree 树形控件


`Tree`树形控件可把信息清晰并且有层次结构地展示，数据还可以通过展开、折叠、筛选交互得到更好的用户体验，同时还适用于需要选择层级时使用，支持自定义节点内容。


### 基本模式

清晰且有层次结构展示数据信息

:::
```html
<template>
    <div>
        <Tree :model="trees"></Tree>
    </div>
</template>
<script>
    import Tree from './Tree.vue';
    export default {
        components: {
            Tree
        },
        data(){
            return {
                trees:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 11,
                        label: '一级 1-1',
                        children: [{
                            id: 121,
                            label: '一级 1-1-1',
                        }]
                    }, {
                        id: 12,
                        label: '一级 1-2',
                        children: [{
                            id: 121,
                            label: '一级 1-2-1',
                        }]
                    }]
                }, {
                    id: 2,
                    label: '二级 2',
                    children: [{
                        id: 221,
                        label: '二级 2-1',
                    }]
                }]
            }
        }
    }
</script>
```
:::

### 可选择模式

适用于需要选择层级时使用，并且还可以通过`node-key`来设置唯一标识的属性（默认值为id），配置`default-props`来指定节点标签的属性。

:::
```html
<template>
    <div>
        <p>选中节点：{{value}}</p>
        <Tree :model="trees" :show-checkbox="show_checkbox" v-model="value" :default-props="default_props"></Tree>
    </div>
</template>
<script>
    import Tree from './Tree.vue';
    export default {
        components: {
            Tree
        },
        data(){
            return {
                trees:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 11,
                        label: '一级 1-1',
                        children: [{
                            id: 121,
                            label: '一级 1-1-1',
                        }]
                    }, {
                        id: 12,
                        label: '一级 1-2',
                        children: [{
                            id: 121,
                            label: '一级 1-2-1',
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 21,
                        label: '一级 2-1',
                    }]
                }],
                value: [],
                show_checkbox: true,
                //children、label默认值分别为children、label
                default_props: {
                    children: 'children',
                    label: 'label'
                }
            }
        }
    }
</script>
```
:::

### 自定义节点内容

节点的内容支持自定义，配置`custom-tree`可以对数据节点进行添加指定节点的子节点或删除指定节点操作。</br>

同时`@operat`事件在添加和删除操作成功时回调，返回的参数值是一个对象，其对象的字段值包括：type（操作类型）、node（父节点）、node_children（添加的子节点）。

:::
```html
<template>
    <div>
        <template v-if="operat.type && operat.type == 'add'">
            <p>在{{operat.node ? operat.node.label : ''}}节点做了添加操作</p>
        </template>
        <template v-if="operat.type && operat.type == 'delect'">
            <p>删除了{{operat.node ? operat.node.label : ''}}节点</p>
        </template>
        <Tree :model="trees" :custom-tree="true" @operat="operation"></Tree>
    </div>
</template>
<script>
    import Tree from './Tree.vue';
    export default {
        components: {
            Tree
        },
        data(){
            return {
                trees:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 11,
                        label: '一级 1-1',
                        children: [{
                            id: 121,
                            label: '一级 1-1-1',
                        }]
                    }, {
                        id: 12,
                        label: '一级 1-2',
                        children: [{
                            id: 121,
                            label: '一级 1-2-1',
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 21,
                        label: '一级 2-1',
                    }]
                }],
                operat: {}
            }
        },
        methods:{
            operation(obj){
                this.operat = Object.assign({}, obj);
            }
        }
    }
</script>
```
:::

### 筛选节点内容

可通过关键字筛选节点，方便快速定位节点位置。

:::
```html
<template>
    <div>
        <p>选中节点：{{value}}</p>
        <input type="text" class="form-control" placeholder="输入关键字进行过滤" v-model="filter_text">
        <Tree :model="trees" :show-checkbox="show_checkbox" v-model="value" :filter-node="filter_text"></Tree>
    </div>
</template>
<script>
    import Tree from './Tree.vue';
    export default {
        components: {
            Tree
        },
        data(){
            return {
                trees:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 11,
                        label: '一级 1-1',
                        children: [{
                            id: 121,
                            label: '一级 1-1-1-p',
                        }]
                    }, {
                        id: 12,
                        label: '一级 1-2',
                        children: [{
                            id: 121,
                            label: '一级 1-2-1',
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 21,
                        label: '一级 2-1-s',
                    }]
                }],
                value: [],
                show_checkbox: true,
                filter_text: ''
            }
        },
    }
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ |
| v-model | 双向绑定 | Array | [] |
| model | 展示的数据源 | Array | [] |
| node-key | 唯一标识的属性 | String | id |
| show-checkbox | 是否支持节点可选 | Boolean | false |
| custom-tree | 是否支持自定义节点内容 | Boolean | false |
| filter-node | 通过关键字过滤树节点 | String |  |
| default-props | 指定节点标签的属性 | Object | {children: 'children', label: 'label'} |
| style-object | 设置节点ul标签的样式对象 | Object | {} |

## Events
| 事件 | 说明 | 回调参数 |
| ------------ | ------------ |
| operat | 事件在添加和删除操作成功时回调 | 共1个参数，参数类型为对象，其对象的字段值包括：`type`（操作类型）、`node`（父节点）、`node_children`（添加的子节点） |

## 方法
| 方法 | 说明 | 参数 |
| ------------ | ------------ |
| getChildrenValue | 返回指定节点下的所有子节点的指定key字段值 | 接收2个参数：</br>1、`Array`类型参数，是指定节点的子节点；</br>2、`String` 类型参数，是指节点的key字段 |