<template>
  <div id="app">
  <div class="logo-block"> 
     <img src="./assets/logo.png">
  </div>
    <SignUp/>
  </div>
</template>

<script>
import SignUp from './components/SignUp'

export default {
  name: 'App',
  components: {
    SignUp,
    SignUp
  }
}
</script>

<style>
.logo-block img {
  width: 160px;
  height: 140px;
}
html{
  font-family:sans-serif;
  color:white;
  background-color: #b3b3ae;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
}
</style>
