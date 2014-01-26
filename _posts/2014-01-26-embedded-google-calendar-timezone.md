---
layout: post
title: Embedded Google Calendar timezone selection.
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

See [this demo][demo], and see the code with timezones removed below. 
Use `jquery` to update the `div` for the Calendar with the static
URL, but replace the timezone `ctz` with the dynamically selected
value from the dropdown box.
When the page loads, use `jstz` to get the timezone, and fallback
to `America/New_York` on error.

## Shortened example.

{% highlight html %}
<select id="ctz" onchange="updateTimezone()">
  <option value="Pacific/Midway">(GMT-11:00) Midway</option> 
  <!-- ... -->
  <option value="Pacific/Kiritimati">(GMT+14:00) Kiritimati</option></select>
</select>

<br/>

<div id="cal-frame"/>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
<script type="text/javascript" src='http://cdn.bitbucket.org/pellepim/jstimezonedetect/downloads/jstz-1.0.4.min.js'></script>
<script type="text/javascript">
function updateTimezone() {
  var selectedTz = $("#ctz").find(":selected")[0].value;
  $("#cal-frame").html(
'<iframe src="https://www.google.com/calendar/embed?' +
    'showTitle=0&amp;' +
    'showPrint=0&amp;' +
    'showCalendars=0&amp;' +
    'mode=WEEK&amp;' +
    'height=600&amp;' +
    'wkst=1&amp;' +
    'bgcolor=%23ffffff&amp;' +
    'src=bdamos%40vt.edu&amp;' +
    'color=%23333333&amp;' +
    'src=vt.edu_85j468bdgiqfc9tn6v6bjbv1ro%40group.calendar.google.com&amp;' +
    'color=%23333333&amp;' +
    'ctz=' + selectedTz + '" ' +
  'style="border-width:0 " ' + 
    'width="800" height="600" ' +
    'frameborder="0" scrolling="no">' +
'</iframe>');
}
$(document).ready(function() {
  var tz = jstz.determine();
  try {
    $("#ctz").val(tz.name());
    updateTimezone();
  } catch (e) {
    $("#ctz").val("America/New_York");
    updateTimezone();
  }
});
</script>
{% endhighlight %}

[google-calendar]: http://google.com/calendar
[embed]: https://support.google.com/calendar/answer/41207?hl=en
[timezones]: /data/2014-01-26/timezones.txt
[jstz]: http://pellepim.bitbucket.org/jstz/
[demo]: http://bamos.io/meet
