---
layout: post
title: Preventing passive voice in LaTeX documents.
tags: [LaTeX]
---

I'm two months into a CS Ph.D. program and all my LaTeX writing
is technical.
I often place the passive voice in technical documents where the active
voice better suits and have been searching for ways to automatically
prevent using the passive voice.
I recognize that using the passive voice can be favorable,
as [this article][pv1] and [Wikipedia][pv2] describe, but
I want to break my bad habit of misusing the passive voice.

I've found the [btford/write-good][wg] project, which is a
native linter for English prose
and works well on plaintext [LaTeX][latex] documents.
I've updated the [Makefile's][make] in my
[latex-templates project][lt] to use `write-good`
and refuse to build documents containing passive voice.
I see forcing the active voice in LaTeX document as using the
`-Werror` flag in C and C++ programs.
All other messages are output as warnings after building.

The following snippet is a Makefile from my latex-templates project
with this behavior, which also uses [latexmk][lm] to build the document.
This includes false positives from LaTeX commands such as `\huge`,
but I intend to create a project to intelligently run `write-good`
and other writing analysis tools on LaTeX documents.

Note: The return status and correct flag handling are available in my
fork at [bamos/write-good][bamos/write-good].

{% highlight make %}
SRC=$(wildcard *.tex)
PDF=$(SRC:.tex=.pdf)

all: $(PDF)
%.pdf: %.tex
	write-good --passive $< || \
		echo "Warning: write-good not installed. Not checking for passive voice."
	latexmk --pdf $<
	latexmk -c
	write-good --no-passive $< || true
clean: ; rm -rf *.aux *.log $(PDF)
{% endhighlight %}

While making these simple modifications to the Makefile's,
I've also refactored the static website generation process
to mimic the process of my [beamer-snippets project][bs],
which uses Python 3 with [Jinja][jinja] templates and
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
