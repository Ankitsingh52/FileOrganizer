let path = require("path");
let fs = require("fs");
let typeObj = require("./utility");

//Main organize funtion
function organizeFun(directoryPath){
    let destPath;
    if(directoryPath == undefined){
        destPath = process.cwd();
    }
    else{
        let doesExist = fs.existsSync(directoryPath);
        if(doesExist){
            destPath = path.join(directoryPath,"organized_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("Please enter correct Path!");
        }
    }
    organizeHelper(directoryPath,destPath);
}

function organizeHelper(src,dest){
    let dirContent = fs.readdirSync(src);
    //Working on each file one by one in given src
    for(let i = 0; i < dirContent.length; i++){
        let dirContentAddress = path.join(src,dirContent[i]);
        let isFile = fs.lstatSync(dirContentAddress).isFile();
        if(isFile){
            let category = getCategory(dirContent[i]);
            sendFiles(dirContentAddress,dest,category);
        }
    }
}

//Getting category of file
function getCategory(name){
    let extension = path.extname(name);
    extension = extension.slice(1);
    for (let type in typeObj.typeKey){
        for (let category in typeObj.typeKey[type]){
            if(extension == typeObj.typeKey[type][category]){
                return type;
            }
        }
    }
    return "others";
}

//moving file to required destination
function sendFiles(src,dest,category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let filename = path.basename(src);
    let destFilePath = path.join(categoryPath,filename);
    fs.copyFileSync(src,destFilePath);
    fs.unlinkSync(src);
    console.log(filename,"copied to",category);
}

module.exports = {
    organize: organizeFun
}