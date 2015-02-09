---
layout: post
title: Merging PDFs for printing by adding blank pages with Python
tags: [Python]
---

The printers in my office print a cover page before every job,
and I don't like printing many cover pages if I want to submit
multiple papers separately so that the papers don't overlap.
To overcome this, I use the [merge-pdfs-printable.py][merge-pdfs-printable]
script in my [bamos/python-scripts][python-scripts] GitHub repo.
This script will merge PDF documents and insert blank pages
so that the printed pages won't overlap documents.
The `modulo` option is helpful to print 2 PDF pages per physical
page side.

The script uses [PyPDF2][pypdf2] to merge the documents
and to extract the number of pages
in the input documents and [ghostscript][gs]
to create a blank PDF page.

{% highlight bash %}
$ merge-pdfs-printable.py a.pdf b.pdf c.pdf --modulo 4
a.pdf
 + Pages: 6
 + Added 2 blank pages.
b.pdf
 + Pages: 13
 + Added 3 blank pages.
c.pdf
 + Pages: 13
 + Added 3 blank pages.
Merged output is in '/tmp/tmpm2n5g0mh-merge.pdf'.
{% endhighlight %}

Note: Some of my decrypted PDF documents have resulted in
`PyPDF2.utils.PdfReadError: file has not been decrypted`.
My current workaround solution is to run `pdf2ps` on
the PDF and then `ps2pdf` on the PS file.

[gs]: http://www.ghostscript.com/doc/current/Use.htm
[pypdf2]: https://github.com/mstamy2/PyPDF2
[python-scripts]: https://github.com/bamos/python-scripts
[merge-pdfs-printable]: https://github.com/bamos/python-scripts/blob/master/python3/merge-pdfs-printable.py
