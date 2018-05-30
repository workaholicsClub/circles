#!/bin/bash
sudo rmmod v4l2loopback
sudo modprobe v4l2loopback exclusive_caps=1
sudo ffmpeg -re -stream_loop -1 -i $1 -f v4l2 /dev/video0