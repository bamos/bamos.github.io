---
layout: post
title: Detecting duplicate files in 2 directories via shell scripts
tags: [Linux]
---

Detecting duplicate files between 2 directories is straightforward
with a Bash script, but I couldn't find any examples.
Using the following script, I detected 8 duplicate files between a
directory with 1741 files and a directory with 53 files.
It should scale as long as Bash is able to maintain an array containing
information for the files in directory1.
The script is available on
[GitHub](https://github.com/bamos/simple-shell-scripts/blob/master/compare-dirs.sh).

### Example###{: class="vlist"}
<br/>
{% highlight bash %}
./compare-dirs.sh test_dir1 test_dir2
Creating checksums for files in dir1.
Checking files in dir2.
md5:  60b725f10c9c85c70d97880dfe8191b3
dir1: test_dir1/a
dir2: test_dir2/a_renamed

md5:  3b5d5c3712955042212316173ccf37be
dir1: test_dir1/b
dir2: test_dir2/b
{% endhighlight %}
