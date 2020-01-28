import socket
import time
import picamera
import struct
from PIL import Image
import io
import os
import datetime
import subprocess as sp
import sys
#from subprocess import STDOUT, PIPE

# Start a socket listening for connections on 0.0.0.0:8000 (0.0.0.0 meansAAAAAAAAA
server_socket = socket.socket()
port = sys.argv[1]
print(port)
server_socket.bind(('0.0.0.0', int(port)))
server_socket.listen(2)

class custOutput(object):
    def __init__(self, filename,sockmakefile):
        self.filestream = open(filename,'wb');
        self.sockstream = sockmakefile

    def write(self,buf):
        self.filestream.write(buf);
        self.sockstream.write(buf);

    def flush(self):
        self.filestream.flush();
        self.sockstream.flush();

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
        #camera.start_recording(makefile,format = 'h264')
        camera.start_recording(custOutput(x.strftime('%f')+".h264",makefile),format='h264')
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
        # camera.start_recording(x.strftime('%f')+".h264",format = 'h264')
        # camera.wait_recording(10)
        # camera.stop_recording();
        print("Converting to mp4");
        # command = ['ffmpeg','-i',x.strftime('%f')+".h264",'-c:v','copy','OUTPUT.mp4']
        # #sp.call(command)
        # pipe = sp.Popen(command,stdout=sp.PIPE,stderr=sp.PIPE)
        # pipe.stdout.write(makefile);
        #command = ['ffmpeg','-i','-','-c:v','mp4','-f', 'rawvideo', '-']
        command = ['ffmpeg','-nostats','-hide_banner','-loglevel','panic','-i','-','-f', 'ogg', '-']
        #command = ['ffmpeg','-i','-','-c:v','copy','OUTPUT.mp4']
        #sp.call(command)
        ffmpeg = sp.Popen(command,stdin=sp.PIPE,stdout=makefile,stderr=sp.STDOUT)
        camera.start_recording(ffmpeg.stdin,format="h264")
        #connection.send(ffmpeg.communicate()[1]);
        camera.wait_recording(60)
        #print(bytes(ffmpeg.stdout.read(),'UTF-8'))
        camera.stop_recording()
except:
    print("ERROR: Closing server")
    #camera.stop_recording();
    connection.close()
    if ffmpeg:
        ffmpeg.kill()
    server_socket.shutdown(0);
    server_socket.close()
finally:
    print("closing server")
    #camera.stop_recording();
    connection.close()
    if ffmpeg:
        ffmpeg.kill()
    server_socket.shutdown(0);
    server_socket.close()