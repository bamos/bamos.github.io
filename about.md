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


Hi! I am a Computer Science Ph.D. student at [Carnegie Mellon][cmu]
and obtained a B.S. in Computer Science
from [Virginia Tech][vt] in May 2014.
I'm interested in the intersection of distributed
and mobile computing and am happy to be advised
by [Satya][satya].
For more information, find my publications on
[Google Scholar][scholar] and see [my vitae][cv].

I enjoy contributing to the open-source community
and maintain as many projects as possible on
[GitHub][github], including [this website][website],
which is published with [jekyll][jekyll].

If you'd like to contact me, please email me at
<!-- http://obfuscateplease.com/ -->
<a href="&#109;ailt&#111;:b&#97;&#109;o&#115;&#64;&#99;&#109;&#117;&#46;&#101;&#100;&#117;">&#98;a&#109;&#111;&#115;&#64;&#99;&#109;u&#46;&#101;<span style="display:none">pypbq</span>&#100;<span style="display:none">iqwkq</span>&#117;</a>,
and feel free to use [PGP][pgp].

### Social networks.

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
[pgp]: /pgp
[satya]: http://www.cs.cmu.edu/~satya/
