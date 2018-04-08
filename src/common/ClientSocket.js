import { publishEvent, subscribeEvent } from './Observer.js'
import PageTwo from '../components/PageTwo.vue'
import GlobalStorage from '../common/GlobalStorage'

export default {
    init() {
        // Make connection
        this.socket = io.connect('http://localhost:3000');

        // Listen for events
        this.socket.on('newConnection', function(data){
            console.log('Your socket ID is', data);
        });

        // for the rider view
        this.socket.on('ackReq', function(response){
            GlobalStorage.notifyRideRequest = new CustomEvent('notifyRideRequest', { detail: response.requestDetail.requestorData });
            window.dispatchEvent(GlobalStorage.notifyRideRequest);
        });

        // for the pillion view
        this.socket.on('rideAccepted', function(response){
            GlobalStorage.rideAccepted = new CustomEvent('rideAccepted', {detail: response});
            window.dispatchEvent(GlobalStorage.rideAccepted);
        });
    },
    sendRequestToRider(data) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.socket.emit('sendRequest', {
                requestDetail: data
            });
            
            // for the pillion view
            self.socket.on('ackReq', function(response){
                resolve(response);
            });
        });
    },
    acceptedRequest(data) {
        this.socket.emit('rideAccepted', data);
    }
}
