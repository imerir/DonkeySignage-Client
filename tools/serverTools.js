exports.serverAddr = 'https://donkeysignage.imerir.org';
const W3CWebSocket = require('websocket').w3cwebsocket;
const configTools = require('../tools/configTools');
let client;

function openWebSocket(wsURL) {
    client = new W3CWebSocket(wsURL);
    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
        let config = configTools.getConfig();
        let loginData = {
            "type": "AUTH",
            "data": {
                "uuid" : config.uuid,
                "token" : config.token
            }
        };
        client.send(JSON.stringify(loginData));
    };

    client.onclose = function() {
        console.log('Client Closed');
    };

    client.onmessage = function(e) {
        console.log(e.data);
    };
}

function webSocketSend(value){
    client.send(value);
}

exports.openWebSocket = openWebSocket;