<template>
  <section>
  <mt-spinner :size="100" type="triple-bounce" v-show="toploading" class="load" color="#26A2FF"></mt-spinner>
    <div class="mask" v-show="toploading" style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);z-index:100"></div>
    <ul v-infinite-scroll="topmore"
  infinite-scroll-disabled="loading"
  infinite-scroll-immediate-check="false"
  infinite-scroll-distance="10">
      <li v-for="(item,index) in top250datas" key="{{index}}">
      <router-link :to="{name:'movies',params:{id:item.id}}">
         <img v-bind:src="item.images.medium">
          <div class="right-item">
          <h2>{{index+1}} {{item.title}}</h2>
          <p>{{item.genres.join(',')}}</p>
          <p>导演:{{item.directors[0].name}}</p>
          <p class="star">主演:<span v-for="star in item.casts">{{star.name}}</span></p>
          <p>年份:{{item.year}}</p>
          <p>评分:{{item.rating.average}}
           <span v-for="i in parseInt(item.rating.stars/10)" class="star-item on"></span>
            <template v-if="item.rating.stars=='00'"><span class="star-item off" v-for="n in 5"></span></template>
          </p>
          </div>
      </router-link>
      </li>
    </ul>
    <loading v-show="top250loadmore"></loading>
  </section>
</template>
<script>
import loading from "./loading"
const starts=20;
export default {
  name: 'section',
  data () {
    return {
      start:20,
    }
  },
  created(){
     if(this.$store.state.movie.top250data==""){
      this.$store.dispatch('getop250');
     }
    
  },
  components:{
    loading
  },
  methods:{
    topmore(){
      console.log(this.$store.state.movie.top250loadmorestatus)
       if(this.$store.state.movie.top250loadmorestatus){
           this.$store.dispatch('getmoretop250',starts);
            starts+=20;
       }
    }
  },
  computed:{
    top250datas(){
      return this.$store.state.movie.top250data;
    },
    toploading(){
      return this.$store.state.movie.toploading;
    },
    top250loadmore(){
      return this.$store.state.movie.top250loadmore;
    }
  }
}
</script>
<style scoped lang="less">

a:focus{text-decoration:none;}
 	section{
 	  margin: 70px 15px 55px 15px;
 		background-color:#f2f2f2;
    img{width:100px;}
     li:last-child a{
    	margin-bottom:0
    }
 	  li>a{
      display: flex;
      background-color:#fff;
      margin-bottom:20px;
      padding:10px;
      -webkit-box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);
    -moz-box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);
    box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);

    h2{
      font-size: 18px;
      color:#555;
    }
    .right-item{
      padding-left: 10px;
      flex:1;
    }
    }
    li:last-child{
      margin: 0px;
    }
    p{
      font-size:14px;
      color:#666;
    }
    
  }
  .load{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -19px;
  }

</style>