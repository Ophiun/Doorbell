#!/bin/bash
#run in sudo

sudo cat > /boot/config.txt <<EOF
# For more options and information see
# http://rpf.io/configtxt
# Some settings may impact device functionality. See link above for details

# uncomment if you get no picture on HDMI for a default "safe" mode
#hdmi_safe=1

# uncomment this if your display has a black border of unused pixels visible
# and your display can output without overscan
#disable_overscan=1

# uncomment the following to adjust overscan. Use positive numbers if console
# goes off screen, and negative if there is too much border
#overscan_left=16
#overscan_right=16
#overscan_top=16
#overscan_bottom=16

# uncomment to force a console size. By default it will be display's size minus
# overscan.
#framebuffer_width=1280
#framebuffer_height=720

# uncomment if hdmi display is not detected and composite is being output
#hdmi_force_hotplug=1

# uncomment to force a specific HDMI mode (this will force VGA)
#hdmi_group=1
#hdmi_mode=1

# uncomment to force a HDMI mode rather than DVI. This can make audio work in
# DMT (computer monitor) modes
#hdmi_drive=2

# uncomment to increase signal to HDMI, if you have interference, blanking, or
# no display
#config_hdmi_boost=4

# uncomment for composite PAL
#sdtv_mode=2

#uncomment to overclock the arm. 700 MHz is the default.
#arm_freq=800

# Uncomment some or all of these to enable the optional hardware interfaces
#dtparam=i2c_arm=on
dtparam=i2s=on
#dtparam=spi=on

# Uncomment this to enable infrared communication.
#dtoverlay=gpio-ir,gpio_pin=17
#dtoverlay=gpio-ir-tx,gpio_pin=18

# Additional overlays and parameters are documented /boot/overlays/README

# Enable audio (loads snd_bcm2835)
dtparam=audio=on

[pi4]
# Enable DRM VC4 V3D driver on top of the dispmanx display stack
dtoverlay=vc4-fkms-v3d
max_framebuffers=2

[all]
#dtoverlay=vc4-fkms-v3d

# NOOBS Auto-generated Settings:

EOF

sudo cat > /etc/modules <<EOF

# /etc/modules: kernel modules to load at boot time.
#
# This file contains the names of kernel modules that should be loaded
# at boot time, one per line. Lines beginning with "#" are ignored.

i2c-dev
snd-bcm2835

EOF

#reboot pi 

#sudo apt-get update
#sudo apt-get install rpi-update
#sudo rpi-update

#reboot pi

#sudo apt-get install git bc libncurses5-dev bison flex libssl-dev
#sudo wget https://raw.githubusercontent.com/notro/rpi-source/master/rpi-source -O /usr/bin/rpi-source
#sudo chmod +x /usr/bin/rpi-source
#/usr/bin/rpi-source -q --tag-update
#rpi-source --skip-gcc

#sudo mount -t debugfs debugs /sys/kernel/debug
#git clone https://github.com/PaulCreaser/rpi-i2s-audio
#cd rpi-i2s-audio
#make -C /lib/modules/$(uname -r )/build M=$(pwd) modules
#sudo insmod my_loader.ko

#sudo cp my_loader.ko /lib/modules/$(uname -r)
#echo 'my_loader' | sudo tee --append /etc/modules > /dev/null
#sudo depmod -a
#sudo modprobe my_loader

#reboot pi


arecord -D plughw:1 -c1 -r 48000 -f S32_LE -t wav -V mono -v test.wav

sudo cat > ~/.asoundrc <<EOF
#This section makes a reference to your I2S hardware, adjust the card name
# to what is shown in arecord -l after card x: before the name in []
#You may have to adjust channel count also but stick with default first
pcm.dmic_hw {
	type hw
	card sndrpisimplecar
	channels 2
	format S32_LE
}

#This is the software volume control, it links to the hardware above and after
# saving the .asoundrc file you can type alsamixer, press F6 to select
# your I2S mic then F4 to set the recording volume and arrow up and down
# to adjust the volume
# After adjusting the volume - go for 50 percent at first, you can do
# something like
# arecord -D dmic_sv -c2 -r 48000 -f S32_LE -t wav -V mono -v myfile.wav
pcm.dmic_sv {
	type softvol
	slave.pcm dmic_hw
	control {
		name "Boost Capture Volume"
		card sndrpisimplecar
	}
	min_dB -3.0
	max_dB 30.0
}

EOF


#arecord -D dmic_sv -c2 -r 48000 -f S32_LE -t wav -V mono -v test.wav

#run alsamixer -> press F6 ->select snd_rpi_simple_card -> press F5 to change volue -> raise gain to max
