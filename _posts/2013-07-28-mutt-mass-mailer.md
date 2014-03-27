---
layout: post
title: Mutt mass mailer.
tags: [Python]
---

Recently, I've wanted to add an extra layer of organization to my emails.

+ I've wanted to keep a file listing all of the people I want to thank with
  personalized emails to each of them.
+ I've wanted to follow up with a lot of people after inviting them to a
  formal gathering.
+ I've wanted to keep a file listing jobs I wanted to apply to over email,
  with personalized messaged to each of them.

Mutt Mass Mailer (M3) at
[bamos/mutt-mass-mailer](https://github.com/bamos/mutt-mass-mailer)
parses a flat file and uses mutt to email many people different
messages.

An example input file looks like:

{% highlight yaml %}
---Begin M3 Header---
To: person@domain1.com
Subject: M3 Usage
Attach: m3.py
// Lines starting with `//` in the header (not body) are comments.
---End M3 Header---

Hi,

This is a test message to demonstrate M3 (attached).
When reading, the first and last lines are skipped
if they are blank.

---Begin M3 Header---
To: person@domain2.com, person2@domain1.com
CC: person@domain1.com
Subject: M3 Usage
---End M3 Header---
Heyo, (First line not skipped)

This is another test message to demonstrate M3.
Additional checks are made to ensure a message doesn't contain
a mistyped header
For example, M3 also checks for lines starting with
To:, CC:, or Subject:, such as this one, and prompts to
make sure it's not parsing the header of the next message.
{% endhighlight %}

See [bamos/mutt-mass-mailer](https://github.com/bamos/mutt-mass-mailer)
to download and for further usage instructions.
