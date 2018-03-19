export default {
    userSignUp(data) {
        console.log('Sign Up API call', data)
    },
    userSignIn(data) {
        console.log('Sign In API call', data)        
    },
    getCurrentPosition() {
        return new Promise(function(resolve, reject){
            navigator.geolocation.getCurrentPosition(function(position) {
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
    }
}