import socket
import time

# Connect a client socket to my_server:8000 (change my_server to the
# hostname of your server)
client_socket = socket.socket()
client_socket.connect(('0.0.0.0.', 8001))

# Make a file-like object out of the connection
connection = client_socket.makefile('rb')
try:
    while True:
        # Repeatedly read 1k of data from the connection and write it to
        # the media player's stdin
        data = client_socket.recv(1024)
        if not data:
            print(data);
            break
finally:
    connection.close()
    client_socket.close()
