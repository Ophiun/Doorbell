#if no audio in jack, go to "sudo raspi -config", Advanced options, Audio, and select 3.5 Audio Jack

#type "alsamixer", select sound card PnP USB, increase Mic Volume

#speaker-test -t wav


import socketio
import time

sio = socketio.Client();
sio.connect('http://192.168.2.22:9000'); #can customize ip and port if you want
#localhost shouldnt have to be modified since the subprocesses are ran on the same pi.
#Streaming httpserver will runs on 8000 (streamTest.py)

#predefined event handler, occurs when successful connection
@sio.event
def connect():
    print("Connected")

#predefined event handler, occurs when connecting to server failed
@sio.event
def connect_error():
    print("The connection failed!")

#predefined event handler, occurs when it disconnects from server
@sio.event
def disconnect():
    print("I'm disconnected!")

@sio.on('AudioRecord') #the function directly underneath this statement is the event handler
def record_event(sid):
    print('Driver file handled audio record event.')

input('input\n')
sio.emit('another_event_name')


