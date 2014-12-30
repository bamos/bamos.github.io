---
layout: post
title: Simple LaTeX Business Card Template
tags: [LaTeX]
---

<center>
<img src='/data/2014-12-30/card-picture.jpg' width='60%'/>
</center>

[LaTeX](http://www.latex-project.org/) is a typesetting system
for high-quality technical documents.
I maintain my LaTeX templates as an open source project on GitHub
at [bamos/latex-templates](https://github.com/bamos/latex-templates)
and have added a simple LaTeX business card template.
You can browse the sources at
[templates/business-cards](https://github.com/bamos/latex-templates/tree/master/templates/business-cards),
or download the tar-archived directory from
[here](http://bamos.github.io/latex-templates/templates/business-cards.tar).
These contain a Makefile and LaTeX document.

This template uses the
[bizcard](http://www.ctan.org/tex-archive/macros/latex/contrib/bizcard)
package to place the cards on the document and the
[marvosym](http://www.ctan.org/pkg/marvosym)
package for email and mouse symbols.
To modify `business-cards.tex`, first remove the `none` parameter
to `bizcard` to show markers indicating the corners of the business card.
Next, you'll likely need to change the `put` command coordinates
to fit with different text sizes because they are anchored at the bottom-left.
I welcome pull requests or comments on how to better anchor the
text areas.
If I make another version in the future, I plan to use
[TikZ](http://sourceforge.net/projects/pgf/) for the design.

The image below shows the output of the template,
and the PDF is available [here](/data/2014-12-30/business-cards.pdf).

<center>
<img src='/data/2014-12-30/business-cards.png' width='60%'/>
</center>
