<template>
<div>
  <div class="overlay"></div>
  <div class="box">
    <h4>Got a new Ride Request!</h4>
    <p>Pillion Name : {{modelData.username}}</p>
    <button @click="riderDecision"> ACCEPT </button>
    <button @click="riderDecision"> REJECT </button>
  </div>
</div>
</template>
<script>
import ClientSocket from '../common/ClientSocket'
export default {
    props:['modelData'],
    methods :{
        riderDecision(event) {
            ClientSocket.acceptedRequest(event.target.innerText);
        }
    },
    created() {
        console.log(this.modelData);
    }
}
</script>
<style lang="scss">
.overlay {
    height: 100%;
    width: 100%;
    position: absolute;
	top: 0;
    z-index: 1;
    background-color: rgba(0,0,0,0.6);
}
.box {
    width: 65%;
    background-color: white;
    height: 180px;
    z-index: 2;
    position: absolute;
    left: 10%;
    padding: 20px;
}
</style>
