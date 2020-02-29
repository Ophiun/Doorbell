#Not Encrypted. Can leak info from temp.txt file and/or looking at wpa_supplicant.conf

#!/bin/bash
clear

echo -n "Enter SSID: " 
read ssid_ans

echo -n  "Enter password: "
read -s pass_ans

clear

wpa_passphrase "$ssid_ans" "$pass_ans" | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf > /dev/null
sudo sed -i '/#psk=/d' /etc/wpa_supplicant/wpa_supplicant.conf

#cd /home/pi/Desktop

#echo ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev > temp.txt
#echo update_config=1 >> temp.txt
#echo country=US >> temp.txt
#echo  >> temp.txt
#echo network={	>>  temp.txt
#echo -e '\t'ssid="\""$ssid_ans"\"" >> temp.txt
#echo -e '\t'psk="\""$pass_ans"\""  >> temp.txt
#echo -e '\t'key_mgmt=WPA-PSK >> temp.txt
#echo } >>temp.txt

#sudo cp temp.txt /etc/wpa_supplicant/wpa_supplicant.conf
#rm temp.txt

wpa_cli -i wlan0 reconfigure

#echo System will now reboot
#sleep 3
#shutdown -r now
