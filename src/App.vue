<template>
  <div id="app">
    <Headers v-bind:title="title"></Headers>
    <router-view></router-view>
    <footers v-on:setzhi="jieshou"></footers>
  </div>
  
</template>

<script>
import Headers from "./components/Header"
import footers from "./components/Footer"
export default {
  name: 'app',
  data(){
      return{
        title:"首页"
      }
  },
  components:{
    Headers,
    footers
  },
  created(){
     this.$router.push('/douban');
  },
  methods:{
    jieshou(titles){
      this.title=titles;
    
    }
  }
}
</script>

<style>
body{margin: 0}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
}

</style>
