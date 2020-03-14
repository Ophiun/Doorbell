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
#start hardware subprocesses
#streaming = subprocess.Popen(["python3","./subprocesses/streaming.py"])
ultrasonic = subprocess.Popen(["python3","./subprocesses/hcsr04.py"])
button = subprocess.Popen(["python3","./subprocesses/buttonn.py"])

@sio.event
def connect(sid, environ):
    print('connection: ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

#Events emitted from app
@sio.on('stream_request')
def another_event(sid):
    print('Picture Request Received')
    print('emitting response')
    sio.emit('stream_response',room=sid)
    
@sio.on('stream_snapshot_request')
def another_event(sid):
    print('snapshot request received')
    streaming.send_signal(10)

@sio.on('join_client_room')
def another_event(sid):
    sio.enter_room(sid,'client');
    sio.emit('client_join',room='client');

@sio.on('join_subprocesses')
def another_event(sid):
    sio.enter_room(sid,'subprocesses');
    sio.emit('new_subprocess',room='subprocesses')

@sio.on('button')
def another_event(sid):
    print('Button was pressed, received emit')
    sio.emit('button_response');

@sio.on('unlock_request')
def another_event(sid):
    print('unlock was pressed, received emit from app')
    sio.emit('unlock_request');

@sio.on('lock_request')
def another_event(sid):
    print('lock was pressed, received emit from app')
    sio.emit('lock_request');

@sio.on('unlock_response')
def another_event(sid):
    print('unlock was completed, received emit from bluetooth')
    sio.emit('unlock_response');

@sio.on('lock_response')
def another_event(sid):
    print('lock was pressed, received emit from bluetooth')
    sio.emit('lock_response');

# @sio.on('nfc_connection')
# def another_event(sid):
#     print('nfc connection event received')

def exit_handler():
    print('exit handler - subprocess')
    #streaming.terminate();
    sio.emit('subprocess_leave',room='subprocesses');
    # ultrasonic.terminate();
    # button.terminate();

#atexit.register(exit_handler);

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 9000)), app)
    #app.run(threaded=True)