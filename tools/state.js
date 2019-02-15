const configTools = require("./configTools");
const uuid = require("uuid/v4");
const fs = require("fs");


/**
 * Class for state of the server
 */
class State {
    constructor() {
        this.mainInfo = {
            tokenState: "",
            state: "NEED_SOCKET",
            uuid: "",
            token: "",
            message: "",
            needUpdate: false
        };
        let config;
        if(fs.existsSync(configTools.configFilePath))
            config = configTools.getConfig();
        else
            config = {};

        console.log("Loading config: ");
        console.log(config);
        if (config.uuid == null) {
            this.mainInfo.uuid = uuid();
            this.mainInfo.tokenState = "NEED_TMP_TOKEN";
        } else {
            this.mainInfo.uuid = config.uuid;
            if(config.tokenState == null || config.tokenState === "" || config.tokenState === "WAIT_TPM_TOKEN")
                this.mainInfo.tokenState = "NEED_TMP_TOKEN";
            else{
                this.mainInfo = config;
                this.mainInfo.state = "NEED_SOCKET"
            }

        }
        console.log("Sate:");
        console.log(this.mainInfo);
    }

    renewUUID(){
        this.mainInfo = {
            tokenState: "",
            state: "NEED_TMP_TOKEN",
            uuid: uuid(),
            token: "",
            message: "",
            needUpdate: false
        };
        this.save();
    }

    save(){
        fs.writeFile(configTools.configFilePath, JSON.stringify(this.mainInfo), 'utf8', () => {});
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new State();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;
