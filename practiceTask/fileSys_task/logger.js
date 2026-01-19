const fs= require('fs');
function logActivity(message){
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] - ${message}\n`;

    fs.appendFile('./activity.log', logMessage,(err)=>{
        if (err) {
            console.log("failed to write log");
        }else {
        console.log("log written successfully");
    }
    });
}

module.exports={logActivity};