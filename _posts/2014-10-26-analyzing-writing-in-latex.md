---
layout: post
title: Analyzing writing in LaTeX documents
tags: [LaTeX]
---

I maintain a collection of LaTeX templates at [bamos/latex-templates][lt]
and have recently added [btford/write-good][wg] to the Makefile's.
`write-good` is a naive linter for English prose and works well on
LaTeX documents.
The following Makefile will output a list of warnings and tips for
improving writing after building the LaTeX documents.

{% highlight make %}
SRC=$(wildcard *.tex)
PDF=$(SRC:.tex=.pdf)

all: $(PDF)
%.pdf: %.tex
	latexmk --pdf $<
	latexmk -c
	write-good $< || true
clean: ; latexmk -C
{% endhighlight %}

I've also refactored the static website generation process
behind my [latex-templates project][lt] to mimic the
process of my [beamer-snippets project][bs].
This project now uses Python 3 with [Jinja][jinja] templates and
[Grunt][grunt] is to deploy to [Github pages][ghp]
with the [grunt-build-control][gbc] plugin.
See below for the before and after screenshots of the webpage.

# Before.
<img src="/data/2014-10-26/before.png" width="70%"/>

# After.
<img src="/data/2014-10-26/after.png" width="70%"/>

[wg]: https://github.com/btford/write-good
[latex]: http://www.latex-project.org/
[make]: http://www.gnu.org/software/make/
[lt]: https://github.com/bamos/latex-templates
[lm]: http://users.phys.psu.edu/~collins/software/latexmk-jcc/
[bs]: https://github.com/bamos/beamer-snippets

[jinja]: http://jinja.pocoo.org/
[grunt]: http://gruntjs.com/
[ghp]: https://pages.github.com/
[gbc]: https://github.com/robwierzbowski/grunt-build-control
[npm]: https://www.npmjs.org/

[bamos/write-good]: https://github.com/bamos/write-good

[pv1]: http://www.lel.ed.ac.uk/~gpullum/passive_loathing.pdf
[pv2]: http://en.wikipedia.org/wiki/English_passive_voice#Advice_in_favor_of_the_passive_voice

[pr]: https://github.com/btford/write-good/pull/31
