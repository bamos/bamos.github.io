---
layout: post
title: Aggregate writing quality rankings of text documents
  with a simple Python script.
tags: [Python]
---

I enjoy continuously iterating on the writing of
my papers, blog posts, and project READMEs.
This post presents
[rank-writing.py](https://github.com/bamos/python-scripts/blob/master/python3/rank-writing.py),
a simple Python script to automatically rank the writing quality of
a document list.
This script is openly available on GitHub in my
[bamos/python-scripts](https://github.com/bamos/python-scripts) repository.

# Overview
`rank-writing` sorts a list of files by numeric values
obtained from summarizing the output of
automatic writing analysis programs.
The initial set of analysis programs are
[diction][diction], [write-good][write-good],
and [aspell][aspell].
I plan to add more analysis programs in the future
and welcome [suggestions](https://github.com/bamos/python-scripts/issues) or pull requests.

Automatic writing analysis programs give rough and
possibly invalid suggestions (false positives),
but provide a numeric way to compare the quality.
I am considering ways to ignore the false positives.
One option is to add a simple preprocessing phase to
`rank-writing.py` to read annotations such as
`ignoreNextLine` or `ignoreNextParagraph`.
Another option involving more work could be to add support
to ignore portions to the upstream projects.

## diction
[diction][diction] is GNU software by Michael Haardt
and finds the sentences in a document that contain
phrases from a database of frequently misused, bad, or
wordy diction.

## write-good
[write-good][write-good] is by Brian Ford and provides a linter
for English prose with techniques from
[here](http://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/) and
[here](https://github.com/devd/Academic-Writing-Check).

## aspell
[aspell][aspell] is an interactive spell checker that is
a descendant of [ispell][ispell].
`rank-writing.py` uses aspell to count the number of
spelling errors.
By default, aspell does not include a thorough
technical dictionary and results in a high number of false positives.
I maintain a custom aspell dictionary openly on GitHub in
[.aspell.en.pws][aspell-custom] of my [bamos/dotfiles][dotfiles] repository.

[diction]: https://www.gnu.org/software/diction/
[write-good]: https://github.com/btford/write-good
[aspell]: http://aspell.net/
[ispell]: https://www.gnu.org/software/ispell/
[aspell-custom]: https://github.com/bamos/dotfiles/blob/master/.aspell.en.pws
[dotfiles]: https://github.com/bamos/dotfiles

# Example output and performance
I maintain my blog posts with Jekyll and Markdown on GitHub
in [_posts][_posts] at [bamos/bamos.github.io][blog].
The following shows the beginning and the end of
`rank-writing.py` on my posts.
The top posts have a large number of false positives from
diction from having inline source code.

{% highlight yaml %}
$ rank-writing.py *.yaml

=== 2013-05-03-scraping-tables-python.md ===
  Total: 53
  ├── aspell: 0
  ├── diction: 34
  └── write-good: 19

=== 2014-09-08-nbd-android.md ===
  Total: 45
  ├── aspell: 0
  ├── diction: 31
  └── write-good: 14

...

=== 2014-10-26-analyzing-writing-in-latex.md ===
  Total: 0
  ├── aspell: 0
  ├── diction: 0
  └── write-good: 0

=== 2013-04-16-pdf-from-plaintext.md ===
  Total: 0
  ├── aspell: 0
  ├── diction: 0
  └── write-good: 0
{% endhighlight %}

I have 47 blog posts and the entire script runs in 4.551 seconds,
or around milliseconds per post.
Future work is to optimize the script
with a Python thread or process pool if performance becomes an issue.

# Running a subset of the writing analysis programs.
`rank-writing.py` provides command-line arguments to run a subset of
the available tools to avoid large amounts of aspell false positives.
The options `--aspell`, `--diction`, `--write-good` communicate
these subsets,
as shown in the following example that only runs `aspell` and `write-good`.

{% highlight yaml %}
$ rank-writing.py --aspell --write-good *.md

=== 2013-05-03-scraping-tables-python.md ===
  Total: 19
  ├── aspell: 0
  └── write-good: 19

=== 2014-07-05-music-organizer.md ===
  Total: 17
  ├── aspell: 0
  └── write-good: 17

...

=== 2013-04-16-pdf-from-plaintext.md ===
  Total: 0
  ├── aspell: 0
  └── write-good: 0

=== 2013-03-11-mirroring-android.md ===
  Total: 0
  ├── aspell: 0
  └── write-good: 0
{% endhighlight %}

[blog]: https://github.com/bamos/bamos.github.io
[_posts]: https://github.com/bamos/bamos.github.io/tree/master/_posts
