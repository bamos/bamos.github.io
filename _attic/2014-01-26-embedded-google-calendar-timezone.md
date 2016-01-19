---
layout: post
title: Embedded Google Calendar timezone selection
tags: [JavaScript]
---

[Google Calendar][google-calendar] is a great way to manage meetings
and schedules across many devices, and offers a convenient
[embedding feature][embed].
The embedding tool allows selection of timezones,
but only produces static HTML for embedding, so users
are not able to change the timezone.

I've created a small hack to fix this so people visiting
my embedded calendar will automatically have the timezone
changed to their timezone using [jstz][jstz].

See the code for [this demo][demo] below,
which uses `jquery` to update the `div` for the
Calendar with the static URL and replaces the timezone `ctz` with the
dynamically selected value from the dropdown box.
When the page loads, use `jstz` to get the timezone, and fallback
to `America/New_York` on error.

<script src="http://gist-it.appspot.com/https://github.com/bamos/bamos.github.io/blob/master/meet.html?footer=minimal"></script>

[google-calendar]: http://google.com/calendar
[embed]: https://support.google.com/calendar/answer/41207?hl=en
[timezones]: /data/2014-01-26/timezones.txt
[jstz]: http://pellepim.bitbucket.org/jstz/
[demo]: http://bamos.github.io/meet
