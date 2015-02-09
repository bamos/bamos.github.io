---
layout: post
title: Running virtual X11 sessions
tags: [Linux]
---
This is a short guide documenting my experiences
configuring a virtual X framebuffer on a headless CentOS 6.4.

Specifically, I needed the functionality on a cluster
to start graphical applications on the nodes.
Previously, I forwarded X11 and was able to start
graphical applications with the caveats:

1. The forwarded X11 session has to be forwarded before
   starting graphical applications.
2. The sessions are not persistent after disconnecting.

After some searching, I found a few free software projects
providing services I need.

+ [NoMachine NX](http://nomachine.com) - An enterprise
  multi-platform solution for remote access and virtual
  desktop delivery.
+ [Xpra](http://xpra.org) - Screen for X.

While these applications do what I want, the installation,
configuration, and learning curve caused me to seek
a lightweight solution.

Using tools provided with `xorg-server` gives a simple way to
accomplish my goal of having X sessions on my headless server.
Further, all of the applications I'm using are available
in the default CentOS repositories.

# Starting Xvfb.
[Xvfb](http://en.wikipedia.org/wiki/Xvfb) provides an X11 server
that can run on memory and not show any screen output.
On the remote server, start `Xvfb` on display ":1".

{% highlight bash %}
remote$ Xvfb :1 &
{% endhighlight %}

# Starting applications and a windowing manager.
Now, we can change the environment variable DISPLAY
to point to the new display.

{% highlight bash %}
remote$ export DISPLAY=localhost:1.0
{% endhighlight %}

Then, start fluxbox or another window manager.

{% highlight bash %}
remote$ fluxbox &
{% endhighlight %}

Graphical applications can be started as normal,
and their display will run on the display.
For example, start 2 instances of `xclock`.

{% highlight bash %}
remote$ xclock &
remote$ xclock &
{% endhighlight %}

# VNC configuration.
To connect to the display, start a VNC server on it.
[x11vnc](http://www.karlrunge.com/x11vnc/) works
well for this.
Beware of the `-nopw` option if you are planning on
directly accessing the vnc server.

{% highlight bash %}
remote$ x11vnc -display :1 -bg -nopw -listen localhost -xkb -forever
{% endhighlight %}

Connect clients from your client computer by using `ssh` with
X11 forwarding. Note that I have had issues with the vnc client
crashing by using the `-X` option that enables X11 security extensions.
Enabling trusted forwarding with `-Y` fixes these crashes for me.

{% highlight bash %}
client$ ssh -Y remote
{% endhighlight %}

Now, start a VNC client and connect to the server on the remote display
to view the virtual X11 session, to include the 2 `xclock`
interfaces we started earlier.

{% highlight bash %}
ssh-remote$ vncviewer localhost:5900
{% endhighlight %}
