import * as types from './types'
import api from './api/api'
const state = {
    newslist:[],
    loading:true,//状态
    loadmorebtn:false //滚动加载
};
const getters = {
    newslist:state => state.newslist, 
};
const actions = {
    getnews({commit}){
        api.getnewslist(function(res){
            commit(types.NEWS_LIST,res)
            commit("loading",false)
        })
    },
    loadmores({commit},pagenum){
        commit("loadmorebtn",true)
        api.loadmore(function(res){
             commit("loadmore",res)
             //commit("loadmorebtn",false)
        },pagenum)
    }
}
const mutations = {
    [types.NEWS_LIST](state,news){
    state.newslist=news;
 },
    loading(state,data){
    state.loading=data;
 },
    loadmore(state,res){
     
       for(var i=0;i<res.data.data.length;i++){
            state.newslist.push(res.data.data[i])
    }
 },
    loadmorebtn(state,status){
        state.loadmorebtn=status
    }
};

export default{
    state,
    getters,
    actions,
    mutations
}