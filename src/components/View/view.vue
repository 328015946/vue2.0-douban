<template>
  <section class="Comments-list">
    <mt-spinner :size="100" type="triple-bounce" v-show="loading" class="load" color="#26A2FF"></mt-spinner>
    <div>
      <div class="review">
        <h2>{{view.title}}</h2>
        <p>{{view.author.name}}</p>
        <div class="content" v-html="view.content"></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'section',
  data () {
    return {
      viewid:"",
      view:"",
      loading:true,
      start:0,
      loadmores:false
    }
  },
  created(){
    this.viewid=this.$route.params.id;
      this.loadcomment();
  },
  methods:{
    loadcomment(){
      this.$http.jsonp("https://api.douban.com/v2/movie/review/"+this.viewid,{
    params:{
      apikey:'0b2bdeda43b5688921839c8ecb20399b',
      city:"%E5%8C%97%E4%BA%AC",
    },
    jsonp:"callback"
    }).then(function(res){
      this.loading=false;
      console.log(res.data)
      this.loadmores=true;
      this.view=res.data;
    })
    },
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
    .review{
    padding:35px 15px;
    }
    .content{
    font-size:15px;
    color:#494949;
    }
</style>