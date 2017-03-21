<template>
  <section class="news_list">
  <mt-spinner :size="100" type="triple-bounce" v-show="loading" class="loads" color="#26A2FF"></mt-spinner>
  <div class="mask" v-show="loading" style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);z-index:100"></div>
  <ul   v-infinite-scroll="load"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
    <li v-for="article in newslist">
      <router-link :to="{name:'news',params:{id:article.news_id}}" key="{{index}}" class="" >
    <div class="list">
      <img v-bind:src="article.text_image0" >
      <div class="right-item">
        <h2>{{article.title}}</h2>
        <p>{{article.edit_time|time}}</p>
      </div>
    </div>
    </router-link>
    </li>
  </ul>
  <loading v-show="loadmorebtn"></loading>
   </section>
</template>

<script>
import loading from "../loading"
const pagenum=1;
export default {
  name: 'section',
  data () {
    return {
    }
  },
  components:{
    loading
  },
  created(){
      if(this.$store.state.news.newslist.length==0){
        this.$store.dispatch('getnews'); 
      } 
  },
  methods:{
    load(){
      pagenum++;
      this.$store.dispatch('loadmores',pagenum)
    }
  },
  computed:{
    newslist(){
      return this.$store.state.news.newslist;
    },
    loading(){
      return this.$store.state.news.loading;
    },
    loadmorebtn(){
      return this.$store.state.news.loadmorebtn;
    }
  }
}
</script>
<style scoped lang="less">
 	section{
 	  margin:0;
    margin-bottom: 46px;
 		background-color:#fff;
    padding:0 15px;
 		margin-top: 50px;
    .loads{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -19px;
    z-index: 200;
  }
    >a{
      display:block;
      text-decoration: none;
      color:#000;
      margin-bottom:10px;
    }
    .load{
      display: inline-block;
      vertical-align: middle;
      div{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
     p{
      color: #b2b2b2;
    font-size: 14px;
    }
    div.mint-spinner-fading-circle{
      display:inline-block
    }
    .list{
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    padding-top: 5px;
      img{
      width:80px;
      height:60px;
      }
    .right-item{
      position: relative;
      flex:1;
     padding-left: 5px; 
     p{
      position: absolute;
      right:5px;
      bottom: 2px;
     }
      >h2{
      font-size: 16px;
      margin: 0px;
      color:#555;
     
    }
    }
   
    }
  
  }


</style>