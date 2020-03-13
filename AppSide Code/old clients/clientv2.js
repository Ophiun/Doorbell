var net = require('net');
var fs = require("fs");
var proc= require('process')
var express = require('express')
var EventEmitter = require('events')
var app = express();
app.use(express.static('public'));
app.use(express.static('./views'));
app.set('views', './views');
app.set('view engine' , 'ejs');
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

var recursiveReadline = function(){
  readline.question('Please input a command to send to the server', (command) => {
    console.log("Command:" + command);
    if (command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3" && command.valueOf() != "4" && command.valueOf() != "5") {
      console.log("invalid input");
      recursiveReadline()
    } else {
      if (command.valueOf() == "0") {
        currentCommand = 0;
      } else if (command.valueOf() == "1") {
        currentCommand = 1;
      } else if (command.valueOf() == "2") {
        currentCommand = 2; //filesystem request
      } else if (command.valueOf() == "3") {
        currentCommand = 3;
      }else if(command.valueOf() == "4"){
        currentCommand = 4;
      }else if(command.valueOf() == "5"){
        currentCommand = 5;
      }
      client.write(command); //promises may be required for this 
      if(currentCommand = 5){
        return;
      }
      //var buf = client.read(1);
      console.log(buf);
      recursiveReadline();
    }
  })
}
class MyEmitter extends EventEmitter{}
const myEmitter = new MyEmitter();

// var server = app.listen(8000,"127.0.0.1",()=>{
//   console.log("listening on port 8000")
// })


// app.get('/',(req,res)=>{
//   res.writeHead(200, {
//     'Date': d8.toUTCString(),
//     'Connection': 'keep-alive',
//     'Content-Type': 'image/jpeg'
//   });
//   myEmitter.on('dataReq',(buffer)=>{
//     res.write(buffer);
//   })
// });
client.on('data', function (data) {
  console.log(data.length);
  console.log(data.toJSON());
  console.log("Done");
});

console.log(PORT);
client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  recursiveReadline();
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket



// Add a 'close' event handler for the client socket
client.on('close', function () {
  console.log('Connection closed');
  client.destroy();
  server.close();
});
