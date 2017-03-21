<template>
  <footer>
    <div>
    <div class="footer-item" v-for="(item,index) in title" v-on:click="setzhi(index)"><router-link v-bind:to="item.path" >
    <img v-bind:src="item.img">
    <div class="item-color">{{item.name}}</div>
    </router-link></div>
    </div>
    
  </footer>
</template>

<script>
var pic1 = require('../assets/image/new.png') 
var pic2 = require('../assets/image/movie.png') 
var pic3 = require('../assets/image/hot.png') 
var pic4 = require('../assets/image/search.png') 
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:[
      {name:"新闻",path:"/douban",img:pic1},
      {name:"电影",path:"/movie",img:pic2},
      {name:"热门",path:"/hot",img:pic3},
      {name:"搜索",path:"/my",img:pic4}

      ]
    }
  },
  methods:{
    setzhi:function(index){
      var msg;
      switch(index){
        case 0:
        msg="热点新闻"
        break;
         case 1:
        msg="正在热映"
        break;
         case 2:
        msg="豆瓣Top250"
        break;
         case 3:
        msg="搜索"
        break;

      }
      this.$emit("setzhi",msg);
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    footer>div{
       display: flex;
       position: fixed;
       background-color:#FAFAFA;
       width:100%;
       font-size: 16px;
       color:#fff;

       bottom: 0;
       left:0;
       .item-color{
        color:#BDBDBD;
        font-size:14px;
       }
       a{
        display:block;
       }

       img{width:20px;height:20px;display:block;margin: 0 auto;padding-top:5px }
       .footer-item{
        flex:1;
        text-align: center; 
        a.active{
          background-color:#118FBD;
          .item-color{
            color:#fff;
         }
        }

       }
    }
</style>