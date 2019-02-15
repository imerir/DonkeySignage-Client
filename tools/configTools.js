const fs = require("fs");
const configFilePath = "./config.json";
const servTools = require("./serverTools");
const axios = require('axios');
let State = require("../tools/state");

/**
 * Get config from file.
 * @returns {JSON}
 */
function getConfig() {
    let content = fs.readFileSync(configFilePath);
    return JSON.parse(content);
}

/**
 * Get the temp token corresponding to UUID from the server
 */
function getTempToken() {
    console.log(new State().getInstance().mainInfo);
    axios.post(servTools.serverAddr + '/api/screen/getToken', {uuid: new State().getInstance().mainInfo.uuid})
        .then(response => {
            console.log("Pre-registration done.");
            console.log('UUID: ' + response.data.uuid);
            console.log('Temp token: ' + response.data.tempToken);
            console.log('Expiration date: ' + response.data.expirationDate);
            let state = new State().getInstance();
            state.mainInfo.tokenState = "WAIT_REGISTER";
            state.mainInfo.token = response.data.tempToken;
            state.mainInfo.uuid =  response.data.uuid;
            state.save();
        })
        .catch(error => {
            console.log(error);
        })

}

/**
 * Check if the screen is registered on the server and get the final token
 */
function checkRegister(){
    axios.get(servTools.serverAddr + '/api/screen/isRegistered', {headers:{Cookie: 'uuid=' + getConfig().uuid + ';'}})
        .then(response => {
            console.log('UUID: ' + response.data.uuid);
            console.log('Token: ' + response.data.token);
            let state = new State().getInstance();
            state.mainInfo.token = response.data.token;
            state.mainInfo.uuid =  response.data.uuid;
            state.mainInfo.tokenState = "OK";
            state.mainInfo.state = "NEED_SOCKET";
            state.save();
            console.log("I register : " + intervalRegister);
            clearInterval(intervalRegister);

        })
        .catch(error => {
            // console.log("Not registered.")
        });
}





exports.getConfig = getConfig;
exports.getTempToken = getTempToken;
exports.checkRegister = checkRegister;

exports.configFilePath = configFilePath;