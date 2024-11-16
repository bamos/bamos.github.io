---
layout: singlePage
title: Animations
---

<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

This page is under construction :)

<ol>
{% for entry in site.data.animations %}
<li style="font-weight: bold;">
<span style="font-weight: normal;">
<!-- <span class='cvdate'>{{ entry.date | date: "%Y" }}</span> -->
<b>{{ entry.title }}</b> [{{ entry.date | date: "%Y" }}] <br/>
{{ entry.description}} <br/>
{% if entry.custom_html %}
{{ entry.custom_html }}
{% else %}
<img src="{{ entry.img_url}}"/>
{% endif %}
<hr/>
</span>
</li>
{% endfor %}
</ol>

<!-- {{ entry }} -->
