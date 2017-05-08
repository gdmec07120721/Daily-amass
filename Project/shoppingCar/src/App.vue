<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
require('./assets/css/common.css')
import store from './vuex/store'
  export default{
    store:store,
  }
</script>