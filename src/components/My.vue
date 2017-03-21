<template>
<div>
  <section>
  <div class="search_com">
  		<input v-on:keyup.enter="search" ref="inp" v-model="keyword" placeholder="搜索电影">
  	</div>
  <div class="mask" v-show="loading" style="width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);z-index:100"></div>
  	<mt-spinner :size="100" type="triple-bounce" v-show="loading" class="load" color="#26A2FF"></mt-spinner>
  </section>
	<div class="result">
		<div class="soon" v-show="soonstatus">
			<h2>即将上映</h2>
				<router-link :to="{name:'movies',params:{id:item.id}}" v-for="item in soondata" key="{{index}}">
					{{item.title}}	
				</router-link>
		</div>
		<h1 v-show="tit">{{result.title}}: {{result.total}}条数据</h1>
		<ul v-infinite-scroll="loadsear"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
		<li v-for="(item,index) in result.subjects" key="{{index}}">
			<router-link :to="{name:'movies',params:{id:item.id}}">
			<img v-bind:src="item.images.medium">
			<div class="right-item">
			<h2>{{index+1}} {{item.title}}</h2>
			<p>{{item.genres.join(',')}}</p>
			<p>导演:<span v-for="items in item.directors">{{items.name}} </span></p>
			<p class="star">主演:<span v-for="star in item.casts">{{star.name}} </span></p>
			<p>年份:{{item.year}}</p>
			<p>评分:{{item.rating.average}}
			<span v-for="i in parseInt(item.rating.stars/10)" class="star-item on"></span>
            <template v-if="item.rating.stars=='00'"><span class="star-item off" v-for="n in 5"></span></template>
			</p>
			</div>
			</router-link>
		</li>
		</ul>
		<loading v-show="loadmores"></loading>
	</div>

</div>

</template>

<script>
import loading from "./loading"
export default {
  name: 'section',
  data () {
    return {
      show:true,
      tit:false,
      keyword:"",
      start:0,
      soonstatus:false,
      result:"",
      soondata:'',
      loading:true,
      mores:"加载中",
      loadmores:false,
      status:true
    
    }
  },
  components:{
    loading
  },
  created(){
  	this.soon();
    this.$store.state.count
  },
  methods:{
  	 search(){
      const _this=this;
      _this.start=0;
      _thismores:"加载中",
      _this.$refs.inp.blur();
      _this.loading=true;
      _this.$http.jsonp("https://api.douban.com/v2/movie/search",{
     params:{
      start:0,
      q:_this.keyword,
      apikey:'0b2bdeda43b5688921839c8ecb20399b',
		city:"%E5%8C%97%E4%BA%AC",
      //tag:"周星驰",
      count:20
    },
    jsonp:"callback"
    }).then(function(res){
		_this.loading=false;
		_this.tit=true;
		_this.soonstatus=false;
		_this.result=res.data;
    if(res.data.subjects.length<19){
        _this.loadmores=false;
    }else{
      _this.loadmores=true
    }
    }).catch(function (response) {
          console.log(response)
        })
    },
    loadsear(){
      if(this.status){
          this.loadata()
      }else{
        return;
      }
  
    },
    loadata(){
    const _this=this;
    _this.start+=20;
    
    _this.$http.jsonp("https://api.douban.com/v2/movie/search",{
    params:{
    start:_this.start,
    q:_this.keyword,
    apikey:'0b2bdeda43b5688921839c8ecb20399b',
    city:"%E5%8C%97%E4%BA%AC",
      //tag:"周星驰",
      count:20
    },
    jsonp:"callback"
    }).then(function(res){
     if(res.data.subjects.length==0){
       _this.loadmores=false;
       _this.status=false;
     }
      for(var i=0;i<res.data.subjects.length;i++){
              _this.result.subjects.push(res.data.subjects[i])
          }
    }).catch(function (response) {
          console.log(response)
        })
    },
    soon(){
   		var _this=this;
   	_this.$http.jsonp("https://api.douban.com/v2/movie/coming_soon",{
     params:{
    		start:0,
    		count:10,
		apikey:'0b2bdeda43b5688921839c8ecb20399b',
		city:"%E5%8C%97%E4%BA%AC",
      //tag:"周星驰",
      count:20
    },
    jsonp:"callback"
    }).then(function(res){
     _this.soondata=res.data.subjects;
     _this.soonstatus=true;
     _this.mask=false;
     _this.loading=false;
    }).catch(function (response) {
          console.log(response)
        })
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body{
  background-color:#fff;
}
 	section{
		margin: 50px 0 10px 0;
		position: relative;
		background-color: #e5e9f2;
 	}
 	h2{font-size:18px;color:#555}
 	.search_com{
 	 padding:10px 0;
 	 input{
 		display: block;
 		width:90%;
 		border: none;
 		text-indent: 10px;
 		margin: 0 auto;
 		padding: 5px 0;
 		border-radius: 4px;
 	}

}
.load{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 200;
		margin-left: -50px;
		margin-top: -19px;
 	}
 	.result{padding:10px 15px;margin-bottom:30px;}
 	h1{padding:10px 0;font-size:18px;color:#555}
 li>a{
      display: flex;
      background-color:#fff;
      margin-bottom:20px;
      padding:10px;
      -webkit-box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);
    -moz-box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);
    box-shadow: 0 0px 2px 0 rgba(0,0,0,0.2);
    img{
    	width:100px;
    	hright:150px;
    }
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
.weui-loadmore{
    padding: 5px 0;
    margin:0 -10px;
    background: #26a2ff;
    color: #fff;
    text-align: center;
 	}
 .soon a{
 	display:inline-block;
 	background-color:#e5e9f2;
    border-style: none;
    padding: 5px;
    margin-right: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #e54847;
 }
</style>