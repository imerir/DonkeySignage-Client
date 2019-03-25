exports.serverAddr = 'https://donkeysignage.imerir.org';
exports.webSocketAddr = 'wss://donkeysignage.imerir.org/ws';
// exports.serverAddr = 'http://localhost:8080';
// exports.webSocketAddr = 'ws://localhost:8080/ws';

const W3CWebSocket = require('websocket').w3cwebsocket;
const configTools = require('../tools/configTools');
const widgetTools = require('../tools/widgetTools');
const fs = require("fs");

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
        console.log("Receive message on websocket!");

        let message = JSON.parse(e.data);
        console.debug(message);
        switch (message.type) {
            case 'AUTH':
                if(message.data.status === "ok"){
                    state.mainInfo.state = "UPDATE";
                }
                else{
                    state.mainInfo.state = "AUTH_ERROR";
                    state.mainInfo.message = message.data.status
                }
                break;

            case "MANIFEST":
                let widgets = message.data.list;
                console.debug(widgets);
                widgetTools.saveWidgets(widgets);
                getConfig();
                break;

            case "CONFIG":
                saveTemplate(message);
                state.mainInfo.state = "OK";


        }
    };
}


function getConfig(){
    let configGet = {
        "type": "CONFIG",
        "data": {}
    };
    client.send(JSON.stringify(configGet));
}

function webSocketSend(value){
    client.send(value);
}


function saveTemplate(value){
    let template = value.data.template;
    console.debug(template);
    if(template != null){
        template.widgetConfigs.forEach(item =>{
            item.param = JSON.parse(item.param);
        });
    }
    fs.writeFile(configTools.templateFilePath, JSON.stringify(template), 'utf8', () => {});

}

exports.openWebSocket = openWebSocket;