---
layout: post
title: Map marker onclick with Maplace.js
tags: [JavaScript]
---

[maplace.js][maplace] provides a convenient [jQuery][jq] wrapper around
the [Google Maps API][gm].
When using the Google Maps API directly, adding listeners to markers
to handle click events is [documented][handler-doc].
However, adding marker listeners using maplace.js is slightly different.
The `afterCreateMarker` event function has to be overridden,
and there is currently no documentation for overriding these functions
outside of the [source][src].
To do add a click listener, create a Maplace object, then overload it with
the following.

{% highlight javascript %}
var m = new Maplace({
  locations: [
    {
      lat: 45.9,
      lon: 10.9,
      url: "http://google.com"
    }
  ]
});
m.o.afterCreateMarker = function (index, location, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    window.open(this.url);
  });
};
m.Load();
{% endhighlight %}

[maplace]: https://github.com/danielemoraschi/Maplace.js
[jq]: http://jquery.com/
[gm]: https://developers.google.com/maps/documentation/javascript/libraries
[handler-doc]: https://developers.google.com/maps/documentation/javascript/markers
[src]: https://github.com/danielemoraschi/maplace.js/blob/master/src/maplace.js
