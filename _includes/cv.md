 I am a research scientist at <b>Facebook AI (FAIR)</b> in NYC and study foundational topics in <b>machine learning</b> and <b>optimization</b>, recently involving reinforcement learning, control, optimal transport, and geometry. I am interested in building learning systems that understand and interact with our world. I freely publish my research code to <a href="https://github.com/bamos">GitHub</a> as science should be open and reproducible and well-crafted software enables new frontiers. <br><br>


## <i class="fa fa-chevron-right"></i> Education

<table class="table table-hover">
  <tr>
    <td>
        <strong>Ph.D. in Computer Science</strong>
          (0.00/0.00)
        <br>
      Carnegie Mellon University | Pittsburgh, PA
        <p style='margin-top:-1em;margin-bottom:0em' markdown='1'>
        <br> *<a href="https://github.com/bamos/thesis">Differentiable Optimization-Based Modeling for Machine Learning</a>*
        <br> Advisors: <a href="http://zicokolter.com">J. Zico Kolter</a> (2016 - 2019),  <a href="https://www.cs.cmu.edu/ satya/">Mahadev Satyanarayanan</a> (2014 - 2016)
        </p>
    </td>
    <td class="col-md-2" style='text-align:right;'>2014 - 2019</td>
  </tr>
  <tr>
    <td>
        <strong>B.S. in Computer Science</strong>
          (3.99/4.00)
        <br>
      Virginia Tech | Blacksburg, VA
        <p style='margin-top:-1em;margin-bottom:0em' markdown='1'>
        <br> Advisors: <a href="https://people.cs.vt.edu/ ltw/shortvita.html">Layne Watson</a>, <a href="https://www.magnum.io/people/jules.html">Jules White</a>, <a href="https://www.ssrg.ece.vt.edu/">Binoy Ravindran</a>
        </p>
    </td>
    <td class="col-md-2" style='text-align:right;'>2011 - 2014</td>
  </tr>
</table>


## <i class="fa fa-chevron-right"></i> Research Internships
<table class="table table-hover">
<tr>
  <td>
<p markdown="1" style='margin: 0'>
<strong>Intel Labs</strong>
| Santa Clara, CA
| Host: <a href="http://vladlen.info/">Vladlen Koltun</a>
</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
<p markdown="1" style='margin: 0'>
<strong>Google DeepMind</strong>
| London, UK
| Hosts: <a href="http://mdenil.com/">Misha Denil</a> and <a href="https://scholar.google.com/citations?user=nzEluBwAAAAJ">Nando de Freitas</a>
</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
<p markdown="1" style='margin: 0'>
<strong>Adobe Research</strong>
| San Jose, CA
| Host: <a href="https://research.adobe.com/person/david-tompkins/">David Tompkins</a>
</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2014</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Honors & Awards
<table class="table table-hover">
<tr>
  <td>
    NSF Graduate Research Fellowship
  </td>
  <td class='col-md-2' style='text-align:right;'>2016 - 2019</td>
</tr>
<tr>
  <td>
    Nine undergraduate scholarships
    <br><p style="color:grey;font-size:1.2rem">Roanoke County Public Schools Engineering,
Salem-Roanoke County Chamber of Commerce,
Papa John's,
Scottish Rite of Freemasonry,
VT Intelligence Community Conter for Academic Excellence,
VT Pamplin Leader,
VT Benjamin F. Bock, VT Gay B. Shober, VT I. Luck Gravett
</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2011 - 2014</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Publications <a href="https://github.com/bamos/cv/blob/master/publications/all.bib"><i class="fa fa-code-fork" aria-hidden="true"></i></a>

<a href="https://scholar.google.com/citations?user=d8gdZR4AAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>

<h2>2021</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #ffffd0">
<td>
    <em><a href='https://arxiv.org/abs/2008.12775' target='_blank'>On the model-based stochastic value gradient for continuous reinforcement learning</a> </em><br>
    <strong>B. Amos</strong>, S. Stanton, D. Yarats, and A. Wilson<br>
    L4DC 2021 (Oral) <br>
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2021modelbased").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/svg' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2021.svg.pdf' target='_blank'>slides</a>]  [<a href='https://youtu.be/ABS40GW7Ekk?t=5393' target='_blank'>talk</a>] <br>
    
<div id="abs_amos2021modelbased" style="text-align: justify; display: none" markdown="1">
Model-based reinforcement learning approaches add explicit domain
knowledge to agents in hopes of improving the
sample-efficiency in comparison to model-free
agents. However, in practice model-based methods are
unable to achieve the same asymptotic performance on
challenging continuous control tasks due to the
complexity of learning and controlling an explicit
world model. In this paper we investigate the
stochastic value gradient (SVG), which is a
well-known family of methods for controlling
continuous systems which includes model-based
approaches that distill a model-based value
expansion into a model-free policy. We consider a
variant of the model-based SVG that scales to larger
systems and uses 1) an entropy regularization to
help with exploration, 2) a learned deterministic
world model to improve the short-horizon value
estimate, and 3) a learned model-free value estimate
after the model's rollout. This SVG variation
captures the model-free soft actor-critic method as
an instance when the model rollout horizon is zero, and otherwise uses short-horizon model rollouts to
improve the value estimate for the policy update. We
surpass the asymptotic performance of other
model-based methods on the proprioceptive MuJoCo
locomotion tasks from the OpenAI gym, including a
humanoid. We notably achieve these results with a
simple deterministic world model without requiring
an ensemble.
</div>

</td>
</tr>


<tr id="tr-cohen2021riemannian" style="background-color: #ffffd0">
<td>
    <em><a href='https://arxiv.org/abs/2106.10272' target='_blank'>Riemannian Convex Potential Maps</a> </em><br>
    S. Cohen*, <strong>B. Amos*</strong>, and Y. Lipman<br>
    ICML 2021  <br>
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_cohen2021riemannian").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/rcpm' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2021.rcpm.pdf' target='_blank'>slides</a>] <br>
    
<div id="abs_cohen2021riemannian" style="text-align: justify; display: none" markdown="1">
Modeling distributions on Riemannian manifolds is a crucial
component in understanding non-Euclidean data that
arises, e.g., in physics and geology. The budding
approaches in this space are limited by
representational and computational tradeoffs. We
propose and study a class of flows that uses convex
potentials from Riemannian optimal transport. These
are universal and can model distributions on any
compact Riemannian manifold without requiring domain
knowledge of the manifold to be integrated into the
architecture. We demonstrate that these flows can
model standard distributions on spheres, and tori, on synthetic and geological data.
</div>

</td>
</tr>


<tr id="tr-paulus2021comboptnet" >
<td>
    <em><a href='https://arxiv.org/abs/2105.02343' target='_blank'>CombOptNet: Fit the Right NP-Hard Problem by Learning Integer Programming Constraints</a> </em><br>
    A. Paulus, M. Rol&iacute;nek, V. Musil, <strong>B. Amos</strong>, and G. Martius<br>
    ICML 2021  <br>
    [3] 
[<a href='javascript:;'
    onclick='$("#abs_paulus2021comboptnet").toggle()'>abs</a>] [<a href='https://github.com/martius-lab/CombOptNet' target='_blank'>code</a>] <br>
    
<div id="abs_paulus2021comboptnet" style="text-align: justify; display: none" markdown="1">
Bridging logical and algorithmic reasoning with modern machine
learning techniques is a fundamental challenge with
potentially transformative impact. On the
algorithmic side, many NP-hard problems can be
expressed as integer programs, in which the
constraints play the role of their "combinatorial
specification". In this work, we aim to integrate
integer programming solvers into neural network
architectures as layers capable of learning both the
cost terms and the constraints. The resulting
end-to-end trainable architectures jointly extract
features from raw data and solve a suitable
(learned) combinatorial problem with
state-of-the-art integer programming solvers. We
demonstrate the potential of such layers with an
extensive performance analysis on synthetic data and
with a demonstration on a competitive computer
vision keypoint matching benchmark.
</div>

</td>
</tr>


<tr id="tr-cohen2020aligning" >
<td>
    <em><a href='https://arxiv.org/abs/2006.12648' target='_blank'>Aligning Time Series on Incomparable Spaces</a> </em><br>
    S. Cohen, G. Luise, A. Terenin, <strong>B. Amos</strong>, and M. Deisenroth<br>
    AISTATS 2021  <br>
    [4] 
[<a href='javascript:;'
    onclick='$("#abs_cohen2020aligning").toggle()'>abs</a>] [<a href='https://github.com/samcohen16/Aligning-Time-Series' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2021.gdtw.pdf' target='_blank'>slides</a>] <br>
    
<div id="abs_cohen2020aligning" style="text-align: justify; display: none" markdown="1">
Dynamic time warping (DTW) is a useful method for aligning, comparing
and combining time series, but it requires them to
live in comparable spaces. In this work, we consider
a setting in which time series live on different
spaces without a sensible ground metric, causing DTW
to become ill-defined. To alleviate this, we propose
Gromov dynamic time warping (GDTW), a distance
between time series on potentially incomparable
spaces that avoids the comparability requirement by
instead considering intra-relational geometry. We
derive a Frank-Wolfe algorithm for computing it and
demonstrate its effectiveness at aligning, combining
and comparing time series living on incomparable
spaces. We further propose a smoothed version of
GDTW as a differentiable loss and assess its
properties in a variety of settings, including
barycentric averaging, generative modeling and
imitation learning.
</div>

</td>
</tr>


<tr id="tr-chen2021learning" >
<td>
    <em><a href='https://arxiv.org/abs/2011.03902' target='_blank'>Learning Neural Event Functions for Ordinary Differential Equations</a> </em><br>
    R. Chen, <strong>B. Amos</strong>, and M. Nickel<br>
    ICLR 2021  <br>
    [5] 
[<a href='javascript:;'
    onclick='$("#abs_chen2021learning").toggle()'>abs</a>] [<a href='https://github.com/rtqichen/torchdiffeq' target='_blank'>code</a>] <br>
    
<div id="abs_chen2021learning" style="text-align: justify; display: none" markdown="1">
The existing Neural ODE formulation relies on an explicit
knowledge of the termination time. We extend Neural
ODEs to implicitly defined termination criteria
modeled by neural event functions, which can be
chained together and differentiated through. Neural
Event ODEs are capable of modeling discrete
(instantaneous) changes in a continuous-time system, without prior knowledge of when these changes should
occur or how many such changes should exist. We test
our approach in modeling hybrid discrete- and
continuous- systems such as switching dynamical
systems and collision in multi-body systems, and we
propose simulation-based training of point processes
with applications in discrete control.
</div>

</td>
</tr>


<tr id="tr-chen2021neural" >
<td>
    <em><a href='https://arxiv.org/abs/2011.04583' target='_blank'>Neural Spatio-Temporal Point Processes</a> </em><br>
    R. Chen, <strong>B. Amos</strong>, and M. Nickel<br>
    ICLR 2021  <br>
    [6] 
[<a href='javascript:;'
    onclick='$("#abs_chen2021neural").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/neural_stpp' target='_blank'>code</a>] <br>
    
<div id="abs_chen2021neural" style="text-align: justify; display: none" markdown="1">
We propose a new class of parameterizations for spatio-temporal
point processes which leverage Neural ODEs as a
computational method and enable flexible, high-fidelity models of discrete events that are
localized in continuous time and space. Central to
our approach is a combination of recurrent
continuous-time neural networks with two novel
neural architectures, i.e., Jump and Attentive
Continuous-time Normalizing Flows. This approach
allows us to learn complex distributions for both
the spatial and temporal domain and to condition
non-trivially on the observed event history. We
validate our models on data sets from a wide variety
of contexts such as seismology, epidemiology, urban
mobility, and neuroscience.
</div>

</td>
</tr>


<tr id="tr-yarats2021improving" >
<td>
    <em><a href='https://arxiv.org/abs/1910.01741' target='_blank'>Improving Sample Efficiency in Model-Free Reinforcement Learning from Images</a> </em><br>
    D. Yarats, A. Zhang, I. Kostrikov, <strong>B. Amos</strong>, J. Pineau, and R. Fergus<br>
    AAAI 2021  <br>
    [7] 
[<a href='javascript:;'
    onclick='$("#abs_yarats2021improving").toggle()'>abs</a>] [<a href='https://sites.google.com/view/sac-ae' target='_blank'>code</a>] <br>
    
<div id="abs_yarats2021improving" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-pineda2021mbrl" >
<td>
    <em><a href='https://arxiv.org/abs/2104.10159' target='_blank'>MBRL-Lib: A Modular Library for Model-based Reinforcement Learning</a> </em><br>
    L. Pineda, <strong>B. Amos</strong>, A. Zhang, N. Lambert, and R. Calandra<br>
    arXiv 2021  <br>
    [8] 
[<a href='javascript:;'
    onclick='$("#abs_pineda2021mbrl").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/mbrl-lib' target='_blank'>code</a>] <br>
    
<div id="abs_pineda2021mbrl" style="text-align: justify; display: none" markdown="1">
Model-based reinforcement learning is a compelling framework for
data-efficient learning of agents that interact with
the world. This family of algorithms has many
subcomponents that need to be carefully selected and
tuned. As a result the entry-bar for researchers to
approach the field and to deploy it in real-world
tasks can be daunting. In this paper, we present
MBRL-Lib - a machine learning library for
model-based reinforcement learning in continuous
state-action spaces based on PyTorch. MBRL-Lib is
designed as a platform for both researchers, to
easily develop, debug and compare new algorithms, and non-expert user, to lower the entry-bar of
deploying state-of-the-art algorithms.
</div>

</td>
</tr>

</table>
<h2>2020</h2>
<table class="table table-hover">

<tr id="tr-amos2020differentiable" style="background-color: #ffffd0">
<td>
    <em><a href='https://arxiv.org/abs/1909.12830' target='_blank'>The Differentiable Cross-Entropy Method</a> </em><br>
    <strong>B. Amos</strong> and D. Yarats<br>
    ICML 2020  <br>
    [9] 
[<a href='javascript:;'
    onclick='$("#abs_amos2020differentiable").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/dcem' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2020.dcem.pdf' target='_blank'>slides</a>] <br>
    
<div id="abs_amos2020differentiable" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-lambert2020objective" >
<td>
    <em><a href='https://arxiv.org/abs/2002.04523' target='_blank'>Objective Mismatch in Model-based Reinforcement Learning</a> </em><br>
    N. Lambert, <strong>B. Amos</strong>, O. Yadan, and R. Calandra<br>
    L4DC 2020  <br>
    [10] 
[<a href='javascript:;'
    onclick='$("#abs_lambert2020objective").toggle()'>abs</a>]<br>
    
<div id="abs_lambert2020objective" style="text-align: justify; display: none" markdown="1">
Model-based reinforcement learning (MBRL) has been shown to be a powerful framework for data-efficiently learning control of continuous tasks. Recent work in MBRL has mostly focused on using more advanced function approximators and planning schemes, with little development of the general framework. In this paper, we identify a fundamental issue of the standard MBRL framework-what we call the objective mismatch issue. Objective mismatch arises when one objective is optimized in the hope that a second, often uncorrelated, metric will also be optimized. In the context of MBRL, we characterize the objective mismatch between training the forward dynamics model wrt the likelihood of the one-step ahead prediction, and the overall goal of improving performance on a downstream control task. For example, this issue can emerge with the realization that dynamics models effective for a specific task do not necessarily need to be globally accurate, and vice versa globally accurate models might not be sufficiently accurate locally to obtain good control performance on a specific task. In our experiments, we study this objective mismatch issue and demonstrate that the likelihood of one-step ahead predictions is not always correlated with control performance. This observation highlights a critical limitation in the MBRL framework which will require further research to be fully understood and addressed. We propose an initial method to mitigate the mismatch issue by re-weighting dynamics model training. Building on it, we conclude with a discussion about other potential directions of research for addressing this issue.
</div>

</td>
</tr>


<tr id="tr-amos2020QNSTOP" >
<td>
    <em><a href='https://vtechworks.lib.vt.edu/bitstream/handle/10919/49672/qnTOMS14.pdf' target='_blank'>QNSTOP: Quasi-Newton Algorithm for Stochastic Optimization</a> </em><br>
    <strong>B. Amos</strong>, D. Easterling, L. Watson, W. Thacker, B. Castle, and M. Trosset<br>
    ACM TOMS 2020  <br>
    [11] 
[<a href='javascript:;'
    onclick='$("#abs_amos2020QNSTOP").toggle()'>abs</a>] [<a href='https://github.com/vtopt/qnstop' target='_blank'>code</a>] <br>
    
<div id="abs_amos2020QNSTOP" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-sercu2020neural" >
<td>
    <em><a href='https://www.biorxiv.org/content/10.1101/2021.04.08.439084v1.abstract' target='_blank'>Neural Potts Model</a> </em><br>
    T. Sercu, R. Verkuil, J. Meier, <strong>B. Amos</strong>, Z. Lin, C. Chen, J. Liu, Y. LeCun, and A. Rives<br>
    MLCB 2020  <br>
    [12] 
[<a href='javascript:;'
    onclick='$("#abs_sercu2020neural").toggle()'>abs</a>]<br>
    
<div id="abs_sercu2020neural" style="text-align: justify; display: none" markdown="1">
We propose the Neural Potts Model objective as an amortized
optimization problem. The objective enables training
a single model with shared parameters to explicitly
model energy landscapes across multiple protein
families. Given a protein sequence as input, the
model is trained to predict a pairwise coupling
matrix for a Potts model energy function describing
the local evolutionary landscape of the
sequence. Couplings can be predicted for novel
sequences. A controlled ablation experiment
assessing unsupervised contact prediction on sets of
related protein families finds a gain from
amortization for low-depth multiple sequence
alignments; the result is then confirmed on a
database with broad coverage of protein sequences.
</div>

</td>
</tr>

</table>
<h2>2019</h2>
<table class="table table-hover">

<tr id="tr-amos2019differentiable" style="background-color: #ffffd0">
<td>
    <em><a href='https://github.com/bamos/thesis/raw/master/bamos_thesis.pdf' target='_blank'>Differentiable Optimization-Based Modeling for Machine Learning</a> </em><br>
    <strong>B. Amos</strong><br>
    Ph.D. Thesis 2019  <br>
    [13] [<a href='https://github.com/bamos/thesis' target='_blank'>code</a>] <br>
    
</td>
</tr>


<tr id="tr-amos2019differentiable3" style="background-color: #ffffd0">
<td>
    <em><a href='http://web.stanford.edu/~boyd/papers/pdf/diff_cvxpy.pdf' target='_blank'>Differentiable Convex Optimization Layers</a> </em><br>
    A. Agrawal*, <strong>B. Amos*</strong>, S. Barratt*, S. Boyd*, S. Diamond*, and J. Z. Kolter*<br>
    NeurIPS 2019  <br>
    [14] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019differentiable3").toggle()'>abs</a>] [<a href='https://github.com/cvxgrp/cvxpylayers' target='_blank'>code</a>] <br>
    
<div id="abs_amos2019differentiable3" style="text-align: justify; display: none" markdown="1">
Recent work has shown how to embed differentiable optimization problems (that is, problems whose solutions can be backpropagated through) as layers within deep learning architectures. This method provides a useful inductive bias for certain problems, but existing software for differentiable optimization layers is rigid and difficult to apply to new settings. In this paper, we propose an approach to differentiating through disciplined convex programs, a subclass of convex optimization problems used by domain-specific languages (DSLs) for convex optimization. We introduce disciplined parametrized programming, a subset of disciplined convex programming, and we show that every disciplined parametrized program can be represented as the composition of an affine map from parameters to problem data, a solver, and an affine map from the solver’s solution to a solution of the original problem (a new form we refer to as affine-solver-affine form). We then demonstrate how to efficiently differentiate through each of these components, allowing for end-to-end analytical differentiation through the entire convex program. We implement our methodology in version 1.1 of CVXPY, a popular Python-embedded DSL for convex optimization, and additionally implement differentiable layers for disciplined convex programs in PyTorch and TensorFlow 2.0. Our implementation significantly lowers the barrier to using convex optimization problems in differentiable programs. We present applications in linear machine learning models and in stochastic control, and we show that our layer is competitive (in execution time) compared to specialized differentiable solvers from past work.
</div>

</td>
</tr>


<tr id="tr-amos2019limited" >
<td>
    <em><a href='https://arxiv.org/abs/1906.08707' target='_blank'>The Limited Multi-Label Projection Layer</a> </em><br>
    <strong>B. Amos</strong>, V. Koltun, and J. Z. Kolter<br>
    arXiv 2019  <br>
    [15] 
[<a href='javascript:;'
    onclick='$("#abs_amos2019limited").toggle()'>abs</a>] [<a href='https://github.com/locuslab/lml' target='_blank'>code</a>] <br>
    
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


<tr id="tr-grefenstette2019generalized" >
<td>
    <em><a href='https://arxiv.org/abs/1910.01727' target='_blank'>Generalized Inner Loop Meta-Learning</a> </em><br>
    E. Grefenstette, <strong>B. Amos</strong>, D. Yarats, P. Htut, A. Molchanov, F. Meier, D. Kiela, K. Cho, and S. Chintala<br>
    arXiv 2019  <br>
    [16] 
[<a href='javascript:;'
    onclick='$("#abs_grefenstette2019generalized").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/higher' target='_blank'>code</a>] <br>
    
<div id="abs_grefenstette2019generalized" style="text-align: justify; display: none" markdown="1">
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

</table>
<h2>2018</h2>
<table class="table table-hover">

<tr id="tr-amos2018end" style="background-color: #ffffd0">
<td>
    <em><a href='https://arxiv.org/abs/1810.13400' target='_blank'>Differentiable MPC for End-to-end Planning and Control</a> </em><br>
    <strong>B. Amos</strong>, I. Rodriguez, J. Sacks, B. Boots, and J. Z. Kolter<br>
    NeurIPS 2018  <br>
    [17] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018end").toggle()'>abs</a>] [<a href='https://locuslab.github.io/mpc.pytorch/' target='_blank'>code</a>] <br>
    
<div id="abs_amos2018end" style="text-align: justify; display: none" markdown="1">
In this paper we present foundations for using model predictive control (MPC) as a differentiable policy class in reinforcement learning. Specifically, we differentiate through MPC by using the KKT conditions of the convex approximation at a fixed point of the solver. Using this strategy, we are able to learn the cost and dynamics of a controller via end-to-end learning in a larger system. We empirically show results in an imitation learning setting, demonstrating that we can recover the underlying dynamics and cost more efficiently and reliably than with a generic neural network policy class
</div>

</td>
</tr>


<tr id="tr-amos2018learning" style="background-color: #ffffd0">
<td>
    <em><a href='https://openreview.net/forum?id=r1HhRfWRZ' target='_blank'>Learning Awareness Models</a> </em><br>
    <strong>B. Amos</strong>, L. Dinh, S. Cabi, T. Roth&ouml;rl, S. Colmenarejo, A. Muldal, T. Erez, Y. Tassa, N. de Freitas, and M. Denil<br>
    ICLR 2018  <br>
    [18] 
[<a href='javascript:;'
    onclick='$("#abs_amos2018learning").toggle()'>abs</a>]<br>
    
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


<tr id="tr-brown2018depth" >
<td>
    <em><a href='http://arxiv.org/abs/1805.08195' target='_blank'>Depth-Limited Solving for Imperfect-Information Games</a> </em><br>
    N. Brown, T. Sandholm, and <strong>B. Amos</strong><br>
    NeurIPS 2018  <br>
    [19] 
[<a href='javascript:;'
    onclick='$("#abs_brown2018depth").toggle()'>abs</a>]<br>
    
<div id="abs_brown2018depth" style="text-align: justify; display: none" markdown="1">
A fundamental challenge in imperfect-information games is that states do not have well-defined values. As a result, depth-limited search algorithms used in single-agent settings and perfect-information games do not apply. This paper introduces a principled way to conduct depth-limited solving in imperfect-information games by allowing the opponent to choose among a number of strategies for the remainder of the game at the depth limit. Each one of these strategies results in a different set of values for leaf nodes. This forces an agent to be robust to the different strategies an opponent may employ. We demonstrate the effectiveness of this approach by building a master-level heads-up no-limit Texas hold'em poker AI that defeats two prior top agents using only a 4-core CPU and 16 GB of memory. Developing such a powerful agent would have previously required a supercomputer.
</div>

</td>
</tr>


<tr id="tr-wang2018enabling" >
<td>
    <em><a href='https://dl.acm.org/citation.cfm?id=3209659' target='_blank'>Enabling Live Video Analytics with a Scalable and Privacy-Aware Framework</a> </em><br>
    J. Wang, <strong>B. Amos</strong>, A. Das, P. Pillai, N. Sadeh, and M. Satyanarayanan<br>
    ACM TOMM 2018  <br>
    [20] 
[<a href='javascript:;'
    onclick='$("#abs_wang2018enabling").toggle()'>abs</a>]<br>
    
<div id="abs_wang2018enabling" style="text-align: justify; display: none" markdown="1">
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

<tr id="tr-amos2017optnet" style="background-color: #ffffd0">
<td>
    <em><a href='http://arxiv.org/abs/1703.00443' target='_blank'>OptNet: Differentiable Optimization as a Layer in Neural Networks</a> </em><br>
    <strong>B. Amos</strong> and J. Z. Kolter<br>
    ICML 2017  <br>
    [21] 
[<a href='javascript:;'
    onclick='$("#abs_amos2017optnet").toggle()'>abs</a>] [<a href='https://github.com/locuslab/optnet' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2017.optnet.pdf' target='_blank'>slides</a>]  [<a href='https://vimeo.com/238242080' target='_blank'>talk</a>] <br>
    
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


<tr id="tr-amos2017input" style="background-color: #ffffd0">
<td>
    <em><a href='http://arxiv.org/abs/1609.07152' target='_blank'>Input Convex Neural Networks</a> </em><br>
    <strong>B. Amos</strong>, L. Xu, and J. Z. Kolter<br>
    ICML 2017  <br>
    [22] 
[<a href='javascript:;'
    onclick='$("#abs_amos2017input").toggle()'>abs</a>] [<a href='https://github.com/locuslab/icnn' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2017.icnn.pdf' target='_blank'>slides</a>]  [<a href='https://vimeo.com/238242121' target='_blank'>talk</a>] <br>
    
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


<tr id="tr-donti2017task" >
<td>
    <em><a href='http://arxiv.org/abs/1703.04529' target='_blank'>Task-based End-to-end Model Learning</a> </em><br>
    P. Donti, <strong>B. Amos</strong>, and J. Z. Kolter<br>
    NeurIPS 2017  <br>
    [23] 
[<a href='javascript:;'
    onclick='$("#abs_donti2017task").toggle()'>abs</a>] [<a href='https://github.com/locuslab/e2e-model-learning' target='_blank'>code</a>] <br>
    
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


<tr id="tr-chen2017quasi" >
<td>
    <em><a href='https://par.nsf.gov/servlets/purl/10111392' target='_blank'>Quasi-Newton Stochastic Optimization Algorithm for Parameter Estimation of a Stochastic Model of the Budding Yeast Cell Cycle</a> </em><br>
    M. Chen, <strong>B. Amos</strong>, L. Watson, J. Tyson, Y. Cao, C. Shaffer, M. Trosset, C. Oguz, and G. Kakoti<br>
    IEEE/ACM TCBB 2017  <br>
    [24] <br>
    
</td>
</tr>


<tr id="tr-ha2017you" >
<td>
    <em><a href='https://www.cs.cmu.edu/~15-821/READINGS/PAPERS/ha2017.pdf' target='_blank'>You can teach elephants to dance: agile VM handoff for edge computing</a> </em><br>
    K. Ha, Y. Abe, T. Eiszler, Z. Chen, W. Hu, <strong>B. Amos</strong>, R. Upadhyaya, P. Pillai, and M. Satyanarayanan<br>
    SEC 2017  <br>
    [25] <br>
    
</td>
</tr>


<tr id="tr-chen2017empirical" >
<td>
    <em><a href='https://www.cs.cmu.edu/~zhuoc/papers/latency2017.pdf' target='_blank'>An Empirical Study of Latency in an Emerging Class of Edge Computing Applications for Wearable Cognitive Assistance</a> </em><br>
    Z. Chen, W. Hu, J. Wang, S. Zhao, <strong>B. Amos</strong>, G. Wu, K. Ha, K. Elgazzar, P. Pillai, R. Klatzky, D. Siewiorek, and M. Satyanarayanan<br>
    SEC 2017  <br>
    [26] <br>
    
</td>
</tr>


<tr id="tr-wang2017scalable" >
<td>
    <em><a href='http://elijah.cs.cmu.edu/DOCS/wang-mmsys2017.pdf' target='_blank'>A Scalable and Privacy-Aware IoT Service for Live Video Analytics</a> </em><br>
    J. Wang, <strong>B. Amos</strong>, A. Das, P. Pillai, N. Sadeh, and M. Satyanarayanan<br>
    ACM MMSys 2017 (Best Paper) <br>
    [27] [<a href='http://cmusatyalab.github.io/openface/' target='_blank'>code</a>] <br>
    
</td>
</tr>

</table>
<h2>2016</h2>
<table class="table table-hover">

<tr id="tr-amos2016openface" style="background-color: #ffffd0">
<td>
    <em><a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2016/CMU-CS-16-118.pdf' target='_blank'>OpenFace: A general-purpose face recognition library with mobile applications</a> </em><br>
    <strong>B. Amos</strong>, B. Ludwiczuk, and M. Satyanarayanan<br>
    CMU 2016  <br>
    [28] 
[<a href='javascript:;'
    onclick='$("#abs_amos2016openface").toggle()'>abs</a>] [<a href='https://cmusatyalab.github.io/openface' target='_blank'>code</a>] <br>
    
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


<tr id="tr-zhao2016collapsed" >
<td>
    <em><a href='http://proceedings.mlr.press/v48/zhaoa16.html' target='_blank'>Collapsed Variational Inference for Sum-Product Networks</a> </em><br>
    H. Zhao, T. Adel, G. Gordon, and <strong>B. Amos</strong><br>
    ICML 2016  <br>
    [29] 
[<a href='javascript:;'
    onclick='$("#abs_zhao2016collapsed").toggle()'>abs</a>]<br>
    
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


<tr id="tr-hu2016quantifying" >
<td>
    <em><a href='https://dl.acm.org/doi/10.1145/2967360.2967369' target='_blank'>Quantifying the impact of edge computing on mobile applications</a> </em><br>
    W. Hu, Y. Gao, K. Ha, J. Wang, <strong>B. Amos</strong>, Z. Chen, P. Pillai, and M. Satyanarayanan<br>
    ACM SIGOPS 2016  <br>
    [30] <br>
    
</td>
</tr>


<tr id="tr-davies2016privacy" >
<td>
    <em><a href='http://eprints.lancs.ac.uk/78255/1/44691.pdf' target='_blank'>Privacy mediators: helping IoT cross the chasm</a> </em><br>
    N. Davies, N. Taft, M. Satyanarayanan, S. Clinch, and <strong>B. Amos</strong><br>
    HotMobile 2016  <br>
    [31] 
[<a href='javascript:;'
    onclick='$("#abs_davies2016privacy").toggle()'>abs</a>]<br>
    
<div id="abs_davies2016privacy" style="text-align: justify; display: none" markdown="1">
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

</table>
<h2>2015</h2>
<table class="table table-hover">

<tr id="tr-satyanarayanan2015edge" >
<td>
    <em><a href='https://www.cs.cmu.edu/~satya/docdir/satya-edge2015.pdf' target='_blank'>Edge Analytics in the Internet of Things</a> </em><br>
    M. Satyanarayanan, P. Simoens, Y. Xiao, P. Pillai, Z. Chen, K. Ha, W. Hu, and <strong>B. Amos</strong><br>
    IEEE Pervasive Computing 2015  <br>
    [32] 
[<a href='javascript:;'
    onclick='$("#abs_satyanarayanan2015edge").toggle()'>abs</a>]<br>
    
<div id="abs_satyanarayanan2015edge" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-turner2015bad" >
<td>
    <em><a href='http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7118094' target='_blank'>Bad Parts: Are Our Manufacturing Systems at Risk of Silent Cyberattacks?</a> </em><br>
    H. Turner, J. White, J. Camelio, C. Williams, <strong>B. Amos</strong>, and R. Parker<br>
    IEEE Security & Privacy 2015  <br>
    [33] 
[<a href='javascript:;'
    onclick='$("#abs_turner2015bad").toggle()'>abs</a>]<br>
    
<div id="abs_turner2015bad" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-chen2015early" >
<td>
    <em><a href='http://www.cs.cmu.edu/~satya/docdir/chen-wearsys2015.pdf' target='_blank'>Early Implementation Experience with Wearable Cognitive Assistance Applications</a> </em><br>
    Z. Chen, L. Jiang, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, A. Hauptmann, and M. Satyanarayanan<br>
    WearSys 2015  <br>
    [34] 
[<a href='javascript:;'
    onclick='$("#abs_chen2015early").toggle()'>abs</a>]<br>
    
<div id="abs_chen2015early" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-hu2014case" >
<td>
    <em><a href='http://www.cs.cmu.edu/~satya/docdir/hu-hotmobile2015.pdf' target='_blank'>The Case for Offload Shaping</a> </em><br>
    W. Hu, <strong>B. Amos</strong>, Z. Chen, K. Ha, W. Richter, P. Pillai, B. Gilbert, J. Harkes, and M. Satyanarayanan<br>
    HotMobile 2015  <br>
    [35] 
[<a href='javascript:;'
    onclick='$("#abs_hu2014case").toggle()'>abs</a>]<br>
    
<div id="abs_hu2014case" style="text-align: justify; display: none" markdown="1">
When offloading computation from a mobile device, we show
that it can pay to perform additional on-device work in order
to reduce the offloading workload. We call this offload shaping, and demonstrate its application at many different levels
of abstraction using a variety of techniques. We show that
offload shaping can produce significant reduction in resource
demand, with little loss of application-level fidelity
</div>

</td>
</tr>


<tr id="tr-gao2015cloudlets" >
<td>
    <em><a href='http://reports-archive.adm.cs.cmu.edu/anon/anon/2015/CMU-CS-15-139.pdf' target='_blank'>Are Cloudlets Necessary?</a> </em><br>
    Y. Gao, W. Hu, K. Ha, <strong>B. Amos</strong>, P. Pillai, and M. Satyanarayanan<br>
    CMU 2015  <br>
    [36] 
[<a href='javascript:;'
    onclick='$("#abs_gao2015cloudlets").toggle()'>abs</a>]<br>
    
<div id="abs_gao2015cloudlets" style="text-align: justify; display: none" markdown="1">
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


<tr id="tr-ha2015adaptive" >
<td>
    <em><a href='http://ra.adm.cs.cmu.edu/anon/2015/CMU-CS-15-113.pdf' target='_blank'>Adaptive VM handoff across cloudlets</a> </em><br>
    K. Ha, Y. Abe, Z. Chen, W. Hu, <strong>B. Amos</strong>, P. Pillai, and M. Satyanarayanan<br>
    CMU 2015  <br>
    [37] 
[<a href='javascript:;'
    onclick='$("#abs_ha2015adaptive").toggle()'>abs</a>]<br>
    
<div id="abs_ha2015adaptive" style="text-align: justify; display: none" markdown="1">
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

<tr id="tr-andrew2014global" >
<td>
    <em><a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>Global Parameter Estimation for a Eukaryotic Cell Cycle Model in Systems Biology</a> </em><br>
    T. Andrew, <strong>B. Amos</strong>, D. Easterling, C. Oguz, W. Baumann, J. Tyson, and L. Watson<br>
    SummerSim 2014  <br>
    [38] 
[<a href='javascript:;'
    onclick='$("#abs_andrew2014global").toggle()'>abs</a>]<br>
    
<div id="abs_andrew2014global" style="text-align: justify; display: none" markdown="1">
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

</table>
<h2>2013</h2>
<table class="table table-hover">

<tr id="tr-amos2013applying" >
<td>
    <em><a href='http://bamos.github.io/data/papers/amos-iwcmc2013.pdf' target='_blank'>Applying machine learning classifiers to dynamic Android malware detection at scale</a> </em><br>
    <strong>B. Amos</strong>, H. Turner, and J. White<br>
    IWCMC 2013  <br>
    [39] 
[<a href='javascript:;'
    onclick='$("#abs_amos2013applying").toggle()'>abs</a>] [<a href='https://github.com/VT-Magnum-Research/antimalware' target='_blank'>code</a>] <br>
    
<div id="abs_amos2013applying" style="text-align: justify; display: none" markdown="1">
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


## <i class="fa fa-chevron-right"></i> Repositories
<table class="table table-hover">
<tr>
  <td>
    <a href="https://github.com/facebookresearch/mbrl-lib">facebookresearch/mbrl-lib</a> |
    <i class="fa fas fa-star"></i> 377 |
    <em>Model-based reinforcement learning library</em>
    <!--  -->
    <!--     facebookresearch/mbrl-lib  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2021</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/facebookresearch/dcem">facebookresearch/dcem</a> |
    <i class="fa fas fa-star"></i> 77 |
    <em>Differentiable Cross-Entropy Method Experiments</em>
    <!--  -->
    <!--     facebookresearch/dcem  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/facebookresearch/higher">facebookresearch/higher</a> |
    <i class="fa fas fa-star"></i> 1.1k |
    <em>PyTorch higher-order gradient and optimization library</em>
    <!--  -->
    <!--     facebookresearch/higher  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/thesis">bamos/thesis</a> |
    <i class="fa fas fa-star"></i> 238 |
    <em>Ph.D. Thesis LaTeX source code</em>
    <!--  -->
    <!--     bamos/thesis  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/cvxgrp/cvxpylayers">cvxgrp/cvxpylayers</a> |
    <i class="fa fas fa-star"></i> 862 |
    <em>Differentiable convex optimization layers</em>
    <!--  -->
    <!--     cvxgrp/cvxpylayers  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/locuslab/mpc.pytorch">locuslab/mpc.pytorch</a> |
    <i class="fa fas fa-star"></i> 436 |
    <em>Differentiable model-predictive control</em>
    <!--  -->
    <!--     locuslab/mpc.pytorch  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/locuslab/icnn">locuslab/icnn</a> |
    <i class="fa fas fa-star"></i> 212 |
    <em>Input Convex Neural Network Experiments</em>
    <!--  -->
    <!--     locuslab/icnn  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/locuslab/optnet">locuslab/optnet</a> |
    <i class="fa fas fa-star"></i> 360 |
    <em>OptNet Experiments</em>
    <!--  -->
    <!--     locuslab/optnet  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/locuslab/qpth">locuslab/qpth</a> |
    <i class="fa fas fa-star"></i> 461 |
    <em>Differentiable PyTorch QP solver</em>
    <!--  -->
    <!--     locuslab/qpth  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/densenet.pytorch">bamos/densenet.pytorch</a> |
    <i class="fa fas fa-star"></i> 681 |
    <em>PyTorch DenseNet implementation</em>
    <!--  -->
    <!--     bamos/densenet.pytorch  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/block">bamos/block</a> |
    <i class="fa fas fa-star"></i> 253 |
    <em>Intelligent block matrix constructions</em>
    <!--  -->
    <!--     bamos/block  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/setGPU">bamos/setGPU</a> |
    <i class="fa fas fa-star"></i> 92 |
    <em>Automatically use the least-loaded GPU</em>
    <!--  -->
    <!--     bamos/setGPU  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2017</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/dcgan-completion.tensorflow">bamos/dcgan-completion.tensorflow</a> |
    <i class="fa fas fa-star"></i> 1.3k |
    <em>Image completion with GANs</em>
    <!--  -->
    <!--     bamos/dcgan-completion.tensorflow  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2016</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/cmusatyalab/openface">cmusatyalab/openface</a> |
    <i class="fa fas fa-star"></i> 13.9k |
    <em>Face recognition with deep neural networks</em>
    <!--  -->
    <!--     cmusatyalab/openface  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2015</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/zsh-history-analysis">bamos/zsh-history-analysis</a> |
    <i class="fa fas fa-star"></i> 160 |
    <em>Analyze and plot your zsh history</em>
    <!--  -->
    <!--     bamos/zsh-history-analysis  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2014</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/cv">bamos/cv</a> |
    <i class="fa fas fa-star"></i> 307 |
    <em>My YAML/LaTeX/Markdown cv</em>
    <!--  -->
    <!--     bamos/cv  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2013</td>
</tr>
<tr>
  <td>
    <a href="https://github.com/bamos/dotfiles">bamos/dotfiles</a> |
    <i class="fa fas fa-star"></i> 222 |
    <em>Linux, mutt, xmonad, i3, vim, emacs, zsh</em>
    <!--  -->
    <!--     bamos/dotfiles  -->
    <!--  -->
  </td>
  <td class='col-md-1' style='text-align:right;'>2012</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Invited Talks
<table class="table table-hover">
<tr>
  <td>
        Max Planck Institute for Intelligent Systems (Tübingen) Seminar
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        Montreal Institute for Learning Algorithms Seminar
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="https://anucvml.github.io/ddn-eccvt2020/">ECCV Deep Declarative Networks Tutorial</a>
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="https://anucvml.github.io/ddn-cvprw2020/">CVPR Deep Declarative Networks Workshop</a>
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="https://sites.google.com/view/cs-159-spring-2020/lectures">Caltech CS 159, Guest Lecture</a>
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        SIAM MDS Minisymposium on Learning Parameterized Energy Minimization Models
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        New York University CILVR Seminar
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
        INFORMS Session on Prediction and Optimization
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
        Facebook AI Research
  </td>
  <td class='col-md-1' style='text-align:right;'>2019</td>
</tr>
<tr>
  <td>
        ISMP Session on Machine Learning and Optimization
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        Google Brain
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        Bosch Center for AI
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        Waymo Research
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        Tesla AI
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        NVIDIA Robotics
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        Salesforce Research
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        OpenAI
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        NNAISENSE
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Interns and Students
<table class="table table-hover">
<tr>
  <td>
        <a href="https://samcohen16.github.io/">Samuel Cohen</a> (visiting FAIR from UCL)
  </td>
  <td class='col-md-1' style='text-align:right;'>2021</td>
</tr>
<tr>
  <td>
        <a href="https://eugenevinitsky.github.io/">Eugene Vinitsky</a> (visiting FAIR from Berkeley)
  </td>
  <td class='col-md-1' style='text-align:right;'>2021</td>
</tr>
<tr>
  <td>
        <a href="https://www.aaronlou.com/">Aaron Lou</a> (visiting FAIR from Cornell)
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="http://www.cs.toronto.edu/~rtqichen/">Ricky Chen</a> (visiting FAIR from Toronto)
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="http://www.cs.cmu.edu/~pliang/">Paul Liang</a> (visiting FAIR from CMU)
  </td>
  <td class='col-md-1' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
        <a href="https://phillipkwang.com/">Phillip Wang</a> (at CMU, now: CEO at <a href="https://gather.town/">Gather</a>)
  </td>
  <td class='col-md-1' style='text-align:right;'>2018</td>
</tr>
<tr>
  <td>
        <a href="https://leix28.github.io">Lei Xu</a> (visiting CMU from Tsinghua, now: Ph.D. student at MIT)
  </td>
  <td class='col-md-1' style='text-align:right;'>2016</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Professional Activities
<table class="table table-hover">
<tr>
  <td>
      Reviewing: AAAI, ICML, NeurIPS, ICLR*, ICCV, CVPR, ICRA
  <br><p style="color:grey;font-size:1.2rem">*Outstanding reviewer</p>
  <td class='col-md-2' style='text-align:right;'></td>
  </td>
</tr>
<tr>
  <td>
     <a href="https://sites.google.com/view/lmca2020/home">NeurIPS Learning Meets Combinatorial Optimization Workshop Organizer</a>
  <td class='col-md-2' style='text-align:right;'>2020</td>
  </td>
</tr>
<tr>
  <td>
     <a href="https://anucvml.github.io/ddn-cvprw2020/">CVPR Deep Declarative Workshop Organizer</a>
  <td class='col-md-2' style='text-align:right;'>2020</td>
  </td>
</tr>
<tr>
  <td>
     <a href="https://anucvml.github.io/ddn-eccvt2020/">ECCV Deep Declarative Tutorial Organizer</a>
  <td class='col-md-2' style='text-align:right;'>2020</td>
  </td>
</tr>
<tr>
  <td>
      CMU CSD MS Admissions
  <td class='col-md-2' style='text-align:right;'>2014 - 2015</td>
  </td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Teaching
<table class="table table-hover">
<tr>
  <td><strong>Graduate AI</strong> (CMU 15-780), TA</td>
  <td class='col-md-1' style='text-align:right;'>S2017</td>
</tr>
<tr>
  <td><strong>Distributed Systems</strong> (CMU 15-440/640), TA</td>
  <td class='col-md-1' style='text-align:right;'>S2016</td>
</tr>
<tr>
  <td><strong>Software Design and Data Structures</strong> (VT CS2114), TA</td>
  <td class='col-md-1' style='text-align:right;'>S2013</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Skills
<table class="table table-hover">
<tr>
  <td class='col-md-2'>Languages</td>
  <td>
C, C++, Fortran, Haskell, Java, Lua, Make, Mathematica, Python, R, Scala
  </td>
</tr>
<tr>
  <td class='col-md-2'>Frameworks</td>
  <td>
JAX, NumPy, Pandas, PyTorch, SciPy, TensorFlow, Torch7
  </td>
</tr>
<tr>
  <td class='col-md-2'>Tools</td>
  <td>
Linux, emacs, vim, evil, org, mu4e, xmonad, i3, git, tmux, zsh
  </td>
</tr>
</table>
