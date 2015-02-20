---
layout: post
title: Dynamic memory allocation with Fortran OpenMP
tags: [Fortran,OpenMP]
---

I'm adding OpenMP annotations to a serial Fortran program
and ran into some interesting problems using functions and
allocated arrays inside of a parallel region.

Binaries produced with [gfortran][gfortran] 4.8.2 ran correctly, but
binaries produced with the [Sun][sun] 12 compiler hung
inside a function call, similar to the posts in [this thread][hanging].

My code was making the incorrect assumption that a dynamically allocated
variable would be reallocated across all threads.
I created a simple example to further explore this problem, and
`test.f95` below illustrates my incorrect assumption.

`test.f95` has a single variable and a dynamically allocated variable.
[This][openmp] OpenMP reference states "Variables declared private in a
parallel region are undefined upon entry to the parallel region,"
so the loops write `0` to each of these variables and then
prints the memory addresses.
The same documentation states "the compiler creates a separate copy of each
of these variables for each thread in the team,"
so the memory addresses should be different across each thread.

The 'bad' section allocates outside of the parallel region,
and with `gfortran` 4.8.2, the memory addresses for both the
single variable and array differ across threads, as expected.
However, the Sun compiler's memory addresses do not differ!
Different threads will attempt to access the same variable
with the assumption the variable is `private`, when it is shared.

To overcome this and ensure correctness across all compilers,
dynamic memory allocation should be done by allocating memory
inside of a parallel region, as shown in the 'good' section below.
The Sun compiler and `gfortran` now produce correct code,
thus fixing the problems in my larger codebase.

# test.f95

{% highlight fortran %}
! sunf95: `sunf95 test.f95 -O3 -xopenmp -o test-sunf95`
! gfortran: `gfortran test.f95 -fopenmp -o test-gfortran`
PROGRAM TEST
  USE OMP_LIB, ONLY: OMP_GET_NUM_THREADS, OMP_GET_THREAD_NUM, &
    OMP_SET_NUM_THREADS
  IMPLICIT NONE

  INTEGER:: I,TestVar
  INTEGER, DIMENSION(:), ALLOCATABLE:: TestHeapArray

  CALL OMP_SET_NUM_THREADS(2)

  117 FORMAT("Thread: ",I1,", TestVar: ",I16,", TestHeapArray: ",I16)

  ALLOCATE(TestHeapArray(1:10))

  WRITE(*,'(A/)') "Bad usage allocating before the parallel region."
!$OMP PARALLEL DO PRIVATE(TestVar,TestHeapArray) DEFAULT (NONE)
  DO I=1,10
    TestVar = 0; TestHeapArray = 0
    WRITE(*,117) OMP_GET_THREAD_NUM(), LOC(TestVar), LOC(TestHeapArray)
  END DO
!$OMP END PARALLEL DO

  DEALLOCATE(TestHeapArray)

  WRITE(*,'(/A/)') "Good usage allocating inside of the parallel region."
!$OMP PARALLEL PRIVATE(TestVar,TestHeapArray) DEFAULT (NONE)
  ALLOCATE(TestHeapArray(1:10))
!$OMP DO
  DO I=1,10
    TestVar = 0; TestHeapArray = 0
    WRITE(*,117) OMP_GET_THREAD_NUM(), LOC(TestVar), LOC(TestHeapArray)
  END DO
!$OMP END DO
  DEALLOCATE(TestHeapArray)
!$OMP END PARALLEL
END PROGRAM TEST
{% endhighlight %}

# gfortran 4.8.2 output.

{% highlight bash %}
Bad usage allocating before the parallel region.

Thread: 0, TestVar:  140734123837976, TestHeapArray:         25712352
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25712352
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25712352
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25712352
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25712352
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328

Good usage allocating inside of the parallel region.

Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 1, TestVar:  140458401025672, TestHeapArray:  140458315483328
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25706464
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25706464
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25706464
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25706464
Thread: 0, TestVar:  140734123837976, TestHeapArray:         25706464
{% endhighlight %}

# Sun 12 output.

{% highlight bash %}
Bad usage allocating before the parallel region.

Thread: 0, TestVar:  140734298830036, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298830036, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298830036, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298830036, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298830036, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553040260, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553040260, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553040260, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553040260, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553040260, TestHeapArray:        449990832

Good usage allocating inside of the parallel region.

Thread: 0, TestVar:  140734298829508, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298829508, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298829508, TestHeapArray:        449990832
Thread: 1, TestVar:   47751553039732, TestHeapArray:        449992224
Thread: 1, TestVar:   47751553039732, TestHeapArray:        449992224
Thread: 1, TestVar:   47751553039732, TestHeapArray:        449992224
Thread: 1, TestVar:   47751553039732, TestHeapArray:        449992224
Thread: 1, TestVar:   47751553039732, TestHeapArray:        449992224
Thread: 0, TestVar:  140734298829508, TestHeapArray:        449990832
Thread: 0, TestVar:  140734298829508, TestHeapArray:        449990832
{% endhighlight %}

[hanging]: http://software.intel.com/en-us/forums/topic/289962
[recursive]: https://groups.google.com/forum/#!topic/comp.lang.fortran/WcV9MNtekfY
[gfortran]: http://gcc.gnu.org/wiki/GFortran
[sun]: http://docs.oracle.com/cd/E19205-01/819-5263/aevcv/index.html
[openmp]: http://www.math.hkbu.edu.hk/parallel/pgi/doc/pgiws_ug/pgi32u11.htm#Heading126
