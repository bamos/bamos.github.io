---
layout: post
title: Bootstrap LaTeX template classes and Makefile
tags: [LaTeX]
---

I use [LaTeX](http://www.latex-project.org/) whenever possible.
I've started a collection of templates that I've found
and modified on [GitHub](https://github.com/bamos/latex-templates).

#### Generic Makefile for LaTeX
I also use [GNU Make](http://www.gnu.org/software/make/) whenever possible.
I find them slightly cleaner than using
[latexmk](http://www.phys.psu.edu/~collins/software/latexmk-jcc/).

{% highlight makefile %}
SRC=$(wildcard *.tex)
FLAGS=-halt-on-error
PDF=$(SRC:.tex=.pdf)

all: $(PDF)
%.pdf: %.tex; pdflatex $(FLAGS) $<; pdflatex $(FLAGS) $<
clean: ; rm -rf *.aux *.log $(PDF)
{% endhighlight %}

#### Homework
This is the template I use mostly for homework.

See an example [here](/data/2013-04-13/hw.pdf).

##### Usage
{% highlight latex %}
\documentclass[12pt]{hw}
\usepackage[hmargin=0.55in, vmargin=0.9in]{geometry}

\usepackage{mathtools}

\usepackage{fancyhdr}
\pagestyle{fancy}
\lhead{Dec. 12th, 2012}
\chead{{\bf Assignment \#1}}
\rhead{Brandon Amos}

\usepackage{lastpage}
\cfoot{Page \thepage\ of \pageref{LastPage}}

\begin{document}

\problem{1}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet 
dictum urna, sed vehicula ligula commodo eu. Lorem ipsum dolor sit 
amet, consectetur adipiscing elit. Donec in neque ut quam aliquam 
facilisis nec sit amet massa. Lorem ipsum dolor sit amet, consectetur 
adipiscing elit. Pellentesque at congue sem. Proin pharetra risus 
eget augue auctor nec mattis justo ornare. Suspendisse eleifend 
egestas est, a vulputate orci eleifend eu. Vestibulum dapibus 
pellentesque luctus. Praesent blandit rhoncus ligula vel tristique. 
Mauris est metus, laoreet a consequat non, condimentum ut neque. In 
sed quam vitae turpis molestie placerat posuere ut mauris. Mauris non leo a
tellus sagittis dignissim. Aenean in nisi eros.
{% endhighlight %}

##### Class implementation
{% highlight latex %}
\ProvidesClass{hw}
\LoadClassWithOptions{article}
\RequirePackage{url,graphicx,tabularx,array,amsmath, amsfonts,
amsthm,enumerate}

\RequirePackage{enumitem} % \setlist
\setlength{\parskip}{1ex}
\setlength{\parindent}{0pt}
\setlist{nolistsep}

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
{% endhighlight %}


#### Cheatsheet
This is a template I use when creating quick reference cards.
This is mostly a fork of [this](http://www.stdout.org/~winston/latex/),
but slightly modified to my tastes.

See an example [here](/data/2013-04-13/cheatsheet.pdf).

##### Example
{% highlight latex %}
\documentclass[10pt,landscape]{cheatsheet}

\begin{document}
\footnotesize
\begin{multicols}{3}

\begin{center}
     \Large{\textbf{Example Cheatsheet}} \\
     Brandon Amos
\end{center}

\section{Lorem ipsum}
\subsection{Aenean ut risus dui.}
\begin{tabular}{@{}ll@{}}
    \mitem{Pellentesque}{Eget nisl ut lorem fringilla elementum.}
    \mitem{Curabitur}{Consequat nisi at ligula hendrerit condimentum.}
    \hline
    \mitem{Pellentesque}{Eget nisl ut lorem fringilla elementum.}
    \mitem{Curabitur}{Consequat nisi at ligula hendrerit condimentum.}
\end{tabular}

\section{Dolor sit amet}
\subsection{Curabitur consequat}
Duis scelerisque ligula sed risus pulvinar a blandit nibh elementum. Nullam
in nisl urna, eu tincidunt mi. Aliquam porta velit nec felis accumsan quis
sagittis urna molestie. Morbi aliquam rutrum viverra.

\subsection{Curabitur consequat}
Duis scelerisque ligula sed risus pulvinar a blandit nibh elementum. Nullam
in nisl urna, eu tincidunt mi. Aliquam porta velit nec felis accumsan quis
sagittis urna molestie. Morbi aliquam rutrum viverra.

\begin{Figure}
\centering
\includegraphics[width=\linewidth]{mips.png}
\end{Figure}
{% endhighlight %}
