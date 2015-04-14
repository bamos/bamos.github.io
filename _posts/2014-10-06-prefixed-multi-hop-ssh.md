---
layout: post
title: Prefixed multi-hop SSH wildcard configurations
tags: [Linux]
---

[SSH client configuration files][ssh-config] are useful to define
aliases and options for servers when using ssh so that you don't
have to specify them manually.
Joël Perras' [blog post][perras-post] presents an overview
of SSH config files.
This post presents how to use SSH config files to
route traffic through a master node to many client nodes.

[This post][multihop-post] describes how the `ProxyCommand` section
provides transparent multi-hop SSH.
The `PATTERNS` section in the [man page][ssh-config]
describes wildcards and variables in the `Host` section,
such as `*` (multi-character wildcard) and `?` (single-character wildcard).
In `ProxyCommand`, `%h` expands to the host and `%p` expands to the port.

I use `ProxyCommand` and `PATTERNS` to access nodes on a
cluster computer behind a master node with names `b1`, `b2`, and so on.
I thought the following **incorrect** configuration transparently
proxied my connection through the master host to all of the internal nodes.

{% highlight bash %}
Host b*
  ProxyCommand ssh master_node -W %h:%p
{% endhighlight %}

The problem is that the wildcard `b*` captures all hostnames
that start with a `b` rather than nodes with the regex `b\d*`.
I noticed this when I cloned a BitBucket repository.
I was able to successfully clone my repository, but my connection was
routed through the master node of my cluster!

{% highlight bash %}
~/repos » gclo git@bitbucket.org:bamos/<repo>.git
Cloning into '<repo>'...
The authenticity of host 'master_node (<ip address>)' cant be
established.
RSA key fingerprint is <fingerprint>.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'master_node,<ip address>' (RSA) to
the list of known hosts.
{% endhighlight %}

My first solution used a subshell and the [cut][cut]
command to remove the prefix from the prefixed hostname.
For example, `cut -d '-' -f 1 --complement` will remove the prefix from `prefix-b1`.

{% highlight bash %}
$ echo 'prefix-b1' | cut -d '-' -f 1 --complement
b1
{% endhighlight %}

This prefix removal can done in a subshell in the `ProxyCommand` definition.

{% highlight bash %}
Host prefix-b*
  ProxyCommand ssh master_node -W $(echo -n %h | cut -d '-' -f 1 --complement):%p
{% endhighlight %}


An alternative to using `cut` is to use Bash variable substitution.
This can't be done directly because `%h` has to be added as a shell variable.
Using variable substitution has the advantage of not needing a delimiter,
so wildcards like `prefix*` can be used.

{% highlight bash %}
Host prefix-b*
  ProxyCommand ssh master_node -W $(TMP=%h; echo -n ${TMP/prefix-/}):%p
{% endhighlight %}

[ssh-config]: http://linux.die.net/man/5/ssh_config
[perras-post]: http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/
[multihop-post]: http://sshmenu.sourceforge.net/articles/transparent-mulithop.html
[cut]: http://linux.die.net/man/1/cut
