import eventlet
import socketio 
import RPi.GPIO as GPIO
import time
import signal
import subprocess
import sys
import atexit

sio = socketio.Client();
GPIO.setwarnings(False);
GPIO.setmode(GPIO.BOARD);
GPIO.setup(10,GPIO.IN,pull_up_down=GPIO.PUD_DOWN);

sio.connect('http://localhost:9000');
@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room - button')

@sio.on('subprocess_leave')
def another_event(sid):
    print('received sio exit - button')
    #sio.disconnect();
    #sys.exit();

@sio.on('button_response')
def another_event(sid):
    print('Button Response Received')

@sio.event
def disconnect():
    print("I'm disconnected!")

def handleExit():
    print('received exit')
    sio.disconnect()
    sys.exit();

if __name__ == '__main__':
    sio.emit('join_subprocesses')
    #signal.signal(signal.SIGTERM,handleExit)
    while True:
        if GPIO.input(10) == GPIO.HIGH:
            print("Button was pushed!")
            sio.emit('button');
            time.sleep(0.5)


