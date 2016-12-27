 I am a third-year Computer Science Ph.D. student at Carnegie Mellon University and am supported by an NSF graduate research fellowship. I spent the first two years of my Ph.D. working between mobile systems and applied machine learning and I now work with [Zico Kolter](http://zicokolter.com/) on machine learning and optimization. I am particularly interested in improving our understanding of important modeling problems in computer vision, language, and reinforcement learning through the use of deep learning, optimization (sometimes convex), theory, and statistics. 

As an example, we've recently been exploring the intersection of deep learning and convex optimization with input convex neural networks (ICNNs): neural networks that are convex with respect to some of the inputs. Our preprint is available at [arXiv:1609.07152](https://arxiv.org/abs/1609.07152) and shows applications to multi-label classification, image completion, and continuous-action reinforcement learning. 

I strongly believe in open science and reproducible research and actively publish code on [my Github profile](https://github.com/bamos). I am also the author of [OpenFace](https://cmusatyalab.github.io/openface/), which is an open source face recognition project that uses deep learning.


## <i class="fa fa-chevron-right"></i> Education

<table class="table table-hover">
  <tr>
    <td class="col-md-3">Aug 2014 - Present</td>
    <td>
        <strong>Ph.D. in Computer Science</strong>
        <br>
      Carnegie Mellon University
    </td>
  </tr>
  <tr>
    <td class="col-md-3">Aug 2014 - May 2016</td>
    <td>
        <strong>M.S. in Computer Science</strong>
        <br>
      Carnegie Mellon University
    </td>
  </tr>
  <tr>
    <td class="col-md-3">Aug 2011 - May 2014</td>
    <td>
        <strong>B.S. in Computer Science</strong>
          (3.99/4.00)
        <br>
      Virginia Tech
    </td>
  </tr>
  <tr>
    <td class="col-md-3">May 2011</td>
    <td>
      Northside High School (Roanoke, Virginia)
    </td>
  </tr>
</table>


## <i class="fa fa-chevron-right"></i> Research Experience
<table class="table table-hover">
<tr>
  <td class='col-md-3'>Apr 2016 - Present</td>
  <td>
    <strong>Carnegie Mellon University</strong>, Prof. Zico Kolter <br>
    Machine learning and optimization
  </td>
</tr>
<tr>
  <td class='col-md-3'>Aug 2014 - Apr 2016</td>
  <td>
    <strong>Carnegie Mellon University</strong>, Prof. Mahadev Satyanarayanan <br>
    Applied machine learning and mobile systems
  </td>
</tr>
<tr>
  <td class='col-md-3'>May 2012 - May 2014</td>
  <td>
    <strong>Virginia Tech</strong>, Prof. Jules White <br>
    Mobile systems, cyber-physical systems, and security
  </td>
</tr>
<tr>
  <td class='col-md-3'>Jan 2013 - May 2014</td>
  <td>
    <strong>Virginia Tech</strong>, Prof. Layne Watson <br>
    Scientific computing, global/stochastic optimization, and bioinformatics
  </td>
</tr>
<tr>
  <td class='col-md-3'>Nov 2012 - Mar 2014</td>
  <td>
    <strong>Virginia Tech</strong>, Prof. Binoy Ravindran <br>
    Heterogeneous compilers
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Selected Publications <a href="https://github.com/bamos/cv/blob/master/publications/selected.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<a href="https://scholar.google.com/citations?user=CZwrwHAAAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>



<table class="table table-hover">

    <tr>
    <td class="col-md-3"><a href='http://arxiv.org/abs/1609.07152' target='_blank'><img src="images/publications/amos2016input.png"/></a> </td>
    <td>
        <strong>Input Convex Neural Networks</strong><br>
        <strong>B. Amos</strong>, L. Xu, and J. Kolter<br>
        arXiv 2016<br>
        [1] 
[<a href='javascript: none'
    onclick='$("#abs_amos2016input").toggle()'>abs</a>]
 [<a href='http://arxiv.org/abs/1609.07152' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/icnn' target='_blank'>code</a>] <br>
        
<div id="abs_amos2016input" style="text-align: justify; display: none" markdown="1">
This paper presents the input convex neural network
architecture. These are scalar-valued (potentially deep) neural
networks with constraints on the network parameters such that the
output of the network is a convex function of (some of) the
inputs. The networks allow for efficient inference via optimization
over some inputs to the network given others, and can be applied to
settings including structured prediction, data imputation, reinforcement learning, and others. In this paper we lay the basic
groundwork for these models, proposing methods for inference, optimization and learning, and analyze their representational
power. We show that many existing neural network architectures can be
made input-convex with only minor modification, and develop
specialized optimization algorithms tailored to this setting. Finally, we highlight the performance of the methods on multi-label prediction, image completion, and reinforcement learning problems, where we show
improvement over the existing state of the art in many cases.
</div>

    </td>
    </tr>
    

    <tr>
    <td class="col-md-3"><a href='http://www.cs.cmu.edu/~hzhao1/papers/ICML2016/BL-SPN-main.pdf' target='_blank'><img src="images/publications/zhao2016collapsed.png"/></a> </td>
    <td>
        <strong>Collapsed Variational Inference for Sum-Product Networks</strong><br>
        H. Zhao, T. Adel, G. Gordon, and <strong>B. Amos</strong><br>
        ICML 2016<br>
        [2] 
[<a href='javascript: none'
    onclick='$("#abs_zhao2016collapsed").toggle()'>abs</a>]
 [<a href='http://www.cs.cmu.edu/~hzhao1/papers/ICML2016/BL-SPN-main.pdf' target='_blank'>pdf</a>] <br>
        
<div id="abs_zhao2016collapsed" style="text-align: justify; display: none" markdown="1">
Sum-Product Networks (SPNs) are probabilistic inference machines that admit
exact inference in linear time in the size of the network. Existing
parameter learning approaches for SPNs are largely based on the maximum
likelihood principle and hence are subject to overfitting compared to
more Bayesian approaches. Exact Bayesian posterior inference for SPNs is
computationally intractable. Both standard variational inference and
posterior sampling for SPNs are computationally infeasible even for
networks of moderate size due to the large number of local latent
variables per instance. In this work, we propose a novel deterministic
collapsed variational inference algorithm for SPNs that is
computationally efficient, easy to implement and at the same time allows
us to incorporate prior information into the optimization formulation.
Extensive experiments show a significant improvement in accuracy compared
with a maximum likelihood based approach.
</div>

    </td>
    </tr>
    

    <tr>
    <td class="col-md-3"><a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'><img src="images/publications/amos2016openface.png"/></a> </td>
    <td>
        <strong>OpenFace: A general-purpose face recognition library with mobile applications</strong><br>
        <strong>B. Amos</strong>, B. Ludwiczuk, and M. Satyanarayanan<br>
        CMU 2016<br>
        [3] 
[<a href='javascript: none'
    onclick='$("#abs_amos2016openface").toggle()'>abs</a>]
 [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'>pdf</a>]  [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
        
<div id="abs_amos2016openface" style="text-align: justify; display: none" markdown="1">
Cameras are becoming ubiquitous in the Internet of Things (IoT) and
can use face recognition technology to improve context. There is a
large accuracy gap between today's publicly available face recognition
systems and the state-of-the-art private face recognition
systems. This paper presents our OpenFace face recognition library
that bridges this accuracy gap. We show that OpenFace provides
near-human accuracy on the LFW benchmark and present a new
classification benchmark for mobile scenarios. This paper is intended
for non-experts interested in using OpenFace and provides a light
introduction to the deep neural network techniques we use.

We released OpenFace in October 2015 as an open source library under
the Apache 2.0 license. It is available at:
<http://cmusatyalab.github.io/openface/>
</div>

    </td>
    </tr>
    

    <tr>
    <td class="col-md-3"><a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'><img src="images/publications/amos2014QNSTOP.png"/></a> </td>
    <td>
        <strong>QNSTOP-QuasiNewton Algorithm for Stochastic Optimization</strong><br>
        <strong>B. Amos</strong>, D. Easterling, L. Watson, W. Thacker, B. Castle, and M. Trosset<br>
        VT 2014<br>
        [4] 
[<a href='javascript: none'
    onclick='$("#abs_amos2014QNSTOP").toggle()'>abs</a>]
 [<a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'>pdf</a>] <br>
        
<div id="abs_amos2014QNSTOP" style="text-align: justify; display: none" markdown="1">
QNSTOP consists of serial and parallel (OpenMP) Fortran 2003 codes for the
quasi-Newton stochastic optimization method of Castle and Trosset. For
stochastic problems, convergence theory exists for the particular
algorithmic choices and parameter values used in QNSTOP. Both the parallel
driver subroutine, which offers several parallel decomposition strategies, and the serial driver subroutine can be used for stochastic optimization or
deterministic global optimization, based on an input switch. QNSTOP is
particularly effective for “noisy” deterministic problems, using only
objective function values. Some performance data for computational systems
biology problems is given.
</div>

    </td>
    </tr>
    

</table>


## <i class="fa fa-chevron-right"></i> Teaching Experience
<table class="table table-hover">
<tr>
  <td class='col-md-1'>S2017</td>
  <td><strong>Graduate AI</strong> (CMU 15-780), TA</td>
</tr>
<tr>
  <td class='col-md-1'>S2016</td>
  <td><strong>Distributed Systems</strong> (CMU 15-440/640), TA</td>
</tr>
<tr>
  <td class='col-md-1'>S2013</td>
  <td><strong>Software Design and Data Structures</strong> (VT CS 2114), TA</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Industry Experience
<table class="table table-hover">
<tr>
  <td class='col-md-3'>May 2014 - Aug 2014</td>
  <td><strong>Adobe Research</strong>, Data Scientist Intern</td>
</tr>
<tr>
  <td class='col-md-3'>Dec 2013 - Jan 2014</td>
  <td><strong>Snowplow Analytics</strong>, Software Engineer Intern</td>
</tr>
<tr>
  <td class='col-md-3'>May 2013 - Aug 2013</td>
  <td><strong>Qualcomm</strong>, Software Engineer Intern</td>
</tr>
<tr>
  <td class='col-md-3'>May 2012 - Aug 2012</td>
  <td><strong>Phoenix Integration</strong>, Software Engineer Intern</td>
</tr>
<tr>
  <td class='col-md-3'>Jan 2011 - Aug 2011</td>
  <td><strong>Sunapsys</strong>, Network Administrator Intern</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> CMU Graduate Coursework
+ Statistical Machine Learning (10-702, Au), L. Wasserman, S2017
+ Deep Reinforcement Learning (10-703), R. Salakhutdinov and A. Fragkiadaki, S2017
+ Intermediate Statistics (10-705, Au), L. Wasserman, F2016
+ Topics in Deep Learning (10-807), R. Salakhutdinov, F2016
+ Convex Optimization (10-725), R. J. Tibshirani, F2015
+ Algorithms in the Real World (15-853), G. Blelloch and A. Gupta, F2015
+ Semantics of Programming Languages (15-812), A. Platzer, S2015
+ Optimizing Compilers for Modern Architecture (15-745), T. Mowry, S2015
+ Advanced Operating and Distributed Systems (15-712), D. Andersen, F2014
+ Mobile and Pervasive Computing (15-812), M. Satyanarayanan and D. Siewiorek, F2014


## <i class="fa fa-chevron-right"></i> Honors & Awards
<table class="table table-hover">
<tr>
  <td class='col-md-2'>2016 - 2019</td>
  <td>
    NSF Graduate Research Fellowship
    <!--  -->
  </td>
</tr>
<tr>
  <td class='col-md-2'>2014</td>
  <td>
    1st Place Undergraduate Senior Capstone Award, Virginia Tech Computer Science
    <!--  -->
  </td>
</tr>
<tr>
  <td class='col-md-2'>2014</td>
  <td>
    David Heilman Research Award, Virginia Tech Computer Science
    <!--  -->
  </td>
</tr>
<tr>
  <td class='col-md-2'>2014</td>
  <td>
    Senior Scholar Award, Virginia Tech Computer Science
    <!--  -->
  </td>
</tr>
<tr>
  <td class='col-md-2'>2014</td>
  <td>
    Honorable Mention, CRA Outstanding Undergraduate Researcher Award
    <!--  -->
  </td>
</tr>
<tr>
  <td class='col-md-2'>2011 - 2014</td>
  <td>
    Awarded eight undergraduate merit scholarships
    <!--  -->
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Skills
<table class="table table-hover">
<tr>
  <td class='col-md-2'>Languages</td>
  <td markdown="1">
Bash, C, C++, CSS, Fortran, Haskell, HTML, Java, JavaScript, LaTeX, Lua, Make, *Mathematica*, Python, R, Scala
  </td>
</tr>
<tr>
  <td class='col-md-2'>Frameworks</td>
  <td markdown="1">
Akka, Android SDK/NDK, Caffe, Node.js, NumPy, TensorFlow, Torch7, Pandas, SciPy, scikit-learn, Spark, Spray
  </td>
</tr>
<tr>
  <td class='col-md-2'>Systems</td>
  <td markdown="1">
Linux, OSX
  </td>
</tr>
</table>
