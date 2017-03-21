<template>
  <section>
    <mt-spinner :size="100" type="triple-bounce" v-show="loads" class="load" color="#26A2FF"></mt-spinner>
    <div class="mask" v-show="mask" style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);z-index:100"></div>

    <div class="movie_title">
      <img :src="detail.images.medium">
      <div class="item-right">
        <h3>{{detail.title}}</h3>
        <p>
          <span v-for="i in parseInt(detail.rating.stars/10)" class="star-item on"></span>
          <span v-for="i in parseInt(detail.rating.stars)!=detail.rating.stars?1:0"></span>
          <template v-if="detail.rating.stars=='00'">
            <span class="star-item off" v-for="n in 5"></span>
          </template>
        </p>
        <p>{{detail.rating.average}}({{detail.ratings_count}}人评分)</p>
        <p>{{detail.genres.join(',')}}</p>
        <p>国家:{{detail.countries[0]}}</p>
        <p>{{detail.mainland_pubdate}}(中国上映)</p>
      </div>
    </div>
    <div class="movie_button">
      <button>{{detail.wish_count}}人想看</button>
      <button>{{detail.collect_count}}看过</button>
    </div>
    <div class="movie_summary">
      <h3>电影简介</h3>
      {{detail.summary}}
    </div>
    <div class="movie_star">
      <h3>演职人员</h3>
      <div class="stars_scroll">
        <div v-for="star in detail.casts">
          <img v-bind:src="star.avatars.small">
          <p>{{star.name}}</p>
        </div>
      </div>
    </div>
    <div class="comments">
      <h3>热门短评</h3>
      <div class="comment-list">
        <ul >
          <li v-for="com in detail.popular_comments">
            <img v-bind:src="com.author.avatar">
            <div class="item-right">
              <p> <strong>{{com.author.name}}</strong>
                <span v-for="i in parseInt(com.rating.value)" class="star-item on"></span>
                <span v-for="i in parseInt(com.rating.value)!=com.rating.value?1:0"></span>
                <template v-if="com.rating.value=='00'">
                  <span class="star-item off" v-for="n in 5"></span>
                </template>
              </p>
              <p class="date">{{com.created_at}}</p>
              <p class="content">{{com.content}}</p>
            </div>
          </li>
        </ul>
        <div class="btn">
          <router-link :to="{name:'allcoments',params:{id:detail.id}}" >查看全部短评</router-link>
          <router-link :to="{name:'review',params:{id:detail.id}}" >查看全部影评</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'section',
  data () {
    return {
      movieid:"",
      detail:{},
      mask:true,
      loads:true,
      comments:{}
    }
  },
  created(){
    this.movieid=this.$route.params.id;
    this.loadmovie();
  },
  methods:{
    loadmovie(){
    //var _that=this;
    //console.log(_that.movieid)
    var _this=this;
    _this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+_this.movieid,{
    params:{
      apikey:'0b2bdeda43b5688921839c8ecb20399b',
      city:"%E5%8C%97%E4%BA%AC"
    },
    jsonp:"callback"
    }).then(function(res){
    _this.detail=res.data;
    console.log(res.data)
      _this.loads=false;
      _this.mask=false;
    })
    }
  }
}
</script>
<style scoped lang="less">
  section{
    background-color:#e5e9f2;
    margin: 50px 0 40px 0;
    h3{
      color:#555;
      font-size:20px;
    }
    .movie_title{
      display: flex;
      background-color:#b4b1b1;
      padding:15px;
      img{
        border: 1px solid #fff;
      }
      p{
        color:#6b6868;
        font-size:14px;
      }
      .item-right{
        padding-left:10px;
      }
    }
    .movie_button{
      text-align: center;
      padding:20px 0;
      button{
        padding: 10px 20px;
        border: none;
        color:#fff;
        border-radius: 4px;
        background-color:#e54847;
      }
    }
    .movie_summary{
      padding: 10px;
      font-size: 14px;
      color: #555;
    }
    .stars_scroll{
      display:flex;
      padding:10px;
      img{
        
      }
      >div{
        margin-left: 5px;
      }
    }

  .comment-list{

    img{
      width:48px;
      height:48px;
      border-radius:50%;
    }
    li{
      display:flex;
      margin-bottom: 10px;
      .item-right{
        padding:2px 0px 0 10px;
        flex:1;
        .date{
      margin-top: 3px;
      font-size: 12px;
      color: #aaa;
      }
      .content{
      line-height: 22px;
      color: #494949;
      font-size:14px;
      }
      }
    }
  }
  .comments{padding:10px;}
   .comment-list a{
    width: 94%;
    display: block;
    background:#0b85ab;
    color: #fff;
    border-radius:4px;
    margin: auto;
    border:none;
    text-align: center;
   }
   .btn {
    display:flex;
    padding-bottom:30px;
    a{
      margin:0 20px;
      font-size:18px;
      flex:1;
    }
   }
 }
   .load{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -19px;
    z-index: 200;
  }
</style>