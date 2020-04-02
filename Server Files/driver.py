# if no audio in jack, go to "sudo raspi -config", Advanced options, Audio, and select 3.5 Audio Jack

# type "alsamixer", select sound card PnP USB, increase Mic Volume

# speaker-test -t wav

import eventlet
import socketio
import time

sio = socketio.Client()

# predefined event handler, occurs when successful connection
@sio.event
def connect():
    print("Connected")

# predefined event handler, occurs when connecting to server failed
@sio.event
def connect_error():
    print("The connection failed!")

# predefined event handler, occurs when it disconnects from server
@sio.event
def disconnect():
    print("I'm disconnected!")


# the function directly underneath this statement is the event handler
@sio.on('AudioRecord')
def record_event(sid):
    print('Driver file handled audio record event.')


@sio.on('client_join')
def client_join_handler(sid):
    print("Joined Client Room!")


@sio.on('stream_start_response')
def stream_start_response_handler(sid):
    print("stream_start_response")


@sio.on('stream_leave_response')
def stream_leave_response_handler(sid):
    print("stream_leave_response")


new_name = ''
sio.connect('http://localhost:9000')  # can customize ip and port if you want
# localhost shouldnt have to be modified since the subprocesses are ran on the same pi.
# Streaming httpserver will runs on 8000 (streamTest.py)
sio.emit('join_client_room')
while new_name != 'quit':
    # Ask the user for a name.
    new_name = input("Please tell me someone I should know, or enter 'quit': ")
    print(new_name)
    if new_name == "stream_quit":
        sio.emit('stream_leave')
    elif new_name == "stream_start":
        sio.emit('stream_start')
    elif new_name == "leave_subprocess":
        sio.emit('leave_subprocesses')
