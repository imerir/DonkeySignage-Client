var express = require('express');
var router = express.Router();
const configTools = require('../tools/configTools');
router.get("/okRegister",(req, res, next) =>{

});
router.get("/okTempToken",(req, res, next) =>{
    if(configTools.isTemp())
        res.status(200);
    else
        res.status(401);
    res.send('');
});
module.exports = router;