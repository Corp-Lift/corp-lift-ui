<template>
  <div class="signup-block">
    <div class="logo-block"> 
      <img src="../assets/logo.png">
    </div>
    <p class="title">SIGN IN</p>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img src="../assets/mail.svg" height="25" width="25"></i>
            </div> 
            <input type="text" placeholder="Work mail Address" @keyup="removeErr()" v-model="credentials"/>
        </div>
    </div>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img class="pwd-icon" v-bind:src=getPwdImage() height="25" width="25"></i>
            </div>
            <input id="password" v-bind:type=pwdType placeholder="Password" @focus="makePwdVisible()" @blur="hidePwd()" @keyup="removeErr()"/>
        </div>
    </div>
    <div v-if="showError">
        <p class="err-msg">{{errorMessage}}</p>
    </div>
    <button @click="signIn()"> SUBMIT </button>
  </div>
</template>
<script>
import Service from '../GoogleAPI/Service.js'
export default {
    data() {
        return {
            credentials:'',
            pwdImage: 'pwd-lock',
            pwdType: 'password',
            showError: false,
            errorMessage: 'All fields are mandatory!'
        };
    },
    methods: {
        getPwdImage() {
            let img = require.context('../assets/', false, /\.png$/);
            return img('./' + this.pwdImage + ".png")
        },
        makePwdVisible() {
            this.pwdImage = 'pwd-unlock';
            this.pwdType = 'text';
        },
        hidePwd() {
            this.pwdImage = 'pwd-lock';
            this.pwdType = 'password'
        },
        removeErr() {
            this.showError = false;
        },
        signIn() {
            let password = document.getElementById('password').value;
            if(this.credentials && password) {
                if(this.validatePattern(this.credentials)) {
                    // AJAX call - user data
                    let reqObj = {
                        credentials : this.credentials,
                        mobile: this.mobileNumber,
                        password: password
                    }
                    Service.userSignIn(reqObj);
                } else {
                    debugger;
                    this.showError = true;
                }
            } else {
                debugger;
                this.showError = true; 
            }
        },
        validatePattern(value) {
            let pattern = {
                email:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                mobileNumber : /^(7|8|9)\d{9}$/
            }
            if(pattern.email.test(value) || pattern.mobileNumber.test(value) ) {
                return true;
            } else {
                this.errorMessage = 'Enter a valid credential';
                return false;
            }
        }
    }
}
</script>
<style lang="scss">
.signup-block {
    margin-top:40px;
    .title {
        font-size: 30px;
        font-weight: bold;
        color: black;
        margin: 15px 0;
    }
    .row {
        margin: 30px;
        .block {
            display: inline-flex;
            .icon {
                width: 40px;
                height: 40px;
                background-color: #7c7c84;
            }
            .icon img {
                padding-top: 7px;
            }
            input {
                margin-top: 3px;
            }
        }
    }
    .err-msg {
        color:red;
        text-transform: capitalize;
    }
    button {
        background-color: #7c7c84;
        padding: 5px;
        width: 130px;
        height: 40px;
        font-size:20px;
        border: 1px solid #7c7c84;
    }
}
</style>
