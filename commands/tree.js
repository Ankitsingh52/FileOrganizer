let path = require("path");
let fs = require("fs");

//Main tree function
function treeFun(dirpath){
    if(dirpath == undefined){
        treeHelper(process.cwd(),"");
        return;
    }
    else{
        let exists = fs.existsSync(dirpath);
        if(exists){
            treeHelper(dirpath,"");
        }
        else{
            console.log("Please enter correct path!");
            return;
        }
    }
}

//Tree helper function
function treeHelper(dirpath,indent){
    let isFile = fs.lstatSync(dirpath).isFile();
    if(isFile == true){
        let filename = path.basename(dirpath);
        console.log(indent + "├──" + filename);
    }
    else{
        let dirName = path.basename(dirpath);
        console.log(indent + "└──" + dirName);

        let dirContent = fs.readdirSync(dirpath);
        for(let i = 0; i < dirContent.length; i++){
            let membersPath = path.join(dirpath,dirContent[i]);
            treeHelper(membersPath,indent + "\t");
        }
    }
}

module.exports = {
    tree: treeFun
}