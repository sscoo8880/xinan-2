<template>
  <router-view></router-view>
</template>
<script>
import {provide} from "vue"
import * as echarts from "echarts"
import axios from "axios";

export default {
  name: 'App',
  setup(){
    // provide("名字随便起",传递的内容)
    provide("echarts",echarts)
    provide("axios",axios)
  }
}
</script>

<style lang="less" >
@import "style/reset";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0f3062;
  //总体字体颜色
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #1ebbff;
    }
  }
}
</style>
