import { publishEvent, subscribeEvent } from './Observer.js'
import PageTwo from '../components/PageTwo.vue'
export default {
    init() {
        // Make connection
        this.socket = io.connect('http://localhost:3000');

        // Listen for events
        this.socket.on('newConnection', function(data){
            console.log('Your socket ID is', data);
        });
    },
    sendRequestToRider(data) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.socket.emit('sendRequest', {
                message: data
            });
    
            self.socket.on('ackReq', function(response){
                resolve(response);
            });
        });
    }
}
