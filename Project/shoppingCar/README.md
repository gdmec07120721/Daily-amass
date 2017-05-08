# car(购物车)[Demo]()

### 功能:

1 . 编辑模式：购物车商品删除

2 . 编辑模式：购物车商品数量修改

3 . 同步购物车状态（金额，商品状态等）

### 技术描述：

1 . 页面重构主要用到了HTML5 + CSS3

2 . 前端开发选用Vue.js框架，优势是实现购物车组件化

3 . 使用Vue-router切换路由，控制页面元素的渲染，从而实现编辑模式和非编辑模式的区分

4 . 由于编辑模式和非编辑模式都是共用一个组件，以此数据是共用的，从而也实现了购物车状态同步

5 . 而购物车的商品删除、数量修改等主要结合了Vue.js的生命周期钩子和事件来实现

> a project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
