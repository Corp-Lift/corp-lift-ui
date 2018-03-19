<template>
  <div id="part2">
    <p class="choice">Tell us your choice</p>
    <div class="category">
      <div :class={bgColor:riderView}>
        <label for="rider">Rider</label>
        <input type="radio" @click="selectedChoice('rider')" v-model="choice" name="choice" id="rider" value="rider" checked>
      </div>
      <div :class={bgColor:pillionView}>
        <label for="pillion">Pillion</label>
        <input type="radio" @click="selectedChoice('pillion')" v-model="choice" name="choice" id="pillion" value="pillion">
      </div>
    </div>
    <div id="rider-view" v-if="riderView">
      <div class="block">
        <p>Vehicle type</p>
        <div>
            <input type="radio" name="vehicle" value="two-wheeler" checked> Two-wheeler
            <input type="radio" name="vehicle" value="four-wheeler"> Four-wheeler
        </div>
      </div>
      <div class="block">
        <input type="text" v-model="destination" placeholder="Destination">
      </div>
      <div class="block">
          <button id="start-ride" @click="startRide()">Start Ride</button>
      </div>
      <div id="rider-map"></div>
    </div>
    <div id="pillion-view" v-if="pillionView">
      <div class="block">
          <button id="search-rider" @click="searchRiders()">Search for riders</button>
      </div>
      <div id="pillion-map"></div>
    </div>
  </div>
</template>
<script>
import MapObj from '../GoogleAPI/MapObj';
export default {
  data() {
    return {
      riderView : true,
      pillionView: false,
      destination: '',
      choice: 'rider',
      switchView: false
    }
  },
  methods: {
    selectedChoice(choice) {
      this.riderView = this.pillionView = false;
      if(this.destination) {
        this.switchView = confirm('Already on a ride. Want to change your Choice?');
        if(this.switchView == true) {
          this[choice+'View'] = true;
          this.destination = '';
        } else {
          this.riderView = true;
        }
      } else {
        this[choice+'View'] = true;
      }
    },
    startRide() {
      if(!this.destination) {
        alert('Please enter Destination');
      } else {
        MapObj.openMap('rider', this.destination);
      }
    },
    searchRiders() {
      MapObj.openMap('pillion', this.destination);
    }
  }
}
</script>
<style lang="scss">
  #part2 {
    text-align: left;
    .choice {
      margin-left: 35px;
    }
    .block {
      margin: 35px;
    }
  }
  button {
    height: 36px;
    background-color: #737373;
    border: 1px solid #737373;
    font-size: 15px;
    font-family: sans-serif;
    margin-right: 5px;
  }
  .category {
    width: 170px;
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    background-color: #9e9e9e;
    margin: 15px 60px;
    div {
      display: inline;
      border-radius: 10px;
      label {
        padding: 0 20px;
      }
      input, input:checked {
        -webkit-appearance: none;
        -moz-appearance: none;
        display: none;
      }
    }
  }
  #rider-view {
    .block {
      div {
        margin: 15px 25px;
      }
    }
  }
  #rider-map, #pillion-map {
    width: 100%;
    height: 280px;
  }
  .bgColor {
    background-color: white;
  }
</style>