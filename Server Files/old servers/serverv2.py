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
import threading
import logging
import typing
import json
import codecs
#from subprocess import STDOUT, PIPE

# Start a socket listening for connections on 0.0.0.0:8000 (0.0.0.0 means)
server_socket = socket.socket()
port = sys.argv[1]
print(port)
server_socket.bind(('0.0.0.0', int(port)))
server_socket.listen(2)
#TODO: CREATE A NEW CUSTOM OBJECT FOR EACH COMMAND AND PREPEND THE CORRESPONDING COMMAND # TO THE FIRST BYTE OF THE BUFFER


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

class StreamingOutput(object):
    def __init__(self,sockmakefile):
        self.connection = sockmakefile

    def write(self, buf):
        self.connection.sendall(sending)

# Accept a single connection and make a file-like object out of it
connection,addr = server_socket.accept();
makefile = connection.makefile('wb');
str1 = ""
x = datetime.datetime.now();

def sendPicture(cam):
    print("Taking picture")
    cam.capture(makefile, 'jpeg')
    print("Done taking picture");

def sendSavedRecording(cam):
    print("Send recording data")
    cam.start_recording(custOutput(x.strftime('%f')+".h264",makefile),format='h264')
    cam.wait_recording(30)
    cam.stop_recording();
    print("End of recording")

def sendStreamFFMPEG(cam):
    print("Converting to mp4");
    try:
        command = ['ffmpeg','-nostats','-hide_banner','-loglevel','panic','-i','-','-f', 'ogg', '-']
        ffmpeg = sp.Popen(command,stdin=sp.PIPE,stdout=makefile,stderr=sp.STDOUT)
        cam.start_recording(ffmpeg.stdin,format="h264")
        cam.wait_recording(10)
        cam.stop_recording()
    except:
        ffmpeg.kill()
    finally:
        if ffmpeg:
            ffmpeg.kill()

def sendStreamMJPEG(cam):
    print("Sending mjpeg stream")
    cam.capture(StreamingOutput(connection),'jpeg')



try:
    camera = picamera.PiCamera()
    camera.resolution = (320, 240)
    camera.framerate = 24
    #camera.start_preview()
    # time.sleep(2)
    while 1:
        print("Waiting to receive data")
        data = connection.recv(1)
        print(data)
        if data.decode() == '0':
            #print("Send picture")
            #camera.capture(makefile, 'jpeg')
            pic = threading.Thread(target = sendPicture,name="picture",args=[camera])
            pic.start();
        elif data.decode() == '1':
            print("Send recording")
            #camera.start_recording(makefile,format = 'h264')
            recording = threading.Thread(target = sendSavedRecording,name="recording",args=[camera])
            recording.start();
        elif data.decode() == '2':
            #send filesystem contents
            print(os.listdir()) #convert a list to something you can send through socket
            for ele in os.listdir():
                str1 += ele
                str1 += "\n"
            connection.send(bytes(str1,'utf8'))
        elif data.decode() == '3':
            #save video to a file in the pi
            stream = threading.Thread(target=sendStreamFFMPEG,name='stream',args=[camera])
            stream.start();
        elif data.decode() =='4':
            streamJPEG = threading.Thread(target=sendStreamMJPEG,name='streammjpeg',args=[camera])
            streamJPEG.start()
        elif data.decode() == '5':
            print("Closing server");
            break;
except:
    print("ERROR: Closing server")
    #camera.stop_recording();
    connection.close()
    #ffmpeg.kill()
    server_socket.close()
finally:
    print("closing server")
    #camera.stop_recording();
    connection.close()
    #ffmpeg.kill()
    server_socket.close()