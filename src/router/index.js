import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content/Content'
import Movie from '@/components/Movie'
import moviedetail from '@/components/movie/moviedetail'
import Hot from '@/components/Hot'
import My from '@/components/My'
import News from '@/components/news/news'
import Comments from '@/components/Comments/Comments'
import Review from '@/components/Review/Review'
import view from '@/components/View/view'
Vue.use(Router)
export default new Router({
linkActiveClass:"active",
 mode: 'history',
  routes: [
    {
      path: '/douban',
      name: 'index',
      component:Content,
     
    },
     {
      path: '/movie',
      name: 'movie',
      component:Movie
    },
    {
      path: '/moviedetail/:id',
      name: 'movies',
      component:moviedetail
    },
    {
      path: '/allcoments',
      name: 'allcoments',
      component:Comments
    },
    {
      path: '/allreview/:id',
      name: 'review',
      component:Review
    },
    {
      path: '/review/:id',
      name: 'view',
      component:view
    },
     {
      path: '/hot',
      name: 'hot',
      component:Hot
    },
     {
      path: '/my',
      name: 'my',
      component:My
    },
    {
      path: '/news/:id',
      name: 'news',
      component:News
    },
    { 
      path:'*', 
      component:Content
    }

  ],
 
})
