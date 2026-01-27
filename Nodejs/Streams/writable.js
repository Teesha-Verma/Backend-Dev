 const fs=require("fs")
 const path=require("path"); //use to select the path of the file
 const inputFilePath=path.join(__dirname,"input.txt")
 const outputFilePath=path.join(__dirname,"output.txt")

// manually created an input file then read that file content
 const inputStream=fs.createReadStream(inputFilePath, "utf-8")
 inputStream.on("data",(chunk)=>{
    console.log("Data is reading in chunks:",chunk)
 })
 

// manually created output file and connected that file to input file and write the content of output file
const readStream = fs.createReadStream(inputFilePath,{encoding:"utf-8"});
const writeStream = fs.createWriteStream(outputFilePath);

readStream.pipe(writeStream);
writeStream.on("finish",()=>{
    console.log("write stream is end")
})


