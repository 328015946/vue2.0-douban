import Vue from 'vue'
import $http from 'vue-resource'
Vue.use($http)
let vm = new Vue()
export default {
	//获取新闻列表api
	getnewslist:function(cb) {
		vm.$http.jsonp("http://api.dagoogle.cn/news/get-news", {
			params: {
				page: 1,
				tableNum: 1
			},
			jsonp: "callback"
		}).then(function(res) {
			//console.log(res.data.data)
			cb(res.data.data)
		}).catch(function(res){
		})
	},
	/*	
	*滚动加载统一函数
	*@param pagenum加载页数 全局变量
	*/
	loadmore(cb,pagenum){
      vm.$http.jsonp("http://api.dagoogle.cn/news/get-news",{
        params:{
          page:pagenum,
          tableNum:1
        },
        jsonp:"callback"
      }).then(function(res){
         	cb(res)
          
      })
    },
    //公共电影数据api
	comdata(url,param,cb){
    vm.$http.jsonp(url,{
      	params:param,
      	jsonp:"callback"
    }).then(function(res){

      if(res.status==200){
      	//console.log(res.data.subjects)
    		cb(res)
      }
    })
  },
  /*
  *滚动加载电影 公共api
  *@param startnum 滚动加载数据 如从20开始
  */
  loadmoremovie(url,startnum,cb){
     vm.$http.jsonp(url,{
      params:{
      start:startnum,
      apikey:'0b2bdeda43b5688921839c8ecb20399b',
      city:"%E5%8C%97%E4%BA%AC",
      count:20
      },
      jsonp:"callback"
    }).then(function(res){
    	setTimeout(function () {
      	cb(res)
      },300)
    })
  }


}