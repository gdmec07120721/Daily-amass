<template>
  <div class="car_page">
    <header class="car_hd clearfix">
      <router-link v-if="$route.name == 'carEdit'" to="/carView" class="car_complete">完成</router-link>
      <router-link v-else-if="$route.name == 'carView'" to="/carEdit" class="car_complete" >编辑</router-link>
    </header>
    <article class="car_content" v-if="goods.length != 0">
      <section class="car_goods_item" v-for="(item, index) in goods">
        <div class="goods_detail clearfix">
          <button v-if="$route.name == 'carView' && item.isValid" type="button" class="goods_selection" :class="{ 'active': item.select }"  @click="selection(index)"></button>
          <button v-if="$route.name == 'carEdit'" type="button" class="goods_selection" :class="{ 'active': item.select }" @click="selection(index)"></button>
          <span v-else-if="$route.name == 'carView' && !item.isValid" class="goods_longer">失效</span>
          <img :src=item.img class="goods_img">
          <div class="goods_info">
            <div class="goods_til_inner">
                <div class="goods_til"> 
                    <div class="goods_til_txt">{{item.name}}</div>
                    <div class="ellipsis_ghost">
                        <div class="ellipsis_placeholder"></div>
                        <div class="ellipsis_more">......</div>
                    </div>
                </div>
            </div>
            <div class="good_depict_inner">
                <div class="good_depict">
                    <div class="good_depict_txt">{{item.depict}}</div>
                    <div class="ellipsis_ghost">
                        <div class="ellipsis_placeholder"></div>
                        <div class="ellipsis_more">......</div>
                    </div>
                </div>
            </div>
            <div class="goods_total chearfix">
              <em v-if="item.isValid || $route.name == 'carView'" class="goods_price">￥{{item.num * parseFloat(item.price)}}</em>
              <em v-else class="goods_price">已售罄</em>
              <div class="goods_num">
                <div v-if="$route.name == 'carEdit'" class="goods_op">
                  <button type="button" class="minus" @click="minus(index)">-</button>
                  <input type="number" name="num" class="num_input" v-model="item.num" disabled="true"/>
                  <button type="button" class="add" @click="add(index)">+</button>
                </div>
                <b v-else-if="$route.name == 'carView'" class="">x {{item.num}}</b>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
    <div class="car_void" v-else>
      购物车空空如也~</br>
      快去商城挑选心仪的商品吧！
    </div>
    <footer class="car_ft chearfix">
      <div class="car_sel_all">
        <button type="button" class="goods_selection" :class="{ 'active': isAllSelect }" @click="allDelect"></button>
        <span>全选</span> 
      </div>

      <div v-if="$route.name == 'carView'" class="goods_total_num">
        <span>合计:<em class="goods_price">￥{{goodsTatol}}</em></span>
      </div>
      <button v-if="$route.name == 'carEdit'" type="button" class="account" @click="delect">删除</button>
      <button v-else-if="$route.name == 'carView'" type="button" class="account">结算</button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods:[{
        name: '我是iPhone6哈哈哈哈',
        depict: '颜色：红色 尺寸：6寸 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        price: '111',
        num: 1,
        img: require('../assets/images/iPhone6.jpg'),
        isValid: true,
        select: false
      },{
        name: '我是iPhone6哈哈哈哈',
        depict: '颜色：红色 尺寸：6寸 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        price: '111',
        num: 1,
        img: require('../assets/images/iPhone6.jpg'),
        isValid: false,
        select: false
      },{
        name: '我是iPhone6哈哈哈哈',
        depict: '颜色：红色 尺寸：6寸 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        price: '111',
        num: 1,
        img: require('../assets/images/iPhone6.jpg'),
        isValid: false,
        select: false
      },{
        name: '最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行最多显示两行',
        depict: '颜色：红色 尺寸：6寸 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        price: '115',
        num: 1,
        img: require('../assets/images/iPhone6.jpg'),
        isValid: true,
        select: false
      }],
      isAllSelect: false
    }
  },
  computed: {
    goodsTatol: function () {
      let goodsTatol = 0
      this.goods.forEach(function(item, index, array){
        if (item.select) {
          goodsTatol += item.isValid ? parseFloat(item.price) * item.num : 0
        }
      })
      return goodsTatol
    }
  },
  methods:{
    minus(index) {
      if (this.goods[index].num > 1) {
        this.goods[index].num--
      }else{
        alert('数量不能小于1')
      }
    },
    add(index) {
      this.goods[index].num++
    },
    selection(index){
      this.goods[index].select = this.goods[index].select ? false : true
    },
    delect(){
      let that = this
      this.goods = this.goods.filter(function(item, index, array){
        if (!item.select) {
          return item
        }
      })
    },
    allDelect(){
      this.isAllSelect = this.isAllSelect ? false : true
      this.mapGoods()
    },
    mapGoods(){
      let that = this
      this.goods = this.goods.map(function(item, index, array){
          item.select = that.isAllSelect
          return item
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.isAllSelect = false
      this.mapGoods()
    }
  }
}
</script>
