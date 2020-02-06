#Must run ./bluetooth_setup first to create open channel


import bluetooth
import serial
import time
import subprocess
import socketio
#target_name = "Door_Unlocker"
#target_address = "24:6F:28:0B:BF:EE"

sio = socketio.Client();
sio.connect('http://localhost:9000');

@sio.event
def connect():
    print("Connected")
    sio.emit('join_subprocesses');

@sio.on('new_subprocess')
def another_event(sid):
    print('We have joined the subprocess room')

@sio.on('unlock_request')
def another_event(sid):
    subprocess.call("echo 'u' | sudo minicom -b 9600 -o -D /dev/rfcomm0 -C test.txt", shell=True)
    time.sleep(2)

@sio.on('lock_request')
def another_event(sid):
    subprocess.call("echo 'l' | sudo minicom -b 9600 -o -D /dev/rfcomm0 -C test.txt", shell=True)
    time.sleep(2)

#print("Searching...")

#while 1:
#    result = bluetooth.lookup_name('24:6F:28:0B:BF:EE', timeout=20)
#    if(result ==None):
#        print "not found"
#    else:
#        print "Bluetooth device found"
#        break


#nearby_devices = bluetooth.discover_devices(lookup_names=True)
#print ("Found {} devices.".format(len(nearby_devices)))

#for addr, name in nearby_devices:
#    print(" {} - {}".format(addr, name))

#Unlock door
#if(signal from app says unlock)
# subprocess.call("echo 'u' | sudo minicom -b 9600 -o -D /dev/rfcomm0 -C test.txt", shell=True)
# time.sleep(2)
#else if (signal from app says lock)
# subprocess.call("echo 'l' | sudo minicom -b 9600 -o -D /dev/rfcomm0 -C test.txt", shell=True)
# time.sleep(2)
