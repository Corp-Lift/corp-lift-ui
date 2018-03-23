<template>
  <div id="part2">
    <div class="topbar">
      <div class="notification">
        <img src="../assets/notifications_white.png">
      </div>
      <div class="count">1</div>
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
    <riderView  v-if="riderView"/>
    <pillionView v-if="pillionView"/>
  </div>
</template>
<script>
import MapObj from '../GoogleAPI/MapObj';
import WebStorage from '../common/WebStorage.js';
import { publishEvent, subscribeEvent } from '../common/Observer.js';
import Service from '../GoogleAPI/Service';
import GlobalStorage from '../common/GlobalStorage'
import RiderView from './RiderView.vue';
import PillionView from './PillionView.vue';

export default {
  components: {
    RiderView,
    PillionView
  },
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
      if(GlobalStorage.get('RIDE_STATUS')) {
        this.switchView = confirm('Already on a ride. Want to change your Choice?');
        if(this.switchView == true) {
          this[choice+'View'] = true;
          this.destination = '';
          GlobalStorage.set('RIDE_STATUS', false);
        } else {
          this.riderView = true;
        }
      } else {
        this[choice+'View'] = true;
      }
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
      height: 35px;
      display: flex;
      justify-content: flex-end;
      background-color: #3A3A3A;
      .notification {
        padding: 2px 12px;
        img {
          width:23px;
          height: 23px;
        }
      }
      .count {
        height: 12px;
        background-color: red;
        border-radius: 30px;
        font-size: 11px;
        padding: 2px 5px;
        color: white;
        position: absolute;
        right: 70px;
        top: 12px;
      }
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
  }
</style>