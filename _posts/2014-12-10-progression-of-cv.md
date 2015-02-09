---
layout: post
title: Short progression of my LaTeX/Python resume and CV
tags: [LaTeX,Python]
---

I have maintained my curriculum vitae in LaTeX for over three years.
I enjoy building small systems around the generation process
and my current system is openly available on GitHub at
[bamos/cv](https://github.com/bamos/cv).
This project stores all of my content in YAML and uses
Python with [Jinja2](http://jinja.pocoo.org/) templates to output
LaTeX and Markdown,
which produce [these documents on my website](http://bamos.github.io/cv/).
I just switched to using a new template and
this post shortly presents my experiences with three templates.

# First Version
<center>
  <small>Click the image to view the PDF.</small><br>
  <a href='/data/2014-12-10/cv-1.pdf'>
    <img src='/data/2014-12-10/cv-1.png' width='60%'
      style="border: 1px solid #000000"/>
  </a>
</center>

The internet contains many LaTeX templates for producing a resume or CV.
I first started with `res.cls` by Michael DeCorte,
which is available on CTAN [here](http://www.ctan.org/pkg/res).
This class works well, but I remember some formatting
options with spacing and page sizes being difficult to modify.

# Second Version
<center>
  <small>Click the image to view the PDF.</small><br>
  <a href='/data/2014-12-10/cv-2.pdf'>
    <img src='/data/2014-12-10/cv-2.png' width='60%'
      style="border: 1px solid #000000"/>
  </a>
</center>

Next, I switched to not using a template so that I wouldn't have
to understand the template when I wanted to make a small modification.
This isn't as visually pleasing as other templates
and spacing is still difficult to get right!

# Third Version: Current
<center>
  <small>Click the image to view the PDF.</small><br>
  <a href='/data/2014-12-10/cv-3.pdf'>
  <img src='/data/2014-12-10/cv-3.png' width='60%'
    style="border: 1px solid #000000"/>
  </a>
</center>

I've recently updated my templates to use moderncv,
which is available from CTAN [here](http://www.ctan.org/pkg/moderncv).
moderncv has sensible default formatting options and
provides custom commands for entries.
These templates can be seen in the
[cv/tmpl](https://github.com/bamos/cv/tree/2d101070831724f93cc60ea25d8a986d24a007ab/tmpl) directory in my repo.
