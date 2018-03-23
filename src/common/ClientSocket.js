
export default {
    init() {
        // Make connection
        this.socket = io.connect('http://localhost:3000');

        // Listen for events
        this.socket.on('ackReq', function(data){
            console.log('received', data)
        });
    },
    sendRequestToRider(data) {
        this.socket.emit('sendRequest', {
            message: data
        });
    }
}
