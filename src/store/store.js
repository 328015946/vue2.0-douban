import Vue from 'vue'
import Vuex from 'vuex'
import news from './modules/news';
import movie from './modules/movie';
Vue.use(Vuex);
export default new Vuex.Store({
   modules: {
        news,
        movie
    },
})

