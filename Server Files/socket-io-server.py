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
button = subprocess.Popen(["python3","./subprocesses/button.py"])

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

#Events emitted by subprocesses
@sio.on('join_subprocesses')
def another_event(sid):
    sio.enter_room(sid,'subprocesses');
    sio.emit('new_subprocess',room='subprocesses')

@sio.on('button')
def another_event(sid):
    print('Button was pressed, received emit')
    sio.emit('button_response');

@sio.on('ultra_measure')
def another_event(sid,data):
    print('ultrasonic measurement received');
    print(data)
    sio.emit('ultra_response',room=sid);
    sio.emit('ultra_m',data);

@sio.on('nfc_connection')
def another_event(sid):
    print('nfc connection event received')

@sio.on('join_client_room')
def another_event(sid):
    sio.enter_room(sid,'client');
    sio.emit('client_join',room='client');

def exit_handler():
    print('exit handler')
    #streaming.terminate();
    ultrasonic.terminate();
    button.terminate();

atexit.register(exit_handler);

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 9000)), app)
    #app.run(threaded=True)