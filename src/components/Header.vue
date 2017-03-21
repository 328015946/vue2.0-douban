<template>
  <header>
    <div>
        {{title}}
    </div>
  </header>
</template>

<script>
export default {
  name: 'hello',
  props:['title'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    header{
        position: fixed;
        top:0;
        left:0;
        height:50px;
        line-height:50px;
        background-color:#118FBD;
        width:100%;
        font-size: 20px;
        z-index: 100;
        text-align: center;
        color:#fff;
    }
</style>
