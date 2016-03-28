---
layout: post
title: "Blog Posts"
---

<ul class="listing">
  {% for post in site.posts %}
    {% unless post.draft %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <div style="float: right">{{ post.date | date: "%B %e, %Y" }}</div>
    </li>
    {% endunless %}
  {% endfor %}
</ul>
