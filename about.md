---
layout: default
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

[![me](/images/me.jpg)](/images/me-large.jpg)

# About me.
I will be a Computer Science Ph.D. student at [Carnegie Mellon][cmu]
starting in August 2014 and will obtain a B.S. in Computer
Science in May 2014 from [Virginia Tech][vt].
I'm currently interested the intersection of distributed
and mobile computing to enable next-generation mobile applications.
For more information, find my publications on
[Google Scholar][scholar] and see [my vitae][cv].

Furthermore, I enjoy contributing to the open-source community
and maintain as many projects as possible on
[GitHub][github], including [this website][website],
which is published with [jekyll][jekyll].

If you'd like to contact me, please [email me][email],
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
[cv]: ../cv
[github]: http://github.com/bamos
[website]: https://github.com/bamos/bamos.github.io
[jekyll]: http://jekyllrb.com
[email]: http://www.google.com/recaptcha/mailhide/d?k=01isoY3JTKYdPXHqmBRjYYYA==&c=bzTg1_QbUW16izbfjdRV4w==
[pgp]: ../pgp
