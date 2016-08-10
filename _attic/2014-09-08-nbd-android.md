---
layout: post
title: Using network block device on Android
tags: [Android,Linux]
---

**This post describes how to create a network block device
on Android to use storage on a remote server.**
Linux uses [block devices][block-devices] to provide reads and writes
to hardware technology without exposing the hardware characteristics
of the devices.
For example, the first registered hard drive block device mounts
at `/dev/sda`.
A [network block device][nbd-general] enables a remote machine
to provide the content of a block device on a system across the network.
This post is motivated by a class project and describes
how to modify Android's Linux kernel to include `nbd` and
build the user-space `nbd` client as an ARM executable.
An alternate to building these programs manually is to
use [BusyBox](http://www.busybox.net/).

# Practical Use Cases.
Using `nbd` on a resource-limited mobile device will cause
performance and energy issues, but there are use cases
where using nbd to mount a remote block device is helpful.
Inodes or a distributed filesystem can also be used for
these examples, but further experimental results
are needed to determine the best solution.

## Device Management for Corporate Security Policies.
Corporate phones can use a network block device with LVM to mirror
Android's physical block devices as files on a remote server
to synchronize the device containing `/system` to a central
server when employees are on-site.

## Application Behavior Analysis for Malware Detection.
The amount of applications on the marketplace is approaching
1 million, and seemingly benign applications could
perform malicious actions on a user's device.
This use case would involve using nbd with LVM to
mirror the phone's block devices to a remote server
that has the capabilities of streaming the block writes in real time
when an application is performing.

Then, each application can be experimentally profiled and
paired with a sequence of hard disk reads and writes.
These sequences could reveal the nature of the application,
and perhaps a malicious application could somehow gain
privilege escalation and modify the contents of `/system`.

This technique of malware analysis by associating an
application with some stream of events is called *dynamic analysis*,
and my paper [Applying machine learning classifiers to dynamic
Android malware detection at scale][antimalware] further
discusses this approach.

## Filesystem Development Debugging.
Consider a systems-level developer modifying the Android system
and Linux kernel. Some change that she made to a complex internal
function call is causing kernel panics and thinks monitoring
the state of the device's storage leading up to the crash
will help reveal the bug.
Low level filesystem debugging can be done with nbd with LVM
to mirror and stream the hard disk writes to a remote server.

# Prerequisites.
The follow sections use a "yakju" Galaxy Nexus
device with Android 4.3 (JWR66Y) from
[Android's stock Nexus images][nexus-images] rooted
with [SuperSU 1.43][supersu].
Root is necessary to create the block file in `/dev` and
load the `nbd` kernel module.
This has been tested in [Ubuntu 14.04 LTS][ubuntu-14]
and [Arch Linux](https://www.archlinux.org/).

This post assumes the [Android SDK][sdk] and [Android NDK][ndk]
are installed and available in the `ANDROID_SDK` and `ANDROID_NDK`
environment variables.
The command line snippets prefixed with `<android>` should execute
on the Android device, and all others on the Linux computer.

# Building the nbd kernel module for Android.
The Linux kernel provides options, drivers, and modules.
Android's kernel is minimal to support resource-limited mobile devices
and disables the nbd module.
This section describes how to build and load the nbd kernel module
on Android.

All code in this post is managed in the `~/nbdroid` directory.
First, add the ARM compiler executables to the
`PATH` environment variable.

{% highlight bash %}
cd nbdroid
pathadd() { PATH="${PATH:+"$PATH:"}$1"; }
git clone https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6
pathadd $PWD/arm-eabi-4.6/bin
{% endhighlight %}

The following sections are specific to the Galaxy Nexus device.
Find the appropriate repositories for other devices in the
[Building Kernels][building-kernels] section of the Android documentation.

Get the commit number for the most recent kernel,
which is `fb3c9ac` in the following snippet.

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

Edit `.config` and set the following options.

{% highlight bash %}
CONFIG_MODULES=y
CONFIG_BLK_DEV_NBD=m
{% endhighlight %}

Build `nbd.ko` with `make drivers/block/nbd.ko`.
The default Android Linux kernel does not support modules.
Because of this, trying to insert `nbd.ko`
results in the following error.

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
so this section describes how to compile the nbd client for ARM
with android-18, arm-linux-androideabi-4.8, and NDK r10b.

Clone the repository and create a new standalone toolchain
and compile `nbd-client` for ARM.
Ensure the `ANDROID_NDK` environment variable is set.

{% highlight bash %}
die() { echo $*; return -1; }
git clone https://github.com/yoe/nbd.git
cd nbd
touch man/nbd-{client.8,server.{1,5},trdump.1}.sh.in
autoreconf -f -i || die "autoreconf failed."

$ANDROID_NDK/build/tools/make-standalone-toolchain.sh \
  --platform=android-18 \
  --toolchain=arm-linux-androideabi-4.8 \
  --install-dir=$PWD/toolchain

pathadd() { PATH="${PATH:+"$PATH:"}$1"; }
pathadd "$PWD/toolchain/bin"
command -v arm-linux-androideabi-gcc &> /dev/null || exit -1
export SYSROOT=$PWD/toolchain/sysroot
export CC="arm-linux-androideabi-gcc --sysroot=$SYSROOT"
export CXX=arm-linux-androideabi-g++
export LD=arm-linux-androideabi-ld
export RANLIB=arm-linux-androideabi-ranlib
export AR=arm-linux-androideabi-ar
export CROSS_PREFIX=arm-linux-androideabi-
export CFLAGS='-march=armv7-a -mfloat-abi=softfp -mfpu=neon'
export LDFLAGS='-Wl,--fix-cortex-a8'

./configure --host=armv7-unknown-linux --target=armv7-unknown-linux \
  || die "configure failed"
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
is not bundled with Android by default and this section describes
how to compile the `mknod` utility and create a `/dev/nbd0` device
for the nbd client to use.

Download GNU Darwin's `mknod.c`, which is used in favor of
[GNU coreutil's mknod.c][gnu-mknod] because it will (surprisingly)
compile for ARM without any compilation or linking issues.
Recall we set the environment variable `CC` is to the ARM compiler above.

{% highlight bash %}
cd ~/nbdroid
mkdir mknod
cd mknod
wget http://src.gnu-darwin.org/src/sbin/mknod/mknod.c

$CC mknod.c -o mknod $CFLAGS
{% endhighlight %}

Push `mknod` to the Android device.

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
The following section presents a short demo of connecting
the nbd client on Android to an nbd server on Linux.

## Preparing the nbd server.
On the server, create a blank 100MB file with `dd`,
mount it to a loop device, and initialize the ext4 filesystem on it.

{% highlight bash %}
truncate --size 100M /tmp/nbd-file
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

<img src="/data/2014-09-08/android-nbd-init.png" alt="Android NBD initialization"/>

## Connecting the nbd client on the Android device to the nbd server.
In Android, make a new nbd device and attach to the nbd export
on the server.

{% highlight bash %}
adb shell
android> su
android> /data/nbdroid/mknod /dev/nbd0 b 43 0
android> /data/nbdroid/nbd-client <server-ip> 9001 /dev/nbd0

Negotiation: ..size = 97MB
bs=1024, sz=102400000 bytes
{% endhighlight %}

Mount the `nbd0` device and create a file on it.

{% highlight bash %}
android> mkdir /data/nbdroid/nbd-mount
android> mount -r -w -t ext4 /dev/nbd0 /data/nbdroid/nbd-mount
android> echo "12345678" > /data/nbdroid/nbd-mount/new-file.txt
{% endhighlight %}

## Observing file changes on the server.
These changes can be see in the exported file on the server
with the `watch` command.

<img src="/data/2014-09-08/android-nbd-changes.png" alt="Android NBD changes"/>

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
[strings]: http://linux.die.net/man/1/strings
[antimalware]: http://ieeexplore.ieee.org/xpls/abs_all.jsp?arnumber=6583806
