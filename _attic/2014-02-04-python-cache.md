---
layout: post
title: Python cache decorator with timeout
tags: [Python]
---

I've written a Python application, [bamos/picasa-map][picasa-map]
that heavily uses the Picasa REST API to load a user's albums and locations,
using Python's [urllib.request][url-req] library for each request.
These requests cause small-scale deployments of my application
to take a few seconds to load, and I wanted to cache the results
so the page will load faster.

[This][so] StackOverflow answer gives a cache decorator that works great,
but I wanted to add a timeout, so that entries in the cache older
than an hour need to be validated.
The modifications below implement such a timeout,
and are working great in my application!
See it [live][picasa-map-heroku].

[functools.lru_cache](https://docs.python.org/3/library/functools.html#functools.lru_cache)
is an alternate to implementing this by hand.

# Modified cache decorator
{% highlight Python %}
class CacheTimeout(Exception): pass

class cache(object):
  def __init__(self, fun):
    self.fun = fun
    self.cache = {}
    self.cache_times = {}

  def __call__(self, *args, **kwargs):
    key  = str(args) + str(kwargs)
    try:
      if time.time() - self.cache_times[key] > 60*60*1: # 1 hour.
        raise CacheTimeout
      return self.cache[key]
    except (KeyError, CacheTimeout):
      self.cache[key] = rval = self.fun(*args, **kwargs)
      self.cache_times[key] = time.time()
      return rval
    except TypeError: # Don't cache if the key isn't valid.
      return self.fun(*args, **kwargs)
{% endhighlight %}

# Usage
{% highlight Python %}
@cache
def get_ET_from_URL(url):
  response = urllib.request.urlopen(url)
  html = response.read().decode("UTF8")
  return ET.fromstring(html)
{% endhighlight %}

[picasa-map]: https://github.com/bamos/picasa-map
[picasa-map-heroku]: http://picasa-map.herokuapp.com
[url-req]: http://docs.python.org/3.3/library/urllib.request.html#module-urllib.request
[so]: http://stackoverflow.com/a/149917/1381755
