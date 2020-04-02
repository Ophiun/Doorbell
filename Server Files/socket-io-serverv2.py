import time
import eventlet
import socketio
import threading
import subprocess
import signal
import atexit

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})
print('starting streaming subprocess')
# start hardware subprocesses
#streaming = subprocess.Popen(["python3","./subprocesses/streamTest.py"])

ultrasonic = None
button = None;
streaming = None
streaming = subprocess.Popen(
            ["node", "./audio/server"])
@sio.event
def connect(sid, environ):
    print('connection: ', sid)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


@sio.on('join_client_room')
def another_event(sid):
    print("client room join request")
    sio.enter_room(sid, 'client')
    sio.emit('client_join', room='client')


@sio.on('join_subprocesses')
def join_subprocesses(sid):
    sio.enter_room(sid, 'subprocesses joined')
    sio.emit('new_subprocess', room='subprocesses')


@sio.on('leave_subprocesses')
def leave_subprocesses_handler(sid):
    print('Leave subprocesses handler')
    sio.emit('subprocess_leave')

# Events emitted from app
@sio.on('stream_snapshot_request')
def stream_snapshot_request_handler(sid):
    print('snapshot request received')

@sio.on('stream_start')
def stream_start_handler(sid):
    global streaming
    print("Starting stream")
    if(streaming == None):
        # streaming = subprocess.Popen(
        #     ["python3", "./subprocesses/streamTest.py"])
        sio.emit('stream_start_response', room='client')
    else:
        print("Stream process is already open")
        sio.emit('stream_start_response', room='client')


@sio.on('stream_leave')
def stream_leave_handler(sid):
    global streaming
    sio.emit('stream_exit')
    print("Killing stream")
    streaming.kill()
    streaming = None
    sio.emit('stream_leave_response', room='client')


@sio.on('ultra_measure')
def ultra_measure_handler(sid, data):
    print('ultrasonic measurement received')
    print(data)


@sio.on('button')
def button_handler(sid):
    print('Button was pressed, received emit')
    sio.emit('button_response')


@sio.on('unlock_request')
def unlock_request_handler(sid):
    print('unlock was pressed, received emit from app')
    sio.emit('unlock_request')


@sio.on('lock_request')
def lock_request_handler(sid):
    print('lock was pressed, received emit from app')
    sio.emit('lock_request')


@sio.on('unlock_response')
def unlock_response_handler(sid):
    print('unlock was completed, received emit from bluetooth')
    sio.emit('unlock_response')


@sio.on('lock_response')
def lock_response_handler(sid):
    print('lock was pressed, received emit from bluetooth')
    sio.emit('lock_response')

# @sio.on('nfc_connection')
# def another_event(sid):
#     print('nfc connection event received')

def exit_handler():
    print('exit handler - subprocess')
    # streaming.terminate();
    sio.emit('subprocess_leave', room='subprocesses')
    # ultrasonic.terminate();
    # button.terminate();

# atexit.register(exit_handler);


if __name__ == '__main__':
    button = subprocess.Popen(["python3", "./button.py"]);
    ultrasonic = subprocess.Popen(["python3", "./subprocesses/hcsr04.py"])
    eventlet.wsgi.server(eventlet.listen(('', 9000)), app)
    #app.run(threaded=True)

