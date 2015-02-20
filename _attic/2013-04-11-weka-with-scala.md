---
layout: post
title: Using Weka's API with Scala to combine ARFF files
tags: [Scala]
---

I use [Weka](http://www.cs.waikato.ac.nz/ml/weka/) for
creating machine learning classifiers in my
[Android malware analysis](https://github.com/bamos/antimalware)
framework.
The framework is currently being rewritten in
[Scala](http://www.scala-lang.org) from Bash,
and Weka's Java libraries integrate easily.

# Setting up.
In Linux, download the [Weka jar](http://www.cs.waikato.ac.nz/ml/weka/downloading.html)
and add it to the build path or resources of your project.

Specifically, with [sbt](http://www.scala-sbt.org/),
it is sufficient to have `weka.jar` in the `lib` directory.

# Combine all ARFF files in a directory.
Following is an excerpt to combine all of the ARFF
files in a directory into a single ARFF file.

{% highlight scala %}
import weka.core.converters.ArffLoader
import java.io.{File,FileWriter}

def combineAllArffs() {
  var arffLoader = new ArffLoader
  val arffDir: File = new File(s"Arff/")

  val arffList = arffDir.listFiles;
  var instances: Instances = null
  var structure: Instances = null

  if (arffList == null) {
    print(s"Warning: Arff list for '$mode' is empty.")
    return
  }

  for (arffFile <- arffList) {
    arffLoader.setFile(arffFile)
    if (instances == null) {
      instances = arffLoader.getDataSet
      structure = arffLoader.getStructure
    } else {
      var newInstances = arffLoader.getDataSet
      var i = 0
      while (i < newInstances.numInstances) {
        val instance = newInstances.instance(i)
        instances.add(instance)
        i += 1
      }
    }
    arffLoader.reset
  }

  val combinedFile = new File(s"Arff/Combined.arff")
  val fw = new FileWriter(combinedFile)
  fw.write(instances.toString)
  fw.close
}
{% endhighlight %}
