
var io = require('socket.io-client');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var socket = io('http://192.168.0.108:9000');

var recursiveReadline = function () {
  //Recursive function to get manual user input to invoke socket events to the server
  readline.question('Please input a command to send to the server\n', (command) => {
    if (command.valueOf() != "0" && command.valueOf() != "1" && command.valueOf() != "2" && command.valueOf() != "3") {
      console.log("invalid input");
      recursiveReadline()
    } else {
      if (command.valueOf() == "1") {
        socket.emit('eventx'); //ensure that your server has an eventx handler
      } else if (command.valueOf() == "2") {
        //emit a event after user input
        socket.emit('eventy'); //ensure that your server has an eventy handler
      } else if (command.valueOf() == "3") {
        //dosometihng
      }
      recursiveReadline();
    }
  })
}

//Socket.io Client Event Handlers
socket.on('connection', () => {
  //Connection callback after connecting to socket.io server
  console.log("Connection has been established")
})

socket.on('disconnect', () => {
  //Connection callback after disconnecting to socket.io server
  console.log('SocketIO has been disconnected.')
  socket.disconnect();
})

socket.on('event_one', () => {
  //Connection callback after server acknowledges stream access request
  //Do Something
  socket.emit('response_even_no_data');
})

socket.on('event_with_data', (data) => {
  //Ultrasonic measurement received from the pi
  //data is in jsonformat {measurement:###}
  console.log(data);
  socket.emit('response_event_with_data', data);
  //Do more
})


recursiveReadline();