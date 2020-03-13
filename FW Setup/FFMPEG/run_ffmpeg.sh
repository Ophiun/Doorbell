#!/bin/bash
#set variable NOW to be the current date+time to be used for the recorded video filename
NOW=$(date +%Y-%m-%d-%H-%M-%S)
#capture video with raspivid, piping its output into ffmpeg, which will then be mixed with the ALSA audio input and saved as a mp4 file
raspivid -o - -t 0 -w 1920 -h 1080 -fps 25 -b 6000000 -rot 270 -g 50 -f | /home/pi/ffmpeg/ffmpeg -thread_queue_size 10240 -f h264 -r 25 -i pipe: -itsoffset 5.3 -f alsa -thread_queue_size 10240 -ac 2 -i plughw:1,0 -vcodec copy -acodec aac -ar 44100 -ab 256k -f flv /mnt/128GB/$NOW.mkv
