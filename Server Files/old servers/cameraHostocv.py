import socket
import time
import picamera
import struct
from PIL import Image
import io
import os
import datetime

# Start a socket listening for connections on 0.0.0.0:8000 (0.0.0.0 meansAAAAAAAAA
server_socket = socket.socket()
server_socket.bind(('0.0.0.0', 8001))
server_socket.listen(2)

# Accept a single connection and make a file-like object out of it
connection,addr = server_socket.accept();
makefile = connection.makefile('wb');
str1 = ""
x = datetime.datetime.now();
try:
    camera = picamera.PiCamera()
    camera.resolution = (320, 240)
    camera.framerate = 24
    #camera.start_preview()
    # time.sleep(2)
    data = connection.recv(1)
    print(data)
    if data.decode() == '0':
        print("Send picture")
        camera.capture(makefile, 'jpeg')
    elif data.decode() == '1':
        print("Send recording")
        camera.start_recording(makefile,format = 'h264')
        camera.wait_recording(30)
        camera.stop_recording();
    elif data.decode() == '2':
        #send filesystem contents
        print(os.listdir()) #convert a list to something you can send through socket
        for ele in os.listdir():
            str1 += ele
            str1 += "\n"
        connection.send(bytes(str1,'utf8'))
    elif data.decode() == '3':
        #save video to a file in the pi
        camera.start_recording(x.strftime('%f')+".h264",format = 'h264')
        camera.wait_recording(30)
        camera.stop_recording();
finally:
    print("closing server")
    #camera.stop_recording();
    connection.close()
    server_socket.shutdown(0);
    server_socket.close()