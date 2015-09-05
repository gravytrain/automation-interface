Define USB modules access right:
================================

In order to work properly, the Yoctopuce VirtualHub and library need write
access to all Yoctopuce devices. By default, Linux access rights for USB 
device are read only for all users, except root. If you want to avoid running 
VirtualHub as root, you need to add a new rule to your udev configuration.

To add a new udev rules to your Linux installation, you need to create a text 
file in the directory "/etc/udev/rules.d" following the naming pattern "##-
arbitraryName.rules". Upon startup, udev will process all files in this 
directory with the extension ".rules" according to there alphabetical order. 
For instance, the file "51-first.rules" will be processed before  the file "50-
udev-default.rules". The file "51-udev-default.rules" is actually used to 
implement the default rules of the system. Therefore, to modify the default 
handling behaviour of the system, you have to create a file that start with a 
number lower than 50. Note that to add a rules to your udev configuration you 
have to be root.

In the sub directory udev_conf we have put two examples of rules that you can 
use as reference for your rules.

Example 1: 51-yoctopuce.rules

This rule will add write access to Yoctopuce USB devices for all users. Access 
rights for all other devices will be left unchanged. If this is what you want, 
copy the file "51-yoctopuce_all.rules" to the directory  "/etc/udev/rules.d" 
and restart your system.

	# udev rules to allow write access to all users for Yoctopuce USB devices
	SUBSYSTEM=="usb", ATTR{idVendor}=="24e0", MODE="0666"

Example 2: 51-yoctopuce_group.rules

This rule will allow write access to Yoctopuce USB devices for all users of 
the group "yoctogoup". Access right for all other devices will be left 
unchanged. If this is what you want, you need to copy the file "51-
yoctopuce_all.rules" to the directory  "/etc/udev/rules.d" and restart your 
system.

	# udev rules to allow write access to all users of "yoctogroup" for Yoctopuce USB devices
	SUBSYSTEM=="usb", ATTR{idVendor}=="24e0", MODE="0664",  GROUP="yoctogroup"




Start VirtualHub with systemd (Fedora, openSUSE, Arch Linux, Angstrom...)
=========================================================================
- 1 copy VitualHub binary to /usr/sbin 
- 2: ensure that the /usr/sbin/Virtualhub is executable with :
    # chmod +x /usr/sbin/VirtualHub
- 3: copy the systemd startup script /etc/systemd/system/
    # cp startup_script/yvirtualhub.service /etc/systemd/system/
- 4: reload your systemd configuration with
    # systemctl daemon-reload	
- 5: ensure that you can start your script with
    # systemctl start yvirtualhub.service
- 6: set this service to be started at boot time with
    # systemctl enable yvirtualhub.service