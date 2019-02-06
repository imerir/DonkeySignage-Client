const fs = require("fs");
const configFilePath = "./config.json";
const servTools = require("./serverTools");
const axios = require('axios');


function getConfig() {
    let content = fs.readFileSync(configFilePath);
    return JSON.parse(content);
}

function checkConfig(){
    let config = getConfig();
    return config.uuid != null && config.token != null
}

function getTempToken() {
    axios.get(servTools.serverAddr + '/api/screen/getToken')
        .then(response => {
            console.log("Pre-registration done.");
            console.log('UUID: ' + response.data.uuid);
            console.log('Temp token: ' + response.data.tempToken);
            console.log('Expiration date: ' + response.data.expirationDate);
            let toSave = {"uuid": response.data.uuid, "token" : response.data.tempToken, "expirationDate" : response.data.expirationDate, "isTemp": true};
            fs.writeFile(configFilePath, JSON.stringify(toSave), 'utf8', () => {
            });
        })
        .catch(error => {
            console.log(error);
        })

}



exports.getConfig = getConfig;
exports.getTempToken = getTempToken;
exports.checkConfig = checkConfig;

exports.configFilePath = configFilePath;