import Service from './Service.js'
import GlobalStorage from '../common/GlobalStorage'

export default {
    openMap(mapSource, destination) {
        GlobalStorage[mapSource+'MapContainer'] = new google.maps.Map(document.getElementById(mapSource+'-map'), {
            zoom: 14
        });
        GlobalStorage[mapSource+'MapContainer'].setCenter(GlobalStorage.mapObj.position);
        this.getMoreInfo(mapSource);
        if(mapSource === 'rider') {
            this.riderTrip(destination);
        } else if(mapSource === 'pillion') {
            this.searchForRiders();
        }
    },
    getMoreInfo(mapSource) {
        Service.getMoreInfo({'location': GlobalStorage.mapObj.position})
        .then(response => {
            let icon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|83d0d8|000000';
            if (response[0]) {
                let marker = new google.maps.Marker({
                    position: GlobalStorage.mapObj.position,
                    icon:icon,
                    map: GlobalStorage[mapSource+'MapContainer']
                });
                GlobalStorage.userLocationData.country = response[7].formatted_address;
                GlobalStorage.userLocationData.state = response[6].formatted_address;
                GlobalStorage.userLocationData.city = response[5].formatted_address;
                GlobalStorage.userLocationData.area = response[2].formatted_address;
                GlobalStorage.userLocationData.detailedAddress = response[0].formatted_address;
            } else {
              window.alert('No results found');
            }
        })
        .catch(error => {
            console.log('Error for more info', error);
        })
    },
    riderTrip(destination) {
        GlobalStorage.mapObj.directionsService.route({
            origin: GlobalStorage.mapObj.position,
            destination: destination,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            region: 'IN'
        }, function(response, status) {
            if (status === 'OK') {
                GlobalStorage.mapObj.directionsDisplay.setDirections(response);
                GlobalStorage.mapObj.directionsDisplay.setMap(GlobalStorage.riderMapContainer);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    },
    searchForRiders() {
        let riders = GlobalStorage.getCollection('AVAILABLE_RIDERS');
        let riderList = riders.map(riderData => riderData.destination);
        let destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
        
        Service.getDistanceMatrix({
            'origins': [GlobalStorage.mapObj.position],
            'destinations': riderList,
            travelMode: 'DRIVING',
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: 'optimistic'
            }
        })
        .then(response => {
            let destinationList = response.destinationAddresses;
            Service.geocoderFn(destinationList).then(function(results) {
                for(let i=0;i< results.length;i++) {
                    GlobalStorage.pillionMapContainer.fitBounds(GlobalStorage.mapObj.bounds.extend(results[i][0].geometry.location));
                    let marker = new google.maps.Marker({
                        map: GlobalStorage.pillionMapContainer,
                        position: results[i][0].geometry.location,
                        icon: destinationIcon,
                        placeId :results[i][0].place_id,
                        data : results[i][0].formatted_address,
                        selectedRiderData : riders[i]
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        let data = {
                            requestorData : Service.userSignIn(),
                            riderData : this.selectedRiderData
                        }
                        data.requestorData.currentPosition = GlobalStorage.mapObj.position;
                        Service.sendRequest(data, this.placeId)
                        .then(function(res) {
                            alert(res);
                        })
                        .catch(function() {
                            alert(err);
                        });
                    });
                }
            })
            .catch(function(err) {
                console.log(err, 'ERROR')
            });
        })
        .catch(function(err) {
            console.log(err, 'ERROR')
        });
    }
}