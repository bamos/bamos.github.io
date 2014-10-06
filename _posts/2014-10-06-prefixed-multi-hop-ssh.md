---
layout: post
title: Prefixed multi-hop SSH wildcard configurations.
tags: [Linux]
---

[SSH client configuration files][ssh-config] are useful to define
aliases and options for servers when using ssh so that you don't
have to specify them manually.
Take a look at Joël Perras' [blog post][perras-post] for a practical overview.

The `ProxyCommand` option provides transparent multi-hop SSH,
as described in [this post][multihop-post].
Furthermore, the `PATTERNS` section in the [man page][ssh-config]
describes how `*` and `?` wildcards can be used in the `Host` definition
and the host can be referenced with the `%h` variable.

I'm using `ProxyCommand` and `PATTERNS` to access nodes on a cluster computer
with names `b1`, `b2`, and so an.
So, I thought the following **incorrect** configuration was transparently
proxying my connection through my host to all of my server nodes.

<pre>
Host b*
  ProxyCommand ssh master_node exec nc %h %p
</pre>

I used this for a few hours and realized a flaw when I cloned a BitBucket repository.
I was able to successfully clone my repository, but my connection was
being routed through the master node of my cluster!
Thankfully I was on a new computer and hadn't yet sshed into the master.
Otherwise I wouldn't have gotten the authenticity warning.

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

I wanted to add a prefix to the `b*` wildcard, but couldn't
find any documentation of how to do this.
I didn't originally come up with a solution to this.

A few days later, I came up with a solution using a subshell and the
[cut][cut] command.
I knew `cut` can be used to remove a prefix.
For example, `cut -d '-' -f 1 --complement` will remove the prefix from `prefix-b1`.

{% highlight bash %}
$ echo 'prefix-b1' | cut -d '-' -f 1 --complement
b1
{% endhighlight %}

This prefix removal can done in a subshell in the `ProxyCommand` definition.
I'm now using the following **correct** ssh config entry to add a prefix
to my cluster's nodes.

<pre>
Host prefix-b*
  ProxyCommand ssh master_node exec nc $(echo -n %h | cut -d '-' -f 1 --complement) %p
</pre>


An alternative to using `cut`, as pointed out in the comments of this post,
is to use Bash variable substition.
This can't be done directly because `%h` has to be added as a shell variable.

<pre>
Host prefix-b*
  ProxyCommand ssh master_node exec nc $(TMP=%h; echo -n ${TMP/prefix-/}) %p
</pre>

[ssh-config]: http://linux.die.net/man/5/ssh_config
[perras-post]: http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/
[multihop-post]: http://sshmenu.sourceforge.net/articles/transparent-mulithop.html
[cut]: http://linux.die.net/man/1/cut
