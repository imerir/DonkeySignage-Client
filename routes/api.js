var express = require('express');
var router = express.Router();
const configTools = require('../tools/configTools');


// Route for ..../api/...

router.get("/okRegister",(req, res, next) =>{
    if(!configTools.getConfig().isTemp)
        res.status(200);
    else
        res.status(401);
    res.send('');
});
router.get("/okTempToken",(req, res, next) =>{
    if(configTools.getConfig().isTemp)
        res.status(200);
    else
        res.status(401);
    res.send('');
});
module.exports = router;