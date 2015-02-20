---
layout: post
title: Detecting duplicate files in 2 directories with Bash
tags: [Bash]
---

Detecting duplicate files between 2 directories is straightforward
with a Bash script, but I couldn't find any examples.
Using the following script, I detected 8 duplicate files between a
directory with 1741 files and a directory with 53 files.
It should scale as long as Bash is able to maintain an array containing
information for the files in directory1.
The script is available from
[bamos/simple-shell-scripts](https://github.com/bamos/simple-shell-scripts/blob/master/compare-dirs.sh).

# Example
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

# Script Overview

First, define functions to check for correctness.
{% highlight bash %}
function die {
    echo $1; exit 1;
}

function check_directory {
    [[ -d "$1" ]] || die "Unable to find directory '$1'"
}
{% endhighlight %}

Define a function to check the contents of directory 1 and
populate an array from md5 checksums of its contents.
{% highlight bash %}
function dir1_contains {
    for (( i=0; i<$DIR1_SIZE; i++ )); do
        [[ ${sums[$i]} == $1 ]] && return 0
    done
    return 1
}

function populate_dir1_arrays {
    echo "Creating checksums for files in dir1."
    local i=0;
    for f in $DIR1/*; do
        names[$i]=$f
        sums[$i]=`md5sum $f | cut -f 1 -d " "`
        let i++
    done
    DIR1_SIZE=$i
}
{% endhighlight %}

If a match has been found, print it with this helper function.
{% highlight bash %}
function match_found {
    MATCH=1
    echo "md5:  $1"
    echo "dir1: $2"
    echo "dir2: $3"
    echo
}
{% endhighlight %}

Check directory 2 for matches against directory 1. Echo if a
match is found.
{% highlight bash %}
function check_dir2 {
    echo "Checking files in dir2."
    for f in $DIR2/*; do
        dir1_contains `md5sum $f | cut -f 1 -d " "`
        [[ $? == 0 ]] && match_found ${sums[$i]} "${names[$i]}" "$f"
    done
    [[ $MATCH == 1 ]] || echo "No matches found."
}
{% endhighlight %}

Here is where the script starts. Check the arguments and verify the
directories exist. Then, populate an array with the checksums from directory
1 and iterate through directory 2's sums and check the array.
{% highlight bash %}
[[ $# == 2 ]] || die "Usage: ./compare-dirs.sh <dir1> <dir2>"

DIR1=$1; DIR2=$2;
check_directory $DIR1
check_directory $DIR2

populate_dir1_arrays
check_dir2
{% endhighlight %}

# Entire script
{% highlight bash %}
#!/bin/bash
#
# compare-dirs.sh
#
# Compares the files in 2 directories and detects duplicates based
# on MD5 checksums.
#
# Brandon Amos <http://bamos.github.com>
# 2012.12.24

function die {
    echo $1; exit 1;
}

function check_directory {
    [[ -d "$1" ]] || die "Unable to find directory '$1'"
}

function dir1_contains {
    for (( i=0; i<$DIR1_SIZE; i++ )); do
        [[ ${sums[$i]} == $1 ]] && return 0
    done
    return 1
}

function populate_dir1_arrays {
    echo "Creating checksums for files in dir1."
    local i=0;
    for f in $DIR1/*; do
        names[$i]=$f
        sums[$i]=`md5sum $f | cut -f 1 -d " "`
        let i++
    done
    DIR1_SIZE=$i
}

function match_found {
    MATCH=1
    echo "md5:  $1"
    echo "dir1: $2"
    echo "dir2: $3"
    echo
}

function check_dir2 {
    echo "Checking files in dir2."
    for f in $DIR2/*; do
        dir1_contains `md5sum $f | cut -f 1 -d " "`
        [[ $? == 0 ]] && match_found ${sums[$i]} "${names[$i]}" "$f"
    done
    [[ $MATCH == 1 ]] || echo "No matches found."
}

[[ $# == 2 ]] || die "Usage: ./compare-dirs.sh <dir1> <dir2>"

DIR1=$1; DIR2=$2;
check_directory $DIR1
check_directory $DIR2

populate_dir1_arrays
check_dir2
{% endhighlight %}
