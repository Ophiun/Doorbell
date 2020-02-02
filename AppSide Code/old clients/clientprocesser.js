var net = require('net');
var fs = require("fs");
var proc= require('process')
var express = require('express')
var EventEmitter = require('events')
var app = express();
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var HOST = '192.168.0.108';
var PORT = 9000
var currentCommand;
var client = new net.Socket();
var d8 = new Date();
var file,jpg,mp4

class MyEmitter extends EventEmitter{}
const myEmitter = new MyEmitter();

app.listen(8000,"127.0.0.1",()=>{
  console.log("listening on port 8000")
})


app.get('/',(req,res)=>{
  res.writeHead(200, {
    'Date': d8.toUTCString(),
    'Connection': 'keep-alive',
    'Content-Type': 'video/ogg'
  });
  myEmitter.on('dataReq',(buffer)=>{
    res.write(buffer);
  })
});


console.log(PORT);
client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  //client.write('I am Chuck Norris!');
  readline.question('Please input a command to send to the server',(command)=>{
    console.log("Command:"+command);
    if(command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3"){
      console.log("invalid input");
    }else{
      if(command.valueOf() == "0"){
        currentCommand = 0;
        jpg = fs.createWriteStream(d8.getTime().toString()+'.jpeg').on('finish',()=>{
          console.log('jpeg finish');
          jpg.end();
        }).on('error',()=>{
          console.log('jpeg error');
        })
      }else if(command.valueOf() == "1"){
        currentCommand = 1;
        file = fs.createWriteStream(d8.getTime().toString()+'.h264').on('finish',()=>{
          console.log("Write Finish.");
          file.end();
        }).on('error',()=>{
          console.log(".h264 error");
        })
      }else if(command.valueOf() == "2"){
        currentCommand = 2; //filesystem request
      }else if(command.valueOf() == "3"){
        currentCommand = 3;
        // mp4 = fs.createWriteStream('x.webm').on('finish',()=>{
        //   console.log("Write Finish.");
        //   mp4.end();
        // }).on('error',()=>{
        //   console.log(".mp4 error");
        //   mp4.end();
        // })
      }
      client.write(command); //promises may be required for this 
      readline.close();
    }
  })
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function (data) {
  //console.log('DATA: ' + data);
  // Close the client socket completely
  if(currentCommand == 1){
    console.log("video write");
    file.write(data, (err) => {
     //console.log("ERROR:" + err);
    })
  }else if(currentCommand == 0){
    //opens a write stream for the jpg
    console.log("image write");
    jpg.write(data, (err) => {
      console.log("ERROR:" + err);
    })
  }else if(currentCommand == 2){
    console.log(data.toString());
  }else if(currentCommand == 3){
    console.log(data.length)
    console.log(data);
    // mp4.write(data, (err) => {
    //   console.log("ERROR:" + err);
    //  })
    myEmitter.emit('dataReq',data);
  }
  console.log("Done");
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
  console.log('Connection closed');
  client.destroy();
});
