---
layout: post
title: Calculating Euclidean pairwise distance in Fortran.
tags: [Fortran]
---


I've started
[bamos/fortran-simple-routines](https://github.com/bamos/fortran-simple-routines)
to host simple Fortran routines.
My first and program is to calculate the
[Euclidean pairwise distance](http://www.mathworks.com/help/stats/pdist.html)
between pairs of objects in a matrix.

# Example.
Consider the vectors `((0.5377, -1.3077), (1.8339, -0.4336),
(-2.2588, 0.4326), (0.8622, 3.5784), (0.3188, 2.7694))`.
The first element of the Euclidean pairwise distance vector
would be the distance between the first and second elements:
`sqrt((0.5377-1.8339)^2 + (-1.3077-(-0.4336))^2) = 1.5633`.

In Fortran, this calculation is done as follows,
with the first element matching and the others following similarly.
{% highlight fortran %}
REAL, DIMENSION(2,5):: X = RESHAPE((/  0.5377, -1.3077, &
                                       1.8339, -0.4336, &
                                      -2.2588,  0.4326, &
                                       0.8622,  3.5784, &
                                       0.3188,  2.7694 /), SHAPE(X))

WRITE(*,*) PDIST(X)
! 1.5633891 3.2937906 4.8968635 4.082972 4.1833596 4.127995
!     3.543266 4.4313316 3.4791746 0.9745587
{% endhighlight %}

# Function implementation.
{% highlight fortran %}
FUNCTION PDIST(X) RESULT (DISTANCES)
  ! Calculate the Euclidean pairwise distance between elements I and J
  ! in X, which is treated as m column vectors x1, x2, ..., xm.
  ! WORK is arranged in the order
  !   ((1,2), (1,3), ..., (1,m), (2,3), ..., (2,m), ..., (m-1,m))
  REAL, DIMENSION(:,:), INTENT(IN):: X
  REAL, DIMENSION((SIZE(X,2)*(SIZE(X,2)-1))/2):: DISTANCES

  INTEGER:: I, J, K
  REAL, DIMENSION(SIZE(X,1)):: WORK

  K=1
  DO I=1,SIZE(X,2)
    DO J=I+1,SIZE(X,2)
      WORK(:) = X(:,I)-X(:,J)
      DISTANCES(K) = SQRT(DOT_PRODUCT(WORK(:),WORK(:)))
      K = K+1
    ENDDO
  ENDDO
  RETURN
END FUNCTION
{% endhighlight %}
