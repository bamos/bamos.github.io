---
layout: post
title: Bash shell script to automatically install BLAS and LAPACK
tags: [Bash,Fortran,Linux]
---

[BLAS][blas] and [LAPACK][lapack] are popular libraries
for linear algebra in Fortran applications.
Some servers have a Fortran compiler, but does not include
these libraries.
This is especially problematic when using a machine without
root access for downloading these libraries from the official repositories,
or when using multiple compilers.
The following is a simple shell script that I use to automatically
download and install LAPACK and BLAS for gfortran into `~/lapack-3.5.0`.

After running the script, the libraries can be used in an application with the
compiler flags `-L$(HOME)/lapack-3.5.0 -llapack -lblas`, which adds `~/lapack-3.5.0` to
the linker search path, and links the libraries.

{% highlight bash %}
#!/bin/bash

wget http://www.netlib.org/lapack/lapack-3.5.0.tgz -O /tmp/lapack.tgz
tar xvfz /tmp/lapack.tgz -C ~
rm -f /tmp/lapack.tgz
cd ~/lapack-3.5.0
cp make.inc{.example,}
make -j8 lapacklib blaslib
ln -s $PWD/librefblas.a libblas.a
{% endhighlight %}

[lapack]: http://www.netlib.org/lapack/
[blas]: http://www.netlib.org/blas/
