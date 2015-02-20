---
layout: post
title: Reading and extracting PGP email messages with Python 3.3
tags: [Python]
---

I'm currently working on
[a project](https://github.com/bamos/mbox-convos/)
using Python's
[email.message](http://docs.python.org/3.3/library/email.message.html)
module and the Message class, which is used
to represent an email message.

There's a [stackoverflow](http://stackoverflow.com/questions/7166922)
post about extracting the plaintext body of a Message object.
With [MIME Security with PGP](http://www.ietf.org/rfc/rfc2015.txt)
as a reference, the basic idea is to first determine if a message
is a PGP message by looking for `application/pgp-encrypted`,
and then to find the payload of `application/octet-stream`.

Use
[isislovecruft/python-gnupg](https://github.com/isislovecruft/python-gnupg)
to then decrypt the octet-stream using PGP.
The decrypted message then needs to be parsed back into a message
structure and the plaintext body needs to be extracted again.

# Usage.
Specifically, the following code can be used to try to extract
the plaintext part of a PGP message.
I provide the `getPgpBody` method below to do the high-level overview
provided above.

{% highlight python %}
import gnupg
gpg = gnupg.GPG(binary="/usr/bin/gpg2", homedir="/home/brandon/.gnupg")
gpgPass = getpass.getpass("PGP Password: ")

# Obtain a Message object, msg.
pgpText = getPgpBody(msg, gpg, gpgPass)
print(pgpText)
{% endhighlight %}

# Implementation.

{% highlight python %}
def applyCharsets(body, msg):
  for charset in msg.get_charsets():
    if charset:
      try:
        body = body.decode(charset)
      except:
        pass
  return body

# http://stackoverflow.com/questions/7166922/
def getPlaintextBody(msg):
  body = None
  if msg.is_multipart():
    for part in msg.walk():
      if part.is_multipart():
        for subpart in part.walk():
          if subpart.get_content_type() == 'text/plain':
            body = subpart.get_payload(decode=True)
      elif part.get_content_type() == 'text/plain':
        body = part.get_payload(decode=True)
  elif msg.get_content_type() == 'text/plain':
    body = msg.get_payload(decode=True)

  return applyCharsets(body, msg)

def getPgpBody(msg, gpg, gpgPass):
  isPgp = False; octetStream = None;
  if msg.is_multipart():
    for part in msg.walk():
      if part.is_multipart():
        for subpart in part.walk():
          if subpart.get_content_type() == 'application/pgp-encrypted':
            isPgp = True
          elif subpart.get_content_type() == 'application/octet-stream':
            octetStream = subpart.get_payload(decode=True)
      elif part.get_content_type() == 'application/pgp-encrypted':
        isPgp = True
      elif part.get_content_type() == 'application/octet-stream':
        octetStream = subpart.get_payload(decode=True)

  if isPgp:
    if not octetStream:
      raise Exception("Expected octet stream for pgp message.")
    decryptedMsgStr = str(gpg.decrypt(octetStream.decode(), passphrase=gpgPass))
    return getPlaintextBody(Parser().parsestr(decryptedMsgStr))
  else:
    return None
{% endhighlight %}
