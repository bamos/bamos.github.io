---
layout: post
title: Concluding my internship with Adobe Research.
tags: [News]
pics:
  - /data/2014-07-28/big-sur-1.jpg
  - /data/2014-07-28/big-sur-2.jpg
  - /data/2014-07-28/sf.jpg
  - /data/2014-07-28/santa-cruz.jpg
  - /data/2014-07-28/20140811_130103.jpg
  - /data/2014-07-28/20140811_144008.jpg
  - /data/2014-07-28/20140811_144044.jpg
  - /data/2014-07-28/20140811_144219.jpg
  - /data/2014-07-28/20140811_144757.jpg
  - /data/2014-07-28/20140811_150515.jpg
  - /data/2014-07-28/20140811_150528.jpg
  - /data/2014-07-28/20140811_150550.jpg
  - /data/2014-07-28/20140811_150555.jpg
  - /data/2014-07-28/20140811_150643.jpg
  - /data/2014-07-28/20140811_150724.jpg
  - /data/2014-07-28/20140811_150830.jpg
  - /data/2014-07-28/20140811_150909.jpg
  - /data/2014-07-28/20140811_150943.jpg
  - /data/2014-07-28/20140811_151014.jpg
  - /data/2014-07-28/20140811_152214.jpg
  - /data/2014-07-28/20140811_154741.jpg
  - /data/2014-07-28/20140811_154915.jpg
  - /data/2014-07-28/20140811_155543.jpg
  - /data/2014-07-28/20140811_160355.jpg
  - /data/2014-07-28/20140811_160551.jpg
  - /data/2014-07-28/20140811_160729.jpg
  - /data/2014-07-28/20140811_161637.jpg
  - /data/2014-07-28/20140811_161642.jpg
---

<link rel="stylesheet" href="/data/2014-07-28/blueimp-gallery.css">

I've had a great experience interning with [Adobe Research][adobe-research]
in San Jose this summer, and I am writing this post to talk about my experiences.

<center><img width="65%" src="/data/2014-07-28/adobe.jpg"/></center>

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

### Open Source Project: Deploying Spark to a cluster with Puppet and Fabric.
Description in progress.

This project is available from
[adobe-research/spark-cluster-deployment][spark-cluster-deployment].

### Open Source Project: Example Spark project using Parquet as a columnar store.
Description in progress.

This project is available from
[adobe-research/spark-cluster-deployment][spark-parquet-thrift-example].

### Open Source Project: Spindle, a web analytics query engine in Spark.
In progress.

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

[spark-cluster-deployment]: https://github.com/adobe-research/spark-cluster-deployment
[spark-parquet-thrift-example]: https://github.com/adobe-research/spark-parquet-thrift-example
