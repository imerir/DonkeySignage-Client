var express = require('express');
var router = express.Router();
const configTools = require('../tools/configTools');
let State = require("../tools/state");
const fs = require("fs");
const servTools = require("../tools/serverTools");


// Route for ..../api/...

router.get("/okRegister",(req, res, next) =>{
    let state = new State().getInstance();
    if(state.mainInfo.tokenState !== "WAIT_REGISTER")
        res.status(200);
    else
        res.status(401);
    res.send('');
});
router.get("/okTempToken",(req, res, next) =>{
    let state = new State().getInstance();
    if(state.mainInfo.tokenState !== "WAIT_TPM_TOKEN")
        res.status(200);
    else
        res.status(401);
    res.send('');
});

router.post("/getState", ((req, res, next) => {
    let state = new State().getInstance();
    res.json({tokenState : state.mainInfo.tokenState, state: state.mainInfo.state});
}));


router.post("/getTemplate", ((req, res, next) => {

    if(fs.existsSync(configTools.configFilePath)){
        let template = JSON.parse(fs.readFileSync(configTools.templateFilePath));
        res.json(template);
    }
    else{
        res.status(500);
        res.send('');
    }

}));

router.get("/getWidgetConf", ((req, res, next) => {
    if(fs.existsSync(configTools.configFilePath)){
        let template = JSON.parse(fs.readFileSync(configTools.templateFilePath));
        if(req.query.id){
            let obj = template.widgetConfigs.find(x => x.id ==  req.query.id);
            res.json(obj);
        }
        else{
            res.status(400);
            res.send('');
        }
    }
    else{
        res.status(500);
        res.send('');
    }


}));


router.post('/forceUpdate', ((req, res, next)=>{
    servTools.getConfig();
    res.status(204);
    res.send('');
}));

module.exports = router;