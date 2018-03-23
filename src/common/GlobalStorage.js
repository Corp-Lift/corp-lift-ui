import Service from '../GoogleAPI/Service.js'
export default {
    GlobalObject : {},
    get(itemName) {
        return this.GlobalObject[itemName];
    },
    set(itemName, value) {
        this.GlobalObject[itemName] = value;
    },
    getCollection(itemName) {
        let data = this.GlobalObject[itemName];
        return JSON.parse(data);
    },
    setCollection(itemName, value) {
        this.GlobalObject[itemName] = JSON.stringify(value);
    },
    init() {
        this.mapObj = {
            directionsService : new google.maps.DirectionsService,
            directionsDisplay : new google.maps.DirectionsRenderer,
            distanceMatrixService : new google.maps.DistanceMatrixService,
            geocoder : new google.maps.Geocoder,
            bounds : new google.maps.LatLngBounds,
            infoWindow : new google.maps.InfoWindow,
            position: {
                lat : 12.962859, 
                lng : 77.659508
            }
        }
        if (navigator.geolocation) {
            Service.getCurrentPosition()
            .then(position => {
                console.log('SUCCESS')
                this.mapObj.position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            })
            .catch(error => {
                console.log(error, 'API error')
            })
        } else {
            console.log('Sorry. geolocation not supported');
        }
        this.userLocationData = {
            latlng : this.mapObj.position
        }
    }
}