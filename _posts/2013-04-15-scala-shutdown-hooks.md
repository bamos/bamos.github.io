---
layout: post
title: Catching an interrupt and adding a shutdown hook in Scala
tags: [Scala]
---

[Shutdown hooks](http://docs.oracle.com/javase/7/docs/api/java/lang/Runtime.html#addShutdownHook(java.lang.Thread))
in
[JVM languages](https://en.wikipedia.org/wiki/List_of_JVM_languages),
are called before the VM shuts down or receives signals.
This posts presents a minimal example of using
shutdown hooks in Scala.

The `addShutdown` method is defined in Scala's
[sys](http://www.scala-lang.org/api/current/index.html#scala.sys.package)
package. It registers a shutdown hook and returns a
[shutdown hook thread](http://www.scala-lang.org/api/current/index.html#scala.sys.ShutdownHookThread).

The parameter to `addShutdownHook` is a by-name parameter,
as the [Scala Reference](http://www.scala-lang.org/docu/files/ScalaReference.pdf) documents.

Consider the following program.
{% highlight scala %}
object ShutdownHook extends App {
  println("Sleeping.")
  Thread.sleep(10000);
  println("Resuming.")
}
{% endhighlight %}

To add a shutdown hook,
either insert the block directly as a parameter,
or create a function.

{% highlight scala %}
object ShutdownHook extends App {
  sys addShutdownHook {
    println("Shutdown hook caught.")
    Thread.sleep(1000)
    println("Done shutting down.")
  }
  println("Sleeping.")
  Thread.sleep(10000);
  println("Resuming.")
}
{% endhighlight %}
<br/>
{% highlight scala %}
object ShutdownHook extends App {
  sys addShutdownHook(shutdown)
  println("Sleeping.")
  Thread.sleep(10000);
  println("Resuming.")

  private def shutdown {
    println("Shutdown hook caught.")
    Thread.sleep(1000)
    println("Done shutting down.")
  }
}
{% endhighlight %}
