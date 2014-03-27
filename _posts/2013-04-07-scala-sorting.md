---
layout: post
title: Implementing popular sorting algorithms in Scala with sbt and ScalaTest
tags: [Scala]
---

For the purposes of learning [Scala](http://www.scala-lang.org/)
and familiarizing myself with popular sorting algorithms,
There are available at
[bamos/scala-sorting](https://github.com/bamos/scala-sorting)

It shows an example of using [sbt](http://www.scala-sbt.org/)
and [ScalaTest](http://www.scalatest.org/) with a basic
Scala project.

# Compiling and testing
+ To compile: `sbt compile`
+ To run tests: `sbt test`

# Testing with ScalaTest
The tests use ScalaTest's `AssertionsForJunit` class
and rely on asserting a simple list is sorted.
There is also a simple test case for the heap used
within HeapSort.

{% highlight scala %}
package org.github.bamos.scalasorting

import org.scalatest.junit.AssertionsForJUnit
import org.junit.Assert._
import org.junit.Test
import org.junit.Before
import org.junit.After

import scala.collection.mutable.ArraySeq

object SortingTest {
  private var unsortedList: ArraySeq[Int] = _
  private var sortedList: ArraySeq[Int]   = _
  private var emptyList: ArraySeq[Int]    = _
}

class SortingTest extends AssertionsForJUnit {
  @Before def initialize {
    SortingTest.unsortedList = ArraySeq(3, 2, 5, 4, 1, 8, 6, 7, 9, 10)
    SortingTest.sortedList   = ArraySeq(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    SortingTest.emptyList = ArraySeq()
  }

  @Test def testHeapSort      { testSort(HeapSort.sort) }
  @Test def testInsertionSort { testSort(InsertionSort.sort) }
  @Test def testMergeSort     { testSort(MergeSort.sort) }
  @Test def testQuicksort     { testSort(QuickSort.sort) }
  @Test def testShellSort     { testSort(ShellSort.sort) }

  @Test def testHeap {
    var heap = new MaxHeap()
    heap.set(SortingTest.unsortedList)
    val heapList = ArraySeq(0, 10, 9, 8, 7, 2, 5, 6, 3, 4, 1)
    assertEquals(heapList, heap._vals)
    assertEquals(10, heap.deleteMax)
    assertEquals(9, heap.deleteMax)
  }

  private def testSort(sortAlgorithm: (ArraySeq[Int]) => Unit) {
    sortAlgorithm(SortingTest.unsortedList)
    assertEquals(SortingTest.sortedList, SortingTest.unsortedList)
    assertEquals(ArraySeq(), SortingTest.emptyList)
  }

  private def printArraySeq(arraySeq: ArraySeq[Int]) {
    print("{")
    print(arraySeq.mkString(", "))
    print("}\n")
  }
}
{% endhighlight %}

# [Heapsort](http://en.wikipedia.org/wiki/Heapsort)

{% highlight scala %}
package org.github.bamos.scalasorting

import scala.collection.mutable.ArraySeq

object HeapSort {
  def sort(vals: ArraySeq[Int]) {
    var heap = new MaxHeap
    heap.set(vals)
    for (i <- vals.length - 1 to 0 by -1) {
      vals(i) = heap.deleteMax
    }
  }
}

class MaxHeap {
  var _vals: ArraySeq[Int] = _ // First element is in 1, not 0.

  def set(vals: ArraySeq[Int]) {
    _vals = new ArraySeq[Int](1)
    _vals(0) = 0
    _vals ++= vals.clone

    // Sift down starting at the last internal node.
    for (i <- (_vals.length-1)/2 until 0 by -1) {
      siftDown(i)
    }
  }

  def deleteMax(): Int = {
    val size = _vals.length - 1
    if (size == 0) {
      throw new RuntimeException
    }

    val maxItem = _vals(1)
    _vals(1) = _vals(size)
    siftDown(1)

    return maxItem
  }

  private def siftDown(hole: Int) {
    var holeVar = hole
    val tmp = _vals(holeVar)
    val size = _vals.length - 1

    while (holeVar * 2 <= size) {
      var child = holeVar * 2
      if (child != size && _vals(child+1) > _vals(child)) {
        child += 1
      }
      if (_vals(child) > tmp) {
        _vals(holeVar) = _vals(child)
      } else {
        _vals(holeVar) = tmp
        return;
      }
      holeVar = child
    }
    _vals(holeVar) = tmp
  }
}
{% endhighlight %}

# [Insertion sort](http://en.wikipedia.org/wiki/Insertion_sort)
{% highlight scala %}
package org.github.bamos.scalasorting

import scala.collection.mutable.ArraySeq

object InsertionSort {
  def sort(vals: ArraySeq[Int]) {
    for (i <- 1 until vals.length) {
      val temp = vals(i)
      var j = i
      while (j > 0 && temp < vals(j-1) ) {
        vals(j) = vals(j-1)
        j -= 1
      }
      vals(j) = temp;
    }
  }
}
{% endhighlight %}

# [Mergesort](http://en.wikipedia.org/wiki/Merge_sort)
{% highlight scala %}
package org.github.bamos.scalasorting

import scala.collection.mutable.ArraySeq

object MergeSort {
  def sort(vals: ArraySeq[Int]) {
    for (i <- 1 until vals.length) {
      val temp = vals(i)
      var j = i
      while (j > 0 && temp < vals(j-1) ) {
        vals(j) = vals(j-1)
        j -= 1
      }
      vals(j) = temp;
    }
  }

  private def mergeSort(vals: ArraySeq[Int], tmp: ArraySeq[Int],
                        left: Int, right: Int) {
    if (left < right) {
      val center = (left + right)/2;
      mergeSort(vals, tmp, left, center)
      mergeSort(vals, tmp, center+1, right)
      merge(vals, tmp, left, center+1, right)
    }
  }

  private def merge(vals: ArraySeq[Int], tmp: ArraySeq[Int],
                    leftPos: Int, rightPos: Int, rightEnd: Int) {
    var leftPosVar = leftPos; var rightPosVar = rightPos;
    val leftEnd = rightPos - 1
    var rightEndVar = rightEnd
    var tmpPos = leftPos
    val numElements = rightEnd - leftPos + 1

    while (leftPosVar <= leftEnd && rightPosVar <= rightEnd) {
      if (vals(leftPosVar) <= vals(rightPosVar)) {
        tmp(tmpPos) = vals(leftPosVar)
        tmpPos += 1; leftPosVar += 1;
      } else {
        tmp(tmpPos) = vals(rightPosVar)
        tmpPos +=1; rightPosVar +=1;
      }
    }

    while (leftPosVar <= leftEnd) {
      tmp(tmpPos) = vals(leftPosVar)
      tmpPos += 1; leftPosVar += 1;
    }

    while (rightPosVar <= rightEnd) {
      tmp(tmpPos) = vals(rightPosVar)
      tmpPos += 1; rightPosVar += 1;
    }

    for (i <- 0 until numElements) {
      vals(rightEndVar) = tmp(rightEndVar)
      rightEndVar -= 1
    }
  }
}
{% endhighlight %}

# [Quicksort](http://en.wikipedia.org/wiki/Quicksort)
{% highlight scala %}
package org.github.bamos.scalasorting

import scala.collection.mutable.ArraySeq

object QuickSort {
  def sort(vals: ArraySeq[Int]) {
    sort(vals, 0, vals.length-1)
  }

  private def sort(vals: ArraySeq[Int], lo: Int, hi: Int) {
    var pivotIdx = findPivot(vals, lo, hi)
    swap(vals, pivotIdx, hi)
    val mid = partition(vals, lo, hi-1, vals(hi))
    swap(vals, mid, hi)
    if ((mid-lo) > 1) sort(vals,    lo, mid-1)
    if ((hi-mid) > 1) sort(vals, mid+1,    hi)
  }

  private def findPivot(vals: ArraySeq[Int], lo: Int, hi: Int): Int = {
    return findMedian(vals, lo, (lo+hi)/2, hi)
  }

  private def
  findMedian(vals: ArraySeq[Int], lo: Int, mid: Int, hi: Int): Int = {
    val loVal = vals(lo); val midVal = vals(mid); val hiVal = vals(hi);
    if (loVal > midVal) {
      if (midVal > hiVal) {
        return mid
      } else if (loVal > hiVal) {
        return hi
      } else {
        return lo
      }
    } else {
      if (loVal > hiVal) {
        return lo
      } else if (midVal > hiVal) {
        return hi
      } else {
        return mid
      }
    }
  }


  private def
  partition(vals: ArraySeq[Int], left: Int, right: Int, pivot:Int): Int = {
    var leftVar = left; var rightVar = right;
    while (leftVar <= rightVar) {
      while (vals(leftVar) < pivot) {
        leftVar = leftVar + 1
      }
      while ((rightVar >= leftVar) && (vals(rightVar) >= pivot)) {
        rightVar = rightVar - 1
      }
      if (rightVar > leftVar) {
        swap(vals, leftVar, rightVar)
      }
    }
    return leftVar
  }

  private def swap(vals: ArraySeq[Int], i: Int, j: Int) {
    val temp = vals(i)
    vals(i) = vals(j)
    vals(j) = temp
  }
}
{% endhighlight %}

# [Shell sort](http://en.wikipedia.org/wiki/Shell_sort)
{% highlight scala %}
package org.github.bamos.scalasorting

import scala.collection.mutable.ArraySeq

object ShellSort {
  def sort(vals: ArraySeq[Int]) {
    // Marcin Ciura's gap sequence.
    val gaps = Array(701, 301, 132, 57, 23, 10, 4, 1)

    for (gap <- gaps) {
      for (i <- gap until vals.length) {
        val temp = vals(i)
        var j = i
        while (j >= gap && temp < vals(j-gap) ) {
          vals(j) = vals(j-gap)
          j -= gap
        }
        vals(j) = temp;
      }
    }
  }
}
{% endhighlight %}
