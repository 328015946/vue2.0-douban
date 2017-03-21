<template>
  <section class="Comments-list">
	<mt-spinner :size="100" type="triple-bounce" v-show="loading" class="load" color="#26A2FF"></mt-spinner>
  <div>
  	<h3 v-show="loadmores">全部影评({{comments.total}})</h3>
	<div class="comment-list">
			<ul  v-infinite-scroll="loadcom"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" >
				<li v-for="com in comments.reviews">
         <router-link :to="{name:'view',params:{id:com.id}}">
					<div class="item-right">
            <h2>{{com.title}}</h2>
            <p><img v-bind:src="com.author.avatar"><strong style="margin-left:5px;"> {{com.author.name}}</strong>
            <span class="date">({{com.created_at}})</span>
            </p>
						<p class="content">{{com.summary}}</p>
					</div>
           </router-link>
				</li>
			</ul>
		<loading v-show="loadmores"></loading>
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
     start:0,
     loadmores:false
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
  		this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+this.movieid+"/reviews",{
		params:{
			apikey:'0b2bdeda43b5688921839c8ecb20399b',
			city:"%E5%8C%97%E4%BA%AC",
			count:20,
			start:0
		},
		jsonp:"callback"
		}).then(function(res){
			this.loading=false;
      console.log(res.data)
			this.loadmores=true;
			this.comments=res.data;
		})
  	},
  	loadcom(){
    var _this=this;
	_this.loadmores=true;
    console.log('请求')
      _this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+_this.movieid+"/reviews",{
        params:{
          apikey:'0b2bdeda43b5688921839c8ecb20399b',
			city:"%E5%8C%97%E4%BA%AC",
			count:20,
			start:_this.start==0?20:_this.start
        },
        jsonp:"callback"
      }).then(function(res){
      	 _this.start+=20;
      		//console.log(_this.comments)
          console.log(_this.start)
      		console.log(res.data)
          for(var i=0;i<res.data.reviews.length;i++){
              _this.comments.reviews.push(res.data.reviews[i])
          } 
      })
    }
  }
}
</script>
<style scoped lang="less">
 	section{
 		margin: 50px 0 40px 0;
 		h3{
 			font-size:20px;
 			padding:10px;
 		}
 	}
  strong{
    color:#26a2ff;
  }
  h2{color:#494949}
 	.load{
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -19px;
 	}
 	.comment-list{padding: 0 10px;}
 	.comment-list li{
 
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 10px;
 		img{
 			width:20px;
 			height:20px;
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
 .content,.date{
    line-height: 1.5;
    font-size: 14px;
    color: #aaaaaa;
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