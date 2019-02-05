var express = require('express');
var router = express.Router();

const axios = require('axios');
const fs = require("fs");
const configTools = require('../tools/configTools');


/* GET home page. */
router.get('/', function (req, res, next) {
    if(!fs.existsSync(configTools.configFilePath)){

        getToken();
        res.render('registration', {message: 'Get Token form server...', token: null});
    }
    else {
        if(configTools.isTemp()){
            res.render('registration', {message: 'Your registration token: ',token: configTools.getConfig().tempToken});
        }
        else{
            res.render('index', {title: "ok"});
        }
    }
});


function getToken() {
    axios.get('http://10.1.0.11:8080/api/screen/getToken')
        .then(response => {
            console.log(response.data.tempToken);
            console.log(response.data.uuid);
            console.log(response.data.expirationDate);
            fs.writeFile(configTools.configFilePath, JSON.stringify(response.data),'utf8',()=>{});
        })
        .catch(error => {
            console.log(error);
        })

}

module.exports = router;
