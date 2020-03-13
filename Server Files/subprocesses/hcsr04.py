#!/usr/bin/python
# RS_UltraSonic.py - Ultrasonic Sensor Class for the Raspberry Pi 
#
# 15 March 2017 - 1.0 Original Issue
#
# Reefwing Software
# Simplified BSD Licence - see bottom of file.

import RPi.GPIO as GPIO
import os, signal
import socketio
import time
import sys

sio = socketio.Client();
sio.connect('http://localhost:9000');

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')

@sio.on('ultra_response')
def another_event(sid):
    print('Ultrasonic Response Received')
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
 
#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)
 
def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.1)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance

def handleExit():
    print('received exit')
    sio.disconnect()
    sys.exit();

if __name__ == '__main__':
    signal.signal(signal.SIGTERM,handleExit)
    try:
        while True:
            dist = distance()
            print ("Measured Distance = %.1f cm" % dist)
            sio.emit('ultra_measure',{'distance':dist})
            time.sleep(1)
 
        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
#!/usr/bin/python
# RS_UltraSonic.py - Ultrasonic Sensor Class for the Raspberry Pi 
#
# 15 March 2017 - 1.0 Original Issue
#
# Reefwing Software
# Simplified BSD Licence - see bottom of file.

import RPi.GPIO as GPIO
import os, signal
import socketio
import time
import sys

sio = socketio.Client();
sio.connect('http://localhost:9000');

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')

@sio.on('ultra_response')
def another_event(sid):
    print('Ultrasonic Response Received')
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
 
#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)
 
def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.1)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance

def handleExit():
    print('received exit - ultrasonic')
    sio.disconnect()
    sys.exit();

if __name__ == '__main__':
    signal.signal(signal.SIGTERM,handleExit)
    try:
        while True:
            dist = distance()
            print ("Measured Distance = %.1f cm" % dist)
            sio.emit('ultra_measure',{'distance':dist})
            time.sleep(1)
 
        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()