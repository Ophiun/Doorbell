var net = require('net');
var fs = require("fs");
var proc = require('process');
var io = require('socket.io-client');
var ffmpegCommand = require('fluent-ffmpeg');
var EventEmitter = require('events')
const { PassThrough } = require('stream')
const server = require('http').createServer();
var io_server = require('socket.io')(server, {
  path: "/",
  serveClient: false,
  cookie: false
});

server.listen(3000, () => {
  console.log("Server running on port 3000")
});

var EventEmitter = require('events')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var socket = io('http://192.168.0.108:9000');
var client = new net.Socket();
let command;
var passthrustream = new PassThrough();
let file;


var recursiveReadline = function () {
  readline.question('Please input a command to send to the server\n', (command) => {
    //console.log("Command:" + command);
    if (command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3" && command.valueOf() != "4" && command.valueOf() != "5") {
      console.log("invalid input");
      recursiveReadline()
    } else {
      if (command.valueOf() == "1") {
        console.log("Emit 1");
        socket.emit('stream_request');
      } else if (command.valueOf() == "2") {
        socket.emit('stream_snapshot_request');
      } else if (command.valueOf() == "3") {
        client.end()
      }
      recursiveReadline();
    }
  })
}

socket.on('connection', () => {
  console.log("Connection has been established")
})

socket.on('disconnect', () => {
  console.log('SocketIO has been disconnected.')
  socket.disconnect();
  if (client) {
    client.end();
  }
})

socket.on('stream_response', () => {
  console.log("Picture Response Received");
  var input = client.connect(8000, '192.168.0.108', function () {
    console.log('CONNECTED TO: ' + '192.168.0.108' + ':' + 8000);
  })
  command = ffmpegCommand(client).inputOptions([
    '-i', '-'
  ])
  .noAudio()
  .outputOptions([
    '-f', 'mpegts', '-'
  ]).output(passthrustream).on('end',()=>{
    console.log('processing has ended');
  })
})

socket.on('button_response', () => {
  console.log('button has been pressed')
})

socket.on('ultra_m', (data) => {
  console.log(data);
})

client.on('data', (data) => {
  console.log("Data received")
  // console.log("video write");
  // file.write(data, (err) => {
  //  console.log("ERROR:" + err);
  // })
})

passthrustream.on('data',(chunk)=>{
  io_server.emit('data', chunk)
})

client.on('ready',()=>{

})

client.on('end', () => {
  console.log('Streaming server has closed')
  client.end();
})

//io server commands
io_server.on('connect', (s) => {
  console.log("Connected" + s);
})

recursiveReadline();