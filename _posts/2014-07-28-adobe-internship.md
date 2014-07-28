---
layout: post
title: Life as a summer intern at Adobe Research.
tags: [News]
pics:
  - /data/2014-07-28/big-sur-1.jpg
  - /data/2014-07-28/big-sur-2.jpg
  - /data/2014-07-28/sf.jpg
  - /data/2014-07-28/santa-cruz.jpg
---

<link rel="stylesheet" href="/data/2014-07-28/blueimp-gallery.css">

I've had a great experience interning with [Adobe Research][adobe-research]
in San Jose this summer, and I am writing this post to talk about my experiences.

<center><img width="65%" src="/data/2014-07-28/adobe.jpg"/></center>

## Background
I'm entering Carnegie Mellon's Computer Science PhD program in August
to study distributed and mobile systems.
I also strongly support open source software and
maintain an [active GitHub portfolio][bamos-github].
I balance my work between research and advanced development
to contribute to theory and open source projects.

I first heard about Adobe Research when I saw open source projects
on the [Adobe Research GitHub][adobe-research-github] last December.
The combination of research theory with open source technology made
me interested in working with Adobe Research.
I emailed a prominent contributer to the projects regarding
summer internships and he said he was looking for interns.
After talking on the phone with him, he put me in contact
with the HR department and I officially signed on as an intern with him!

## Internship Project
Adobe provides marketing technology to process large amounts of data
using thousands of computers in synchrony, which is a distributed system.
Communication between thousands of computers is difficult, and
Adobe's current solution might not be the most efficient
use of the computers.
My summer project has been to explore open source research
technology and compare techniques of programming the
distributed system for Adobe's needs.
Specifically, I'm using writing a [Scala][scala] application to
create an analytics query engine using [Apache Spark][spark] and [Spray][spray].

In my day-to-day work, Adobe's internal GitHub issue tracker
allows my manager and me to track, discuss, and prioritize my tasks.
For example, one of my tasks could be to create and plot a
performance measure of the distributed system.
Once implementing this, I would attach the code and plot to the issue
for my manager.

Concluding my summer, we're planning to release
open source projects to Adobe Research's GitHub
and are considering writing a short technical report.
My summer with Adobe Research has been fantastic,
and I hope to have another opportunity to collaborate
with the group in the future!

## Bay Area
I've had a lot of fun exploring the Bay Area as an intern.
Check out some of my favorite pictures below!

<div id="blueimp-gallery" class="blueimp-gallery">
  <div class="slides"></div>
  <h3 class="title"></h3>
  <a class="prev">‹</a>
  <a class="next">›</a>
  <a class="close">×</a>
  <a class="play-pause"></a>
  <ol class="indicator"></ol>
</div>

<div id='links' style="clear: both">
  {% for pic in page.pics %}
    <a href="{{pic}}" data-gallery>
      <img src="{{pic}}" height='150em'/>
    </a>
  {% endfor %}
</div>

<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<script src="/data/2014-07-28/blueimp-gallery.js"></script>
<script>
document.getElementById('links').onclick = function (event) {
  event = event || window.event;
  var target = event.target || event.srcElement,
    link = target.src ? target.parentNode : target,
    options = {index: link, event: event},
    links = this.getElementsByTagName('a');
  blueimp.Gallery(links, options);
};
</script>

[adobe-research]: http://www.adobe.com/technology.html
[adobe-research-github]: https://github.com/adobe-research
[bamos-github]: https://github.com/bamos/

[spark]: http://spark.apache.org
[spray]: http://spray.io
[scala]: http://www.scala-lang.org/
