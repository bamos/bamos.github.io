---
layout: post
title: Adding similar projects to a GitHub README with Python
tags: [Python]
---

In the open source community, projects are often inspired by related projects.
In some of my projects,
I have a section explicitly describing why my project is unique
with a table summarizing other GitHub projects with their star counts
and descriptions.
The following screenshot is from the `README` in my
[bamos/latex-templates][latex-templates] project.

<center><img src="/data/2014-11-02/latex-templates.png" width="70%"/></center>

I maintain a collection of short Python scripts at
[bamos/python-scripts][python-scripts] and have added
the [github-repo-summary.py][src] script to automatically
generate this table.

In your project's README, you can maintain a list of repositories to
call this script and produce the Markdown table as shown
in the following snippet from [latex-template's README][README-src].

{% highlight html %}
## Git Repositories
<!--
To generate the following list, install https://github.com/jacquev6/PyGithub
and download the `github-repo-summary.py` script from
https://github.com/bamos/python-scripts/blob/master/python3/github-repo-summary.py.
Please add projects to the list in the comment and in the table below.

github-repo-summary.py \
  cmichi/latex-template-collection \
  deedydas/Latex-Templates \
  MartinThoma/LaTeX-examples \
  RichardLitt/latex-templates \
  stevegeek/latex-templates
-->

Generated on 2014-11-02, see the Markdown source of this file for more details.

...
{% endhighlight %}

[latex-templates]: https://github.com/bamos/latex-templates
[python-scripts]: https://github.com/bamos/python-scripts
[src]: https://github.com/bamos/python-scripts/blob/master/python3/github-repo-summary.py
[README-src]: https://raw.githubusercontent.com/bamos/latex-templates/master/README.md
