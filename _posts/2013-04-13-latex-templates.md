---
layout: post
title: Bootstrap LaTeX template classes and Makefile
tags: [LaTeX]
---

I use [LaTeX](http://www.latex-project.org/) whenever possible.
I've started a collection of templates that I've found
and modified at [bamos/latex-templates](https://github.com/bamos/latex-templates).
Currently, this includes templates that I use for
[homework](/data/2013-04-13/hw.pdf) and for
[cheatsheets](/data/2013-04-13/cheatsheet.pdf).

# Generic Makefile for LaTeX
I also use [GNU Make](http://www.gnu.org/software/make/) whenever possible.
I find them slightly cleaner than using
[latexmk](http://www.phys.psu.edu/~collins/software/latexmk-jcc/).
Following is the Makefile that I use for both of these templates,
and can be used for any LaTeX document in general,
with some caveats.
It will automatically detect all LaTeX documents in a directory
and apply `pdflatex` to them, even if the files shouldn't
be compiled separately.
It also won't work with [BibTeX](http://www.bibtex.org/)
for bibliographies.

{% highlight makefile %}
SRC=$(wildcard *.tex)
FLAGS=-halt-on-error
PDF=$(SRC:.tex=.pdf)

all: $(PDF)
%.pdf: %.tex; pdflatex $(FLAGS) $<; pdflatex $(FLAGS) $<
clean: ; rm -rf *.aux *.log $(PDF)
{% endhighlight %}

# Homework
This is the template I use mostly for homework.

See an example [here](/data/2013-04-13/hw.pdf).

## Usage
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

## Class implementation
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


# Cheatsheet
This is a template I use when creating quick reference cards.
This is mostly a fork of [this](http://www.stdout.org/~winston/latex/),
but slightly modified to my tastes.

See an example [here](/data/2013-04-13/cheatsheet.pdf).

## Example
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

## Class implementation
{% highlight latex %}
% http://www.stdout.org/~winston/latex/latexsheet.tex

\ProvidesClass{cheatsheet}
\LoadClassWithOptions{article}
\RequirePackage{url,graphicx,tabularx,array, amsfonts,
amsthm,enumerate, enumitem}

\usepackage{multicol, calc, ifthen}
\usepackage{amsmath}

\usepackage[landscape]{geometry}
\usepackage{graphicx} % includegraphics

\setlength{\parskip}{1ex}
\setlength{\parindent}{0pt}
\setlist{nolistsep}

\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt plus 0.5ex}
\usepackage{enumitem}
\setlist{nolistsep}

\newcommand{\mitem}[2]{ {\tt #1} & #2 \\}
\newcommand{\ttitem}[2]{\mitem{#1}{\tt #2}}

% Dont print section numbers
%~ \setcounter{secnumdepth}{0}

% This sets page margins to .5 inch if using letter paper, and to 1cm
% if using A4 paper. (This probably isnt strictly necessary.)
% If using another size paper, use default 1cm margins.
\ifthenelse{\lengthtest { \paperwidth = 11in}}
	{ \geometry{top=.25in,left=.25in,right=.25in,bottom=.25in} }
	{\ifthenelse{ \lengthtest{ \paperwidth = 297mm}}
		{\geometry{top=1cm,left=1cm,right=1cm,bottom=1cm} }
		{\geometry{top=1cm,left=1cm,right=1cm,bottom=1cm} }
	}

% Turn off header and footer
\pagestyle{empty}
 

% Redefine section commands to use less space
\makeatletter
\renewcommand{\section}{\@startsection{section}{1}{0mm}%
                                {0ex plus 0ex minus 0ex}%
                                {0.5ex plus .2ex}%x
                                {\normalfont\large\bfseries}}
\renewcommand{\subsection}{\@startsection{subsection}{2}{0mm}%
                                {-1explus -.5ex minus -.2ex}%
                                {0.5ex plus .2ex}%
                                {\normalfont\normalsize\bfseries}}
\renewcommand{\subsubsection}{\@startsection{subsubsection}{3}{0mm}%
                                {-0.5ex plus -.5ex minus -.2ex}%
                                {0.5ex plus .2ex}%
                                {\normalfont\small\bfseries}}
\makeatother

% Insert 
% http://tex.stackexchange.com/questions/12262/multicol-and-figures
\newenvironment{Figure}
  {\par\medskip\noindent\minipage{\linewidth}}
  {\endminipage\par\medskip}

\RequirePackage[T1]{fontenc}

\usepackage{color}
\usepackage{listings, textcomp}
\lstset{
  language=C,
  basicstyle=\footnotesize,commentstyle=\textit,stringstyle=\upshape,
  upquote=true,
  numbers=left,numberstyle=\footnotesize,stepnumber=1,numbersep=5pt,
  backgroundcolor=\color{white},
  showspaces=false,showstringspaces=false,showtabs=false,

{% endhighlight %}
