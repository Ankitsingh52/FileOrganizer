#!/usr/bin/env node
let tree = require("./commands/tree");
let organize = require("./commands/organize");
let help = require("./commands/help");

// Input 
let inputArr = process.argv.slice(2);

// Command part from input
let command = inputArr[0];

//Tasks
switch(command){
    case "tree":
        tree.tree(inputArr[1]);
        break;
    case "organize":
        organize.organize(inputArr[1]);
        break;
    case "help":
        help.help(inputArr[1]);
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}