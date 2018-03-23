<template>
  <div class="signup-block">
    <div class="logo-block"> 
      <img src="../assets/logo.png">
    </div>
    <p class="title">SIGN UP</p>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img src="../assets/mail.svg" height="25" width="25"></i>
            </div> 
            <input type="text" placeholder="Work mail Address" @keyup="removeErr()" v-model="email"/>
            <span class="mandatory">*</span>
        </div>
    </div>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img src="../assets/mobile.svg" height="25" width="25"></i>
            </div> 
            <input type="number" placeholder="Mobile Number" @keyup="removeErr()" v-model="mobileNumber"/>
            <span class="mandatory">*</span>
        </div>
    </div>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img src="../assets/age.png" height="25" width="25"></i>
            </div> 
            <input type="number" placeholder="Age" @keyup="removeErr()" v-model="age"/>
            <span class="mandatory">*</span>
        </div>
    </div>
    <div class="row">
        <div class="block gender-block">
            <div class="gender-input">
                <div class="box male">
                    <input type="radio" v-model="gender" name="gender" id="genderMale" value="male" checked>
                    <label for="genderMale"><span class="gender-icon  gender-icon--male"></span>Male</label>
                </div>
                <div class="box female">
                    <input type="radio" v-model="gender" name="gender" id="genderFemale" value="female">
                    <label for="genderFemale"><span class="gender-icon  gender-icon--female"></span>Female</label>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="block">
            <div class="icon">
                <i><img class="pwd-icon" v-bind:src=getPwdImage() height="25" width="25"></i>
            </div>
            <input id="password" v-bind:type=pwdType placeholder="Password" @focus="makePwdVisible()" @blur="hidePwd()" @keyup="removeErr()"/>
            <span class="mandatory">*</span>
        </div>
    </div>
    <div v-if="showError">
        <p class="err-msg">{{errorMessage}}</p>
    </div>
    <button @click="signUp()"> SUBMIT </button>
  </div>
</template>
<script>
import Service from '../GoogleAPI/Service.js'
export default {
    data() {
        return {
            email:'',
            mobileNumber:'',
            age:'',
            gender:'male',
            pwdImage: 'pwd-lock',
            pwdType: 'password',
            showError: false,
            errorMessage: ''
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
        signUp() {
            let password = document.getElementById('password').value;
            if(this.validation()) {
                // AJAX call - user data
                let reqObj = {
                    email : this.email,
                    mobile: this.mobileNumber,
                    age: this.age,
                    gender: this.gender,
                    password: password
                }
                Service.userSignUp(reqObj);
            }
        },
        validation() {
            let password = document.getElementById('password').value;
            if(this.age && this.email && this.mobileNumber && password) {
                if(this.validatePattern('email', this.email) && this.validatePattern('mobileNumber', this.mobileNumber) && this.validatePattern('age', this.age)) {
                    return true;
                } else {
                    this.showError = true;
                    return false;
                }
            } else {
                this.errorMessage = 'All fields are mandatory!';
                this.showError = true;
                return false;
            }
        },
        validatePattern(field, value) {
            let pattern = {
                email:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                mobileNumber : /^(7|8|9)\d{9}$/,
                age:/^[0-9]{2}$/
            }
            if(pattern[field].test(value)) {
                return true;
            } else {
                this.errorMessage = 'Enter a valid '+ field;
                return false;
            }
        }
    }
}
</script>
<style lang="scss">
.signup-block {
    margin-top:40px;
    .logo-block {
        margin-top: 30px;
    }
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
            .mandatory {
                color:  black;
                padding: 0 5px;
            }
            input {
                margin-top: 3px;
            }
        }
    }
    .gender-block {
        margin-right: 20px;
        .gender-input {
            display: table;
            padding: 0;
            width: 90%;
            div {
                display: inline;
                border: 1px solid #7c7c84;
                padding: 10px 30px;
                input, input:checked {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    display: none;
                }
                label {
                    color: #2c3e50; 
                }
                .gender-icon {
                    width: 13px;
                    height: 15px;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                    position: relative;
                    top: -1px;
                }
                input:checked + label {
                    color: black;
                    font-weight: 600;
                }
                .gender-icon--male {
                    background-image: url(../assets/inactive_male.svg);
                }
                .gender-icon--female {
                    background-image: url(../assets/inactive_female.svg);
                }
                input:checked + label  .gender-icon--male{
                    background-image: url(../assets/active_male.svg);
                }
                input:checked + label .gender-icon--female {
                    background-image: url(../assets/active_female.svg);
                }
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
