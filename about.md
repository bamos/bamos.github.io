---
layout: about
title:  About
social:
  - link: https://www.facebook.com/bdamos
    title: Facebook
    img: /images/social/facebook.png
  - link: http://github.com/bamos
    title: GitHub
    img: /images/social/github.png
  - link: https://plus.google.com/u/0/+BrandonAmos/
    title: Google+
    img: /images/social/googleplus.png
  - link: http://www.linkedin.com/profile/view?id=165493965
    title: LinkedIn
    img: /images/social/linkedin.png
  - link: http://stackexchange.com/users/1318112/highphi
    title: StackExchange
    img: /images/social/stackoverflow.png
  - link: https://twitter.com/brandondamos
    title: Twitter
    img: /images/social/twitter.png
---

# About

Hi! I am a Computer Science Ph.D. student at [Carnegie Mellon][cmu]
and obtained a B.S. in Computer Science
from [Virginia Tech][vt] in May 2014.
I'm interested in distributed and mobile computing and am
happy to be advised by [Satya][satya].
For more information, find my publications on [Google Scholar][scholar],
[my vitae][cv], and my [GitHub profile][github].

This website is published with [jekyll][jekyll]
and [openly available on GitHub][website] under
the MIT license.

<!-- http://www.albionresearch.com/misc/obfuscator.php -->
+ Email: <a href='m&#97;ilto&#58;b&#97;m&#37;6Fs&#64;%63s&#46;cmu&#46;edu'>b&#97;mos&#64;&#99;&#115;&#46;cmu&#46;edu</a> ([PGP](/pgp))
+ IRC: `bdamos` on [Freenode](https://freenode.net/) and
  [OFTC](http://www.oftc.net/).

<br>

<div class="footer-widget-container">
{% for s in page.social %}
  <a href="{{ s.link }}" target="_blank" title="{{ s.title }}">
    <img src="{{ s.img }}" width="32" height="32">
  </a>
{% endfor %}
</div>

[cmu]: http://cs.cmu.edu
[vt]: http://www.cs.vt.edu
[scholar]: http://scholar.google.com/citations?user=CZwrwHAAAAAJ
[cv]: /cv
[github]: https://github.com/bamos
[website]: https://github.com/bamos/bamos.github.io
[jekyll]: http://jekyllrb.com
[satya]: http://www.cs.cmu.edu/~satya/
