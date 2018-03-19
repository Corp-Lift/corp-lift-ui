import Service from './Service.js'
export default {
    init() {
        this.mapObj = {
            directionsService : new google.maps.DirectionsService,
            directionsDisplay : new google.maps.DirectionsRenderer,
            distanceMatrixService : new google.maps.DistanceMatrixService,
            geocoder : new google.maps.Geocoder,
            riderCurrentLocationWindow : new google.maps.InfoWindow,
            pillionCurrentLocationWindow : new google.maps.InfoWindow,
            infoWindow : new google.maps.InfoWindow,
            position: {
                lat : 12.962859, 
                lng : 77.659508
            }
        }
        if (navigator.geolocation) {
            Service.getCurrentPosition()
            .then(position => {
                debugger;
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
    },
    openMap(mapSource, destination) {
        this.mapContainer = new google.maps.Map(document.getElementById(mapSource+'-map'), {
            zoom: 14
        });
        this.mapObj[mapSource+'CurrentLocationWindow'].setPosition(this.mapObj.position);
        this.mapObj[mapSource+'CurrentLocationWindow'].setContent('Location found.');
        this.mapObj[mapSource+'CurrentLocationWindow'].open(this.mapContainer);
        this.mapContainer.setCenter(this.mapObj.position);
        this.getMoreInfo();
        if(mapSource === 'rider') {
            this.riderTrip(destination);
        } else if(mapSource === 'pillion') {
            this.searchForRiders();
        }
    },
    getMoreInfo() {
        this.mapObj.geocoder.geocode({'location': this.mapObj.position}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    this.mapContainer.setZoom(11);
                    let marker = new google.maps.Marker({
                        position: this.mapObj.position,
                        map: map
                    });
                    this.userLocationData.country = results[7].formatted_address;
                    this.userLocationData.state = results[6].formatted_address;
                    this.userLocationData.city = results[5].formatted_address;
                    this.userLocationData.area = results[2].formatted_address;
                    this.userLocationData.detailedAddress = results[0].formatted_address;

                    this.mapObj.infoWindow.setContent(results[0].formatted_address);
                    this.mapObj.infoWindow.open(map, marker);
                } else {
                  window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        })
    },
    riderTrip(destination) {
        const self = this;
        this.mapObj.directionsService.route({
            origin: this.mapObj.position,
            destination: destination,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            region: 'IN'
        }, function(response, status) {
            if (status === 'OK') {
                console.log('DIRECTION SERVICE');
                self.mapObj.directionsDisplay.setDirections(response);
                self.mapObj.directionsDisplay.setMap(self.mapContainer);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },
    searchForRiders() {
        console.log('Searching for Riders');
    }
}