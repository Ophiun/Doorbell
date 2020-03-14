var net = require('net');
var fs = require("fs");
var proc = require('process')
var EventEmitter = require('events')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var HOST = '127.0.0.1';
var PORT = 9000
var currentCommand;
var client = new net.Socket();
var d8 = new Date();

var recursiveReadline = function(){
  readline.question('Please input a command to send to the server', (command) => {
    console.log("Command:" + command);
    if (command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3") {
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
      }
      client.write(command); //promises may be required for this 
      recursiveReadline();
    }
  })
}

console.log(PORT);
client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  recursiveReadline();
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function (data) {
  //console.log('DATA: ' + data);
  // Close the client socket completely
  if (currentCommand == 1) {
    console.log("1");
  } else if (currentCommand == 0) {
    console.log("0");
  } else if (currentCommand == 2) {
    console.log(data.toString());
  } else if (currentCommand == 3) {
    console.log(data.length)
    console.log(data);
  }
  console.log("Done");
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
  console.log('Connection closed');
  client.destroy();
});
