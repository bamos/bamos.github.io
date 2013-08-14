---
layout: post
title: Printing your availability from Google Calendar or any other ics.
tags: [Python]
---

When people used to schedule meetings or phone calls with me,
I looked at [Google Calendar](http://calendar.google.com)
and provided a list of my free time.
I started doing this a lot and wrote a script to automate it.
The purpose of doing this wasn't to save time overall,
but to automate a tedious process and
come up with an interesting implementation.

The Python script is available at
[bamos/ical-availability](https://github.com/bamos/ical-availability).

#### Example.
Particularly, the script works with Google Calendar private URLs.

{% highlight bash %}
./ical-availability.py -r <private URL> <private URL>
8/14: 11:00-12:00, 14:00-22:00
8/15: 8:00-10:00, 12:00-12:30, 17:15-22:00
8/16: 8:00-10:15
8/17: 10:00-10:30, 20:00-22:00
8/18: 8:00-22:00
{% endhighlight %}

#### Usage.

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

#### Implementation.
Particularly, the implementation uses an
[interval tree](http://en.wikipedia.org/wiki/Interval_tree)
[implementation](https://code.google.com/p/bpbio/source/browse/trunk/interval_tree/interval_tree.py)
by Brent Pedersen,
which is a tree data structure used to store overlapping intervals.

The basic structure of the program is to:

1. Parse all of the calendars and obtain a list of intervals of every event. 
   Each interval contains the start and stop value.

   Also, add an interval from the beginning of the day to the current time
   to prevent printing times earlier than the current time.
2. Create an interval tree of the busy times.
3. Obtain the free intervals by looking at the time between intervals.
4. Print the free intervals.

{% highlight python %}
#!/usr/bin/env python3.3
#
# ical-availability.py
# Analyze an iCal and pretty-print your availability.
#
# Brandon Amos <http://bamos.github.io>
# 2013.08.09

import argparse
import sys
import urllib.request

from calendar import timegm,monthrange
from datetime import date,datetime
from tempfile import TemporaryFile
from time import localtime,mktime,strftime,strptime,time

from IntervalTree import *

class TimeInterval(Interval):
  def __repr__(self):
    return "TimeInt({0}, {1})".format(fromEpochTime(self.start),
        fromEpochTime(self.stop))

def toEpochTime(year, month, day, hour=0, minute=0, second=0):
  # Local time!
  Y = str(year); m = str(month).zfill(2); d = str(day).zfill(2)
  H = str(hour).zfill(2); M = str(minute).zfill(2); S = str(second).zfill(2)
  return mktime(strptime(Y+m+d+H+M+S, "%Y%m%d%H%M%S"))

def fromEpochTime(t):
  # Local time!
  return strftime("%Y-%m-%d %H:%M:%S", localtime(t))

def parseTime(timeStr):
  # http://www.kanzaki.com/docs/ical/dateTime.html
  if timeStr.endswith('Z'):
    # UTC time!
    return timegm(strptime(timeStr, "%Y%m%dT%H%M%SZ"))
  elif timeStr.beginswith('TZID='):
    raise Exception("Time zone references are currently not supported.")
  else:
    raise Exception("Local time is currently not supported.")

def parseCalendars(localFiles, remoteFiles):
  tmpRemoteFiles = []
  for url in remoteFiles:
    tmpFile = TemporaryFile()
    response = urllib.request.urlopen(url)
    tmpFile.write(response.read())
    tmpFile.seek(0)
    tmpRemoteFiles.append(tmpFile)

  events = []
  if not localFiles:
    localFiles = []
  for f in localFiles + tmpRemoteFiles:
    if isinstance(f, str):
      f = open(f, 'rb')
    inEvent = False; start = end = None
    for line in f:
      line = line.strip().decode()
      if line == 'BEGIN:VEVENT':
        inEvent = True
      elif line == 'END:VEVENT':
        inEvent = False
        # Don't do anything with day-long events.
        if start and end:
          events.append(TimeInterval(start, end))
        start = end = summary = None
      elif inEvent and line.startswith('DTSTART:'):
        start = parseTime(line[8:])
      elif inEvent and line.startswith('DTEND:'):
        end = parseTime(line[6:])

    for f in tmpRemoteFiles:
      f.close()
  return events

def parseTimeStr(s):
  time = s.split(":")
  if len(time) == 2 and len(time[0]) in [1,2] and len(time[1]) == 2:
    time = [int(e) for e in time]
    if time[0] >= 0 and time[0] <= 23 and \
       time[1] >= 0 and time[1] <= 59:
      return time
  raise Exception("Invalid start or end time. Must be HH:MM")

def getAvailableTimes(intervalTree, daysAway, startTime, endTime, freeTime):
  startTime = parseTimeStr(startTime); endTime = parseTimeStr(endTime)
  availableTimes = []

  today = datetime.now().date()
  (year, month, day) = (today.year, today.month, today.day)
  daysInMonth = monthrange(year, month)[1]

  # Time for unavailable times each day.
  for i in range(daysAway):
    dailyTimes = []

    dayStart = toEpochTime(year, month, day, startTime[0], startTime[1]);
    dayEnd = toEpochTime(year, month, day, endTime[0], endTime[1]);
    busyTimes = [TimeInterval(toEpochTime(year, month, day), dayStart)]
    busyTimes += intervalTree.find(dayStart, dayEnd)
    busyTimes.append(TimeInterval(dayEnd,toEpochTime(year,month,day,23,59)))
    for idx,time in enumerate(busyTimes):
      if idx + 1 < len(busyTimes) and time.stop < busyTimes[idx+1].start:
        if (busyTimes[idx+1].start - time.stop)/60.0 >= freeTime:
          dailyTimes.append(TimeInterval(time.stop, busyTimes[idx+1].start))
    if dailyTimes:
      availableTimes.append(dailyTimes)
        
    if day + 1 > daysInMonth:
      if month + 1 > 12:
        year += 1; month = 1; day = 1
      else:
        month += 1; day = 1
      daysInMonth = monthrange(year, month)[1]
    else:
      day += 1

  return availableTimes

if __name__ == '__main__':
  parser = argparse.ArgumentParser(
    description="Analyze an iCal and pretty-print your availability.")
  parser.add_argument('-l', '--localFiles', type=str, nargs="+",
      metavar='file', help="The local ics files to search.")
  parser.add_argument('-r', '--remoteFiles', type=str, nargs="+",
      metavar='file', help="The remote ics files to search.")
  parser.add_argument('-d', '--daysAway', type=int, default=5, metavar='days',
      help="The number of days to look, including the current day. " +
        "Defaults to 5.")
  parser.add_argument('-f', '--freeTime', type=int, default=30,
      metavar='minutes', help="The minimum time interval for free time in " +
        "minutes. Defaults to 30 minutes.")
  parser.add_argument('-s', '--startTime', type=str, default="8:00",
      metavar='"HH:MM"', help="The time to start every day. Defaults to 8:00.")
  parser.add_argument('-e', '--endTime', type=str, default="22:00",
      metavar='"HH:MM"', help="The time to end every day. Defaults to 22:00.")
  args = parser.parse_args()

  if not args.localFiles and not args.remoteFiles:
    raise Exception("Must provide local or remote files.")

  times = parseCalendars(args.localFiles, args.remoteFiles)

  # Add the time from the beginning of day to now.
  today = datetime.now().date()
  year = today.year; month = today.month; day = today.day;
  todayEpoch = toEpochTime(year, month, day)
  times.append(TimeInterval(time(), todayEpoch))

  intervalTree = IntervalTree(times)

  availableTimes = getAvailableTimes(intervalTree,args.daysAway,
      args.startTime, args.endTime, args.freeTime)

  for day in availableTimes:
    dayStr = strftime("%m/%d", localtime(day[0].start)).lstrip("0")
    times = []
    for time in day:
      times.append("{0}-{1}".format(
          strftime("%H:%M", localtime(time.start)).lstrip("0"),
          strftime("%H:%M", localtime(time.stop))))
    print("{0}: {1}".format(dayStr, ", ".join(times)))
{% endhighlight %}
