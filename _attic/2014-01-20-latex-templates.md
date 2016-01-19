---
layout: post
title: LaTeX templates.
tags: [LaTeX]
---

[bamos/latex-templates][repo] is a collection of
LaTeX templates I use and have created,
and I've added a very simple `gh-pages` branch so users
can preview the documents:
[http://bamos.github.io/latex-templates](http://bamos.github.io/latex-templates)

The current documents are:

+ `cheatsheet` - [Cheatsheet template][cheatsheet]
+ `hw` - Homework.
+ `ieee-1.8` - [IEEE template][ieee]
+ `listings` - Produce a PDF with source code listings.
+ `quotes` - Quoted environment for responding inline.
+ `statement-concise` - Concise personal statement template.
+ `statement-full` - Longer personal statement template.

`ieee-1.8` and the `cheatsheet` are included for convenience,
and `hw`, `quotes`, and `statement-{concise,full}` are documents
I created with a goal of creating minimal LaTeX documents without
a complicated class, so they can be easily modified.
This same flavor is also present in [my CV][cv],
but the templating to compile to LaTeX and Markdown
adds a layer of complexity.

[repo]: https://github.com/bamos/latex-templates
[cheatsheet]: http://www.stdout.org/~winston/latex/
[ieee]: http://www.ctan.org/tex-archive/macros/latex2e/contrib/IEEEtran/
[cv]: https://github.com/bamos/cv/tree/master/tmpl
