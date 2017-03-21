<template>
  <section>
    <mt-spinner :size="100" type="triple-bounce" v-show="loading" class="load" color="#26A2FF"></mt-spinner>
    <div class="mask" v-show="loading" style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);z-index:100"></div>
    <div class="movie_list">
      <ul  v-infinite-scroll="load"
  infinite-scroll-disabled="loading"
  infinite-scroll-immediate-check="false"
  infinite-scroll-distance="10" >
        <li key="{{index}}" v-for="item in hotmovie">
          <router-link :to="{name:'movies',params:{id:item.id}}" class="movie-item" >
            <img v-bind:src="item.images.small">
            <div class="item_right">
              <h4>{{item.title}}</h4>
              <p>
                {{item.rating.average}}分
                <span v-for="i in parseInt(item.rating.stars/10)" class="star-item on"></span>
                <span v-for="i in parseInt(item.rating.stars)!=item.rating.stars?1:0"></span>
                <template v-if="item.rating.stars=='00'">
                  <span class="star-item off" v-for="n in 5"></span>
                </template>
              </p>
              <p>导演: {{item.directors[0].name}}</p>
              <p>
                主演:
                <span v-for="zhuyan in item.casts">{{zhuyan.name}}</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
     
      <loading v-show="loadmorebtn"></loading>
    </div>

  </section>

</template>

<script>
import loading from "./loading"
const startnum=20;
export default {
  name: 'section',
  data () {
    return {
      start:20,
    }

  },
  components:{
    loading
  },
  created:function(){

    if(this.$store.state.movie.hotmovie==""){
      this.$store.dispatch('gethotmovie')
    }
  },
  methods:{

   load(){
 console.log(this.$store.state.movie.loadmorebtn);
   if(this.$store.state.movie.loadstatus){
        this.$store.dispatch('loadhotmovie',startnum);
        startnum+=20
   }
    
  }
},
  computed:{
    hotmovie(){return this.$store.state.movie.hotmovie},
    loading(){return this.$store.state.movie.loading},
    loadmorebtn(){return this.$store.state.movie.loadmorebtn},
 
  }
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  section{
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 46px;
    padding-top:20px;
    li{
      margin-bottom:15px;
      padding-bottom: 5px;
      box-shadow: inset 0px -1px 1px -1px #c8c7cc;
    }
  .load{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    margin-left: -50px;
    margin-top: -19px;
  }
  .movie_list{
    padding:15px;
    padding-top:0px;
  }
  a:focus{text-decoration:none;}
  a:link{text-decoration:none}
  a{
    display:block;
    
  }
    .movie-item{
      
      display:flex;
      .item_right{
        padding: 5px;
        padding-left:15px;
        flex:1;
        font-size: 18px;
        color: #555;
      }
      img{
        width:65px;
        height:100px;
      }

      p{
        font-size: 14px;
        color:#666;
      }
    }
  }
</style>