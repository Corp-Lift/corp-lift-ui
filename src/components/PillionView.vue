<template>
    <div id="pillion-view">
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
</template>
<script>
import GlobalStorage from '../common/GlobalStorage';
import MapObj from '../GoogleAPI/MapObj';
import Service from '../GoogleAPI/Service';

export default {
  data() {
		return {
			PillionPreferenceGender:'male'
		}
  },
  methods: {
    searchRiders() {
      GlobalStorage.setCollection('AVAILABLE_RIDERS', Service.getAvailableRiders())
      MapObj.openMap('pillion', this.destination);
    },
    rideAccepted(data) {
      if(data.detail === 'ACCEPT') {
        alert('Congrats! You got a rider.');
      } else {
        alert('Sorry! Please select another rider.');
      }
      window.removeEventListener('rideAccepted', this.rideAccepted);
    }
  },
  created() {
    window.addEventListener('rideAccepted', this.rideAccepted);
  }
}
</script>
<style lang="scss">

</style>
