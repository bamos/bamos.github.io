 I am a research scientist at <b>Facebook AI (FAIR)</b> in NYC and broadly study foundational topics and applications in <b>machine learning</b> (sometimes deep) and <b>optimization</b> (sometimes convex), including reinforcement learning, computer vision, language, statistics, and theory. I have a Ph.D. from <b>Carnegie Mellon University</b> and was advised by [Zico Kolter](http://zicokolter.com/) and supported by an <b>NSF graduate research fellowship.</b> My thesis is on [Differentiable Optimization-Based Modeling for Machine Learning](https://github.com/bamos/thesis). My publications are available below and on [my Google Scholar page](https://scholar.google.com/citations?user=d8gdZR4AAAAJ) and my open source contributions can be found on [my Github profile](https://github.com/bamos). I have also worked on <b>reinforcement learning</b> during an internship with [Nando de Freitas](https://www.cs.ubc.ca/~nando/) and [Misha Denil](http://mdenil.com/) at <b>DeepMind</b> in 2017 and on vision with [Vladlen Koltun](http://vladlen.info) at <b>Intel Labs</b> in 2018. <br><br>


## <i class="fa fa-chevron-right"></i> Education

<table class="table table-hover">
  <tr>
    <td class="col-md-3">Aug 2014 - May 2019</td>
    <td>
        <strong>Ph.D. in Computer Science</strong>
          (0.00/0.00)
        <br>
      Carnegie Mellon University
    </td>
  </tr>
  <tr>
    <td class="col-md-3">Aug 2014 - May 2016</td>
    <td>
        <strong>M.S. in Computer Science</strong>
          (0.00/0.00)
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
    <td class="col-md-3">Aug 2007 - May 2011</td>
    <td>
      Northside High School (Roanoke, Virginia)
    </td>
  </tr>
</table>


## <i class="fa fa-chevron-right"></i> Experience
<table class="table table-hover">
<tr>
  <td class='col-md-3'>May 2019 - Present</td>
  <td><strong>Facebook AI</strong>, Research Scientist</td>
</tr>
<tr>
</tr>
<tr>
  <td class='col-md-3'>June 2018 - Sept 2018</td>
  <td><strong>Intel Labs</strong>, Research Intern</td>
</tr>
<tr>
</tr>
<tr>
  <td class='col-md-3'>May 2017 - Oct 2017</td>
  <td><strong>Google DeepMind</strong>, Research Intern</td>
</tr>
<tr>
</tr>
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


## <i class="fa fa-chevron-right"></i> Selected Publications <a href="https://github.com/bamos/cv/blob/master/publications/selected.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<a href="https://scholar.google.com/citations?user=d8gdZR4AAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>

<table class="table table-hover">
<tr>
<td class="col-md-3"><a href='http://web.stanford.edu/~boyd/papers/pdf/diff_cvxpy.pdf' target='_blank'><img src="images/publications/amos2019differentiable3.png"/></a> </td>
<td>
    <strong>Differentiable Convex Optimization Layers</strong><br>
    A. Agrawal*, <strong>B. Amos*</strong>, S. Barratt*, S. Boyd*, S. Diamond*, and J. Z. Kolter*<br>
    NeurIPS 2019<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019differentiable3").toggle()'>abs</a>] [<a href='http://web.stanford.edu/~boyd/papers/pdf/diff_cvxpy.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/cvxgrp/cvxpylayers' target='_blank'>code</a>] <br>
    
<div id="abs_amos2019differentiable3" style="text-align: justify; display: none" markdown="1">
Recent work has shown how to embed differentiable optimization problems (that is, problems whose solutions can be backpropagated through) as layers within deep learning architectures. This method provides a useful inductive bias for certain problems, but existing software for differentiable optimization layers is rigid and difficult to apply to new settings. In this paper, we propose an approach to differentiating through disciplined convex programs, a subclass of convex optimization problems used by domain-specific languages (DSLs) for convex optimization. We introduce disciplined parametrized programming, a subset of disciplined convex programming, and we show that every disciplined parametrized program can be represented as the composition of an affine map from parameters to problem data, a solver, and an affine map from the solver’s solution to a solution of the original problem (a new form we refer to as affine-solver-affine form). We then demonstrate how to efficiently differentiate through each of these components, allowing for end-to-end analytical differentiation through the entire convex program. We implement our methodology in version 1.1 of CVXPY, a popular Python-embedded DSL for convex optimization, and additionally implement differentiable layers for disciplined convex programs in PyTorch and TensorFlow 2.0. Our implementation significantly lowers the barrier to using convex optimization problems in differentiable programs. We present applications in linear machine learning models and in stochastic control, and we show that our layer is competitive (in execution time) compared to specialized differentiable solvers from past work.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='https://arxiv.org/abs/1909.12830' target='_blank'><img src="images/publications/amos2019differentiable2.png"/></a> </td>
<td>
    <strong>The Differentiable Cross-Entropy Method</strong><br>
    <strong>B. Amos</strong> and D. Yarats<br>
    arXiv 2019<br>
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019differentiable2").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1909.12830' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2019differentiable2" style="text-align: justify; display: none" markdown="1">
We study the Cross-Entropy Method (CEM) for the non-convex
optimization of a continuous and parameterized
objective function and introduce a differentiable
variant (DCEM) that enables us to differentiate the
output of CEM with respect to the objective
function's parameters. In the machine learning
setting this brings CEM inside of the end-to-end
learning pipeline where this has otherwise been
impossible. We show applications in a synthetic
energy-based structured prediction task and in
non-convex continuous control. In the control
setting we show on the simulated cheetah and walker
tasks that we can embed their optimal action
sequences with DCEM and then use policy optimization
to fine-tune components of the controller as a step
towards combining model-based and model-free RL.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='https://arxiv.org/abs/1906.08707' target='_blank'><img src="images/publications/amos2019limited.png"/></a> </td>
<td>
    <strong>The Limited Multi-Label Projection Layer</strong><br>
    <strong>B. Amos</strong>, V. Koltun, and J. Z. Kolter<br>
    arXiv 2019<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019limited").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1906.08707' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/lml' target='_blank'>code</a>] <br>
    
<div id="abs_amos2019limited" style="text-align: justify; display: none" markdown="1">
We propose the Limited Multi-Label (LML) projection layer as a new
primitive operation for end-to-end learning systems. The LML layer
provides a probabilistic way of modeling multi-label predictions
limited to having exactly k labels. We derive efficient forward and
backward passes for this layer and show how the layer can be used to
optimize the top-k recall for multi-label tasks with incomplete label
information. We evaluate LML layers on top-k CIFAR-100 classification
and scene graph generation. We show that LML layers add a negligible
amount of computational overhead, strictly improve the model's
representational capacity, and improve accuracy. We also revisit the
truncated top-k entropy method as a competitive baseline for top-k
classification.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='https://github.com/bamos/thesis/raw/master/bamos_thesis.pdf' target='_blank'><img src="images/publications/amos2019differentiable.png"/></a> </td>
<td>
    <strong>Differentiable Optimization-Based Modeling for Machine Learning</strong><br>
    <strong>B. Amos</strong><br>
    Ph.D. Thesis 2019<br>
    
    [4] [<a href='https://github.com/bamos/thesis/raw/master/bamos_thesis.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/bamos/thesis' target='_blank'>code</a>] <br>
    
</td>
</tr>


<tr>
<td class="col-md-3"><a href='https://arxiv.org/abs/1810.13400' target='_blank'><img src="images/publications/amos2018end.png"/></a> </td>
<td>
    <strong>Differentiable MPC for End-to-end Planning and Control</strong><br>
    <strong>B. Amos</strong>, I. Rodriguez, J. Sacks, B. Boots, and J. Z. Kolter<br>
    NeurIPS 2018<br>
    
    [5] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018end").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1810.13400' target='_blank'>pdf</a>]  [<a href='https://locuslab.github.io/mpc.pytorch/' target='_blank'>code</a>] <br>
    
<div id="abs_amos2018end" style="text-align: justify; display: none" markdown="1">
We present foundations for using Model Predictive Control (MPC) as a differentiable policy class for reinforcement learning in continuous state and action spaces. This provides one way of leveraging and combining the advantages of model-free and model-based approaches. Specifically, we differentiate through MPC by using the KKT conditions of the convex approximation at a fixed point of the controller. Using this strategy, we are able to learn the cost and dynamics of a controller via end-to-end learning. Our experiments focus on imitation learning in the pendulum and cartpole domains, where we learn the cost and dynamics terms of an MPC policy class. We show that our MPC policies are significantly more data-efficient than a generic neural network and that our method is superior to traditional system identification in a setting where the expert is unrealizable.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='http://arxiv.org/abs/1805.08195' target='_blank'><img src="images/publications/brown2018depth.png"/></a> </td>
<td>
    <strong>Depth-Limited Solving for Imperfect-Information Games</strong><br>
    N. Brown, T. Sandholm, and <strong>B. Amos</strong><br>
    NeurIPS 2018<br>
    
    [6] 
[<a href='javascript:;'
    onclick='$("#abs_brown2018depth").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1805.08195' target='_blank'>pdf</a>] <br>
    
<div id="abs_brown2018depth" style="text-align: justify; display: none" markdown="1">
A fundamental challenge in imperfect-information games is that states do not have well-defined values. As a result, depth-limited search algorithms used in single-agent settings and perfect-information games do not apply. This paper introduces a principled way to conduct depth-limited solving in imperfect-information games by allowing the opponent to choose among a number of strategies for the remainder of the game at the depth limit. Each one of these strategies results in a different set of values for leaf nodes. This forces an agent to be robust to the different strategies an opponent may employ. We demonstrate the effectiveness of this approach by building a master-level heads-up no-limit Texas hold'em poker AI that defeats two prior top agents using only a 4-core CPU and 16 GB of memory. Developing such a powerful agent would have previously required a supercomputer.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='https://openreview.net/forum?id=r1HhRfWRZ' target='_blank'><img src="images/publications/amos2018learning.png"/></a> </td>
<td>
    <strong>Learning Awareness Models</strong><br>
    <strong>B. Amos</strong>, L. Dinh, S. Cabi, T. Roth&ouml;rl, S. Colmenarejo, A. Muldal, T. Erez, Y. Tassa, N. de Freitas, and M. Denil<br>
    ICLR 2018<br>
    
    [7] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018learning").toggle()'>abs</a>] [<a href='https://openreview.net/forum?id=r1HhRfWRZ' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2018learning" style="text-align: justify; display: none" markdown="1">
We consider the setting of an agent with a fixed body interacting with an
unknown and uncertain external world. We show that models
trained to predict proprioceptive information about the
agent's body come to represent objects in the external world.
In spite of being trained with only internally available
signals, these dynamic body models come to represent external
objects through the necessity of predicting their effects on
the agent's own body. That is, the model learns holistic
persistent representations of objects in the world, even
though the only training signals are body signals. Our
dynamics model is able to successfully predict distributions
over 132 sensor readings over 100 steps into the future and we
demonstrate that even when the body is no longer in contact
with an object, the latent variables of the dynamics model
continue to represent its shape. We show that active data
collection by maximizing the entropy of predictions about the
body-touch sensors, proprioception and vestibular
information-leads to learning of dynamic models that show
superior performance when used for control. We also collect
data from a real robotic hand and show that the same models
can be used to answer questions about properties of objects in
the real world. Videos with qualitative results of our models
are available <a href="https://goo.gl/mZuqAV">here</a>.
</div>

</td>
</tr>


<tr>
<td class="col-md-3"><a href='http://arxiv.org/abs/1703.04529' target='_blank'><img src="images/publications/donti2017task.png"/></a> </td>
<td>
    <strong>Task-based End-to-end Model Learning</strong><br>
    P. Donti, <strong>B. Amos</strong>, and J. Z. Kolter<br>
    NeurIPS 2017<br>
    
    [8] 
[<a href='javascript:;'
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
    <strong>B. Amos</strong> and J. Z. Kolter<br>
    ICML 2017<br>
    
    [9] 
[<a href='javascript:;'
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
    <strong>B. Amos</strong>, L. Xu, and J. Z. Kolter<br>
    ICML 2017<br>
    
    [10] 
[<a href='javascript:;'
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
    
    [11] 
[<a href='javascript:;'
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
    
    [12] 
[<a href='javascript:;'
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
    
    [13] 
[<a href='javascript:;'
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
  <td class='col-md-2'>2011 - 2014</td>
  <td>
    Eight undergraduate scholarships
    <!--  -->
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Service
<table class="table table-hover">
<tr>
  <td class='col-md-2'>Reviewer</td>
  <td markdown="1">
ICML 2018, NeurIPS 2018, NeurIPS Deep RL Workshop 2018, ICLR 2019 (outstanding reviewer), ICML 2019, ICCV 2019
  </td>
</tr>
<tr>
  <td class='col-md-2'>Admissions</td>
  <td markdown="1">
CMU CSD MS 2014-2015
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Skills
<table class="table table-hover">
<tr>
  <td class='col-md-2'>Languages</td>
  <td markdown="1">
C, C++, Fortran, Haskell, Java, Lua, Make, *Mathematica*, Python, R, Scala
  </td>
</tr>
<tr>
  <td class='col-md-2'>Frameworks</td>
  <td markdown="1">
NumPy, Pandas, PyTorch, SciPy, TensorFlow, Torch7
  </td>
</tr>
<tr>
  <td class='col-md-2'>Systems</td>
  <td markdown="1">
Linux, OSX
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> All Publications <a href="https://github.com/bamos/cv/blob/master/publications/all.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<a href="https://scholar.google.com/citations?user=d8gdZR4AAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>

<h2>2019</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Differentiable Convex Optimization Layers</strong><br>
    A. Agrawal*, <strong>B. Amos*</strong>, S. Barratt*, S. Boyd*, S. Diamond*, and J. Z. Kolter*<br>
    NeurIPS 2019<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019differentiable3_all_bib").toggle()'>abs</a>] [<a href='http://web.stanford.edu/~boyd/papers/pdf/diff_cvxpy.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/cvxgrp/cvxpylayers' target='_blank'>code</a>] <br>
    
<div id="abs_amos2019differentiable3_all_bib" style="text-align: justify; display: none" markdown="1">
Recent work has shown how to embed differentiable optimization problems (that is, problems whose solutions can be backpropagated through) as layers within deep learning architectures. This method provides a useful inductive bias for certain problems, but existing software for differentiable optimization layers is rigid and difficult to apply to new settings. In this paper, we propose an approach to differentiating through disciplined convex programs, a subclass of convex optimization problems used by domain-specific languages (DSLs) for convex optimization. We introduce disciplined parametrized programming, a subset of disciplined convex programming, and we show that every disciplined parametrized program can be represented as the composition of an affine map from parameters to problem data, a solver, and an affine map from the solver’s solution to a solution of the original problem (a new form we refer to as affine-solver-affine form). We then demonstrate how to efficiently differentiate through each of these components, allowing for end-to-end analytical differentiation through the entire convex program. We implement our methodology in version 1.1 of CVXPY, a popular Python-embedded DSL for convex optimization, and additionally implement differentiable layers for disciplined convex programs in PyTorch and TensorFlow 2.0. Our implementation significantly lowers the barrier to using convex optimization problems in differentiable programs. We present applications in linear machine learning models and in stochastic control, and we show that our layer is competitive (in execution time) compared to specialized differentiable solvers from past work.
</div>

</td>
</tr>


<tr>
<td>
    <strong>The Differentiable Cross-Entropy Method</strong><br>
    <strong>B. Amos</strong> and D. Yarats<br>
    arXiv 2019<br>
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019differentiable_all_bib").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1909.12830' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2019differentiable_all_bib" style="text-align: justify; display: none" markdown="1">
We study the Cross-Entropy Method (CEM) for the non-convex
optimization of a continuous and parameterized
objective function and introduce a differentiable
variant (DCEM) that enables us to differentiate the
output of CEM with respect to the objective
function's parameters. In the machine learning
setting this brings CEM inside of the end-to-end
learning pipeline where this has otherwise been
impossible. We show applications in a synthetic
energy-based structured prediction task and in
non-convex continuous control. In the control
setting we show on the simulated cheetah and walker
tasks that we can embed their optimal action
sequences with DCEM and then use policy optimization
to fine-tune components of the controller as a step
towards combining model-based and model-free RL.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Generalized Inner Loop Meta-Learning</strong><br>
    E. Grefenstette, <strong>B. Amos</strong>, D. Yarats, P. Htut, A. Molchanov, F. Meier, D. Kiela, K. Cho, and S. Chintala<br>
    arXiv 2019<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_grefenstette2019generalized_all_bib").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1910.01727' target='_blank'>pdf</a>] <br>
    
<div id="abs_grefenstette2019generalized_all_bib" style="text-align: justify; display: none" markdown="1">
Many (but not all) approaches self-qualifying as "meta-learning" in
deep learning and reinforcement learning fit a
common pattern of approximating the solution to a
nested optimization problem. In this paper, we give
a formalization of this shared pattern, which we
call GIMLI, prove its general requirements, and
derive a general-purpose algorithm for implementing
similar approaches. Based on this analysis and
algorithm, we describe a library of our design, higher, which we share with the community to assist
and enable future research into these kinds of
meta-learning approaches. We end the paper by
showcasing the practical applications of this
framework and library through illustrative
experiments and ablation studies which they
facilitate.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Improving Sample Efficiency in Model-Free Reinforcement Learning from Images</strong><br>
    D. Yarats, A. Zhang, I. Kostrikov, <strong>B. Amos</strong>, J. Pineau, and R. Fergus<br>
    arXiv 2019<br>
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_yarats2019improving_all_bib").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1910.01741' target='_blank'>pdf</a>] <br>
    
<div id="abs_yarats2019improving_all_bib" style="text-align: justify; display: none" markdown="1">
Training an agent to solve control tasks directly from
high-dimensional images with model-free
reinforcement learning (RL) has proven
difficult. The agent needs to learn a latent
representation together with a control policy to
perform the task. Fitting a high-capacity encoder
using a scarce reward signal is not only sample
inefficient, but also prone to suboptimal
convergence. Two ways to improve sample efficiency
are to extract relevant features for the task and
use off-policy algorithms. We dissect various
approaches of learning good latent features, and
conclude that the image reconstruction loss is the
essential ingredient that enables efficient and
stable representation learning in image-based
RL. Following these findings, we devise an
off-policy actor-critic algorithm with an auxiliary
decoder that trains end-to-end and matches
state-of-the-art performance across both model-free
and model-based algorithms on many challenging
control tasks. We release our code to encourage
future research on image-based RL.
</div>

</td>
</tr>


<tr>
<td>
    <strong>The Limited Multi-Label Projection Layer</strong><br>
    <strong>B. Amos</strong>, V. Koltun, and J. Z. Kolter<br>
    arXiv 2019<br>
    
    [5] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019limited_all_bib").toggle()'>abs</a>] [<a href='https://arxiv.org/abs/1906.08707' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/lml' target='_blank'>code</a>] <br>
    
<div id="abs_amos2019limited_all_bib" style="text-align: justify; display: none" markdown="1">
We propose the Limited Multi-Label (LML) projection layer as a new
primitive operation for end-to-end learning systems. The LML layer
provides a probabilistic way of modeling multi-label predictions
limited to having exactly k labels. We derive efficient forward and
backward passes for this layer and show how the layer can be used to
optimize the top-k recall for multi-label tasks with incomplete label
information. We evaluate LML layers on top-k CIFAR-100 classification
and scene graph generation. We show that LML layers add a negligible
amount of computational overhead, strictly improve the model's
representational capacity, and improve accuracy. We also revisit the
truncated top-k entropy method as a competitive baseline for top-k
classification.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Differentiable Optimization-Based Modeling for Machine Learning</strong><br>
    <strong>B. Amos</strong><br>
    Ph.D. Thesis 2019<br>
    
    [6] [<a href='https://github.com/bamos/thesis/raw/master/bamos_thesis.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/bamos/thesis' target='_blank'>code</a>] <br>
    
</td>
</tr>

</table>
<h2>2018</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Differentiable MPC for End-to-end Planning and Control</strong><br>
    <strong>B. Amos</strong>, I. Rodriguez, J. Sacks, B. Boots, and J. Z. Kolter<br>
    NeurIPS 2018<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018end_all_bib").toggle()'>abs</a>]<br>
    
<div id="abs_amos2018end_all_bib" style="text-align: justify; display: none" markdown="1">
In this paper we present foundations for using model predictive control (MPC) as a differentiable policy class in reinforcement learning. Specifically, we differentiate through MPC by using the KKT conditions of the convex approximation at a fixed point of the solver. Using this strategy, we are able to learn the cost and dynamics of a controller via end-to-end learning in a larger system. We empirically show results in an imitation learning setting, demonstrating that we can recover the underlying dynamics and cost more efficiently and reliably than with a generic neural network policy class
</div>

</td>
</tr>


<tr>
<td>
    <strong>Depth-Limited Solving for Imperfect-Information Games</strong><br>
    N. Brown, T. Sandholm, and <strong>B. Amos</strong><br>
    NeurIPS 2018<br>
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_brown2018depth_all_bib").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1805.08195' target='_blank'>pdf</a>] <br>
    
<div id="abs_brown2018depth_all_bib" style="text-align: justify; display: none" markdown="1">
A fundamental challenge in imperfect-information games is that states do not have well-defined values. As a result, depth-limited search algorithms used in single-agent settings and perfect-information games do not apply. This paper introduces a principled way to conduct depth-limited solving in imperfect-information games by allowing the opponent to choose among a number of strategies for the remainder of the game at the depth limit. Each one of these strategies results in a different set of values for leaf nodes. This forces an agent to be robust to the different strategies an opponent may employ. We demonstrate the effectiveness of this approach by building a master-level heads-up no-limit Texas hold'em poker AI that defeats two prior top agents using only a 4-core CPU and 16 GB of memory. Developing such a powerful agent would have previously required a supercomputer.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Learning Awareness Models</strong><br>
    <strong>B. Amos</strong>, L. Dinh, S. Cabi, T. Roth&ouml;rl, S. Colmenarejo, A. Muldal, T. Erez, Y. Tassa, N. de Freitas, and M. Denil<br>
    ICLR 2018<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018learning_all_bib").toggle()'>abs</a>] [<a href='https://openreview.net/forum?id=r1HhRfWRZ' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2018learning_all_bib" style="text-align: justify; display: none" markdown="1">
We consider the setting of an agent with a fixed body interacting with an
unknown and uncertain external world. We show that models
trained to predict proprioceptive information about the
agent's body come to represent objects in the external world.
In spite of being trained with only internally available
signals, these dynamic body models come to represent external
objects through the necessity of predicting their effects on
the agent's own body. That is, the model learns holistic
persistent representations of objects in the world, even
though the only training signals are body signals. Our
dynamics model is able to successfully predict distributions
over 132 sensor readings over 100 steps into the future and we
demonstrate that even when the body is no longer in contact
with an object, the latent variables of the dynamics model
continue to represent its shape. We show that active data
collection by maximizing the entropy of predictions about the
body-touch sensors, proprioception and vestibular
information-leads to learning of dynamic models that show
superior performance when used for control. We also collect
data from a real robotic hand and show that the same models
can be used to answer questions about properties of objects in
the real world. Videos with qualitative results of our models
are available <a href="https://goo.gl/mZuqAV">here</a>.
</div>

</td>
</tr>


<tr>
<td>
    <strong>Enabling Live Video Analytics with a Scalable and Privacy-Aware Framework</strong><br>
    J. Wang, <strong>B. Amos</strong>, A. Das, P. Pillai, N. Sadeh, and M. Satyanarayanan<br>
    ACM TOMM 2018<br>
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_wang2018enabling_all_bib").toggle()'>abs</a>] [<a href='https://dl.acm.org/citation.cfm?id=3209659' target='_blank'>pdf</a>] <br>
    
<div id="abs_wang2018enabling_all_bib" style="text-align: justify; display: none" markdown="1">
We show how to build the components of a privacy-aware, live video
analytics ecosystem from the bottom up, starting
with OpenFace, our new open-source face recognition
system that approaches state-of-the-art
accuracy. Integrating OpenFace with interframe
tracking, we build RTFace, a mechanism for
denaturing video streams that selectively blurs
faces according to specified policies at full frame
rates. This enables privacy management for live
video analytics while providing a secure approach
for handling retrospective policy
exceptions. Finally, we present a scalable, privacy-aware architecture for large camera networks
using RTFace and show how it can be an enabler for a
vibrant ecosystem and marketplace of privacy-aware
video streams and analytics services.
</div>

</td>
</tr>

</table>
<h2>2017</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>A Scalable and Privacy-Aware IoT Service for Live Video Analytics</strong><br>
    J. Wang, <strong>B. Amos</strong>, A. Das, P. Pillai, N. Sadeh, and M. Satyanarayanan<br>
    ACM MMSys 2017<br>
    <strong>Best Paper Award</strong><br>
    [1]<br>
    
</td>
</tr>


<tr>
<td>
    <strong>Task-based End-to-end Model Learning</strong><br>
    P. Donti, <strong>B. Amos</strong>, and J. Z. Kolter<br>
    NeurIPS 2017<br>
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_donti2017task_all_bib").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.04529' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/e2e-model-learning' target='_blank'>code</a>] <br>
    
<div id="abs_donti2017task_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>OptNet: Differentiable Optimization as a Layer in Neural Networks</strong><br>
    <strong>B. Amos</strong> and J. Z. Kolter<br>
    ICML 2017<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_amos2017optnet_all_bib").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1703.00443' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/optnet' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017optnet_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>B. Amos</strong>, L. Xu, and J. Z. Kolter<br>
    ICML 2017<br>
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_amos2017input_all_bib").toggle()'>abs</a>] [<a href='http://arxiv.org/abs/1609.07152' target='_blank'>pdf</a>]  [<a href='https://github.com/locuslab/icnn' target='_blank'>code</a>] <br>
    
<div id="abs_amos2017input_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>Quasi-Newton Stochastic Optimization Algorithm for Parameter Estimation of a Stochastic Model of the Budding Yeast Cell Cycle</strong><br>
    M. Chen, <strong>B. Amos</strong>, L. Watson, J. Tyson, Y. Cao, C. Shaffer, M. Trosset, C. Oguz, and G. Kakoti<br>
    IEEE/ACM TCBB 2017<br>
    
    [5]<br>
    
</td>
</tr>


<tr>
<td>
    <strong>You can teach elephants to dance: agile VM handoff for edge computing</strong><br>
    K. Ha, Y. Abe, T. Eiszler, Z. Chen, W. Hu, <strong>B. Amos</strong>, R. Upadhyaya, P. Pillai, and M. Satyanarayanan<br>
    SEC 2017<br>
    
    [6]<br>
    
</td>
</tr>


<tr>
<td>
    <strong>An Empirical Study of Latency in an Emerging Class of Edge Computing Applications for Wearable Cognitive Assistance</strong><br>
    Z. Chen, W. Hu, J. Wang, S. Zhao, <strong>B. Amos</strong>, G. Wu, K. Ha, K. Elgazzar, P. Pillai, R. Klatzky, D. Siewiorek, and M. Satyanarayanan<br>
    SEC 2017<br>
    
    [7]<br>
    
</td>
</tr>

</table>
<h2>2016</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Collapsed Variational Inference for Sum-Product Networks</strong><br>
    H. Zhao, T. Adel, G. Gordon, and <strong>B. Amos</strong><br>
    ICML 2016<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_zhao2016collapsed_all_bib").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~hzhao1/papers/ICML2016/BL-SPN-main.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_zhao2016collapsed_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>Quantifying the impact of edge computing on mobile applications</strong><br>
    W. Hu, Y. Gao, K. Ha, J. Wang, <strong>B. Amos</strong>, Z. Chen, P. Pillai, and M. Satyanarayanan<br>
    ACM SIGOPS 2016<br>
    
    [2]<br>
    
</td>
</tr>


<tr>
<td>
    <strong>Privacy mediators: helping IoT cross the chasm</strong><br>
    N. Davies, N. Taft, M. Satyanarayanan, S. Clinch, and <strong>B. Amos</strong><br>
    HotMobile 2016<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_davies2016privacy_all_bib").toggle()'>abs</a>] [<a href='http://eprints.lancs.ac.uk/78255/1/44691.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_davies2016privacy_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>OpenFace: A general-purpose face recognition library with mobile applications</strong><br>
    <strong>B. Amos</strong>, B. Ludwiczuk, and M. Satyanarayanan<br>
    CMU 2016<br>
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_amos2016openface_all_bib").toggle()'>abs</a>] [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'>pdf</a>]  [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
    
<div id="abs_amos2016openface_all_bib" style="text-align: justify; display: none" markdown="1">
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

</table>
<h2>2015</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Edge Analytics in the Internet of Things</strong><br>
    M. Satyanarayanan, P. Simoens, Y. Xiao, P. Pillai, Z. Chen, K. Ha, W. Hu, and <strong>B. Amos</strong><br>
    IEEE Pervasive Computing 2015<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_satyanarayanan2015edge_all_bib").toggle()'>abs</a>] [<a href='https://www.cs.cmu.edu/~satya/docdir/satya-edge2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_satyanarayanan2015edge_all_bib" style="text-align: justify; display: none" markdown="1">
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
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_turner2015bad_all_bib").toggle()'>abs</a>] [<a href='http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7118094' target='_blank'>pdf</a>] <br>
    
<div id="abs_turner2015bad_all_bib" style="text-align: justify; display: none" markdown="1">
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


<tr>
<td>
    <strong>Early Implementation Experience with Wearable Cognitive Assistance Applications</strong><br>
    Z. Chen, L. Jiang, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, A. Hauptmann, and M. Satyanarayanan<br>
    WearSys 2015<br>
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_chen2015early_all_bib").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~satya/docdir/chen-wearsys2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_chen2015early_all_bib" style="text-align: justify; display: none" markdown="1">
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
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_hu2014case_all_bib").toggle()'>abs</a>] [<a href='http://www.cs.cmu.edu/~satya/docdir/hu-hotmobile2015.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_hu2014case_all_bib" style="text-align: justify; display: none" markdown="1">
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
    <strong>Are Cloudlets Necessary?</strong><br>
    Y. Gao, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, and M. Satyanarayanan<br>
    CMU 2015<br>
    
    [5] 
[<a href='javascript:;'
    onclick='$("#abs_gao2015cloudlets_all_bib").toggle()'>abs</a>] [<a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2015/CMU-CS-15-139.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_gao2015cloudlets_all_bib" style="text-align: justify; display: none" markdown="1">
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
    
    [6] 
[<a href='javascript:;'
    onclick='$("#abs_ha2015adaptive_all_bib").toggle()'>abs</a>] [<a href='http://ra.adm.cs.cmu.edu/anon/2015/CMU-CS-15-113.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_ha2015adaptive_all_bib" style="text-align: justify; display: none" markdown="1">
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

</table>
<h2>2014</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Performance study of Spindle, a web analytics query engine implemented in Spark</strong><br>
    <strong>B. Amos</strong> and D. Tompkins<br>
    CloudCom 2014<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2014performance_all_bib").toggle()'>abs</a>] [<a href='http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7037709' target='_blank'>pdf</a>]  [<a href='https://github.com/adobe-research/spindle' target='_blank'>code</a>] <br>
    
<div id="abs_amos2014performance_all_bib" style="text-align: justify; display: none" markdown="1">
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
    
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_andrew2014global_all_bib").toggle()'>abs</a>] [<a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>pdf</a>] <br>
    
<div id="abs_andrew2014global_all_bib" style="text-align: justify; display: none" markdown="1">
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
    
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_amos2014fortran_all_bib").toggle()'>abs</a>] [<a href='http://dl.acm.org/citation.cfm?id=2663525' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2014fortran_all_bib" style="text-align: justify; display: none" markdown="1">
A serial Fortran 95 implementation of the QNSTOP algorithm is presented.
QNSTOP is a class of quasi-Newton methods for stochastic optimization with
variations for deterministic global optimization. This discussion provides
results from testing on various deterministic and stochastic optimization
functions.
</div>

</td>
</tr>


<tr>
<td>
    <strong>QNSTOP-QuasiNewton Algorithm for Stochastic Optimization</strong><br>
    <strong>B. Amos</strong>, D. Easterling, L. Watson, W. Thacker, B. Castle, and M. Trosset<br>
    VT 2014<br>
    
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_amos2014QNSTOP_all_bib").toggle()'>abs</a>] [<a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'>pdf</a>] <br>
    
<div id="abs_amos2014QNSTOP_all_bib" style="text-align: justify; display: none" markdown="1">
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
<h2>2013</h2>
<table class="table table-hover">

<tr>
<td>
    <strong>Applying machine learning classifiers to dynamic Android malware detection at scale</strong><br>
    <strong>B. Amos</strong>, H. Turner, and J. White<br>
    IWCMC 2013<br>
    
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2013applying_all_bib").toggle()'>abs</a>] [<a href='http://bamos.github.io/data/papers/amos-iwcmc2013.pdf' target='_blank'>pdf</a>]  [<a href='https://github.com/VT-Magnum-Research/antimalware' target='_blank'>code</a>] <br>
    
<div id="abs_amos2013applying_all_bib" style="text-align: justify; display: none" markdown="1">
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
