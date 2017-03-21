<template>
  <section class="Comments-list">
	<mt-spinner :size="100" type="triple-bounce" v-show="loading" class="load" color="#26A2FF"></mt-spinner>
  <div>
  	<h3 v-show="loadmores">全部短评({{comments.total}})</h3>
	<div class="comment-list">
			<ul  v-infinite-scroll="loadcom"
  infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false"
  infinite-scroll-distance="10" >
				<li v-for="com in comments.comments">
					<img v-bind:src="com.author.avatar">
	
					<div class="item-right">
						<p><strong>{{com.author.name}}</strong>
						<span v-for="i in parseInt(com.rating.value)" class="star-item on"></span><span v-for="i in parseInt(com.rating.value)!=com.rating.value?1:0"></span>
            <template v-if="com.rating.value=='00'"><span class="star-item off" v-for="n in 5"></span></template>
						</p>
						<p class="date">{{com.created_at}}</p>
						<p class="content">{{com.content}}</p>
					</div>
				</li>
			</ul>
		<loading v-show="load"></loading>
		</div>
  </div>
  </section>
</template>
<script>
import loading from "../loading"
export default {
  name: 'section',
  data () {
    return {
     movieid:"",
     comments:"",
     loading:true,
     start:20,
     load:false,
     loadmores:false,
     status:true
    }
  },
  components:{
    loading
  },
  created(){
  	this.movieid=this.$route.params.id;
  		this.loadcomment();
  },
  methods:{
  	loadcomment(){
      var _this=this;
  		_this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+_this.movieid+"/comments",{
		params:{
			apikey:'0b2bdeda43b5688921839c8ecb20399b',
			city:"%E5%8C%97%E4%BA%AC",
			count:20,
			start:0
		},
		jsonp:"callback"
		}).then(function(res){
			_this.loading=false;
      _this.loadmores=true;
			_this.comments=res.data;
      if(res.data.comments.length<19){
          _this.load=false;
      }else{
        _this.load=true;
      }
			
		})
  	},
  	loadcom(){
    if(this.status){
      this.loadata();
    }else{
      return
    }
    },
    loadata(){
        var _this=this;
     _this.load=true;
      _this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+_this.movieid+"/comments",{
        params:{
          apikey:'0b2bdeda43b5688921839c8ecb20399b',
      city:"%E5%8C%97%E4%BA%AC",
      count:20,
      start:_this.start
        },
        jsonp:"callback"
      }).then(function(res){
         _this.start+=20;
          //console.log(_this.comments)
          //console.log(_this.start)
          if(res.data.comments.length<1){
            _this.load=false;
            _this.status=false;
          }
          for(var i=0;i<res.data.comments.length;i++){

              _this.comments.comments.push(res.data.comments[i])
          }
          
      })

    }
  }
}
</script>
<style scoped lang="less">
 	section{
 		margin: 50px 0 46px 0;
 		h3{
 			font-size:20px;
 			padding:10px;
 		}
 	}
 	.load{
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -19px;
 	}
 	.comment-list{padding: 0 10px;padding-top: 20px;}
 	.comment-list li{
 		display: flex;
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 10px;
 		img{
 			width:48px;
 			height:48px;
 			border-radius:50%;
 		}
 	}
 	.comment-list li:last-child{
 		margin:0;
 	}
 	.item-right{
 		flex:1;
 		padding-left:15px;
 		.date{
			margin-top: 3px;
			font-size: 12px;
			color: #aaa;
 		}
 .content{
    font-size:14px;
    color: #494949;
 		}
 
 	}
 .weui-loadmore{
    padding: 5px 0;
    margin:0 -10px;
    background: #26a2ff;
    color: #fff;
    text-align: center;
 	}
</style>