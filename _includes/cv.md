 I am a third-year Computer Science Ph.D. student at Carnegie Mellon University and am supported by an NSF graduate research fellowship. I spent the first two years of my Ph.D. working between mobile systems and applied machine learning and I now work with [Zico Kolter](http://zicokolter.com/) on machine learning and optimization. I am particularly interested in improving our understanding of important modeling problems in computer vision, language, and reinforcement learning through the use of deep learning, optimization (sometimes convex), theory, and statistics. As examples, see our [input-convex neural network](https://arxiv.org/abs/1609.07152) and [OptNet](https://arxiv.org/abs/1703.00443) papers. 

I strongly believe in open science and reproducible research and actively publish code on [my Github profile](https://github.com/bamos). I am also the author of [OpenFace](https://cmusatyalab.github.io/openface/), which is an open source face recognition project that uses deep learning.


## <i class="fa fa-chevron-right"></i> News
<table class="table table-hover">
<tr>
  <td class='col-md-3'>June 2017</td>
  <td>Our ICNN and OptNet papers have been accepted to ICML and the camera-ready versions are available on arXiv.</td>
</tr>
<tr>
  <td class='col-md-3'>May 2017</td>
  <td>I am interning at Google DeepMind in London this summer with Nando de Freitas.</td>
</tr>
</table>


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
  <td class='col-md-3'>May 2017 - Sept 2017</td>
  <td>
    <strong>Google DeepMind</strong>, Prof. Nando de Freitas <br>
    Machine and reinforcement learning
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
<td class="col-md-3"><a href='http://arxiv.org/abs/1703.04529' target='_blank'><img src="images/publications/donti2017task.png"/></a> </td>
<td>
    <strong>Task-based End-to-end Model Learning</strong><br>
    P. Donti, <strong>B. Amos</strong>, and J. Kolter<br>
    arXiv 2017<br>
    [1] 
[<a href='javascript: none'
    onclick='$("#abs_donti2017task").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.04529' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/e2e-model-learning' target='_blank'>code</a>] <br>
    
<div id="abs_donti2017task" style="text-align: justify; display: none" markdown="1">
As machine learning techniques have become more ubiquitous, it has
become common to see machine learning prediction algorithms operating
within some larger process. However, the criteria by which we train
machine learning algorithms often differ from the ultimate criteria on
which we evaluate them. This paper proposes an end-to-end approach for
learning probabilistic machine learning models within the context of
stochastic programming, in a manner that directly captures the
ultimate task-based objective for which they will be used. We then
present two experimental evaluations of the proposed approach, one as
applied to a generic inventory stock problem and the second to a
real-world electrical grid scheduling task. In both cases, we show
that the proposed approach can outperform both a traditional modeling
approach and a purely black-box policy optimization approach.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='http://arxiv.org/abs/1703.00443' target='_blank'><img src="images/publications/amos2017optnet.png"/></a> </td>
<td>
    <strong>OptNet: Differentiable Optimization as a Layer in Neural Networks</strong><br>
    <strong>B. Amos</strong> and J. Kolter<br>
    ICML 2017<br>
    [2] 
[<a href='javascript: none'
    onclick='$("#abs_amos2017optnet").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.00443' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/optnet' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017optnet" style="text-align: justify; display: none" markdown="1">
This paper presents OptNet, a network architecture that integrates
optimization problems (here, specifically in the form of quadratic programs)
as individual layers in larger end-to-end trainable deep networks.
These layers encode constraints and complex dependencies
between the hidden states that traditional convolutional and
fully-connected layers often cannot capture.
In this paper, we explore the foundations for such an architecture:
we show how techniques from sensitivity analysis, bilevel
optimization, and implicit differentiation can be used to
exactly differentiate through these layers and with respect
to layer parameters;
we develop a highly efficient solver for these layers that exploits fast
GPU-based batch solves within a primal-dual interior point method, and which
provides backpropagation gradients with virtually no additional cost on top of
the solve;
and we highlight the application of these approaches in several problems.
In one notable example, we show that the method is
capable of learning to play mini-Sudoku (4x4) given just input and output games, with no a priori information about the rules of the game;
this highlights the ability of our architecture to learn hard
constraints better than other neural architectures.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='http://arxiv.org/abs/1609.07152' target='_blank'><img src="images/publications/amos2017input.png"/></a> </td>
<td>
    <strong>Input Convex Neural Networks</strong><br>
    <strong>B. Amos</strong>, L. Xu, and J. Kolter<br>
    ICML 2017<br>
    [3] 
[<a href='javascript: none'
    onclick='$("#abs_amos2017input").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1609.07152' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/icnn' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017input" style="text-align: justify; display: none" markdown="1">
This paper presents the input convex neural network
architecture. These are scalar-valued (potentially deep) neural
networks with constraints on the network parameters such that the
output of the network is a convex function of (some of) the inputs.
The networks allow for efficient inference via optimization over some
inputs to the network given others, and can be applied to settings
including structured prediction, data imputation, reinforcement
learning, and others. In this paper we lay the basic groundwork for
these models, proposing methods for inference, optimization and
learning, and analyze their representational power. We show that many
existing neural network architectures can be made input-convex with
a minor modification, and develop specialized optimization
algorithms tailored to this setting. Finally, we highlight the
performance of the methods on multi-label prediction, image
completion, and reinforcement learning problems, where we show
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
    [4] 
[<a href='javascript: none'
    onclick='$("#abs_zhao2016collapsed").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~hzhao1/papers/ICML2016/BL-SPN-main.pdf' target='_blank'>pdf</a>] <br>
    
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
    [5] 
[<a href='javascript: none'
    onclick='$("#abs_amos2016openface").toggle()'>abs</a>] [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'>pdf</a>]  [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
    
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
    [6] 
[<a href='javascript: none'
    onclick='$("#abs_amos2014QNSTOP").toggle()'>abs</a>] [<a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'>pdf</a>] <br>
    
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
</tr>
<tr>
  <td class='col-md-3'>Dec 2013 - Jan 2014</td>
  <td><strong>Snowplow Analytics</strong>, Software Engineer Intern</td>
</tr>
<tr>
</tr>
<tr>
  <td class='col-md-3'>May 2013 - Aug 2013</td>
  <td><strong>Qualcomm</strong>, Software Engineer Intern</td>
</tr>
<tr>
</tr>
<tr>
  <td class='col-md-3'>May 2012 - Aug 2012</td>
  <td><strong>Phoenix Integration</strong>, Software Engineer Intern</td>
</tr>
<tr>
</tr>
<tr>
  <td class='col-md-3'>Jan 2011 - Aug 2011</td>
  <td><strong>Sunapsys</strong>, Network Administrator Intern</td>
</tr>
<tr>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> CMU Graduate Coursework
+ Statistical Machine Learning (10-702, Au), L. Wasserman, S2017
+ Deep Reinforcement Learning (10-703, Au), R. Salakhutdinov and A. Fragkiadaki, S2017
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


## <i class="fa fa-chevron-right"></i> All Publications <a href="https://github.com/bamos/cv/blob/master/publications/"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<a href="https://scholar.google.com/citations?user=CZwrwHAAAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>


### Preprints and Tech Reports <a href="https://github.com/bamos/cv/blob/master/publications/tech-reports.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<table class="table table-hover">

<tr>
<td>
    <strong>Task-based End-to-end Model Learning</strong><br>
    P. Donti, <strong>B. Amos</strong>, and J. Kolter<br>
    arXiv 2017<br>
    [P1] 
[<a href='javascript: none'
    onclick='$("#abs_donti2017taskP").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.04529' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/e2e-model-learning' target='_blank'>code</a>] <br>
    
<div id="abs_donti2017taskP" style="text-align: justify; display: none" markdown="1">
As machine learning techniques have become more ubiquitous, it has
become common to see machine learning prediction algorithms operating
within some larger process. However, the criteria by which we train
machine learning algorithms often differ from the ultimate criteria on
which we evaluate them. This paper proposes an end-to-end approach for
learning probabilistic machine learning models within the context of
stochastic programming, in a manner that directly captures the
ultimate task-based objective for which they will be used. We then
present two experimental evaluations of the proposed approach, one as
applied to a generic inventory stock problem and the second to a
real-world electrical grid scheduling task. In both cases, we show
that the proposed approach can outperform both a traditional modeling
approach and a purely black-box policy optimization approach.
</div>

</td>
</tr>


<tr>
<td>
    <strong>OpenFace: A general-purpose face recognition library with mobile applications</strong><br>
    <strong>B. Amos</strong>, B. Ludwiczuk, and M. Satyanarayanan<br>
    CMU 2016<br>
    [P2] 
[<a href='javascript: none'
    onclick='$("#abs_amos2016openfaceP").toggle()'>abs</a>] [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'>pdf</a>]  [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
    
<div id="abs_amos2016openfaceP" style="text-align: justify; display: none" markdown="1">
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
<td>
    <strong>Are Cloudlets Necessary?</strong><br>
    Y. Gao, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, and M. Satyanarayanan<br>
    CMU 2015<br>
    [P3] 
[<a href='javascript: none'
    onclick='$("#abs_gao2015cloudletsP").toggle()'>abs</a>] [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2015/CMU-CS-15-139.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_gao2015cloudletsP" style="text-align: justify; display: none" markdown="1">
We present experimental results from Wi-Fi and 4G LTE networks to validate the
intuition that low end-to-end latency of cloud services improves application
response time and reduces energy consumption on mobile devices. We focus
specifically on computational offloading as a cloud service. Using a wide
range of applications, and exploring both pre-partitioned and dynamically
partitioned approaches, we demonstrate the importance of low latency for
cloud offload services. We show the best performance is achieved by
offloading to cloudlets, which are small-scale edge-located data centers. Our
results show that cloudlets can improve response times 51% and reduce energy
consumption in a mobile device by up to 42% compared to cloud offload.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Adaptive VM handoff across cloudlets</strong><br>
    K. Ha, Y. Abe, Z. Chen, W. Hu, <strong>B. Amos</strong>, P. Pillai, and M. Satyanarayanan<br>
    CMU 2015<br>
    [P4] 
[<a href='javascript: none'
    onclick='$("#abs_ha2015adaptiveP").toggle()'>abs</a>] [<a href='http://ra.adm.cs.cmu.edu/anon/2015/CMU-CS-15-113.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_ha2015adaptiveP" style="text-align: justify; display: none" markdown="1">
Cloudlet offload is a valuable technique for ensuring low end-to-end latency of
resource-intensive cloud processing for many emerging mobile applications.
This paper examines the impact of user mobility on cloudlet offload, and
shows that even modest user mobility can result in significant network
degradation. We propose VM handoff as a technique for seamlessly transferring
VMencapsulated execution to a more optimal offload site as users move. Our
approach can perform handoff in roughly a minute even over limited WANs by
adaptively reducing data transferred. We present experimental results to
validate our implementation and to demonstrate effectiveness of adaptation to
changing network conditions and processing capacity
</div>

</td>
</tr>


<tr>
<td>
    <strong>QNSTOP-QuasiNewton Algorithm for Stochastic Optimization</strong><br>
    <strong>B. Amos</strong>, D. Easterling, L. Watson, W. Thacker, B. Castle, and M. Trosset<br>
    VT 2014<br>
    [P5] 
[<a href='javascript: none'
    onclick='$("#abs_amos2014QNSTOPP").toggle()'>abs</a>] [<a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2014QNSTOPP" style="text-align: justify; display: none" markdown="1">
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

### Conference Proceedings <a href="https://github.com/bamos/cv/blob/master/publications/conference.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<table class="table table-hover">

<tr>
<td>
    <strong>OptNet: Differentiable Optimization as a Layer in Neural Networks</strong><br>
    <strong>B. Amos</strong> and J. Kolter<br>
    ICML 2017<br>
    [C1] 
[<a href='javascript: none'
    onclick='$("#abs_amos2017optnetC").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.00443' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/optnet' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017optnetC" style="text-align: justify; display: none" markdown="1">
This paper presents OptNet, a network architecture that integrates
optimization problems (here, specifically in the form of quadratic programs)
as individual layers in larger end-to-end trainable deep networks.
These layers encode constraints and complex dependencies
between the hidden states that traditional convolutional and
fully-connected layers often cannot capture.
In this paper, we explore the foundations for such an architecture:
we show how techniques from sensitivity analysis, bilevel
optimization, and implicit differentiation can be used to
exactly differentiate through these layers and with respect
to layer parameters;
we develop a highly efficient solver for these layers that exploits fast
GPU-based batch solves within a primal-dual interior point method, and which
provides backpropagation gradients with virtually no additional cost on top of
the solve;
and we highlight the application of these approaches in several problems.
In one notable example, we show that the method is
capable of learning to play mini-Sudoku (4x4) given just input and output games, with no a priori information about the rules of the game;
this highlights the ability of our architecture to learn hard
constraints better than other neural architectures.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Input Convex Neural Networks</strong><br>
    <strong>B. Amos</strong>, L. Xu, and J. Kolter<br>
    ICML 2017<br>
    [C2] 
[<a href='javascript: none'
    onclick='$("#abs_amos2017inputC").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1609.07152' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/icnn' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017inputC" style="text-align: justify; display: none" markdown="1">
This paper presents the input convex neural network
architecture. These are scalar-valued (potentially deep) neural
networks with constraints on the network parameters such that the
output of the network is a convex function of (some of) the inputs.
The networks allow for efficient inference via optimization over some
inputs to the network given others, and can be applied to settings
including structured prediction, data imputation, reinforcement
learning, and others. In this paper we lay the basic groundwork for
these models, proposing methods for inference, optimization and
learning, and analyze their representational power. We show that many
existing neural network architectures can be made input-convex with
a minor modification, and develop specialized optimization
algorithms tailored to this setting. Finally, we highlight the
performance of the methods on multi-label prediction, image
completion, and reinforcement learning problems, where we show
improvement over the existing state of the art in many cases.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Collapsed Variational Inference for Sum-Product Networks</strong><br>
    H. Zhao, T. Adel, G. Gordon, and <strong>B. Amos</strong><br>
    ICML 2016<br>
    [C3] 
[<a href='javascript: none'
    onclick='$("#abs_zhao2016collapsedC").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~hzhao1/papers/ICML2016/BL-SPN-main.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_zhao2016collapsedC" style="text-align: justify; display: none" markdown="1">
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
<td>
    <strong>Applying machine learning classifiers to dynamic Android malware detection at scale</strong><br>
    <strong>B. Amos</strong>, H. Turner, and J. White<br>
    IWCMC 2013<br>
    [C4] 
[<a href='javascript: none'
    onclick='$("#abs_amos2013applyingC").toggle()'>abs</a>] [<a href='http://bamos.github.io/data/papers/amos-iwcmc2013.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/VT-Magnum-Research/antimalware' target='_blank'>code</a>] <br>
    
<div id="abs_amos2013applyingC" style="text-align: justify; display: none" markdown="1">
The widespread adoption and contextually sensitive
nature of smartphone devices has increased concerns over smartphone
malware. Machine learning classifiers are a current method
for detecting malicious applications on smartphone systems. This
paper presents the evaluation of a number of existing classifiers, using a dataset containing thousands of real (i.e. not synthetic)
applications. We also present our STREAM framework, which
was developed to enable rapid large-scale validation of mobile
malware machine learning classifiers.
</div>

</td>
</tr>


</table>

### Workshop, Symposium, and Short Papers <a href="https://github.com/bamos/cv/blob/master/publications/short.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<table class="table table-hover">

<tr>
<td>
    <strong>Privacy mediators: helping IoT cross the chasm</strong><br>
    N. Davies, N. Taft, M. Satyanarayanan, S. Clinch, and <strong>B. Amos</strong><br>
    HotMobile 2016<br>
    [W1] 
[<a href='javascript: none'
    onclick='$("#abs_davies2016privacyW").toggle()'>abs</a>] [<a href='http://eprints.lancs.ac.uk/78255/1/44691.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_davies2016privacyW" style="text-align: justify; display: none" markdown="1">
Unease over data privacy will retard consumer acceptance of IoT
deployments. The primary source of discomfort is a lack of user
control over raw data that is streamed directly from sensors to the
cloud. This is a direct consequence of the over-centralization of
today’s cloud-based IoT hub designs. We propose a solution that
interposes a locally-controlled software component called a privacy
mediator on every raw sensor stream. Each mediator is in the same
administrative domain as the sensors whose data is being collected, and dynamically enforces the current privacy policies of the owners
of the sensors or mobile users within the domain. This solution necessitates
a logical point of presence for mediators within the administrative
boundaries of each organization. Such points of presence
are provided by cloudlets, which are small locally-administered data
centers at the edge of the Internet that can support code mobility.
The use of cloudlet-based mediators aligns well with natural personal
and organizational boundaries of trust and responsibility.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Early Implementation Experience with Wearable Cognitive Assistance Applications</strong><br>
    Z. Chen, L. Jiang, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, A. Hauptmann, and M. Satyanarayanan<br>
    WearSys 2015<br>
    [W2] 
[<a href='javascript: none'
    onclick='$("#abs_chen2015earlyW").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~satya/docdir/chen-wearsys2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_chen2015earlyW" style="text-align: justify; display: none" markdown="1">
A cognitive assistance application combines a wearable device such
as Google Glass with cloudlet processing to provide step-by-step
guidance on a complex task. In this paper, we focus on user assistance
for narrow and well-defined tasks that require specialized
knowledge and/or skills. We describe proof-of-concept implementations
for four different tasks: assembling 2D Lego models, freehand
sketching, playing ping-pong, and recommending context-relevant
YouTube tutorials. We then reflect on the difficulties we faced in
building these applications, and suggest future research that could
simplify the creation of similar applications.
</div>

</td>
</tr>


<tr>
<td>
    <strong>The Case for Offload Shaping</strong><br>
    W. Hu, <strong>B. Amos</strong>, Z. Chen, K. Ha, W. Richter, P. Pillai, B. Gilbert, J. Harkes, and M. Satyanarayanan<br>
    HotMobile 2015<br>
    [W3] 
[<a href='javascript: none'
    onclick='$("#abs_hu2014caseW").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~satya/docdir/hu-hotmobile2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_hu2014caseW" style="text-align: justify; display: none" markdown="1">
When offloading computation from a mobile device, we show
that it can pay to perform additional on-device work in order
to reduce the offloading workload. We call this offload shaping, and demonstrate its application at many different levels
of abstraction using a variety of techniques. We show that
offload shaping can produce significant reduction in resource
demand, with little loss of application-level fidelity
</div>

</td>
</tr>


<tr>
<td>
    <strong>Performance study of Spindle, a web analytics query engine implemented in Spark</strong><br>
    <strong>B. Amos</strong> and D. Tompkins<br>
    CloudCom 2014<br>
    [W4] 
[<a href='javascript: none'
    onclick='$("#abs_amos2014performanceW").toggle()'>abs</a>] [<a href='http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7037709' target='_blank'>pdf</a>]  [<a href='https://github.com/adobe-research/spindle' target='_blank'>code</a>] <br>
    
<div id="abs_amos2014performanceW" style="text-align: justify; display: none" markdown="1">
This paper shares our experiences building and benchmarking Spindle as an open
source Spark-based web analytics platform. Spindle's design has been
motivated by real-world queries and data requiring concurrent, low latency
query execution. We identify a search space of Spark tuning options and study
their impact on Spark's performance. Results from a self-hosted six node
cluster with one week of analytics data (13.1GB) indicate tuning options such
as proper partitioning can cause a 5x performance improvement.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Global Parameter Estimation for a Eukaryotic Cell Cycle Model in Systems Biology</strong><br>
    T. Andrew, <strong>B. Amos</strong>, D. Easterling, C. Oguz, W. Baumann, J. Tyson, and L. Watson<br>
    SummerSim 2014<br>
    [W5] 
[<a href='javascript: none'
    onclick='$("#abs_andrew2014globalW").toggle()'>abs</a>] [<a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>pdf</a>] <br>
    
<div id="abs_andrew2014globalW" style="text-align: justify; display: none" markdown="1">
The complicated process by which a yeast cell divides, known as the cell
cycle, has been modeled by a system of 26 nonlinear ordinary differential
equations (ODEs) with 149 parameters. This model captures the chemical
kinetics of the regulatory networks controlling the cell division process
in budding yeast cells. Empirical data is discrete and matched against
discrete inferences (e.g., whether a particular mutant cell lives or dies)
computed from the ODE solution trajectories. The problem of
estimating the ODE parameters to best fit the model to the data is a
149-dimensional global optimization problem attacked by the deterministic
algorithm VTDIRECT95 and by the nondeterministic algorithms differential
evolution, QNSTOP, and simulated annealing, whose performances are
compared.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Fortran 95 implementation of QNSTOP for global and stochastic optimization</strong><br>
    <strong>B. Amos</strong>, D. Easterling, L. Watson, B. Castle, M. Trosset, and W. Thacker<br>
    SpringSim (HPC) 2014<br>
    [W6] 
[<a href='javascript: none'
    onclick='$("#abs_amos2014fortranW").toggle()'>abs</a>] [<a href='http://dl.acm.org/citation.cfm?id=2663525' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2014fortranW" style="text-align: justify; display: none" markdown="1">
A serial Fortran 95 implementation of the QNSTOP algorithm is presented.
QNSTOP is a class of quasi-Newton methods for stochastic optimization with
variations for deterministic global optimization. This discussion provides
results from testing on various deterministic and stochastic optimization
functions.
</div>

</td>
</tr>


</table>

### Magazine Articles <a href="https://github.com/bamos/cv/blob/master/publications/magazine.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<table class="table table-hover">

<tr>
<td>
    <strong>Edge Analytics in the Internet of Things</strong><br>
    M. Satyanarayanan, P. Simoens, Y. Xiao, P. Pillai, Z. Chen, K. Ha, W. Hu, and <strong>B. Amos</strong><br>
    IEEE Pervasive Computing 2015<br>
    [M1] 
[<a href='javascript: none'
    onclick='$("#abs_satyanarayanan2015edgeM").toggle()'>abs</a>] [<a href='https://www.cs.cmu.edu/~satya/docdir/satya-edge2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_satyanarayanan2015edgeM" style="text-align: justify; display: none" markdown="1">
High-data-rate sensors, such as video cameras, are becoming ubiquitous in the
Internet of Things. This article describes GigaSight, an Internet-scale
repository of crowd-sourced video content, with strong enforcement of privacy
preferences and access controls. The GigaSight architecture is a federated
system of VM-based cloudlets that perform video analytics at the edge of the
Internet, thus reducing the demand for ingress bandwidth into the cloud.
Denaturing, which is an owner-specific reduction in fidelity of video content
to preserve privacy, is one form of analytics on cloudlets. Content-based
indexing for search is another form of cloudlet-based analytics. This article
is part of a special issue on smart spaces.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Bad Parts: Are Our Manufacturing Systems at Risk of Silent Cyberattacks?</strong><br>
    H. Turner, J. White, J. Camelio, C. Williams, <strong>B. Amos</strong>, and R. Parker<br>
    IEEE Security & Privacy 2015<br>
    [M2] 
[<a href='javascript: none'
    onclick='$("#abs_turner2015badM").toggle()'>abs</a>] [<a href='http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7118094' target='_blank'>pdf</a>] <br>
    
<div id="abs_turner2015badM" style="text-align: justify; display: none" markdown="1">
Recent cyberattacks have highlighted the risk of physical equipment operating
outside designed tolerances to produce catastrophic failures. A related
threat is cyberattacks that change the design and manufacturing of a
machine's part, such as an automobile brake component, so it no longer
functions properly. These risks stem from the lack of cyber-physical models
to identify ongoing attacks as well as the lack of rigorous application of
known cybersecurity best practices. To protect manufacturing processes in the
future, research will be needed on a number of critical cyber-physical
manufacturing security topics.
</div>

</td>
</tr>


</table>

### Posters <a href="https://github.com/bamos/cv/blob/master/publications/posters.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<table class="table table-hover">

<tr>
<td>
    <strong>Input-Convex Deep Networks</strong><br>
    <strong>B. Amos</strong> and J. Kolter<br>
    ICLR Workshop 2016<br>
    [P1] [<a href='http://bamos.github.io/data/posters/2016-iclr-icnn.pdf' target='_blank'>pdf</a>] <br>
    
</td>
</tr>


<tr>
<td>
    <strong>Face Recognition for Context Sensitive IoT Systems</strong><br>
    <strong>B. Amos</strong> and M. Satyanarayanan<br>
    HotMobile 2016<br>
    [P2] [<a href='http://bamos.github.io/data/posters/2016-hotmobile-facerec.pdf' target='_blank'>pdf</a>]  [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
    
</td>
</tr>


</table>
