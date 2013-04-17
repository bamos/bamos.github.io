---
layout: post
title: Creating a pdf document from plaintext with vim and Bash
tags: [Bash]
---

Vim's [print](http://vimdoc.sourceforge.net/htmldoc/print.html)
documentation allows printing to a postscript document.
I've commonly done this within vim with the `hardcopy` command,
but I now use a shell script to automate this
and produce a pdf.
This is available on
[GitHub](https://github.com/bamos/simple-shell-scripts/blob/master/createpdf.sh).

The implementation uses vim's
[script/batch](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.4)
mode to call vim from the command line,
[ps2pdf](http://pages.cs.wisc.edu/~ghost/doc/AFPL/6.50/Ps2pdf.htm)
to convert ps files to pdf files,
and Bash's
[here documents](http://tldp.org/LDP/abs/html/here-docs.html)
to feed the command list.

{% highlight bash %}
#!/bin/bash
#
# createpdf.sh
# Creates a printable pdf document from a plaintext file.
#
# Brandon Amos <http://bamos.github.io>
# 2013.04.16

function die { echo $1; exit 42; }

[[ $# != 1 ]] && die "Usage: $0 <plaintext file>"

TEXT_FILE=$1
[[ -a $TEXT_FILE ]] || die "$TEXT_FILE is not a file."

vim -e -s $TEXT_FILE <<EOF
set printoptions=number:y,paper:letter
set printheader=%<%f%h%m%=Page\ %N\ of\ %{line('$')/69+1}
hardcopy > $TEXT_FILE.ps
EOF
ps2pdf14 $TEXT_FILE.ps $TEXT_FILE.pdf
[[ $? != 0 ]] && echo "Unable to create pdf."

rm -f $TEXT_FILE.ps
{% endhighlight %}
