---
layout: post
title: Simple Python script to count word frequencies
tags: [Python]
---

This post introduces a small Python script
[word-counter.py](https://github.com/bamos/python-scripts/blob/master/python3/word-counter.py) to count the word frequencies over sliding
windows or N-grams in my LaTeX and Markdown documents.
This is part of my
[bamos/python-scripts](https://github.com/bamos/python-scripts)
repository, which contains other small Python snippets.

The [btford/write-good](https://github.com/btford/write-good)
project has motivated me to start performing automatic analysis
of the LaTeX and Markdown documents I write.
The Makefile's in my
[bamos/latex-templates](https://github.com/bamos/latex-templates)
project will call `write-good` after compiling a document
to print out an analysis of suggested portions I should rephrase.
My `word-counter.py` script will analyze the word frequencies
in my document to help with phrasing.

For example, the following is the output on the `README`
Markdown file of the `python-scripts` repo.
For LaTeX documents, I use [opendetex](https://code.google.com/p/opendetex/)
to convert the documents to plain text before
using `word-counter.py`.
The number on the left indicates the number of time the
word occurs in the document.

{% highlight bash %}
$ word-counter.py README.md

=== Sliding Window: 1 ===
  15: 'resume'
  9: 'python'
  8: 'using'
  8: 'markdown'
  6: 'scripts'
  6: 'latex,'
  5: 'script'
  5: 'pages'
  5: 'generated'
  5: '[blog'

=== Sliding Window: 2 ===
  5: 'detailed overview.'
  4: 'sliding window:'
  3: 'neue, using'
  3: 'pretty html,'
  3: 'blank pages.'
  3: 'computer science'
  3: 'science student'
  3: 'resumé generator'
  3: 'python scripts'
  3: 'description ----|----|----'

=== Sliding Window: 3 ===
  2: 'pretty html, latex,'
  2: 'undergraduate computer science'
  2: 'html, latex, markdown,'
  2: 'pdf/html resumé generator'
  2: 'computer science student'
  2: 'generates pretty html,'
  2: 'multiple formats (such'
  2: 'commented latex sources'
  2: 'might interest somebody'
  2: 'neue, using xetex,'

=== Sliding Window: 4 ===
  2: 'helvetica neue, using xetex,'
  2: 'pretty html, latex, markdown,'
  2: 'undergraduate computer science student'
  2: 'asymmetric column resume template'
  2: 'generates pretty html, latex,'
  1: 'a.pdf b.pdf c.pdf --modulo'
  1: ''blank pages. merged output''
  1: 'this is a collection'
  1: ''generates pretty html, latex,''
  1: ''asymmetric column resume template''
{% endhighlight %}
