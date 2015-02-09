---
layout: post
title: A quick and dirty analysis of pcap files with tcpflow and foremost
tags: [Bash]
---

__Disclaimer:__ This is a very superficial analysis.

I've recently needed to analyze pcap files from sending a job
across the network and report back on potential data to reverse engineer.
Here, I'll show a really _quick_ preliminary analysis on pcap files
using [tcpflow](https://github.com/simsong/tcpflow)
and [foremost](http://foremost.sourceforge.net/).
Admittedly, this is my first experience with network sniffing,
and hopefully this will help people in a similar position.

To summarize, this extracts files such as `jpg`, `zip`,
`png`, and `html` from a pcap file.

# Sniffing traffic.
This post assumes you've already collected data and need to analyze pcap files.
I personally use [tshark](http://www.wireshark.org/docs/man-pages/tshark.html),
which comes with [Wireshark](http://www.wireshark.org/).
However, the [Wikipedia page](http://en.wikipedia.org/wiki/Pcap) for pcap
files lists a few other tools.

# Analyzing pcap files.
After obtaining pcap files, use `tcpflow` to extract all of the
TCP streams.
`-r` reads from a file,
`-C` prints all contents to the console, and
`-B` prints binary output.

{% highlight bash %}
tcpflow -r pcap -C -B > tcpstreams.out
{% endhighlight %}

Once we have this file, use `foremost` or another
[data carver](http://www.forensicswiki.org/wiki/Tools:Data_Recovery#Carving)
to look at the internal structures of this and extract portions
it can detect.

{% highlight bash %}
foremost tcpstreams.out -o foremost.out
{% endhighlight %}

The `foremost.out` directory will now contain a file `audit.txt`
showing all of the files extracted from the tcp streams,
the extracted files, organized by their file extension.

# Script.
I've made a simple Bash script `analyze-pcap.sh` to automate this process.
This is also located in
[bamos/simple-shell-scripts](https://github.com/bamos/simple-shell-scripts/blob/master/analyze-pcap.sh).

{% highlight bash %}
#!/bin/bash
#
# analyze-pcap.sh
# Use tcpflow and foremost to analyze TCP streams in a pcap file.
#
# Brandon Amos <http://bamos.github.io>
# 2013.07.30

function die { echo $*; exit 42; }

[[ $# != 1 || ! -f $1 ]] && die "Usage: $0 <pcap file>"

TCP_STREAMS=$(mktemp /tmp/tcpflow.XXX)
OUTPUT=${1%.*}.output
tcpflow -r $1 -C -B > $TCP_STREAMS
[[ $? == 0 ]] || die "Error using 'tcpflow'."
foremost $TCP_STREAMS -o $OUTPUT
[[ $? == 0 ]] || die "Error using 'foremost'."
rm -f $TCP_STREAMS report.xml
echo "Output is in '$OUTPUT'."
{% endhighlight %}

# Further analysis.
For an introduction to deeper analysis of pcap files,
Shive Persaud's
[Finding A Needle In A PCAP](http://blogs.cisco.com/security/finding-a-needle-in-a-pcap/)
is particularly well-written.
