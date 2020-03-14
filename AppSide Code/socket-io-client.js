var net = require('net');
var fs = require("fs");
var proc= require('process');
var io = require('socket.io-client');
var EventEmitter = require('events')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var socket = io('http://192.168.0.108:9000');
var client = new net.Socket();
let file;

var recursiveReadline = function(){
  //Recursive function to get manual user input to invoke socket events to the server
  readline.question('Please input a command to send to the server\n', (command) => {
    //console.log("Command:" + command);
    if (command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3" && command.valueOf() != "4" && command.valueOf() != "5") {
      console.log("invalid input");
      recursiveReadline()
    } else {
      if (command.valueOf() == "1") {
        console.log("Emit 1");
        socket.emit('stream_request');
        //create a file strem.h264 to receive stream data
        file = fs.createWriteStream('strem.h264').on('finish',()=>{
          console.log("Write Finish.");
          file.end();
        }).on('error',()=>{
          console.log(".h264 error");
        })
      } else if (command.valueOf() == "2") {
        socket.emit('stream_snapshot_request');
      } else if (command.valueOf() == "3") {
        client.end();
      }
      recursiveReadline();
    }
  })
}

//Socket.io Client Event Handlers
socket.on('connection',()=>{
  //Connection callback after connecting to socket.io server
  console.log("Connection has been established")
  socket.emit('join_client_room');
})

socket.on('disconnect',()=>{
  //Connection callback after disconnecting to socket.io server
  console.log('SocketIO has been disconnected.')
  socket.disconnect();
  if(client){
    client.end();
  }
})

socket.on('stream_response',()=>{
  //Connection callback after server acknowledges stream access request
  console.log("Picture Response Received");
  client.connect(8000, '192.168.0.108', function () {
    console.log('CONNECTED TO: ' + '192.168.0.108' + ':' + 8000);
  })
})

socket.on('client_join',()=>{
  console.log("Added to client room in server")
})

socket.on('nfc_connection_grant',()=>{
  console.log("CONNECTION GRANTED")
})

socket.on('button_response',()=>{
  //Ultrasonic measurement received from the pi
  //data is in jsonformat {measurement:###}
  console.log('button has been pressed')
})

socket.on('ultra_m',(data)=>{
  //Ultrasonic measurement received from the pi
  //data is in jsonformat {measurement:###}
  console.log(data);
})

//TCP Socket Client Event Handlers
client.on('data',(data)=>{ 
  //This is the handler for receiving stream data. Right now, it will write to a file so we can view video live.
  console.log("Streaming data received")
  // console.log("video write");
  file.write(data, (err) => {
   //console.log("ERROR:" + err);
  })
})

client.on('end',()=>{
  console.log('Streaming server has closed')
  client.end();
  file.end();
})

recursiveReadline();