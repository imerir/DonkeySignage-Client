const express = require('express');
const router = express.Router();

const fs = require("fs");
const configTools = require('../tools/configTools');
const axios = require('axios');
const servTools = require("../tools/serverTools");
let State = require("../tools/state");
const Handlebars = require("hbs");


var intervalRegister;


/* GET home page. */
router.get('/', function (req, res, next) {



    let state = new State().getInstance();
    console.log(state.mainInfo);
    switch (state.mainInfo.tokenState) {
        case "NEED_TMP_TOKEN":
            configTools.getTempToken();
            state.mainInfo.tokenState = "WAIT_TMP_TOKEN";

        case "WAIT_TPM_TOKEN":
            res.render('registration', {message: 'Get registration token from server...', token: null, state: state.mainInfo});
            break;

        case "WAIT_REGISTER":
            res.render('registration', {message: 'Your registration token: ',token: state.mainInfo.token, state: state.mainInfo});
            clearInterval(intervalRegister);
            intervalRegister = setInterval(configTools.checkRegister, 1000);
            break;
        case "OK":
            clearInterval(intervalRegister);
            switch (state.mainInfo.state) {
                case "NEED_SOCKET":
                    servTools.openWebSocket(servTools.serverAddr);
                    state.mainInfo.state = "CONNECTING";
                case "CONNECTING":
                    res.render('index', { message: "Registration done !</br>Connecting to server...", state: state.mainInfo});
                    break;
                case "AUTH":
                    res.render('index', { message: "Connected! Authentication...", state: state.mainInfo});
                    break;
                case "UPDATE":
                    res.render('index', { message: "Connected! Updating...", state: state.mainInfo});
                    break;
                case "OK":
                    res.render('index', { message: "Ok", state: state.mainInfo});
                    break;
                case "AUTH_ERROR":
                    res.render('index', { message: "Auth Fail", state: state.mainInfo});
                    break;
                case "CON_ERROR":
                    res.render('index', { message: "Connection to server fail", state: state.mainInfo});
                    break;

            }



            break;

            //TODO case error;

    }
});

module.exports = router;
