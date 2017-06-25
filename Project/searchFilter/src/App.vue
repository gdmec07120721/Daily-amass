<template>
    <div>
      <Search :data.sync="list" @breck="addUser"></Search>
      <div class="select_wrap">
        <select v-model="selected">
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
        </select>
        <a href="javascript:;" class="add_btn" @click="add">添加</a>
        <span>Selected: {{ selected }}</span>       
      </div>
      <p><span v-for="ep in editPrivileges">{{ep}}；</span></p>
      <p><span v-for="vp in viewPrivileges">{{vp}}；</span></p>
    </div>
    
</template>

<script>
import Search from './components/Search'

export default {
  components:{
    Search: Search
  },
  data(){
    return{
      list: ['xaobi', 'shuki', 'benny', 'ken', 'jens', 'snjk', 'sddskj', 'kj', 'kyg'],
      editPrivileges: [],
      viewPrivileges: [],
      selected: 0,
      addVal: '', //添加值
      options: [
        { text: '可编辑', value: 0 },
        { text: '可查看', value: 1 }
      ]
    }
  },
  methods:{
    addUser(arr){
      arr.pop()
      this.addVal = arr
    },
    add(){
      let intersect, union,
          self = this

      //intersect = this.filter(this.addVal, this.list, this.intersect) //ES5 交集
      intersect = new Set([...this.addVal].filter(x => new Set(self.list).has(x))) //ES6 交集
      this.addVal = [...intersect]

      if (this.selected === 0) {
        //union = this.filter(this.addVal, this.editPrivileges, this.union)//ES5 并集
        union = new Set([...new Set(this.addVal), ...new Set(this.editPrivileges)]) //ES6 并集
        this.editPrivileges = [...union]
      }else if(this.selected === 1){
        union = new Set([...new Set(this.addVal), ...new Set(this.viewPrivileges)]) //ES6 并集
        this.viewPrivileges = [...union]
      }

    },
    //过滤
    filter(arr, compareArr, definition){
      let isExist

      return arr.filter(item => {
        isExist = definition(item, compareArr)
        if (isExist) {
          return item
        }
      })
    },
    //交集 
    intersect(item, arr){
      return arr.some(compareItem => {
        return item == compareItem
      })
    },
    //并集
    union(item, arr){
      return arr.every(compareItem => {
        return item != compareItem
      })
    }
  }
}
</script>

<style scope>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
.add_btn{text-decoration: none; padding: 2px 5px; background: blue; color: #fff; border-radius: 4px; font-size: 14px;}
.add_btn:hover{background: rgba(0, 0, 255, 0.8);}
.add_btn:active{background: rgba(0, 0, 255, 1);}
.select_wrap{padding: 10px 0;}
</style>
