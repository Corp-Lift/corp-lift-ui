<template>
<div>
  <h2>
    Sign Up
  </h2>
  <div class="form">
  <div>
    <label>Name</label>
    <input type="text" v-model="name"/>
  </div>
  <div>
    <label>Age</label>
    <input type="number" v-model="age"/>
  </div>  
  <div>
   <label>Gender</label>
   <br>
    <input type="radio" name="gender" value="male" checked> Male<br>
    <input type="radio" name="gender" value="female"> Female<br>
    <input type="radio" name="gender" value="other"> Other  
  </div>
  <div>
    <label>Corporate Name</label>
    <input type="text" v-model="corpName"/>
  </div>
  <div>
      <label>Corporate User ID</label>
      <input type="text" v-model="corpId">
  </div>
  <div>
      <button id="user-data-submit">SUBMIT</button>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      id: '',
      age: '',
      corpName: '',
      corpId: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>