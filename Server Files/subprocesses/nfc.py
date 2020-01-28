import subprocess
import time
import socketio
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'nfc_auth.txt')
sio = socketio.Client();
sio.connect('http://localhost:9000');

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')


def nfc_raw():
    lines=subprocess.check_output("/usr/bin/nfc-poll", stderr=open('/dev/null','w'))
    return lines

def read_nfc():
    lines=nfc_raw()
    return lines

def run():
    try:
     #while True:
        myLines=read_nfc()
        buffer=[]
        for line in myLines.splitlines():
            line_content=line.split()
            if(not line_content[0] == 'UID'):
                pass
            else:
                buffer.append(line_content)
        str=buffer[0]
        id_str=str[2]+str[3]+str[4]+str[5]
        print (id_str)

        fo = open(my_file, "r") 
        file_contents = fo.read()
        Flag = 0
        for i in file_contents.split('\n'):
            if id_str == i:
                Flag = 1
        if Flag == 1:
            print('Access Granted')
            print('emitting event to server');
            sio.emit('nfc_connection')
            #subprocess.call("speaker-test -t wav", shell=True) #audio code goes here
        else :
            print('Access Denied')
            

    except KeyboardInterrupt:
        pass
