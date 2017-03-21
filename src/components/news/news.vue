<template>
  <div class="news">
    <h2>{{news.title}}</h2>
    <p>{{news.edit_time}}</p>
    <p>
      <img v-bind:src="news.top_image"></p>
    <div class="news_content" >
      <div v-html="news.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'section',
  data () {
    return {
      news:"",
      newsid:"",
      loading:true
    }
  },
  created(){
    this.newsid=this.$route.params.id;
    this.load();
    
  },
  methods:{
    load(){
      console.log('dd')
           const _that=this;
      this.$http.jsonp("http://api.dagoogle.cn/news/single-news",{
        params:{
          news_id:_that.newsid,
          tableNum:1
        },
        jsonp:"callback"
      }).then(function(res){
          this.news=res.data.data;
          this.loading=false;
          console.log(res.data)
          
      }).catch(function (response) {
          console.log(response)
        })
        
    }
  }
}
</script>
<style scoped lang="less">
  .news{
    margin-top:50px;
    margin-bottom:50px;
    padding:15px;
    font-size: 16px;
    h2{

  }
  .news_content{
  img{width: 100%;}
  }
  img{
    width:100%
  }
  }
</style>