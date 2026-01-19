// modules
const file= require("fs") // inbuild module for custom modules we use "./" eg- ./fs
const path= require("path")

const fs= require("http") //
http.createServer(function(req,res){
    
})

const fs=require("fs");
fs.writeFileSync("./test.txt", "This is Sync file content")

//Sync

const file=fs.readFileSync("test.txt","utf-8") // utf-8 is one of the method which is use to decode the file content
console.log(file)


// Async
const asyncFile=fs.readFile("test.txt","utf-8", (err,data)=>{
    if(err){
        console.log("error in file reading", err);

    }
    else{
        console.log("file reading successfull", data)
    }
})
console.log(asyncFile)

// whenever we write file its content gets overrite so we use append to add content without deleting the old data



// //practice question

// const logger = require("./logger")
// logger.logActivity("user is logged in");


