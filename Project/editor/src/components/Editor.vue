<template>
  <div>
    <div class="edit">
      <p class="text">编辑：</p>
      <div class="editTab">
        <input type="button" value="加粗" @click="bold"> 
        <input type="button" value="斜体" @click="italic"> 
        <input type="button" value="链接" @click="link">
        <input type="button" value="iframe" @click="iframe">
        <a class="file"><input type="file" accept="image/*" @change="upPic">图片</a>
      </div>
      <div class="textarea" id="textarea" contenteditable="true" @click="clickUp" @keyup="keyUp" v-el:message>请输入您的内容...</div>
    </div>
    <p class="text">浏览：</p>
    <div class="view" id="view" v-el:view>
        {{ message }}
    </div>
    <div class="dailog" v-show="ok" v-el:dailog>
      <div class="dailog_inner">
        <h3>{{dailog.h3}}</h3>
        <p>{{dailog.p}}</p>
        <input class="linktext" type="text" v-model="linkText" placeholder="请输入链接">
      </div>
      <div class="dailog_footer">
        <input type="button" value="确定" @click="confirm">
        <input type="button" value="取消" @click="cancel">
      </div>
    </div>
    <div class="dialog_mask" v-show="ok"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return{
        message: '请输入您的内容...',
        ok:false,
        linkText:'',
        links:[],
        iframes:[],
        imgs:[],
        selectionObj:{},
        dailog:{
          h3:'',
          p:''
        }
      }
    },
    methods: {
      clickUp: function(event){
          console.log(event.target.setSelectionRange(2,5))
      },
      keyUp: function(event){
        console.log(event.target)
        if (event.code == 'Enter') {
          console.log(event)
        }else{
          this.selectionObjF()
        }
        this.selectionObjF()
        this.$els.view.innerHTML = this.selectionChage(this.$els.message.innerHTML)
        this.viewText(this.$els.message.innerHTML)
      },
      selectionChage:function(val){
        let str,bold,boldEnd,italic,italicEnd,link,linkEnd,iframe,img,patt1,patt2,patt3,links,dataLists,iframes,imgs

        patt1 = /{.*?}/g//查找{}里面内容即查找链接
        patt2 = /\/iframe-src=\".*?\"\//g//查找/iframe-src=""/里面内容即查找iframe
        patt3 = /\/img-src=\".*?\"\//g//查找/img-src=""/里面内容即查找img
        links = val.match(patt1)
        iframes = val.match(patt2)
        imgs = val.match(patt3)
        this.links = []
        this.iframes = []
        this.imgs = []
        if(links){
        dataLists = this.links
        links.forEach(function(self){
          dataLists.push(self.match(/[^{].*[^}]/)[0])
        })
        }

        if(iframes){
        dataLists = this.iframes
        iframes.forEach(function(self){
          dataLists.push(self.match(/\/iframe-src="(.*?)"\//)[1])
        })
        }

        if(imgs){
        dataLists = this.imgs
        imgs.forEach(function(self){
          dataLists.push(self.match(/\/img-src="(.*?)"\//)[1])
        })
        }

        bold = val.replace(/(\/\*)/g ,'<b>')
        boldEnd = bold.replace(/(\*\/)/g ,'</b>')
        italic = boldEnd.replace(/\/\~/g ,'<i>')
        italicEnd = italic.replace(/\~\//g ,'</i>')
        link = italicEnd.replace(/\[/g ,'<a>')
        linkEnd = link.replace(/\]/g ,'</a>')
        img = linkEnd.replace(patt3 ,'<img src="">')
        iframe = img.replace(patt2 ,'<iframe width="100%" height="300" allowfullscreen="allowfullscreen" frameborder="0"></iframe>')
        str = iframe.replace(patt1 ,'')

        return str
      },
    selectionTpye:function(type,dataText){
      let sel = this.selectionobj,selText,newselText

      switch(type){
        case '0': 
          selText = '/*' + sel.selString + '*/'
          break
        case '1': 
          selText = '/~' + sel.selString + '~/'
          break
        case '2': 
          selText = '[' + sel.selString + '] {'+ dataText +'}'
          break
        default:
          break
      }

      sel.selArray.splice(sel.start,sel.selNum,selText)

      newselText = sel.selArray.join('') //数组转字符串
      
      return newselText
    },
    selectionObjF:function(){
      if (window.getSelection) {
        let sel = window.getSelection().getRangeAt(0), //console.log(typeof sel) -> object
        start = sel.startOffset,
        end = sel.endOffset
        this.selectionobj = {
          start : start,
          end : end,
          selNum : end - start,
          selArray : this.$els.message.innerHTML.split(''), //字符串转数组
          selString: sel.toString()   
        }
        console.log(this.selectionobj)
        console.log(window.getSelection().getRangeAt(0).commonAncestorContainer)
        return window.getSelection()
      }else{
        alert ("您的浏览器不支持这个编辑器！")
      }
      
    },
    selection:function(){
      if(window.getSelection){
        let sel = this.selectionObjF()
        //判断是否存在选中内容
        if(sel.isCollapsed){
          return false;
        }else{
          //判断选中的内容是否是编辑器内的
          if(this.$els.message.innerHTML.indexOf(sel.toString()) >= 0){
            return true;
          }else{
            alert ("没选中内容！")
          }
        }
      }else{
        alert ("您的浏览器不支持这个编辑器！")
      }
    },
      bold: function () {
      if(this.selection()){
        let newselText = this.selectionTpye('0',null)
        
        //document.execCommand('FormatBlock','false','div')
        console.log(newselText)
        this.$els.message.innerHTML = newselText
        this.message = newselText
      }
      },
      italic: function(){
        if(this.selection()){
        let newselText = this.selectionTpye('1',null)
        
        //document.execCommand('FormatBlock','false','div')
        this.$els.message.innerHTML = newselText
        this.message = newselText
      }
      },
    link: function(){
      if(this.selection()){
        this.ok = true
        this.dailog.h3 = 'Insert Link'
        this.dailog.p = 'http://example.com/ "optional title"'
      }
    },
    upPic: function(e){
      this.$els.message.focus()
      this.selectionObjF()
      let oFReader = new FileReader(),
          selectionobj = this.selectionobj,
          file = e.target.files[0],
          newoFReader = oFReader.readAsDataURL(e.target.files[0]),
          _this = this,
          param,dataURL,image_list,imgUrl,newselText
      console.log(selectionobj)
      if (file) {
        if (window.URL) {
          oFReader.onload = function (oFREvent) {
            dataURL = oFREvent.target.result
            axios({
              method: 'post',
              url: 'http://192.168.102.82:3000/picUpload',
              data: {
                imgData:dataURL
              }
            }).then(function(response){
              imgUrl = response.data
              selectionobj.selArray.splice(selectionobj.start,0,'/img-src="'+ imgUrl +'"/').join('')
              _this.$els.message.innerHTML = selectionobj.selArray.join('')
              _this.message = selectionobj.selArray.join('')
            },function(response){
              console.log('fail'+response.status+','+response.request)
            })
          };
        }
      }else{
        alert('至少要选择一张图片！')
      }
      
      
    },
    iframe: function(){
        this.selectionObjF()
        this.ok = true
        this.dailog.h3 = '嵌入演示代码'
        this.dailog.p = '填写在 http://jsfiddle.net/ 获取的嵌入链接(embed)'
    },
    confirm: function(){
      this.ok = false
      let butNum,selectionobj
      let linkText = this.linkText
      let newselText
      if (this.dailog.h3.indexOf('嵌入演示代码') < 0) {
        newselText = this.selectionTpye('2',linkText)
      }else{
        selectionobj = this.selectionobj
        selectionobj.selArray.splice(this.selectionobj.start,0,'/iframe-src="'+ linkText +'"/').join('')
        newselText = selectionobj.selArray.join('')
      }
      
      this.$els.message.innerHTML = newselText
      this.message = newselText
      this.linkText = ''
    },
    cancel: function(){
      this.ok = false
      this.linkText = ''
    },
    viewText: function(val){
      console.log(this.$els.view.innerHTML)
      console.log(this.$els.message.innerHTML)
      let lins,ifs,ims,links,iframes,imgs
      links = val.match(/{.*?}/g)//查找{}里面内容即查找链接
      iframes = val.match(/\/iframe-src=\".*?\"\//g)//查找/iframe-src=""/里面内容即查找iframe
      imgs = val.match(/\/img-src=\".*?\"\//g)//查找{}里面内容即查找链接
      lins = this.$els.view.getElementsByTagName('a')
      ifs = this.$els.view.getElementsByTagName('iframe')
      ims = this.$els.view.getElementsByTagName('img')
      if(links){
        for (let i = 0; i < links.length; i++) {
          lins[i].setAttribute('href',links[i].match(/[^{].*[^}]/)[0])
        }
      }
      if(iframes){
        for (let t = 0; t < iframes.length; t++) {
          ifs[t].setAttribute('src',iframes[t].match(/\/iframe-src="(.*?)"\//)[1])
        }
      }
      if(imgs){
        for (let l = 0; l < imgs.length; l++) {
          ims[l].src = imgs[l].match(/\/img-src="(.*?)"\//)[1]
        }
      }
    }
    },
    watch: {
      // 深度 watcher
      'message': {
        handler: function (val, oldVal) {
          this.$els.view.innerHTML = val.replace(/\n/g,'<br/>')
          this.$els.view.innerHTML = this.selectionChage(val)
          this.viewText(val)
        },
        deep: true
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      html,body{height: 100vh; padding:10px 20px;}
      body{font-family:"微软雅黑",Verdana,Sans-serif;color:#333; line-height: 1; font-weight: 400; box-sizing:border-box; }
      input,textarea{display:block; font-family:inherit; color:#333;}
      .textarea{
        width:100%;
        resize:none;
        border-radius:4px;
        border:1px solid #ddd;
        padding: 5px 10px;
        box-sizing:border-box;
        line-height:1.5em;
      }
      .textarea iframe,
      .view iframe{padding: 10px 0;}
      .view img{padding: 5px;}
      .view{line-height: 1.5em;}
      .editTab{margin:0; padding:0  0 15px;}
      .editTab:after{content:''; display:block; clear:both;}
      .editTab input{height:30px; line-height:30px; padding:0 7px; float:left;color:#444; background:#eee; cursor:pointer;list-style-type:none;margin-right:2px; border:1px solid #ddd; }
      .editTab input:hover{background:#ddd;}
      .view a{color:#19add8; text-decoration:none; }
      .view a:hover{ text-decoration:underline;}
      .dailog{width: 400px; height: 200px; position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; z-index: 10; border:1px solid #ddd; background: #fff;}
      .dialog_mask{width: 100%; height: 100%; position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9;}
      .dailog_inner{width: 100%; padding: 0px 0px 20px;}
      .dailog_inner h3,
      .dailog_inner p{padding: 0 20px;}
      .dailog_inner p{font-size: 14px;}
      .linktext{width: 90%; display: block; margin: 0 auto; box-sizing:border-box; padding: 5px 10px; border: 1px solid #ddd;}
      .dailog_footer{width: 100%; text-align: center;padding-top: 16px; border-top: 1px solid #ddd; }
      .dailog_footer input{width: 35%; display: table-cell; border:0px; padding:10px 0; background: #ddd; color: #333; }
      .dailog_footer input:hover{background: #eee;}
      .file {position: relative;display: inline-block;background: #eee;border: 1px solid #ddd;padding: 4px 12px;overflow: hidden;color: #333;text-decoration: none;text-indent: 0;line-height: 20px;}
      .file input {position: absolute;font-size: 100px;left: 0;top: 0;opacity: 0;}
      .file:hover {background: #ddd;text-decoration: none;}
</style>
