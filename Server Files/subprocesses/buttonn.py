import nfc
import socketio

sio = socketio.Client();
sio.connect('http://localhost:9000');
LedPin = 24
ButtonPin = 26

import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

GPIO.setup(ButtonPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(LedPin, GPIO.OUT) #not working at the moment

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')

@sio.on('button_response')
def another_event(sid):
    print('Button Response Received')

@sio.event
def disconnect():
    print("I'm disconnected!")

def handleExit():
    print('received exit - button')
    sio.disconnect()
    sys.exit();

while True: #change statment to get input from APP
    signal.signal(signal.SIGTERM,handleExit)
    input_state = GPIO.input(ButtonPin)
    if input_state == False:
        print("Button Pressed!")
        GPIO.output(LedPin, 1)
        sio.emit('button');
        nfc.run()
        time.sleep(0.5)
    else:
        print("Waiting ...")
        GPIO.output(LedPin, 0)
        time.sleep(0.5)
