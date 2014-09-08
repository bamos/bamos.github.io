---
layout: post
title: Using network block device on Android.
tags: [Android,Linux]
---

Linux uses [block devices][block-devices] to provide reads and writes
to hardware technology without exposing the hardware characteristics
of the devices.
For example, the first registered hard drive block device is located
at `/dev/sda`.
A [network block device][nbd-general] enables a remote machine
to provide the content of a block device on a system across the network.
**This post describes how to create a network block device
on Android to use storage on a remote server.**
This post is motivated by a class project and describes
how to modify Android's Linux kernel to include `nbd` and
build the user-space `nbd` client as an ARM executable.

The follow portions have been executed on a "yakju" Galaxy Nexus
device with Android 4.3 (JWR66Y) from
[Android's stock Nexus images][nexus-images] rooted
with [SuperSU 1.43][supersu].
Root is necessary to create the block file in `/dev` and
load the `nbd` kernel module.
[Ubuntu 14.04 LTS][ubuntu-14] is used for building.
This post assumes the [Android SDK][sdk] and [Android NDK][ndk]
are installed and available in the `ANDROID_SDK` and `ANDROID_NDK`
environment variables.

# Building the nbd kernel module for Android.
The Linux kernel provides many options, drivers, and modules.
Android runs on resource-limited mobile devices,
so the kernel is minimal and the nbd module is disabled by default.
This portion describes how to build and load the nbd kernel module
on Android.

All code in this post will be managed in the `~/nbdroid` directory.
First, obtain and add the ARM compiler executables to the
`PATH` environment variable.

{% highlight bash %}
cd nbdroid
pathadd() { PATH="${PATH:+"$PATH:"}$1"; }
git clone https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6
pathadd $PWD/arm-eabi-4.6/bin
{% endhighlight %}

The following portions are specific to the Galaxy Nexus device.
Find the appropriate repositories for other devices in the
[Building Kernels][building-kernels] portion of the Android documentation.

Get the commit number for the most recent kernel.
This in `fb3c9ac` in the following snippet.

{% highlight bash %}
git clone https://android.googlesource.com/device/samsung/tuna
cd tuna
git log --max-count=1 kernel

commit 8c9a241892d74ecb09c1c9a5eef0848c354f3fb6
Author: Todd Poynor <toddpoynor@google.com>
Date:   Mon Jun 10 18:09:53 2013 -0700

    tuna: prebuilt kernel (ashmem deadlock)

    fb3c9ac ashmem: avoid deadlock between read and mmap calls

cd ..
{% endhighlight %}

Clone the kernel source, checkout the latest commit tag,
and stage the default configuration for the Galaxy Nexus.

{% highlight bash %}
git clone https://android.googlesource.com/kernel/omap.git
export ARCH=arm; export SUBARCH=arm; export CROSS_COMPILE=arm-eabi-
cd omap
git checkout fb3c9ac
make tuna_defconfig
{% endhighlight %}

Edit `.config` and ensure the following lines are set.

{% highlight bash %}
CONFIG_MODULES=y
CONFIG_BLK_DEV_NBD=m
CONFIG_SCSI_WAIT_SCAN=m
{% endhighlight %}

The default Android Linux kernel does not support modules,
and trying to add just the `nbd.ko` file produced with
`make drivers/block/nbd.ko` results in the following error.

{% highlight bash %}
insmod nbd.ko

insmod: init_module 'nbd.ko' failed (Function not implemented)
{% endhighlight %}

Build the entire kernel image with `make -j8`,
which will create the entire image in `arch/arm/boot/zImage`.

Flash `zImage` to the phone by rebooting into the bootloader
and using fastboot.

{% highlight bash %}
adb reboot bootloader
fastboot flash zimage arch/arm/boot/zImage
fastboot reboot
{% endhighlight %}

Next, the nbd kernel module is not manually loaded, so push
the module to the device and insert it into the kernel
with [insmod][insmod].

{% highlight bash %}
adb shell mkdir /sdcard/nbdroid
adb push drivers/block/nbd.ko /sdcard/nbdroid
adb shell
android> su
android> insmod /sdcard/nbdroid/nbd.ko
{% endhighlight %}

If everything is successful up to this point, `lsmod` should
show the `nbd` module.

{% highlight bash %}
android> lsmod
nbd 8104 - - Live 0x00000000
{% endhighlight %}

# Building the nbd client application for ARM/Android.
The nbd client interfaces with the nbd kernel module to
provide a command line utility for initializing nbd devices.
Android doesn't provide this utility by default,
so this portion describes how to compile the nbd client for ARM
with [Android NDK's][android-ndk] r9 standalone toolchain,
available from [here][r9d].

Clone the repository and replace the `mlockall` syscall with
the following error message for `swap` mode.
The following commands will not link with `mlockall`.

{% highlight bash %}
git clone https://github.com/yoe/nbd.git
cd nbd
vim nbd-client.c


{% endhighlight %}

{% highlight C %}
void finish_sock(int sock, int nbd, int swap) {
	if (ioctl(nbd, NBD_SET_SOCK, sock) < 0)
		err("Ioctl NBD_SET_SOCK failed: %m\n");

	if (swap) {
		// mlockall(MCL_CURRENT | MCL_FUTURE);
    printf("Error: mlockall unsupported in ARM build.\n");
    exit(-1);
  }
}
{% endhighlight %}

Use the toolchain's `arm-linux-androideabi-gcc` to compile for ARM.
Ensure the `NDKROOT` environment variable is set.

{% highlight bash %}
die() { echo $*; return -1; }
touch man/nbd-{client.8,server.{1,5},trdump.1}.sh.in
autoreconf -f -i || die "autoreconf failed."

export AR=$NDKROOT/toolchains/arm-linux-androideabi-4.8/prebuilt/linux-x86/bin/arm-linux-androideabi-ar
export LD=$NDKROOT/toolchains/arm-linux-androideabi-4.8/prebuilt/linux-x86/bin/arm-linux-androideabi-ld
export CC=$NDKROOT/toolchains/arm-linux-androideabi-4.8/prebuilt/linux-x86/bin/arm-linux-androideabi-gcc
export CFLAGS="--sysroot=$NDKROOT/platforms/android-18/arch-arm"

./configure --host=armv7-unknown-linux \
  --target=armv7-unknown-linux || die "configure failed"
make nbd-client
{% endhighlight %}

Push the `nbd-client` executable to the sdcard on the phone,
and move it to `/data/nbdroid` because programs on `/sdcard`
cannot be executed.

{% highlight bash %}
adb shell mkdir -p /sdcard/nbdroid
adb push nbd-client /sdcard/nbdroid/
adb shell

android> su
android> mkdir /data/nbdroid
android> cp /{sdcard,data}/nbdroid/nbd-client
android> chmod 700 /data/nbdroid/nbd-client
{% endhighlight %}

`nbd-client` should execute with the following help message.

{% highlight bash %}
android> /data/nbdroid/nbd-client -help

nbd-client version 3.8
Usage: nbd-client host port nbd_device [-block-size|-b block size] [-timeout|-t timeout] [-swap|-s] [-sdp|-S] [-persist|-p] [-nofork|-n] [-systemd-mark|-m]
Or   : nbd-client -name|-N name host [port] nbd_device [-block-size|-b block size] [-timeout|-t timeout] [-swap|-s] [-sdp|-S] [-persist|-p] [-nofork|-n]
Or   : nbd-client -d nbd_device
Or   : nbd-client -c nbd_device
Or   : nbd-client -h|--help
Or   : nbd-client -l|--list host
Default value for blocksize is 1024 (recommended for ethernet)
Allowed values for blocksize are 512,1024,2048,4096
Note, that kernel 2.4.2 and older ones do not work correctly with
blocksizes other than 1024 without patches
Default value for port with -N is 10809. Note that port must always be numeric
{% endhighlight %}

# Creating the nbd block device on Android.
At this point, the nbd code is ready to execute and mount block
devices on Android.
The [mknod][mknod] command to create the file for the block device
is not bundled with Android by default and this portion describes
how to compile the `mknod` utility and create a `/dev/nbd0` device
for the nbd client to use.

Download GNU Darwin's `mknod.c`, which is used in favor of
[GNU coreutil's mknod.c][gnu-mknod] because it will (surprisingly)
compile for ARM without any compile or linking issues.

{% highlight bash %}
cd ~/nbdroid
mkdir mknod
cd mknod
wget http://src.gnu-darwin.org/src/sbin/mknod/mknod.c

$CC mknod.c -o mknod $CFLAGS
{% endhighlight %}

Push `mknod` to the Android device similar to `nbd-client`.

{% highlight bash %}
adb push mknod /sdcard/nbdroid/
adb shell

android> su
android> mkdir /data/nbdroid
android> cp /{sdcard,data}/nbdroid/mknod
android> chmod 700 /data/nbdroid/mknod
{% endhighlight %}

`mknod` should execute with the following help message.

{% highlight bash %}
android> /data/nbdroid/mknod
usage: mknod name [b | c] major minor [owner:group]
{% endhighlight %}

# Demo.
All executables and libraries have been set up.
The following portion presents a short demo of connecting
the nbd client on Android to an nbd server on Linux.

## Preparing the nbd server.
On the server, create a blank 100MB file with `dd`,
mount it to a loop device, and initialize the ext4 filesystem on it.

{% highlight bash %}
dd if=/dev/zero of=/tmp/nbd-file bs=1k count=100000
sudo losetup /dev/loop1 /tmp/nbd-file
sudo mkfs.ext4 /dev/loop1
sudo losetup -d /dev/loop1
{% endhighlight %}

Then, run [QEMU's nbd server][qemu-nbd]
to export the file behind the block device.

{% highlight bash %}
qemu-nbd -p 9001 /tmp/nbd-file
{% endhighlight %}

In another terminal, start a real-time, rudimentary introspection
of the filesystem by combining the [watch][watch] and [strings][strings]
commands.

{% highlight bash %}
watch -n 1 strings /tmp/nbd-file
{% endhighlight %}

<center>
  <img src="/data/2014-09-08/android-nbd-init.png" width="70%"/>
</center>

## Connecting the nbd client on the Android device to the nbd server.
In Android, make a new nbd device and attach to the nbd export
on the server.

{% highlight bash %}
adb shell
android> su
android> /data/nbdroid/mknod nbd0 b 43 0
android> /data/nbdroid/nbd-client <server-ip> 9001 /dev/nbd0

Negotiation: ..size = 97MB
bs=1024, sz=102400000 bytes
{% endhighlight %}

Mount the `nbd0` device and create a file on it.

{% highlight bash %}
android> mkdir /data/nbdroid/nbd-mount
android> mount /dev/nbd0 /data/nbdroid/nbd-mount
android> echo "12345678" > /data/nbdroid/nbd-mount/new-file.txt
{% endhighlight %}

## Observing file changes on the server.
These changes are reflected in the exported file on the server
from the `watch` command.

<center>
  <img src="/data/2014-09-08/android-nbd-changes.png" width="70%"/>
</center>

## Unmounting and detaching nbd
Use the following commands to cleanly disconnect the nbd client.

{% highlight bash %}
android> umount /data/nbdroid/nbd-mount
android> /data/nbdroid/nbd-client -d /dev/nbd0
{% endhighlight %}

[android-ndk]: http://developer.android.com/tools/sdk/ndk/index.html
[block-devices]: http://en.wikipedia.org/wiki/Device_file#BLOCKDEV
[nbd-general]: http://en.wikipedia.org/wiki/Network_block_device
[yoe-nbd]: https://github.com/yoe/nbd/
[nexus-images]: https://developers.google.com/android/nexus/images
[ubuntu-14]: http://releases.ubuntu.com/14.04/
[supersu]: http://download.chainfire.eu/342/SuperSU/UPDATE-SuperSU-v1.43.zip
[sdk]: http://developer.android.com/sdk/index.html
[ndk]: https://developer.android.com/tools/sdk/ndk/index.html
[building-kernels]: https://source.android.com/source/building-kernels.html
[insmod]: http://linux.die.net/man/8/insmod
[r9d]: http://dl.google.com/android/ndk/android-ndk-r9-linux-x86.tar.bz2
[mknod]: http://man7.org/linux/man-pages/man2/mknod.2.html
[gnu-mknod]: http://git.savannah.gnu.org/cgit/coreutils.git/tree/src/mknod.c
[qemu-nbd]: http://manpages.ubuntu.com/manpages/precise/man8/qemu-nbd.8.html
[watch]: http://linux.die.net/man/1/watch
[strings]: http://linux.die.net/man/1/stringshttp://linux.die.net/man/1/strings

