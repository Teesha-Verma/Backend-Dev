 const fs=require("fs")
 const path=require("path"); //use to select the path of the file
 const inputFilePath=path.join(__dirname,"input.txt")
 const outputFilePath=path.join(__dirname,"output.txt")


//  const inputStream=fs.createReadStream(inputFilePath, "utf-8")
//  inputStream.on("data",(chunk)=>{
//     console.log("Data is reading in chunks:",chunk)
//  })
 //writeStream.pipe(outputStream)

 const asyncFile=fs.readFile("input.txt","utf-8", (err,data)=>{
    if(err){
        console.log("error in file reading", err);

    }
    else{
        console.log("file reading successfull", data)
    }
})
console.log(asyncFile)