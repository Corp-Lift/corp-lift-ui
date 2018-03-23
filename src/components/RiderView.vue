<template>
    <div id="rider-view">
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
</template>
<script>
import MapObj from '../GoogleAPI/MapObj';
import { publishEvent } from '../common/Observer';
import GlobalStorage from '../common/GlobalStorage'

export default {
    data() {
        return {
            destination: '',
            RiderPreferenceGender:'male'
        }
    },
    methods: {
        startRide() {
            if(!this.destination) {
                alert('Please enter Destination');
            } else {
                GlobalStorage.set('RIDE_STATUS', true);
                MapObj.openMap('rider', this.destination);
            }
        }
    }
}
</script>
<style lang="scss">

</style>
