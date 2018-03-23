<template>
  <div id="part2">
    <div class="topbar">
      <div class="profile">
        {{userData.username}}
      </div>
    </div>
    <p class="choice title">Tell us your choice</p>
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
        <p class="title">Vehicle type</p>
        <div>
            <input type="radio" name="vehicle" value="two-wheeler" checked> Two-wheeler
            <input type="radio" name="vehicle" value="four-wheeler"> Four-wheeler
        </div>
      </div>
      <div class="block">
        <p class="title">Destination Address</p>
        <div>
          <input type="text" v-model="destination" placeholder="Destination">
        </div>
      </div>
      <div class="block">
        <p class="title">Preferences</p>
        <div>
          <input type="radio" name="rider-preference-gender" v-model="RiderPreferenceGender" value="male" checked> Male
          <input type="radio" name="rider-preference-gender" v-model="RiderPreferenceGender" value="female"> Female
        </div>
      </div>
      <div class="block">
          <button id="start-ride" @click="startRide()">Start Ride</button>
      </div>
      <div id="rider-map"></div>
    </div>
    <div id="pillion-view" v-if="pillionView">
      <div class="block">
        <p class="title">Preferences</p>
        <div>
          <input type="radio" name="pillion-preference-gender" v-model="PillionPreferenceGender" value="male" checked> Male
          <input type="radio" name="pillion-preference-gender" v-model="PillionPreferenceGender" value="female"> Female
        </div>
      </div>
      <div class="block">
          <button id="search-rider" @click="searchRiders()">Search for riders</button>
      </div>
      <div id="pillion-map"></div>
    </div>
  </div>
</template>
<script>
import MapObj from '../GoogleAPI/MapObj';
import WebStorage from '../common/WebStorage.js';
import { publishEvent, subscribeEvent } from '../common/Observer.js';
import Service from '../GoogleAPI/Service';
import GlobalStorage from '../common/GlobalStorage'
export default {
  data() {
    return {
      riderView : true,
      pillionView: false,
      destination: '',
      choice: 'rider',
      switchView: false,
      RiderPreferenceGender : 'male',
      PillionPreferenceGender : 'male',
      userData : {}
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
      GlobalStorage.setCollection('AVAILABLE_RIDERS', Service.getAvailableRiders())
      MapObj.openMap('pillion', this.destination);
    }
  },
  mounted() {
    this.userData = WebStorage.getCollection('USER_SIGNIN')
  }
}
</script>
<style lang="scss">
  #part2 {
    text-align: left;
    .topbar {
      width: 100%;
      height: 30px;
      background-color: #3A3A3A;
      .profile {
        padding: 5px 10px;
        background-color: white;
        float: right;
      }
    }
    .choice {
      margin-left: 35px;
    }
    .title {
      font-weight: 500;
    }
    .block {
      margin: 0 35px;
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
  #rider-view, #pillion-view {
    .block {
      div {
        margin: 15px 25px;
      }
    }
  }
  #rider-map, #pillion-map {
    width: 100%;
    height: 300px;
    margin-top: 15px;
  }
  .bgColor {
    background-color: white;
  }
</style>