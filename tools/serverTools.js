exports.serverAddr = 'https://donkeysignage.imerir.org';
const W3CWebSocket = require('websocket').w3cwebsocket;
const configTools = require('../tools/configTools');
let client;
let State = require("../tools/state");

function  openWebSocket(wsURL) {
    let state = new State().getInstance();
    client = new W3CWebSocket(wsURL);
    client.onerror = function() {
        console.log('Connection Error');
        state.mainInfo.state = "CON_ERROR";
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
        state.mainInfo.state = "AUTH";
        let loginData = {
            "type": "AUTH",
            "data": {
                "uuid" : state.mainInfo.uuid,
                "token" : state.mainInfo.token
            }
        };
        client.send(JSON.stringify(loginData));
    };

    client.onclose = function() {
        state.mainInfo.state = "CON_ERROR";
        console.log('Client Closed');
    };

    client.onmessage = function(e) {
        //TODO detect login response

        console.log(e.data);
    };
}

function webSocketSend(value){
    client.send(value);
}

exports.openWebSocket = openWebSocket;