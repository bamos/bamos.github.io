---
layout: post
title: A LaTeX system for resume's and vitae's in the same documents.
tags: [LaTeX, Linux]
---

I've gone through multiple phases
managing multiple versions of my resume and vitae.
At one point, I had online versions of my 1) resume and 2) vitae
and physical versions of my 3) resume and 4) vitae.
Editing 4 different files and publishing everything is difficult and tedious,
even when making small changes.
Here, I make this process easier by introducing a simple system to manage a
[LaTeX](http://www.latex-project.org/)
resume and vitae using the same files.

See [bamos/latex-resume-cv](https://github.com/bamos/latex-resume-cv)
for the source code of my
[resume](http://bamos.github.io/resume/) and
[vitae](http://bamos.github.io/cv/),
though there's currently not much difference between my resume and vitae.

If you are new to LaTeX,
see [here](http://en.wikibooks.org/wiki/LaTeX/Introduction)
for a high-level introdution
and [here](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.122.6892&rep=rep1&type=pdf)
for a technical introduction.

#### Overview.
The system splits the resume and vitae into separate files
through the use if `\ifresume` and `ifcv` tags.
For example, in the main entry point, `base.tex`,
the title is displayed with:

{% highlight latex %}
\ifcv vit\ae. \else r\`{e}sum\`{e}. \fi
{% endhighlight %}

Output `vitae` if the current document is the vitae,
and output `resume` otherwise.

#### Setting up `\ifresume` and `\ifcv` tags.

To set up tags, create the documents `resume.tex` and `cv.tex`,
define them, and then input a common document, such as `base.tex`.
A sample resume file would look like this:

{% highlight latex %}
\let\ifcv\iffalse
\let\ifresume\iftrue
\input base.tex
{% endhighlight %}

This is it!
Go and craft your resume and vitae in LaTeX
and trim out sections with `\ifresume` and `\ifcv`
control flows!

#### Using a Makefile
Finally, I use a Makefile to build my documents and
output Postscript, PDF, and plain text version.
The following using the `latex` command once
to create a `dvi` of my resume and a second time
to obtain page numbers.
`dvips` is then used to produce a Postscript file
which is then converted to a pdf with `ps2pdf`,
and finally`catdvi` is used to create plaintext.

{% highlight make %}
SRC=cv.tex resume.tex
PS=$(SRC:.tex=.ps)

LATEX=latex
FLAGS=-halt-on-error

all: $(PS) clean-excess

%.ps %.pdf: %.tex base.tex sections/*; \
  $(LATEX) $(FLAGS) $<; \
  $(LATEX) $(FLAGS) $<; \
  dvips -t letter $(<:.tex=.dvi); \
  ps2pdf14 $(<:.tex=.ps); \
	echo -e "Produced with 'catdvi'.\nSee http://bamos.github.io/$(<:.tex=) for PDF." \
    > $(<:.tex=.txt); \
  catdvi $(<:.tex=.dvi) | perl -pe 's/\?/+/g' >> $(<:.tex=.txt);

clean: clean-excess; rm -f *.ps *.pdf
clean-excess: ; rm -f *.aux *.dvi *.log *.out
{% endhighlight %}
