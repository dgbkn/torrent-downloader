const axios = require("axios")
const Seedr = require("seedr")
var seedr = new Seedr();
require('dotenv').config()

console.log("🚀   Launch in progress")

if (!process.env.SEEDR_TOKEN) {
    console.log("We need to config Seedr. Let's get started")
    console.warn("You will be redirected to Seedr to make a token. Then type the token in the env file.")
    console.warn("go to https://seedr.cc/devices and add user code")
    seedr.getDeviceCode();
    new Error( 'Please enter the token');

}
if (!process.env.SIGNAL_TOKEN){
    console.warn("Please generate a bot token on Signal")
    new Error('Please enter the token for signal');
}

console.log("Token detected")
