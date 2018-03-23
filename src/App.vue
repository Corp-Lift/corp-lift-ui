<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
import GlobalStorage from './common/GlobalStorage'
import MapObj from './GoogleAPI/MapObj'

export default {
  name: 'App',
  created() {
    GlobalStorage.init();
  }
}
</script>

<style lang='scss'>
.logo-block img {
  width: 160px;
  height: 140px;
}
html {
  font-family:sans-serif;
  color:black;
  background-color: #b3b3ae;
  height: 100%;
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
}
input[type="text"], input[type="number"], input[type="password"]{
  width: 200px;
  height: 15px;
  font-size: 17px;
  border: none;
  padding: 10px;
  color: white;
  background-color: #3A3A3A;
}
input::placeholder {
  color: #b5b3b3;
}
</style>
