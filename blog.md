---
layout: layout
title: "Posts"
---

<div class="content">
  <h1>Blog Posts</h1>
  <ul class="listing">
    {% for post in site.posts %}
      {% unless post.draft %}
      <li>
        <span>{{ post.date | date: "%B %e, %Y" }}</span>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
      {% endunless %}
    {% endfor %}
  </ul>
</div>
