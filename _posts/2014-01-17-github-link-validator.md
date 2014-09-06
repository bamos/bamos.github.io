---
layout: post
title: Validating internal links on Github Wiki Pages with Python
tags: [Python]
---

Github wiki's present a unique problem for link validation because traditional
validation is usually done by checking page response (usually for 404).
However, the default behavior of a Wiki for an invalid link is to direct to a
page creating the page, and there is currently no option to change this.
Creating new pages like this is easy, but in large Wiki's links become
difficult to manage and can lead to difficulties validating links.

[bamos/github-wiki-link-validator][repo] contains
a Python 3.3 script using BeautifulSoup 4
to crawl a published Github wiki and detect
internal links pointing to invalid locations.

For an example, run `link-validator` on the project's
[sample Wiki](https://github.com/bamos/github-wiki-link-validator/wiki).


{% highlight bash %}
$ ./link-validator.py https://github.com/bamos/github-wiki-link-validator/wiki
{% endhighlight %}

+ https://github.com/bamos/github-wiki-link-validator/wiki
  + https://github.com/bamos/github-wiki-link-validator/wiki/links
  + https://github.com/bamos/github-wiki-link-validator/wiki/invalid
+ https://github.com/bamos/github-wiki-link-validator/wiki/B
  + https://github.com/bamos/github-wiki-link-validator/wiki/C
+ https://github.com/bamos/github-wiki-link-validator/wiki/Valid
  + https://github.com/bamos/github-wiki-link-validator/wiki/C
  + https://github.com/bamos/github-wiki-link-validator/wiki/D
  + https://github.com/bamos/github-wiki-link-validator/wiki/E


[repo]: https://github.com/bamos/github-wiki-link-validator
