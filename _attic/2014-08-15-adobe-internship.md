---
layout: post
title: Concluding my Adobe Research internship
tags: [News]
pics:
  - /data/2014-07-28/big-sur-1.jpg
  - /data/2014-07-28/big-sur-2.jpg
  - /data/2014-07-28/sf.jpg
  - /data/2014-07-28/santa-cruz.jpg
  - /data/2014-07-28/santa-cruz-2.jpg
  - /data/2014-07-28/20140811_130103.jpg
  - /data/2014-07-28/20140811_144008.jpg
  - /data/2014-07-28/20140811_144044.jpg
  - /data/2014-07-28/20140811_144219.jpg
  - /data/2014-07-28/20140811_144757.jpg
  - /data/2014-07-28/20140811_150515.jpg
  - /data/2014-07-28/20140811_150528.jpg
  - /data/2014-07-28/20140811_150550.jpg
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
  - /data/2014-07-28/20140811_160729.jpg
  - /data/2014-07-28/20140811_161637.jpg
  - /data/2014-07-28/20140811_161642.jpg
---

<link rel="stylesheet" href="/data/2014-07-28/blueimp-gallery.css">

<center><img width="65%" src="/data/2014-07-28/adobe.jpg"/></center>

I've had a great experience interning with
[Adobe Research][adobe-research] in San Jose, California this summer.
I've met a lot of interesting people and have built distributed systems
to split computations of large data sets between many computers
in synchrony using [Scala][scala], [Apache Spark][spark],
[Spray][spray], and [Parquet][parquet].

We have open sourced all of my work as 3 projects on the
[Adobe Research GitHub][adobe-research-github] group.

+ [adobe-research/spindle][spindle] -
  *Next-generation web analytics processing with Scala, Spark, and Parquet.*
+ [adobe-research/spark-cluster-deployment][spark-cluster-deployment] -
  *Automates Spark standalone cluster tasks with Puppet and Fabric.*
+ [adobe-research/spark-parquet-thrift-example][spark-parquet-thrift-example] -
  *Example Spark project using Parquet as a columnar store with Thrift objects.*

My paper "Performance study of Spindle, a web analytics query engine
implemented in Spark" has been accepted to the [CloudCom 2014][cloudcom]
conference in Singapore, where I'll be presenting the work.

## Bay Area
I've had a lot of fun exploring the Bay Area as an intern.
Check out some of my favorite pictures below!
Also, see [http://bamos.github.io/pics](http://bamos.github.io/pics)
for my entire picture collection.

<div id="blueimp-gallery" class="blueimp-gallery">
  <div class="slides"></div>
  <h3 class="title"></h3>
  <a class="prev">‹</a>
  <a class="next">›</a>
  <a class="close">×</a>
  <a class="play-pause"></a>
  <ol class="indicator"></ol>
</div>

<div id='links' style="clear: both; text-align: left">
  {% capture cache %}
  {% for pic in page.pics %}
<a href="{{pic}}" data-gallery>
  <img src="{{pic}}" height='150em'/>
</a>
  {% endfor %}
  {% endcapture %}
{{ cache | strip_newlines }}
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
[parquet]: http://parquet.incubator.apache.org

[spindle]: https://github.com/adobe-research/spindle
[spark-cluster-deployment]: https://github.com/adobe-research/spark-cluster-deployment
[spark-parquet-thrift-example]: https://github.com/adobe-research/spark-parquet-thrift-example

[cloudcom]: http://2014.cloudcom.org/
