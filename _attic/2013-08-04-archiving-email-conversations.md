---
layout: post
title: Archiving email conversations to a PDF with Python and LaTeX
tags: [LaTeX, Python]
---

Archiving your email conversations with a friend or coworker
can be interesting. You'll see how many pages your emails
would be if printed (please don't), and you can easily skim
through your messages.

[bamos/mbox-convos](https://github.com/bamos/mbox-convos/)
is a short Python 3.3 program I wrote to match emails
from a person or group of people.
Unfortunately, I only have this working on my Linux machine.
You also might have to help me out to get it to work
for your emails due to the heterogeneity of emails.

See [here](http://bamos.github.io/data/2013-08-05/convos-example.pdf)
for a short example produced by
[this](https://github.com/bamos/mbox-convos/blob/master/example.mbox)
mbox file.

At a high level, `mbox-convos.py` does the following.

1. Reads an `mbox` file and matches messages to or from a
   list of emails.
2. Extracts the messages, including
   [PGP messages](http://bamos.github.io/2013/08/04/python-message-pgp/),
   and creates a LaTeX document.
3. Produces a PDF with `pdflatex`.

# Obtaining an mbox file with getmail.
[getmail](http://pyropus.ca/software/getmail/)
is a useful utility to download an mbox file from POP or IMAP.
Matt Cutts wrote a great
[post](http://www.mattcutts.com/blog/backup-gmail-in-linux-with-getmail)
on how to use this with GMail.

One portion that's not very clear is that POP can only download
a few hundred messages at a time while IMAP can download
all of your messages at once.
See below for the configuration I use to sync with GMail,
located at `~/.getmail/getmail.gmail`.

{% highlight ini %}
[retriever]
type = SimpleIMAPSSLRetriever
server = imap.gmail.com
username = you@gmail.com
password = yourPassword
mailboxes = ("[Gmail]/All Mail",)

[destination]
type = Mboxrd
path = ~/.getmail/gmail-backup.mbox

[options]
verbose = 1
message_log = ~/.getmail/gmail.log
{% endhighlight %}

# Creating a PDF with mbox-convos.
Hopefully from here you won't have much trouble.
Let me know if you do!

Run `mbox-convos.py` on your mbox file to create a PDF.
If you want to decrypt PGP messages,
just add `--gpgDir ~/.gnupg`.

{% highlight bash %}
./mbox-convos.py --emails friend@gmail.com --mboxFile ~/.getmail/gmail-backup.mbox
{% endhighlight %}
