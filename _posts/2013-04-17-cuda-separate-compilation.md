---
layout: post
title: CUDA 5.0 separate compilation with C and C++ with nvcc and g++
tags: [CUDA]
---

For projects with many C or C++ files and few CUDA files,
separate compilation with nvcc and g++ is optimal.
NVIDIA posted a presentation
[here](http://developer.download.nvidia.com/GTC/gpu-object-linking.pdf).
Further, there are questions on Stack Overflow about this.
A few I found are:
 + [G++ NVCC How to compile CUDA code then Link it to a G++ C++ project](http://stackoverflow.com/questions/9421108)
 + [Building GPL C program with CUDA module](http://stackoverflow.com/questions/9363827)
 + [Trying to 'Make' CUDA SDK, ld cannot find library, ldconfig says it can](http://stackoverflow.com/questions/2716293)

However, some answers didn't show a complete example.
Following is a short and simple example of compiling and linking
a CUDA kernel with C source code, all in the same directory.

{% highlight bash %}
nvcc -c kernel.cu
g++ -o cuda.out *.c kernel.o -L/usr/local/cuda-5.0/lib64 -lcudart
{% endhighlight %}
