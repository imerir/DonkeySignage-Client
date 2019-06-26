let fs = require("fs");
const widgetDir = "./public/widgets";

function clearDir(path) {

    if(!fs.existsSync(path)){
        fs.mkdir(path);
    }
    let files = fs.readdirSync(path);
    console.log("Clean old widgets...");
    files.forEach(el => {
        let filepath = path + '/' + el;
        fs.unlinkSync(filepath);
    });
}

function saveWidgets(widgetsList){
    clearDir(widgetDir);
    console.log("Save new widgets...");
    widgetsList.forEach(el =>{
       fs.writeFileSync(widgetDir+ "/" + el.id + ".html", el.template);
    });
}

exports.saveWidgets = saveWidgets;