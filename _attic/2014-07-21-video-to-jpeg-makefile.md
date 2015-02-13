---
layout: post
title: Extract the first frame of video files as JPEG images for LaTeX/Beamer
tags: [Make,LaTeX,Linux]
---

[LaTeX][latex]'s and [Beamer][beamer]'s `multimedia` package enables
videos to be referenced and linked in PDF documents with the `\movie` command.
`\movie` does not automatically create a thumbnail of the video,
so the user has to provide a placeholder image or manually specify the
width and height.
My solution is to use [Make][make] to generate an image for the
first frame of every video file.
To use the Makefile below, place all the videos in one directory with the
Makefile and run the command `make` to produce the images.
Use the LaTeX snippet below to place the JPEG and reference to the movie file.

## Makefile.
{% highlight Makefile %}
# This Makefile uses ffmpeg to convert the first frame from all video
# files in the current directory to JPEG images.
# To run, place this Makefile in the directory of video files and
# run `make`.

# Change `.mov` to the file extension of the video files.
MOV=$(wildcard *.mov)
JPG=$(MOV:.mov=.jpg)

# By default, create all JPEG's for all videos.
all: $(JPG)

%.jpg: %.mov
	ffmpeg -i $< -vframes 1 -f image2 $@
{% endhighlight %}

## LaTeX.
{% highlight LaTeX %}
\movie{\includegraphics[width=\textwidth]{videos/a.jpg}}{videos/a.mov}
{% endhighlight %}

[beamer]: http://ctan.mirrors.hoobly.com/macros/latex/contrib/beamer/doc/beameruserguide.pdf
[make]: http://www.gnu.org/software/make/
[latex]: http://www.latex-project.org/
