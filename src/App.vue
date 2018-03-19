<template>
  <div id="app">
    <SignUp v-if="showSignUp"/>
    <SignIn  v-if="showSignIn"/>
    <PageTwo v-if="showPageTwo"/>
  </div>
</template>

<script>
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PageTwo from './components/PageTwo'
import MapObj from './GoogleAPI/MapObj'

export default {
  name: 'App',
  components: {
    SignUp,
    SignIn,
    PageTwo
  },
  data() {
    return {
      showSignUp : false,
      showSignIn: true,
      showPageTwo: false
    }
  },
  methods: {
  },
  created() {
    MapObj.init();
  }
}
</script>

<style>
.logo-block img {
  width: 160px;
  height: 140px;
}
html {
  font-family:sans-serif;
  color:black;
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
