---
layout: post
title: A Makefile for LaTeX to OpenDocument (odt) or Word (doc) conversion.
tags: [LaTeX]
---

Sometimes my professors require Word documents to be submitted
for easier review rather than PDF or other formats.
There are many tools to help this conversion,
such as
[TeX4ht](http://stuff.mit.edu/afs/athena/system/i386_deb50/os-ubuntu-9.04/usr/share/doc/tex4ht/html/])
to convert (La)TeX to HTML and odt.
Further, [dagwieers/unoconv](https://github.com/dagwieers/unoconv)
is able to convert from odt to doc.

I've added a Makefile and example file to
[bamos/latex-templates](https://github.com/bamos/latex-templates/tree/master/hw-doc)
to automate the use both of these tools with
[Make](http://www.gnu.org/software/make/).
Just make sure both `TeX4ht` and `unoconv` are installed
and available on your `PATH` before running.

#### Makefile
{% highlight make %}
SRC=$(wildcard *.tex)
FLAGS=-halt-on-error
PDF=$(SRC:.tex=.pdf)
ODT=$(SRC:.tex=.odt)
DOC=$(SRC:.tex=.doc)

EXTRA_FILES=*.aux *.log *.idv *.html *.css *.4ct *.4tc *.lg *.dvi *.tmp *.xref

all: $(PDF) $(ODT) $(DOC) clean-extra
%.pdf: %.tex; pdflatex $(FLAGS) $<; pdflatex $(FLAGS) $<
%.odt: %.tex; mk4ht oolatex $<
%.doc: %.odt; unoconv -f doc $<
clean-extra: ; rm -f $(EXTRA_FILES)
clean: clean-extra; rm -f $(PDF) $(ODT) $(DOC)
{% endhighlight %}

#### Example file.
Note this requires
[hwdoc.cls](https://github.com/bamos/latex-templates/blob/master/hw-doc/hwdoc.cls),
provided below and in the repository.
{% highlight latex %}
\documentclass[12pt]{hwdoc}
\usepackage[hmargin=0.55in, vmargin=0.5in]{geometry}

% If the PDF is printed, include page numbers.
% Headers or footers won't show up.
\usepackage{fancyhdr}
\pagestyle{fancy}
\usepackage{lastpage}
\cfoot{Page \thepage\ of \pageref{LastPage}}
\renewcommand{\headrulewidth}{0pt}

\begin{document}

\headerline{\today}
{\bf Class - Homework.}
{Brandon Amos} \\

\problem{1}
Quotes.
\begin{quote}
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet 
  dictum urna, sed vehicula ligula commodo eu.
\end{quote}

\problem{2}
Enumerated lists. Warning - These convert with duplicated numbers!
\begin{enumerate}
  \item Pellentesque at congue sem. Proin pharetra risus 
    eget augue auctor nec mattis justo ornare. Suspendisse eleifend 
    egestas est, a vulputate orci eleifend eu. Vestibulum dapibus 
    pellentesque luctus. Praesent blandit rhoncus ligula vel tristique. 
  \item Mauris est metus, laoreet a consequat non, condimentum ut neque. In 
    sed quam vitae turpis molestie placerat posuere ut mauris. Mauris non leo a
    tellus sagittis dignissim. Aenean in nisi eros.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
\end{enumerate}

\problem{3}
Bulleted lists.
\begin{itemize}
  \item Pellentesque at congue sem. Proin pharetra risus 
    eget augue auctor nec mattis justo ornare. Suspendisse eleifend 
    egestas est, a vulputate orci eleifend eu. Vestibulum dapibus 
    pellentesque luctus. Praesent blandit rhoncus ligula vel tristique. 
  \item Mauris est metus, laoreet a consequat non, condimentum ut neque. In 
    sed quam vitae turpis molestie placerat posuere ut mauris. Mauris non leo a
    tellus sagittis dignissim. Aenean in nisi eros.
    Lore
\end{itemize}

\problem{4}
Listings.
\begin{lstlisting}
int main() {
  return 0;
}
\end{lstlisting}

\end{document}
{% endhighlight %}

#### LaTeX class.
{% highlight latex %}
\ProvidesClass{hwdoc}
\LoadClassWithOptions{article}
\RequirePackage{url,graphicx,tabularx,array,amsmath, amsfonts,
amsthm,enumerate}

\RequirePackage{enumitem}
\setlength{\parskip}{1ex}
\setlength{\parindent}{0pt}

\RequirePackage[T1]{fontenc}

\newcommand{\problem}[1]{\textbf{Problem #1} \newline}

\usepackage{color}
\usepackage{listings, textcomp}
\lstset{
  language=C,
  basicstyle=\footnotesize,commentstyle=\textit,stringstyle=\upshape,
  upquote=true,
  numbers=left,numberstyle=\footnotesize,stepnumber=1,numbersep=5pt,
  backgroundcolor=\color{white},
  showspaces=false,showstringspaces=false,showtabs=false,
  frame=single,tabsize=2,
  breaklines=true,breakatwhitespace=true,escapeinside={\%*}{*)}
}

% http://tex.stackexchange.com/questions/55472
\newcommand{\headerline}[3]{
\par\medskip\noindent
\makebox[\textwidth][s]{\rlap{#1}\hfill{#2}\hfill\llap{#3}}}
{% endhighlight %}
