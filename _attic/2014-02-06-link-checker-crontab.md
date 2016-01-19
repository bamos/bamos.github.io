---
layout: post
title: Email broken links daily with Python 3 in Linux
tags: [Python,Linux]
---

Broken links are an annoyance on many websites, including this blog.
To fix this, tools such as [linkchecker][linkchecker] are helpful
to locate broken links.
Using `linkchecker` on my website with `--no-warnings` and
`--no-status` still results in 97 warnings and 11 errors,
making the results very difficult to glance through!
Many of the 97 warnings were 8 lines for a denial via `robots.txt`:

<pre>
URL        `https://github.com/bamos/latex-templates/tree/gh-pages//hw'
Name       `hw'
Parent URL http://bamos.github.io/latex-templates/, line 50, col 5
Real URL   https://github.com/bamos/latex-templates/tree/gh-pages/hw
Check time 0.600 seconds
Warning    [http-robots-denied] Access denied by robots.txt,
           skipping content checks.
Result     Valid: 200 OK
</pre>

From `linkchecker`'s output, I wanted something to run daily with
[cron][cron] on my server to email me a concise report only if
errors were encountered, which is what [this][src] Python 3.3 script in
[bamos/simple-python-scripts][sps] does.

Upon error, an email of the following format is sent.

<pre>
Error checking links for http://bamos.github.io

URL        `https://github.com/bamos/simple-shell-scripts/blob/master/re-signer.sh'
Parent URL http://bamos.github.io/2013/03/10/resigning-apk/, line 64, col 570
Result     Error: 404 Not Found

URL        `http://www.troido.de/en/downloadslsmallgsoftware-a-driverslsmallg'
Parent URL http://bamos.github.io/2013/03/10/resigning-apk/, line 64, col 285
Result     Error: 404 Not Found
</pre>

To configure the script for your own purposes, add your
SMTP authentication to the settings and run it in your shell.
Security here might be an issue, so be careful with sensitive data,
and use another method if you feel more secure.
Once this is setup, try first running `linkchecker` on your site
to see the output and to see if there are any errors,
and then try running `link-checker.py` to see if the errors are
sent over email. If this goes well, add a `cron` entry
such as the following one, which runs at 8pm (20:00) daily.


<pre>
0 20 * * * /home/brandon/link-checker.py
</pre>

[cron]: http://en.wikipedia.org/wiki/Cron
[linkchecker]: http://wummel.github.io/linkchecker/
[sps]: https://github.com/bamos/simple-python-scripts
[src]: https://github.com/bamos/simple-python-scripts/blob/master/python3/link-checker.py
