import socket
import time
import picamera
import struct
from PIL import Image
import io
import datetime
import sys
import signal
#from subprocess import STDOUT, PIPE

# Start a socket listening for connections on 0.0.0.0:8000 (0.0.0.0 means)
server_socket = socket.socket()
#port = sys.argv[1]
#print(port)
server_socket.bind(('0.0.0.0', 8000))
server_socket.listen(2)
cont = True
pic = False

def handleSnapshotSignal(signalNumber,frame):
    print('received user defined signal')
    global pic
    pic = True;
    #changePic()
    return

def handleExit(signalNumber,frame):
    print('received exit')
    connection.close()
    server_socket.close();
    sys.exit();
    return

class StreamingOutput(object):
    def __init__(self,sockmakefile):
        self.makefile = sockmakefile

    def write(self, buf):
        #print(buf);
        self.makefile.write(buf);

if __name__ == '__main__':
    signal.signal(signal.SIGUSR1,handleSnapshotSignal)
    signal.signal(signal.SIGTERM,handleExit)

# Accept a single connection and make a file-like object out of it
connection,addr = server_socket.accept();
makefile = connection.makefile('wb');
str1 = ""



try:
    camera = picamera.PiCamera()
    camera.resolution = (240, 180)
    camera.framerate = 24
    output = StreamingOutput(makefile)
    camera.start_recording(output,format='h264')
    while True:
        print('While loop')
        camera.wait_recording(1)
        print(pic)
        if pic == True:
            print('capture picture statement')
            camera.capture('foo.jpg',use_video_port=True)
            #camera.capture('foo.data','yuv')
            print('exiting picture statement')
            pic = False
    camera.stop_recording();
except:
    print("ERROR: Closing server")
    connection.close()
    server_socket.close()
finally:
    print("closing server")
    connection.close()
    server_socket.close()
