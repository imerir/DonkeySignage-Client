const express = require('express');
const router = express.Router();

const fs = require("fs");
const configTools = require('../tools/configTools');
const axios = require('axios');
const servTools = require("../tools/serverTools");

var intervalRegister;


/* GET home page. */
router.get('/', function (req, res, next) {

    if(!fs.existsSync(configTools.configFilePath) || !configTools.checkConfig()){
        console.log("Config doesn't exist or is invalid. New registration.");
        configTools.getTempToken();
        res.render('registration', {message: 'Get registration token from server...', token: null});
    }
    else {
        if(configTools.getConfig().isTemp){
            console.log("Detecting temp token, wait for registration.");
            res.render('registration', {message: 'Your registration token: ',token: configTools.getConfig().token});
            clearInterval(intervalRegister);
            intervalRegister = setInterval(checkRegister, 1000)
        }
        else{
            console.log("Config ok.");
            //TODO Check token/uuid form server.
            servTools.openWebSocket("ws://echo.websocket.org");
            res.render('index', { message: "Registration done !" });


        }
    }
});

function checkRegister(){
    axios.get(servTools.serverAddr + '/api/screen/isRegistered', {headers:{Cookie: 'uuid=' + configTools.getConfig().uuid + ';'}})
        .then(response => {
            console.log('UUID: ' + response.data.uuid);
            console.log('Token: ' + response.data.token);
            let toSave = {"uuid": response.data.uuid, "token" : response.data.token, "isTemp": false};
            fs.writeFile(configTools.configFilePath, JSON.stringify(toSave), 'utf8', () => {
            });
            clearInterval(intervalRegister);
        })
        .catch(error => {
            console.log("Not registered.")
        });
}

module.exports = router;
