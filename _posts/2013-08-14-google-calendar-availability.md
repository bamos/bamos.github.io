---
layout: post
title: Printing your availability from Google Calendar or any other ics
tags: [Python]
---

When people used to schedule meetings or phone calls with me,
I looked at [Google Calendar](http://calendar.google.com)
and provided a list of my free time.
I started doing this a lot and wrote a script to automate it.
The purpose of doing this wasn't to save time overall,
but to automate a tedious process and
come up with an interesting implementation.

My solution is a Python 3.3 script, available in my
[bamos/ical-availability](https://github.com/bamos/ical-availability)
GitHub repo.

# Example
Particularly, the script works with Google Calendar private URLs.

{% highlight bash %}
./ical-availability.py -r <private URL> <private URL>
8/14: 11:00-12:00, 14:00-22:00
8/15: 8:00-10:00, 12:00-12:30, 17:15-22:00
8/16: 8:00-10:15
8/17: 10:00-10:30, 20:00-22:00
8/18: 8:00-22:00
{% endhighlight %}

# Usage

{% highlight bash %}
usage: ical-availability.py [-h] [-l file [file ...]] [-r file [file ...]]
                            [-d days] [-f minutes] [-s "HH:MM"] [-e "HH:MM"]

Analyze an iCal and pretty-print your availability.

optional arguments:
  -h, --help            show this help message and exit
  -l file [file ...], --localFiles file [file ...]
                        The local ics files to search.
  -r file [file ...], --remoteFiles file [file ...]
                        The remote ics files to search.
  -d days, --daysAway days
                        The number of days to look, including the current day.
                        Defaults to 5.
  -f minutes, --freeTime minutes
                        The minimum time interval for free time in minutes.
                        Defaults to 30 minutes.
  -s "HH:MM", --startTime "HH:MM"
                        The time to start every day. Defaults to 8:00.
  -e "HH:MM", --endTime "HH:MM"
                        The time to end every day. Defaults to 22:00.
{% endhighlight %}

# Implementation
Particularly, the implementation uses an
[interval tree](http://en.wikipedia.org/wiki/Interval_tree)
[implementation](https://code.google.com/p/bpbio/source/browse/trunk/interval_tree/interval_tree.py)
by Brent Pedersen,
which is a tree data structure used to store overlapping intervals.

The structure of the program is to:

1. Parse all of the calendars and obtain a list of intervals of every event.
   Each interval contains the start and stop value.

   Also, add an interval from the beginning of the day to the current time
   to prevent printing times earlier than the current time.
2. Create an interval tree of the busy times.
3. Obtain the free intervals by looking at the time between intervals.
4. Print the free intervals.
