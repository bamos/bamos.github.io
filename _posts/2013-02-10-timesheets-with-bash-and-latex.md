---
layout: post
title: Creating hourly timesheets with Bash and LaTeX
tags: [Bash, LaTeX]
---

__Note:__ I no longer use these scripts, and if I were to start using
them again, I'd use Python and Jinja2 and read timesheet data from YAML
to create a LaTeX document.

This post presents a combination of [LaTeX](http://www.latex-project.org/)
and shell scripts to produce an hourly timesheet.
The shell script parses a plaintext file
containing a table of the amount of hours I work and inserts it into
the LaTeX document template.

These scripts are available on GitHub in the
[timesheets directory](https://github.com/bamos/shell-scripts/tree/master/timesheets) of my
[bamos/shell-scripts](https://github.com/bamos/shell-scripts/)
repository.

# Usage

Create a file with the days of the week as follows. Also, create
a png file with your signature and put them in the same directory
as the script.

{% highlight text %}
Begin | End   | Sat   | Sun   | Mon   | Tue   | Wed   | Thur  | Fri
02/01   02/01   --      --      --      --      --      --      1.25
02/02   02/08   8.75    5.00    0.50    1.00    1.00    1.50    0.00
02/09   02/15   2.00    3.50    4.50    0.00    0.00    1.50    1.25
{% endhighlight %}

Next, run the script and pass the text file as an argument.

{% highlight text %}
./timesheet.sh 2013.02.01.txt
Successfully generated and archived timesheet for '2013.02.01'
{% endhighlight %}

[Example output.](/data/2013-02-10/2013.02.01.pdf)
