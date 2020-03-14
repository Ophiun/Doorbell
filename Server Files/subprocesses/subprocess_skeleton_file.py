import socketio
import subprocess
import time


sio = socketio.Client();
sio.connect('http://localhost:9000');

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses'); #emit a socket event to the raspberry pi server

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')