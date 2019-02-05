const fs = require("fs");
const configFilePath = "./config.json";

 function isTemp(){
    let jsonContent = getConfig();
    return jsonContent.tempToken !== null;

};

function getConfig(){
    let content = fs.readFileSync(configFilePath);
    return JSON.parse(content);
};


exports.isTemp = isTemp;
exports.getConfig = getConfig;
exports.configFilePath = configFilePath;