import * as types from './types'
import api from './api/api'
const state = {
    hotmovie:"",//热门上映
    loading:true,//状态
    loadmorebtn:false,//滚动加载
    loadstatus:true, //滚动请求状态
    toploading:true,//top250加载状态
    toploadmore:false,
    top250data:"", //top250数据
    top250loadmore:false, //250加载状态
    top250loadmorestatus:true
};
const getters = {
    hotmovie:state => state.hotmovie,
    loadstatus:state =>state.loadstatus 
};
const actions = {
    gethotmovie({commit}){
        commit("loading",true)
        api.comdata("https://api.douban.com/v2/movie/in_theaters",{
        apikey:'0b2bdeda43b5688921839c8ecb20399b',
        count:20,
        city:"%E5%8C%97%E4%BA%AC",
        },function(res){
            commit("hotmovies",res)
            commit("loading",false)
        })
    },
    //加载更多电影
    loadhotmovie({commit},startnum){
        commit("loadmoreb",true);
        api.loadmoremovie("https://api.douban.com/v2/movie/in_theaters",startnum,function(res){    //console.log(res)
            if(res.data.subjects.length==0){
                commit("loadmoreb",false);
                commit("loadstatus",false)
            }
            commit("loadmorehot",res)
           
        })
    },
    //top250电影数据
    getop250({commit}){
        api.comdata("https://api.douban.com/v2/movie/top250",{
            apikey:'0b2bdeda43b5688921839c8ecb20399b',
            count:20,
            city:"%E5%8C%97%E4%BA%AC",
        },function(res){
            commit("topload",false);
            commit("top250datas",res);
        })
    },
    //加载更多250电影数据
    getmoretop250({commit},startnum){
         commit("load250btn",true);
         commit("switchbtn",false);
      api.loadmoremovie("https://api.douban.com/v2/movie/top250",startnum,function(res){
            commit("loadmoretop250data",res);
            commit("switchbtn",true)

      })
  }
}
const mutations = {
    hotmovies(state,res){
        state.hotmovie=res.data.subjects;
    },
    loading(state,status){
        state.loading=status;
    },
    loadmoreb(state,status){
        state.loadmorebtn=status;
    },
    loadstatus(state,status){
        state.loadstatus=status;
    },

    loadmorehot(status,res){
        for(var i=0;i<res.data.subjects.length;i++){
            status.hotmovie.push(res.data.subjects[i])
        }
    },
    topload(state,res){
        state.toploading=res;
    },
    top250datas(state,res){
        state.top250data=res.data.subjects;
    },
    loadmoretop250data(status,res){
       
        for(var i=0;i<res.data.subjects.length;i++){
            status.top250data.push(res.data.subjects[i]);
        }
    },
    load250btn(state,status){
        state.top250loadmore=status;
    },
    switchbtn(state,status){
        state.top250loadmorestatus=status;
    }

};

export default{
    state,
    getters,
    actions,
    mutations
}