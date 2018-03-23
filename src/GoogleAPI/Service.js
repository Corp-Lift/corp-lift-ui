import ResponseData from '../MockJSON/MockData.js';
import GlobalStorage from '../common/GlobalStorage';
import ClientSocket from '../common/ClientSocket'
export default {
    userSignUp(data) {
        console.log('Sign Up API call', data)
    },
    userSignIn(data) {
        console.log('Sign In API call', data);
        return ResponseData.userSignInData;
    },
    getCurrentPosition() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(
            function(position) {
                resolve(position);
            },
            function(error) {
                reject(error);
            },
            {
                timeout: 5000,
                maximumAge: 0
            });
        });
    },
    getMoreInfo(data) {
        return new Promise(function(resolve,reject) {
            GlobalStorage.mapObj.geocoder.geocode(data,
            function(response, status) {
                if(status == 'OK') {
                    resolve(response);                    
                }
            },
            function(error) {
                reject();
            });
        });
    },
    getDistanceMatrix(data) {
        return new Promise(function(resolve,reject) {
            GlobalStorage.mapObj.distanceMatrixService.getDistanceMatrix(data,
            function(response, status) {
                if(status == 'OK') {
                    resolve(response);                    
                }
            },
            function(error) {
                reject();
            });
        });
    },
    geocoderFn(destinationList) {
        var promises = [];
        for (var j = 0; j < destinationList.length; j++) {
            promises.push(new Promise(function(resolve, reject) {
                GlobalStorage.mapObj.geocoder.geocode({'address': destinationList[j]},
                function(response, status) {
                    if(status == 'OK') {
                        resolve(response);
                    } else if(status == 'OVER_QUERY_LIMIT'){
                        reject(response, indexValue);
                    }
                },
                function(err) {
                    reject(err);
                })
            }));
        }
        return Promise.all(promises);
    },
    sendRequest(data, place) {
        console.log('send req', data);
        ClientSocket.sendRequestToRider(data);
    },
    getAvailableRiders() {
        return ResponseData.riderData;
    }
}