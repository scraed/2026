---
layout: distill
title: Rethinking the Diffusion Model from a Langevin Perspective
description: >
  Diffusion models are typically introduced through fragmented perspectives involving VAEs, score matching, or flow matching, with dense, technically demanding mathematical derivations. This article presents a fresh Langevin perspective on the core theory of diffusion models, offering a simpler, cleaner, and more intuitive approach to the following questions:
  1. Why are diffusion models more than just VAEs?
  2. What is the difference between ODE and SDE framework?
  3. How can VAE, Score Matching, and Flow Matching be unified under Maximum Likelihood?
  4. Why should neural networks model score functions (or their variants), and how can we generalize to discrete diffusion models where score functions don't exist?
  We demonstrate that the Langevin perspective provides strong pedagogical value for both learners and experienced researchers seeking deeper intuition.
date: 2026-04-27
future: true
htmlwidgets: true
hidden: true

# Mermaid diagrams
mermaid:
  enabled: true
  zoomable: true

# Anonymize when submitting
# authors:
#   - name: Anonymous

authors:
  - name: Candi Zheng
    url: "https://en.wikipedia.org/wiki/Albert_Einstein"
    affiliations:
      name: Department of Mathematics, Hong Kong University of Science and Technology
authors:
  - name: Yuan Lan
    url: "https://en.wikipedia.org/wiki/Albert_Einstein"
    affiliations:
      name: Theory Lab, Huawei Technology Limited


# must be the exact same name as your blogpost
bibliography: 2026-04-27-rethinking-diffusion-Langevin.bib

# Add a table of contents to your post.
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - please use this format rather than manually creating a markdown table of contents.
toc:
  - name: Equations
  - name: Images and Figures
    subsections:
      - name: Interactive Figures
  - name: Citations
  - name: Footnotes
  - name: Code Blocks
  - name: Diagrams
  - name: Tweets
  - name: Layouts
  - name: Other Typography?

# Below is an example of injecting additional post-specific styles.
# This is used in the 'Layouts' section of this post.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
  details {
    background: transparent !important;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 0.75rem 1rem;
    margin: 1rem 0;
  }
  details > summary {
    cursor: pointer;
    font-weight: 500;
    list-style: none;
    background: transparent !important;
  }
  details[open] {
    background: transparent !important;
  }
  /* Make Mermaid diagrams match article background (remove pink) and center them */
  .mermaid, svg.mermaid {
    background: transparent !important;
    background-color: transparent !important;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
  /* Remove box fill/border for nodes (formulas) */
  .mermaid .node rect,
  .mermaid .node polygon {
    fill: transparent !important;
    stroke: transparent !important;
  }
  /* Remove background for edge labels such as "Forward" */
  .mermaid .edgeLabel rect {
    fill: transparent !important;
    stroke: transparent !important;
  }
---

Modern diffusion models are built upon two fundamental processes: the forward process, which gradually corrupts data with noise during training, and the reverse process, which generates data by sampling from noise. The development of diffusion models has diverged into several branches, resulting in different perspectives on these processes. Most interpretations fall into three main frameworks: the Variational Autoencoder (VAE) perspective, the score-based perspective, and the flow-based perspective. Although there are many tutorials available, learning the core theory of diffusion models remains challenging due to mathematically dense derivations and fragmented intuitions scattered across these different approaches. 

The VAE perspective interprets the forward and reverse diffusion processes as an encoder and decoder, respectively, and using the Evidence Lower Bound (ELBO) as the training objective <d-cite key="Luo2022UnderstandingDM"></d-cite><d-cite key="Ho2020DenoisingDP"></d-cite>.  While this approach is intuitive for much of the machine learning community, it involves dense mathematical derivations of the reverse processes and often blurs a crucial intuition: in VAEs, encoder and decoder are approximations of a prior-posterior pair, whereas in diffusion models, the prior and posterior are an exact prior-posterior pair. 

The score-based perspective <d-cite key="Song2020ScoreBasedGM"></d-cite> usually starts from the mathematical exactness of the forward and reverse process pair from the point of view of stochastic equations. It typically introduces the forward process first and treats the reverse process as an oracle, often citing Anderson (1982) <d-cite key="Anderson1982ReversetimeDE"></d-cite>. However, fully grasping the derivation of the reverse process requires familiarity with advanced mathematical concepts like the Kolmogorov equations and the continuity equation, making this approach less accessible. Moreover, the choice of score matching objective is often treated as a given rather than derived from first principles, which obscures its connection to maximum likelihood.


A third valuable perspective is the flow-based viewpoint <d-cite key="liu2022flow"></d-cite>, which has become increasingly popular in modern diffusion models. This approach is theoretically equivalent to both the VAE and score-based frameworks, but it distinguishes itself by emphasizing an intuitive and visually accessible straight-line interpolation between data and noise. While this simplicity makes the flow-based perspective appealing and approachable, it also carries the risk of oversimplification, potentially overlooking the intricate pairing between the forward and reverse processes that underpin the theoretical foundation of diffusion models.

In this article, we aims to offer a perspective that is both mathematically simple and nuanced: the Langevin perspective. This approach maintains a emphasis on the exactness of the forward and reverse processes, while relying only on fundamental techinques of stochastic differential equations (SDEs). The central insight is encapsulated in the following triangle relationship:

<div class="row mt-3">
    <div class="col-md-12 col-lg-10 offset-lg-1 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/forward-reverse-langevin.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

which illustrates the connection among the forward, reverse diffusion process and the Langevin dynamics.

# Langevin Dynamics as 'Identity' Operation

**Langevin Dynamics** is a special diffusion process that can generate samples from a probability distribution $$p(\mathbf{x})$$. It is defined as:

$$
d\mathbf{x}_t = g(t)\, \mathbf{s}(\mathbf{x}_t) dt + \sqrt{2 g(t)}\, d\mathbf{W}_t, 
$$

where $$\mathbf{s}(\mathbf{x}) = \nabla_{\mathbf{x}} \log p(\mathbf{x})$$ is the score function of $$p(\mathbf{x})$$, $g(t)$ is an arbitrary positive function satisfying $\int_0^\infty g(t) dt = \infty$ to ensure ergodicity. The $d\mathbf{W}$ term is a Brownian noise what can be treated as $\sqrt{dt} \boldsymbol{\epsilon}$, where $\boldsymbol{\epsilon}$ is a standard Gaussian noise. This dynamics is often used as a Monte Carlo sampler to draw samples from $$p(\mathbf{x})$$, since $$p(\mathbf{x})$$ is its stationary distribution—the distribution that $$\mathbf{x}_t$$ converges to and and remains at as $$t \to \infty$$, regardless of the initial distribution of $$\mathbf{x}_0$$. 




<details markdown="1">
<summary><em>If you accept that $p(\mathbf{x})$ is the stationary distribution of Langevin dynamics, skip this. Otherwise, see the short argument below:</em> (click to expand)</summary>

1. Set $g(t) = 1$ by rescaling time as $t' = \int_0^t g(\tau) d\tau$: under this change of variables, $d\mathbf{x}_t = g(t)\,\mathbf{s}(\mathbf{x}_t)dt + \sqrt{2g(t)}\,d\mathbf{W}_t$ becomes the same equation with $g(t')=1$, so $g(t)$ only fixes the time unit and does not change the stationary distribution. 

2. Write the dynamics in “energy” form as $$d\mathbf{x}_t = -\nabla E(\mathbf{x})\,dt + \sqrt{2}\,d\mathbf{W}_t$$. The random term $d\mathbf{W}_t$ perturbs the system toward equilibrium, where states with the same energy $E(\mathbf{x})$ have equal probability. Thus, the stationary distribution is $p(\mathbf{x}) = f(E(\mathbf{x}))$ for some function $f$.

3. Consider $N$ independent copies $\mathbf{x}_1, \dots, \mathbf{x}_N$. Their joint density is the product $p(\mathbf{x}_1) \cdots p(\mathbf{x}_N)$. Treating them as a single system, the total energy is additive: $E(\mathbf{x}_1, \dots, \mathbf{x}_N) = \sum E(\mathbf{x}_i)$. So the joint stationary density must also be $g(\sum E(\mathbf{x}_i))$ for some function $g$. The only function satisfying both the product (independence) and sum (additivity) forms for all $N$ is the exponential: $f(E) = e^{-\beta E}$, yielding $p(\mathbf{x}) \propto e^{-\beta E(\mathbf{x})}$.

4. To find $\beta$, take $E(\mathbf{x}) = \frac{1}{2} \|\mathbf{x}\|^2$, giving the Ornstein–Uhlenbeck process $d\mathbf{x}_t = -\mathbf{x}\,dt + \sqrt{2}\,d\mathbf{W}_t$ with known stationary $\mathcal{N}(0, I)$, density $\propto e^{-\frac{1}{2} \|\mathbf{x}\|^2}$. Matching forms gives $\beta = 1$.

Thus, the dynamics $$d\mathbf{x}_t = -\nabla E(\mathbf{x})\,dt + \sqrt{2}\,d\mathbf{W}_t$$ has stationary distribution $$\propto e^{-E(\mathbf{x})}$$, and $$d\mathbf{x}_t = \nabla_{\mathbf{x}} \log p(\mathbf{x}) \, dt + \sqrt{2} \, d\mathbf{W}_t$$ has stationary distribution $p(\mathbf{x})$. 



</details>

Langevin dynamics, while widely used for sampling from complex distributions, becomes inefficient in high-dimensional or multi-modal settings due to slow mixing and sensitivity to hyperparameters such as step size and noise scale. However, Langevin dynamics play a crucial role as the foundation of diffusion models due to an important property: for $$p(\mathbf{x})$$, Langevin dynamics act as an "identity" operation on the distribution, transforming a sample from $$p(\mathbf{x})$$ into a new, independent sample from the same distribution.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/langevin_id.png" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    Langevin dynamics acts as an identity operation on $p(\mathbf{x})$: starting from a sample $\mathbf{x} \sim p(\mathbf{x})$, it produces a new sample $\mathbf{x}'$ from the same distribution.
</div>

# Spliting the Identity: Forward and Reverse Processes in diffusion models

One key reason Langevin dynamics struggles in high-dimensional settings is the challenge of initialization. The score function required by it is learned from real data and is therefore reliable only near true data points, while being poorly estimated elsewhere. Yet in generative modeling we need to start from locations that may be far from the data manifold. Finding an initialization that is both realistic and close enough to the true data manifold is difficult, making effective generation with Langevin dynamics challenging in practice. In short, Langevin dynamics is well-suited for generating new samples from an existing one, but ill-suited for generating samples entirely from scratch.

An enhancement to Langevin dynamics is the Annealed Langevin dynamics <d-cite key="song2019generative"></d-cite>. Instead of using a single Langevin sampler, this method involves training a sequence of Langevin dynamics, each corresponding to a different level of noise added to the data. Starting from pure noise, the method gradually reduces the noise level, switching between these samplers at each step. In this way, samples are progressively transformed from random noise into data-like samples, using Langevin dynamics that are effective for each stage of noise contamination. This approach highlights the importance of using multiple noise levels.

Diffusion models take this concept a step further by completely separating the training and inference processes: one process trains the model at different noise levels, while another process samples from noise to generate data.

### The Forward Diffusion Process for training

The forward diffusion process in DDPM generates the necessary training data: clean images and their progressively noised counterparts. In continuous time, a very general way to describe such a process is by an Itô SDE of the form

$$
d \mathbf{x}_t = f(\mathbf{x}_t, t)\, dt + g(t)\, d\mathbf{W}_t, \label{Forward Process}
$$

where $$t \in [0,T]$$ is the forward diffusion time, $$\mathbf{x}_t$$ is the noise-contaminated image at time $$t$$, $$\mathbf{W}_t$$ is a Brownian motion, $$f(\mathbf{x}_t, t)$$ is the drift, and $$g(t)$$ scales the injected noise. Different choices of $$f$$ and $$g$$ correspond to different forward-diffusion parameterizations used in diffusion models.

In practice, diffusion models are usually instantiated by choosing specific parameterizations of this SDE. The most common ones are the **variance-preserving (VP)** process, implemented in DDPMs as an Ornstein–Uhlenbeck dynamics that gently pulls samples toward the origin while injecting noise so that the marginal converges to a standard Gaussian; the **variance-exploding (VE)** process, where there is no restoring drift and the noise scale grows with time so that the variance “explodes”; and **flow-matching** formulations, which view generation as following a time-dependent flow that implements an “straight line” interpolation between data and noise under a carefully designed schedule.

The table below summarizes these three forward processes in terms of their noise-level, closed-form noising relations (with $$\boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, I)$$), and their corresponding SDEs expressed in terms of their respective time parameters:

| **Name** | **Noise-level parameter** | **Relation between initial and noisy variable** | **Forward SDE** |
| --- | --- | --- | --- |
| Variance-preserving (VP) | $$\alpha_t = e^{-t}$$ | $$x_t = \sqrt{\alpha_t}\, x_0 + \sqrt{1-\alpha_t}\, \boldsymbol{\epsilon}$$ | $$d x_t = - \tfrac{1}{2} x_t\, dt + dW_t$$ |
| Variance-exploding-Karras (VE-Karras) | $$\sigma$$ | $$z_\sigma = z_0 + \sigma\, \boldsymbol{\epsilon}$$ | $$dz_{\sigma} = \sqrt{2\sigma}\, dW_{\sigma}$$ |
| Flow | $$s$$ | $$r_s = (1-s)\, r_0 + s\, \boldsymbol{\epsilon}$$ | $$dr_{s} = -\frac{r_s}{1-s}\, ds + \sqrt{\frac{2s}{1-s}}\, dW_{s}$$ |

These SDEs can all be viewed as different reparameterizations of time and state. For completeness, the underlying tranformation between time parametrizations and state variables are:

| **Name** | **Time variable** | **Time domain** | **State variable notation** |
| --- | --- | --- | --- |
| Variance-preserving (VP) | $$t$$ | $$[0, T]$$ | $$x_t$$ |
| Variance-exploding-Karras (VE-Karras) | $$\sigma = \sqrt{e^{t} - 1}$$ | $$[0, \Sigma]$$ | $$z_{\sigma(t)} = x_t e^{\frac{t}{2}}$$ |
| Flow | $$s= \dfrac{\sqrt{e^{t} - 1}}{1 + \sqrt{e^{t} - 1}}$$ | $$[0, 1]$$ | $$r_{s(t)} = x_t \dfrac{e^{\frac{t}{2}}}{1 + \sqrt{e^{t} - 1}} $$ |

No matter which notation we choose, A forward diffusion step with a step size of $$\Delta t$$ acts as adding more noise to data, which is displayed in the following picture:

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/forward.png" class="img-fluid rounded" %}
    </div>
</div>

<div class="caption">
    A forward diffusion step with step size $\Delta t$ adds Gaussian noise to data, pushing samples closer to a Gaussian distribution.
</div>


### The Reverse Diffusion Process for Sampling

The reverse diffusion process is the conjugate of the forward process. While the forward process evolves $p_t(\mathbf{x})$ toward $\mathcal{N}(\mathbf{0},I)$, the reverse process reverses this evolution, restoring $\mathcal{N}(\mathbf{0},I)$ to $p_t$.

The concept behind the reverse process is intuitive: since Langevin dynamics acts as an identity operation on a distribution—preserving it unchanged—any forward process composed with its corresponding reverse process should similarly yield an identity transformation. Specifically, at any time $t$, combining the forward and reverse processes must reproduce the Langevin dynamics for the distribution $p_t(\mathbf{x})$, as illustrated in the following diagram.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/forward-reverse-langevin.png" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    The forward and reverse diffusion processes compose to reproduce Langevin dynamics.
</div>


To formalize this, consider the VP case with the following Langevin dynamics for $p_t(\mathbf{x})$ with a time variable $\tau$, distinguished from the forward diffusion time $t$. This dynamics can be decomposed into forward and reverse components as follows:  

$$
\begin{split}  
d\mathbf{x}_\tau &= \mathbf{s}(\mathbf{x}_\tau, t) d\tau + \sqrt{2}\, d\mathbf{W}_\tau, \\
&= \underbrace{-\frac{1}{2} \mathbf{x}_\tau d\tau + d\mathbf{W}_\tau^{(1)}}_{\text{Forward}} + \underbrace{ \left( \frac{1}{2} \mathbf{x}_\tau + \mathbf{s}(\mathbf{x}_\tau, t) \right)d\tau + d\mathbf{W}_\tau^{(2)}}_{\text{Reverse} },  
\end{split}  
$$

where $\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ is the score function of $p_t(\mathbf{x})$. We have utilized the property that $$\sqrt{2}\, d\mathbf{W}_\tau = \sqrt{2 dt} \boldsymbol{\epsilon} = \sqrt{dt} \boldsymbol{\epsilon}_1 + \sqrt{dt} \boldsymbol{\epsilon}_2 = d\mathbf{W}_\tau^{(1)} + d\mathbf{W}_\tau^{(2)}$$. 

The "Forward" part in this decomposition corresponds to the forward diffusion process, effectively **increasing the forward diffusion time $t$ by $d\tau$**, bringing the distribution to $p_{t + d\tau}(\mathbf{x})$. Since the forward and reverse components combine to form an "identity" operation, the "Reverse" part must reverse the forward process—**decreasing the forward diffusion time $t$ by $d\tau$** and restoring the distribution back to $p_t(\mathbf{x})$.


Now we can read the reverse process according to the reverse part in the equation above, and a reverse diffusion time $t'$ different from the forward diffusion time $t$:

$$
d\mathbf{x}_{t'} = \left( \frac{1}{2} \mathbf{x}_{t'}+ \mathbf{s}(\mathbf{x}_{t'}, t) \right) dt' + d\mathbf{W}_{t'}.
$$

The reverse diffusion process itself is also a standalone SDE that advances the reverse diffusion time $t'$. If $$\mathbf{x}_{t'} \sim q_{t'}(\mathbf{x})$$, then one step of the reverse diffusion process with $dt' = \Delta t'$ brings it to $$\mathbf{x}_{t' + \Delta t'} \sim q_{t' + \Delta t'}(\mathbf{x})$$.

The same decomposition approach can be applied to other diffusion schemes. The following table summarizes how each parameterization relates its Langevin dynamics to its corresponding forward and reverse processes:

| **Name** | **Langevin dynamics** | **Forward Split** | **Reverse Split** |
| --- | --- | --- | --- |
| VP-SDE/<br>ODE | $$dx = \mathbf{s}_x\, d\tau + \sqrt{2}\, d W_\tau$$<br>$$dx = \frac{1}{2} \mathbf{s}_x\, d\tau + d W_\tau$$ | $$d x = - \tfrac{1}{2} x\, d\tau + dW_\tau$$ | $$dx = \left[ \frac{1}{2} x + \mathbf{s}_x \right] d\tau + dW_{\tau}$$<br>$$dx = \frac{1}{2} \left( x + \mathbf{s}_x \right) d\tau$$ |
| VE-Karras | $$dz = \tau\, \mathbf{s}_z\, d\tau + \sqrt{2 \tau}\, d W_\tau$$ | $$dz = \sqrt{2\tau}\, dW_{\tau}$$ |  $$dz = \tau\, \mathbf{s}_z\, d\tau $$ |
| Flow | $$dr = \frac{\tau}{1+\tau} \mathbf{s}_r\, d\tau + \sqrt{\frac{2\tau}{1+\tau}}\, d W_\tau$$  | $$dr = -\frac{r}{1-\tau}\, d\tau + \sqrt{\frac{2\tau}{1-\tau}}\, dW_{\tau}$$  |  $$dr = \frac{\tau\, \mathbf{s}_r + r}{1-\tau} d\tau$$ |

Note that the $\mathbf{s}(\mathbf{x}_{t'}, t)$ term in the reverse process still depends on the forward time $t$; we need the relationship between the forward time $t$ and the reverse time $t'$ to close the equation. A single reverse-time step $dt'$ can be understood in two complementary ways:

1. **As an undoing of the forward diffusion:** one step of the reverse diffusion process with $dt' = \Delta t$ removes a small amount of noise and therefore **reduces** the forward diffusion time by $\Delta t$.


2. **As forward evolution in its own clock:** the reverse diffusion process is itself a well-defined SDE/ODE in the variable $t'$, so one step with $dt' = \Delta t$ simply **advances** the reverse diffusion time from $t'$ to $t' + \Delta t$:



Together, these two viewpoints determine how the forward and reverse clocks are related. Since a positive reverse-time step $dt' > 0$ both **decreases** the forward time $t$ and **increases** the reverse time $t'$, their infinitesimal increments must satisfy

$$
dt = -dt'
$$

which means that $t'$ runs in the opposite direction to $t$. To make $t'$ lie in the same range $[0, T]$ as the forward diffusion time, we can define

$$
t = T - t',
$$

so that $t = 0$ corresponds to $t' = T$ and $t = T$ corresponds to $t' = 0$.


In this notation, the reverse diffusion process of VP is

$$
d\mathbf{x}_{t'} = \left( \frac{1}{2} \mathbf{x}_{t'}+ \mathbf{s}(\mathbf{x}_{t'}, T-t') \right) dt' + d\mathbf{W}_{t'}, \label{Reverse Process}
$$

in which $t' \in [0,T]$ is the reverse time, $\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ is the score function of the density of $\mathbf{x}_{t}$ in the forward process.

The above analysis applies not only to SDE reverse processes but also to ODE reverse processes. The following table summarizes the reverse diffusion processes for other parameterizations:



| **Name** | **Reverse Time** | **Reverse time domain** | **Reverse Process** | **Function modeled by NN** |
| --- | --- | --- | --- | --- |
| VP-SDE | $$t' = T - t$$ | $$t' \in [0, T]$$ | $$dx_{t'} = \left[ \frac{1}{2} x_{t'}+ \mathbf{s}_x(x_{t'}, T-t') \right] dt' + dW_{t'}$$ | $$\mathbf{s}_x(x, t)$$  |
| VP-ODE | $$t' = T - t$$ | $$t' \in [0, T]$$ | $$dx_{t'} = \frac{1}{2} \left[ x_{t'} + \mathbf{s}_x (x_{t'}, T-t') \right] dt' $$ | $$\mathbf{s}_x(x, t)$$  |
| VE-Karras | $$\sigma' = \Sigma - \sigma$$ | $$\sigma' \in [0, \Sigma]$$ | $$dz_{\sigma'} = -\boldsymbol{\epsilon}(z_{\sigma'}, \Sigma-\sigma')d \sigma'$$ | $$\boldsymbol{\epsilon}(z, \sigma) =  -\sigma \mathbf{s}_z(z, \sigma) $$|
| Flow | $$s' = 1 - s$$ | $$s' \in [0, 1]$$ | $$dr_{s'} = -\mathbf{v} (r_{s'}, 1-s') ds'$$ | $$\mathbf{v}(r, s) =  - \frac{s\, \mathbf{s}_r(r,s) + r_{s'}}{1-s} $$ |





### Forward-Reverse Duality
We have established that a single reverse step undoes a forward step: advancing the reverse time $$t'$$ by an amount corresponds to decreasing the forward time $$t$$ by the same amount. Now, let's examine what happens when we combine multiple forward and reverse steps. Consider this sequence: begin with a data sample $$\mathbf{x}_0$$, propagate it through the forward process to obtain $$\mathbf{x}_T$$, then use $$\mathbf{x}_T$$ as the starting point $$\mathbf{x}_{0'}$$ for the reverse process and evolve it to $$\mathbf{x}_{T'}$$. Part of this forward-reverse cycle is illustrated in the figure below.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/FastestDiffusionTheory_08.jpg" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    Part of a forward–reverse diffusion cycle: the last two steps of the forward process (green arrows, increasing $t$) followed by the first two steps of the reverse process (blue arrows, increasing $t'$ while decreasing $t$).
</div>

The green arrows represent consecutive forward process steps that advance the forward diffusion time $$t$$, while the blue arrows indicate consecutive reverse process steps that advance the reverse diffusion time $$t'$$. 

We examine the relationship between $$\mathbf{x}_{t}$$ in the forward diffusion process and $$\mathbf{x}_{t'=T-t}$$ in the reverse diffusion process. The composition of a forward and a reverse step constitutes a Langevin dynamics step. This allows us to connect $$\mathbf{x}$$ in the forward process with those in the reverse process through Langevin dynamics steps, as illustrated below:

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/FastestDiffusionTheory_09.jpg" class="img-fluid rounded" %}
    </div>
</div>

<div class="caption">
    Each horizontal row shows a Langevin dynamics step that maps a forward sample $\mathbf{x}_t$ to a new reverse sample $\mathbf{x}_{(T-t)'}$ from the **same** probability density.
</div>

**Each horizontal row in this picture corresponds to consecutive steps of Langevin dynamics, which alters the samples while maintaining the same probability density**. This illustrates the duality between the forward and reverse diffusion processes: while $$\mathbf{x}_t$$ (forward) and $$\mathbf{x}_{(T-t)'}$$ (reverse) are distinct samples, they obey the same probability distribution.


To formalize the duality, we define the densities of $$\mathbf{x}_t$$ (forward) as $$p_t(\mathbf{x})$$, the densities of $$\mathbf{x}_{t'}$$ (reverse) as $$q_{t'}(\mathbf{x})$$. If we initialize

$$
q_0(\mathbf{x}) = p_T(\mathbf{x}),  
$$

then their evolution are related by  

$$
q_{t'}(\mathbf{x}) = p_{T-t'}(\mathbf{x}) 
$$

In diffusion models, the terminal time $$T$$ is chosen to be sufficiently large so that the forward process distribution $$p_T(\mathbf{x})$$ converges to a simple Gaussian distribution. This ensures that the reverse process can start from this well-defined Gaussian noise at $$t'=0$$. By then evolving the reverse process through time $$t'$$ from 0 to $$T$$, we obtain samples that follow the original data distribution:

$$
q_T(\mathbf{x}) = p_0(\mathbf{x}) \quad \text{(data distribution)}.  
$$

This means that **after evolving the reverse process from time $t'=0$ to $t'=T$, the resulting samples follow the exact same distribution as the original training data $p_0$**. This establishes a precise mathematical equivalence between the forward and reverse diffusion processes, demonstrating that the reverse process can effectively generate realistic image data starting from pure Gaussian noise.

Now we have demonstrated that **reverse diffusion**—the dual of the forward process—can generate image data from noise. However, this requires access to the score function $\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ at every timestep $t$. In practice, we approximate this function using a neural network.  In the next section, we will explain how to train such score networks.  

## Training the Diffusion Model

Previous section introduced **Forward Process** and **Reverse Process** of Denoising Diffusion Probabilistic Model (DDPM). 

**Forward Process** 

$$
d \mathbf{x}_t = - \frac{1}{2} \mathbf{x}_t dt + d\mathbf{W}_t, 
$$

where $t \in [0,T]$ is the forward diffusion time. This process describes a gradual noising operation that transforms clean images into Gaussian noise.

**Reverse Process** 

$$
d\mathbf{x}_{t'} = \left( \frac{1}{2} \mathbf{x}_{t'}+ \mathbf{s}(\mathbf{x}_{t'}, T-t') \right) dt' + d\mathbf{W}_{t'},
$$

where $t' = T - t$ is the reverse diffusion time, $\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ is the score function of the density of $\mathbf{x}_{t}$ in the forward process.


Training the reverse process raises two key questions: (1) What should we model, and (2) What training objective should we use? It is clear that the central object to model is the **score function**, which we typically represent with a neural network since it is unknown and generally intractable. In practice, there are several parameterizations of the score function—such as $x_0$ prediction, $\epsilon$ prediction, or velocity prediction from a flow-matching perspective—but all these variants are simply rescaled forms of the same underlying score function. However, it is less obvious how the score function should enter the training objective.

The variational autoencoder (VAE) perspective addresses the training objective by maximizing the Evidence Lower Bound (ELBO), a principled but approximate surrogate for maximum likelihood. While ELBO provides a systematic way to derive training objectives, this perspective can obscure the fact that diffusion models inherently perform true maximum likelihood estimation, distinguishing them from conventional VAEs and contributing to their empirical success.


Alternatively, the score matching perspective motivates the use of **denoised score matching**, a method closely connected to maximum likelihood (see Lyu, S. (2009), *Interpretation and generalization of score matching*). However, employing the score function as a prior assumption—rather than deriving its necessity from first principles—limits the generality of this approach. Specifically, it becomes difficult to extend score matching to more general or discrete diffusion systems, where the notion of a continuous score function becomes less transparent.

The flow matching perspective recasts score matching as "velocity learning" along straight lines, which simplifies the formalism. However, while this approach is easier to understand from first glance, it does not clarify the connection to maximum likelihood.

To address these shortcomings, our goal is to derive the training objective directly from first principles, beginning with the maximum likelihood framework itself. By doing so, we reveal the fundamental connection between diffusion model loss and exact maximum likelihood, without presupposing the existence or explicit usage of the score function.

### From Maximal likelihood to Denoising objective



We now look at maximum likelihood training of a diffusion model. Suppose we have two distributions $p(\mathbf{x}, t)$ and $q(\mathbf{x}, t)$ that both evolve under the same forward diffusion process. Think of $p$ as the **true data distribution** pushed forward by the diffusion dynamics, and $q$ as the **model distribution**. At any fixed time $t$, their Kullback–Leibler (KL) divergence is

$$
\mathrm{KL}\big(p_t \Vert q_t\big)
= \int p(\mathbf{x}, t)\,\log \frac{p(\mathbf{x}, t)}{q(\mathbf{x}, t)}\,d\mathbf{x}.
$$

Maximum likelihood training of $p$ corresponds to minimizing this KL divergence at the data time $t=0$. In a diffusion model, however, we introduce an explicit **forward diffusion time** $t$ and then learn a **reverse (reverse-time) process** that maps from noisy states back to data. Intuitively, this suggests that we should “distribute” the KL objective over diffusion time: instead of treating the KL only at $t=0$, we examine how it evolves along the forward process.

 
The way to "distribute" the KL is consdering the **time derivative** of the KL divergence along the forward dynamics, noting that

$$
\mathrm{KL}\big(p_0 \Vert q_0\big) = -\int_0^{\infty}\frac{d}{dt}  \mathrm{KL}\big(p_t \Vert q_t\big) dt
$$

because $\mathrm{KL}\big(p_\infty \Vert q_\infty\big) = 0$ at infinitely large time $t$ since both $p$ and $q$ converges to the same Gaussian noise distribution. 

The term $$L_t = -\frac{d}{dt}  \mathrm{KL}\big(p_t \Vert q_t\big)$$
is exactly the training objective we needed for training the diffusion model.


We will show that as long as the forward diffusion process takes the form:

$$
d\mathbf{x} = f(\mathbf{x}, t) \, dt + g(t) \, d\mathbf{W}.
$$

the training objective is

$$\begin{align*}
L_t
  &= \frac{1}{2} g(t)^2
     \int p(\mathbf{x}, t)\,
          \big\|\nabla \log p(\mathbf{x}, t)
                - \nabla \log q(\mathbf{x}, t)\big\|^2
        d\mathbf{x} \\
  &\propto \mathbb{E}_{\mathbf{x} \sim p(\mathbf{x}, t)}
            \big\|\nabla \log p(\mathbf{x}, t)
                  - \nabla \log q(\mathbf{x}, t)\big\|^2
\end{align*}$$
where the score functions $$\nabla \log p(\mathbf{x}, t)$$ and $$\nabla \log q(\mathbf{x}, t)$$ appears naturally inside the L2 objective. 

In practice, we model the $$\nabla \log q(\mathbf{x}, t)$$ (or its rescaled version) as a neural network $\mathbf{s}_\theta(\mathbf{x}, t)$. The only thing remains to handle is the score of the true data distribution $$\nabla \log p(\mathbf{x}, t)$$, which should be approximated by an empirical value from samples since we don't know its vallue. In fact, we have

$$
\text{argmin}_{\mathbf{s}_\theta}
   \mathbb{E}_{\mathbf{x} \sim p(\mathbf{x}, 0)}
            \big\|\nabla \log p(\mathbf{x}_t | \mathbf{x}_0)
                  - \mathbf{s}_\theta\big\|^2 = \text{argmin}_{\mathbf{s}_\theta}
   \mathbb{E}_{\mathbf{x} \sim p(\mathbf{x}, t)}
            \big\|\nabla \log p(\mathbf{x}, t)
                  - \mathbf{s}_\theta\big\|^2
$$
where the LHS is the denoising score matching (DSM) loss while RHS is the score matching loss.

<details markdown="1">
<summary><em>Proof</em> (click to expand)</summary>

Let us write the *denoising score matching* (DSM) loss at time $t$ as
$$
L_{\text{DSM}}(\mathbf{s}_\theta)
:= \mathbb{E}_{\mathbf{x}_0 \sim p_0}\,
   \mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}
   \big\|
      \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t \mid \mathbf{x}_0)
      - \mathbf{s}_\theta(\mathbf{x}_t, t)
   \big\|^2,
$$
and the *score matching* (SM) loss on the marginal $p_t(\mathbf{x}_t)$ as
$$
L_{\text{SM}}(\mathbf{s}_\theta)
:= \mathbb{E}_{\mathbf{x}_t \sim p_t}
   \big\|
      \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t)
      - \mathbf{s}_\theta(\mathbf{x}_t, t)
   \big\|^2.
$$
Here $p_t(\mathbf{x}_t) = \int p_t(\mathbf{x}_t \mid \mathbf{x}_0)\,p_0(\mathbf{x}_0)\,d\mathbf{x}_0$ is the marginal of the forward process at time $t$.

Define the conditional score
$$
\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)
:= \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t \mid \mathbf{x}_0),
$$
and the marginal score
$$
\mathbf{s}(\mathbf{x}_t, t)
:= \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t).
$$
Using $\|\mathbf{a}-\mathbf{b}\|^2 = \|\mathbf{a}\|^2 + \|\mathbf{b}\|^2 - 2\langle \mathbf{a}, \mathbf{b}\rangle$, we can expand both objectives. For DSM,
$$
\begin{aligned}
L_{\text{DSM}}(\mathbf{s}_\theta)
&= \mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
    \big\| \mathbf{s}_\theta(\mathbf{x}_t, t) \big\|^2
   - 2\,\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
       \big\langle
          \mathbf{s}_\theta(\mathbf{x}_t, t),
          \mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)
       \big\rangle \\
&\quad
   + \mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
       \big\|\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)\big\|^2,
\end{aligned}
$$
where expectations are taken under the joint $p_0(\mathbf{x}_0)\,p_t(\mathbf{x}_t \mid \mathbf{x}_0)$. Similarly, for SM we have
$$
\begin{aligned}
L_{\text{SM}}(\mathbf{s}_\theta)
&= \mathbb{E}_{\mathbf{x}_t}
    \big\| \mathbf{s}_\theta(\mathbf{x}_t, t) \big\|^2
   - 2\,\mathbb{E}_{\mathbf{x}_t}
       \big\langle
          \mathbf{s}_\theta(\mathbf{x}_t, t),
          \mathbf{s}(\mathbf{x}_t, t)
       \big\rangle \\
&\quad
   + \mathbb{E}_{\mathbf{x}_t}
       \big\|\mathbf{s}(\mathbf{x}_t, t)\big\|^2.
\end{aligned}
$$

The first terms coincide, because the marginal of the joint distribution is exactly $p_t(\mathbf{x}_t)$:
$$
\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
  \big\|\mathbf{s}_\theta(\mathbf{x}_t, t)\big\|^2
 = \int p_t(\mathbf{x}_t)
       \big\|\mathbf{s}_\theta(\mathbf{x}_t, t)\big\|^2
   \,d\mathbf{x}_t
 = \mathbb{E}_{\mathbf{x}_t}
     \big\|\mathbf{s}_\theta(\mathbf{x}_t, t)\big\|^2.
$$
The last terms,
$\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}\|\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)\|^2$
and
$\mathbb{E}_{\mathbf{x}_t}\|\mathbf{s}(\mathbf{x}_t, t)\|^2$,
do **not** depend on $\mathbf{s}_\theta$ at all, so they can only shift the loss by a constant.

The only subtle point is the cross term. Because the inner product is linear, it is enough to prove that, for any (scalar) test function $f(\mathbf{x}_t)$,
$$
\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
  \big[ f(\mathbf{x}_t)\,\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0) \big]
=
\mathbb{E}_{\mathbf{x}_t}
  \big[ f(\mathbf{x}_t)\,\mathbf{s}(\mathbf{x}_t, t) \big],
$$
and then apply this to each coordinate of $\mathbf{s}_\theta(\mathbf{x}_t, t)$.

By definition of the score,
$$
\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)
= \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t \mid \mathbf{x}_0)
= \frac{\nabla_{\mathbf{x}_t} p_t(\mathbf{x}_t \mid \mathbf{x}_0)}
       {p_t(\mathbf{x}_t \mid \mathbf{x}_0)}.
$$
Therefore,
$$
\begin{aligned}
\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
  \big[ f(\mathbf{x}_t)\,\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0) \big]
&= \iint
     p_0(\mathbf{x}_0)\,
     p_t(\mathbf{x}_t \mid \mathbf{x}_0)\,
     f(\mathbf{x}_t)\,
     \frac{\nabla_{\mathbf{x}_t} p_t(\mathbf{x}_t \mid \mathbf{x}_0)}
          {p_t(\mathbf{x}_t \mid \mathbf{x}_0)}
     \,d\mathbf{x}_t\,d\mathbf{x}_0 \\
&= \iint
     f(\mathbf{x}_t)\,
     \nabla_{\mathbf{x}_t} p_t(\mathbf{x}_t \mid \mathbf{x}_0)\,
     p_0(\mathbf{x}_0)\,
     \,d\mathbf{x}_t\,d\mathbf{x}_0.
\end{aligned}
$$
Under mild regularity conditions we can interchange the order of integration and differentiation, obtaining
$$
\begin{aligned}
\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
  \big[ f(\mathbf{x}_t)\,\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0) \big]
&= \int
     f(\mathbf{x}_t)\,
     \nabla_{\mathbf{x}_t}
       \Big(
         \int p_t(\mathbf{x}_t \mid \mathbf{x}_0)\,p_0(\mathbf{x}_0)\,d\mathbf{x}_0
       \Big)
     \,d\mathbf{x}_t \\
&= \int f(\mathbf{x}_t)\,\nabla_{\mathbf{x}_t} p_t(\mathbf{x}_t)\,d\mathbf{x}_t \\
&= \int
     p_t(\mathbf{x}_t)\,
     f(\mathbf{x}_t)\,
     \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t)\,d\mathbf{x}_t \\
&= \mathbb{E}_{\mathbf{x}_t}
     \big[ f(\mathbf{x}_t)\,\mathbf{s}(\mathbf{x}_t, t) \big].
\end{aligned}
$$
Taking $f(\mathbf{x}_t)$ to be each component of $\mathbf{s}_\theta(\mathbf{x}_t, t)$ shows that the DSM and SM cross terms are identical:
$$
\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}
  \big\langle
     \mathbf{s}_\theta(\mathbf{x}_t, t),
     \mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)
  \big\rangle
=
\mathbb{E}_{\mathbf{x}_t}
  \big\langle
     \mathbf{s}_\theta(\mathbf{x}_t, t),
     \mathbf{s}(\mathbf{x}_t, t)
  \big\rangle.
$$

Putting everything together, we have
$$
L_{\text{DSM}}(\mathbf{s}_\theta)
= L_{\text{SM}}(\mathbf{s}_\theta) + C,
$$
where $C$ is a constant independent of $\mathbf{s}_\theta$. Hence both objectives are minimized by the same function, namely the true marginal score
$$
\mathbf{s}_\theta^\star(\mathbf{x}_t, t) = \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t).
$$
</details>


To understand how score functions arise in the training objective, we will use the familar maximal likelihood method. However, maximal likelihood is for distributions. Before we proceed, we need to know how the forward diffusion process effects the distribution.

While a stochastic differential equation (SDE) describes how individual samples evolve over time, the probability distribution of a collection of samples follows the corresponding Fokker-Planck equation. Consider a general SDE of the form:

$$
d\mathbf{x} = f(\mathbf{x}, t) \, dt + g(t) \, d\mathbf{W}.
$$

where $f(\mathbf{x}, t)$ is the drift term governing deterministic dynamics, $g(t)$ controls the diffusion strength, and $d\mathbf{W}$ represents Brownian motion increments. If we start with a collection of samples $\{\mathbf{x}_0^{(i)}\}$ drawn from an initial distribution $p_0(\mathbf{x})$ and evolve each sample according to this SDE, the resulting samples $\{\mathbf{x}_t^{(i)}\}$ will be distributed according to a time-evolved density $p_t(\mathbf{x})$. The question is: how does $p_t(\mathbf{x})$ relate to the SDE parameters $f$ and $g$?

The answer is given by the **Fokker-Planck equation**, which governs how the probability density $$p(\mathbf{x}, t)$$ evolves under an SDE:

$$
\frac{\partial p}{\partial t} = -\nabla \cdot \left[f(\mathbf{x}, t) p\right] + \frac{1}{2} \nabla^2 \left[ g(t)^2 p \right].
$$

This partial differential equation reveals how both drift and diffusion shape the distribution. The first term, $$-\nabla \cdot \left[f(\mathbf{x}, t) p\right]$$, is the advection term: it transports probability mass along the drift field $$f(\mathbf{x}, t)$$, shifting the distribution deterministically. The second term, $$\frac{1}{2} \nabla^2 \left[ g(t)^2 p \right]$$, is the diffusion term: it spreads probability mass outward due to stochastic fluctuations, smoothing the distribution over time. 

<details markdown="1">
<summary><em>A short explaination:</em> (click to expand)</summary>

You can find rigorous derivations of the Fokker-Planck equation in many textbooks; here we just sketch an intuitive, 1D argument that explains its form.

1. **Linearity.** Particles following the SDE are independent, so if $p_1(x,t)$ and $p_2(x,t)$ each follow the evolution equation, then any mixture $a p_1 + (1-a)p_2$ should also follow it. This means the PDE for $p(x,t)$ must be linear:
$$
\frac{\partial p}{\partial t} + L[p] = 0,
$$
where $L[p]$ is a linear operator such as $a(x,t)p + b(x,t)\partial_x p + c(x,t)\partial_x^2 p$.

2. **Conservation of probability.** The density is normalized for all time, $\int_{-\infty}^{\infty} p(x,t)\,dx = 1$, so
$$
\int_{-\infty}^{\infty} \frac{\partial p}{\partial t}\,dx = 0.
$$
This holds if we can write $L[p]$ as a spatial derivative of a **probability flux** $J[p]$:
$$
L[p] = \frac{\partial J[p]}{\partial x},
$$
because then
$$
\int_{-\infty}^{\infty} \frac{\partial J[p]}{\partial x}\,dx
= J[p]\big|_{-\infty}^{\infty} = 0
$$
whenever $J[p]$ vanishes at infinity. So we obtain the conservation form
$$
\frac{\partial p}{\partial t} + \frac{\partial J[p]}{\partial x} = 0.
$$

3. **Drift term $f(x,t)$.** To determine $J[p]$ related to the drift $f(x,t)$, consider first a simple 1D case with **constant speed** $v$, so $dx = v\,dt$. After time $t$, a particle now at position $x$ must have come from $x - vt$ at time $0$, so
$$
p(x,t) = p(x - vt, 0).
$$
A $p(x,t)$ satisfying this relation also satisfy the equation
$$
\frac{\partial p}{\partial t} + \frac{\partial}{\partial x}\big(v\,p(x,t)\big) = 0.
$$
Therefore the flux $J_{\text{drift}}[p]$ for constant velocity is $v p$. If the speed depends on position and time, $dx = f(x,t)\,dt$, the drift contributes a flux $J_{\text{drift}}[p] = f(x,t)\,p(x,t)$.


4. The noise term $g d W$: consider a simple case $dx = g dW$. Suppose $x(0) = 0$. At time $t$,  the accumulation of $dW$ from time $0$ to time $t$ is a Gaussian noise with variance $t$. Therefore the variance of $x$ is $g^2 t$, whose probability distribution is $p(x, t) = \frac{1}{\sqrt{2\pi g^2 t} } e^{-\frac{x^2}{2 g^2 t}}$. It satisfies the following equation 
$$
\frac{\partial p}{\partial t} -\frac{1}{2} \frac{\partial^2 g^2 p}{\partial x^2}  = 0
$$
Therefore the noise term contributes a flux $J_{\text{noise}}[p] = -\frac{1}{2} \frac{\partial g^2 p}{\partial x}$.

Combine them together we have $J_[p] = f(x,t)\,p(x,t)-\frac{1}{2} \frac{\partial g^2 p}{\partial x}$ hence

$$
\frac{\partial p}{\partial t} = -\frac{\partial}{\partial \mathbf{x}} \left[f(\mathbf{x}, t) p\right] + \frac{1}{2} g(t)^2 \frac{\partial^2  p}{\partial \mathbf{x}^2}.
$$

</details>




To make this precise, consider the **time derivative** of the KL divergence along the forward dynamics. Assume that both $p$ and $q$ satisfy the same Fokker–Planck equation with drift $f(\mathbf{x}, t)$ and diffusion strength $g(t)$:

$$
\frac{\partial p}{\partial t}
= -\nabla \cdot \big(f p\big)
  + \frac{1}{2} g(t)^2 \nabla^2 p,
\qquad
\frac{\partial q}{\partial t}
= -\nabla \cdot \big(f q\big)
  + \frac{1}{2} g(t)^2 \nabla^2 q.
$$

Writing the KL divergence as

$$
\mathrm{KL}\big(p_t \Vert q_t\big)
= \int p(\mathbf{x}, t) \log \frac{p(\mathbf{x}, t)}{q(\mathbf{x}, t)}\,d\mathbf{x},
$$

and differentiating under the integral sign, we obtain

$$
\frac{d}{dt} \mathrm{KL}\big(p_t \Vert q_t\big)
= \int \left( \log \frac{p}{q} \right) \partial_t p\, d\mathbf{x}
   + \int p\,\frac{\partial_t q}{q}\, d\mathbf{x},
$$

where all functions are evaluated at $(\mathbf{x}, t)$ and the integrals are over $\mathbf{x}$. Using the Fokker–Planck operator $\mathcal{L}$ defined by

$$
\mathcal{L} u
= -\nabla \cdot (f u) + \frac{1}{2} g(t)^2 \nabla^2 u,
$$

we can rewrite this as

$$
\frac{d}{dt} \mathrm{KL}\big(p_t \Vert q_t\big)
= \int \left( \log \frac{p}{q} \right) \mathcal{L} p\, d\mathbf{x}
   - \int \frac{p}{q}\,\mathcal{L} q\, d\mathbf{x}.
$$

<details>
<summary><strong>Derivation: how KL changes under the Fokker–Planck equation</strong></summary>

Let $r = p/q$. Then $\log (p/q) = \log r$, and we can handle each term by integration by parts (assuming boundary terms vanish, e.g., in $\mathbb{R}^d$ with rapidly decaying densities).

For the **drift part** of $\mathcal{L}$, we have

$$
\int \log r \, \big[-\nabla \cdot (f p)\big]\, d\mathbf{x}
 = \int p \, f \cdot \nabla \log r\, d\mathbf{x},
$$

and

$$
\int r \, \big[-\nabla \cdot (f q)\big]\, d\mathbf{x}
 = \int q \, f \cdot \nabla r\, d\mathbf{x}.
$$

A direct computation using $r = p/q$ shows that these two contributions cancel **exactly**:

$$
p\, f \cdot \nabla \log r
 - q\, f \cdot \nabla r
 = 0,
$$

so the drift does **not** contribute to the time derivative of KL.

The **diffusion part** is responsible for KL contraction. Using $\nabla p = p \nabla \log p$, $\nabla q = q \nabla \log q$, and

$$
\nabla r = \nabla\left(\frac{p}{q}\right)
         = p \left(\nabla \log p - \nabla \log q\right),
$$

one finds

$$
\int \log r \cdot \frac{1}{2} g(t)^2 \nabla^2 p\, d\mathbf{x}
 = -\frac{1}{2} g(t)^2 \int \nabla \log r \cdot \nabla p\, d\mathbf{x},
$$

and

$$
\int r \cdot \frac{1}{2} g(t)^2 \nabla^2 q\, d\mathbf{x}
 = -\frac{1}{2} g(t)^2 \int \nabla r \cdot \nabla q\, d\mathbf{x}.
$$

Substituting the expressions above and simplifying,

$$
\nabla \log r \cdot \nabla p
 = p \left( \nabla \log p - \nabla \log q \right) \cdot \nabla \log p,
$$

$$
\nabla r \cdot \nabla q
 = p \left( \nabla \log p - \nabla \log q \right) \cdot \nabla \log q,
$$

so that the diffusion contribution to $\frac{d}{dt} \mathrm{KL}$ becomes

$$
-\frac{1}{2} g(t)^2 \int \nabla \log r \cdot \nabla p\, d\mathbf{x}
 +\frac{1}{2} g(t)^2 \int \nabla r \cdot \nabla q\, d\mathbf{x}
 = -\frac{1}{2} g(t)^2 \int p(\mathbf{x}, t)
    \big\|\nabla \log p - \nabla \log q\big\|^2 \, d\mathbf{x}.
$$

</details>

Putting everything together, we obtain the key identity

$$
\frac{d}{dt} \mathrm{KL}\big(p_t \Vert q_t\big)
 = -\frac{1}{2} g(t)^2
   \int p(\mathbf{x}, t)\,
        \big\|\nabla \log p(\mathbf{x}, t)
              - \nabla \log q(\mathbf{x}, t)\big\|^2
      d\mathbf{x}
 \;\leq\; 0.
$$

 Thus, along the forward diffusion process, the KL divergence between any two solutions of the same Fokker–Planck equation is **non-increasing**: diffusion strictly contracts KL (unless $p_t = q_t$ in the sense that $\nabla \log p = \nabla \log q$ almost everywhere). Drift does not affect this contraction; it only transports mass without changing the “distance” between $p_t$ and $q_t$ in KL. This monotone decrease of $\mathrm{KL}(p_t \Vert q_t)$ over $t$ underlies many stability results for stochastic dynamics, and in diffusion models it justifies decomposing the global maximum-likelihood objective into local-in-time terms associated with each diffusion step.


DDPM is trained to removes the noise $\bar{\boldsymbol{\epsilon}}_i$ from $\mathbf{x}_i$ in the forward diffusion process, by training a denoising neural network $\boldsymbol{\epsilon}_\theta( \mathbf{x}, t_i  )$ to predict and remove the noise $\bar{\boldsymbol{\epsilon}}_i $. This means that DDPM minimizes the **denoising objective** [^Ho2020DenoisingDP]:


Note: please use the table of contents as defined in the front matter rather than the traditional markdown styling.

## Equations

This theme supports rendering beautiful math in inline and display modes using [MathJax 3](https://www.mathjax.org/) engine.
You just need to surround your math expression with `$$`, like `$$ E = mc^2 $$`.
If you leave it inside a paragraph, it will produce an inline expression, just like $$ E = mc^2 $$.

To use display mode, again surround your expression with `$$` and place it as a separate paragraph.
Here is an example:

$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

Note that MathJax 3 is [a major re-write of MathJax](https://docs.mathjax.org/en/latest/upgrading/whats-new-3.0.html)
that brought a significant improvement to the loading and rendering speed, which is now
[on par with KaTeX](http://www.intmath.com/cg5/katex-mathjax-comparison.php).

## Images and Figures

Its generally a better idea to avoid linking to images hosted elsewhere - links can break and you
might face losing important information in your blog post.
To include images in your submission in this way, you must do something like the following:

```markdown
{% raw %}{% include figure.liquid path="assets/img/2026-04-27-distill-example/iclr.png" class="img-fluid" %}{% endraw %}
```

which results in the following image:

{% include figure.liquid path="assets/img/2026-04-27-distill-example/iclr.png" class="img-fluid" %}

To ensure that there are no namespace conflicts, you must save your asset to your unique directory
`/assets/img/2025-04-27-[SUBMISSION NAME]` within your submission.

Please avoid using the direct markdown method of embedding images; they may not be properly resized.
Some more complex ways to load images (note the different styles of the shapes/shadows):

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/9.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/7.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/8.jpg" class="img-fluid z-depth-2" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/10.jpg" class="img-fluid z-depth-2" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/11.jpg" class="img-fluid"  %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/12.jpg" class="img-fluid" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-distill-example/7.jpg" class="img-fluid" %}
    </div>
</div>

### Interactive Figures

Here's how you could embed interactive figures that have been exported as HTML files.
Note that we will be using plotly for this demo, but anything built off of HTML should work
(**no extra javascript is allowed!**).
All that's required is for you to export your figure into HTML format, and make sure that the file
exists in the `assets/html/[SUBMISSION NAME]/` directory in this repository's root directory.
To embed it into any page, simply insert the following code anywhere into your page.

```markdown
{% raw %}{% include [FIGURE_NAME].html %}{% endraw %}
```

For example, the following code can be used to generate the figure underneath it.

```python
import pandas as pd
import plotly.express as px

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv')

fig = px.density_mapbox(
    df, lat='Latitude', lon='Longitude', z='Magnitude', radius=10,
    center=dict(lat=0, lon=180), zoom=0, mapbox_style="stamen-terrain")
fig.show()

fig.write_html('./assets/html/2026-04-27-distill-example/plotly_demo_1.html')
```

And then include it with the following:

```html
{% raw %}
<div class="l-page">
  <iframe
    src="{{ 'assets/html/2026-04-27-distill-example/plotly_demo_1.html' | relative_url }}"
    frameborder="0"
    scrolling="no"
    height="600px"
    width="100%"
  ></iframe>
</div>
{% endraw %}
```

Voila!

<div class="l-page">
  <iframe src="{{ 'assets/html/2026-04-27-distill-example/plotly_demo_1.html' | relative_url }}" frameborder='0' scrolling='no' height="600px" width="100%"></iframe>
</div>

## Citations

Citations are then used in the article body with the `<d-cite>` tag.
The key attribute is a reference to the id provided in the bibliography.
The key attribute can take multiple ids, separated by commas.

The citation is presented inline like this: <d-cite key="gregor2015draw"></d-cite> (a number that displays more information on hover).
If you have an appendix, a bibliography is automatically created and populated in it.

Distill chose a numerical inline citation style to improve readability of citation dense articles and because many of the benefits of longer citations are obviated by displaying more information on hover.
However, we consider it good style to mention author last names if you discuss something at length and it fits into the flow well — the authors are human and it’s nice for them to have the community associate them with their work.

---

## Footnotes

Just wrap the text you would like to show up in a footnote in a `<d-footnote>` tag.
The number of the footnote will be automatically generated.<d-footnote>This will become a hoverable footnote.</d-footnote>

---

## Code Blocks

This theme implements a built-in Jekyll feature, the use of Rouge, for syntax highlighting.
It supports more than 100 languages.
This example is in C++.
All you have to do is wrap your code in a liquid tag:

{% raw  %}
{% highlight c++ linenos %} <br/> code code code <br/> {% endhighlight %}
{% endraw %}

The keyword `linenos` triggers display of line numbers. You can try toggling it on or off yourself below:

{% highlight c++ %}

int main(int argc, char const \*argv[])
{
string myString;

    cout << "input a string: ";
    getline(cin, myString);
    int length = myString.length();

    char charArray = new char * [length];

    charArray = myString;
    for(int i = 0; i < length; ++i){
        cout << charArray[i] << " ";
    }

    return 0;

}

{% endhighlight %}

---

## Diagrams

This theme supports generating various diagrams from a text description using [mermaid.js](https://mermaid-js.github.io/mermaid/){:target="\_blank"} directly.
Below, we generate examples of such diagrams using [mermaid](https://mermaid-js.github.io/mermaid/){:target="\_blank"} syntax.

**Note:** To enable mermaid diagrams, you need to add the following to your post's front matter:

```yaml
mermaid:
  enabled: true
  zoomable: true # optional, for zoomable diagrams
```

The diagram below was generated by the following code:


````
```mermaid
sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
```
````

```mermaid
sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
```

---

## Tweets

An example of displaying a tweet:
{% twitter https://twitter.com/rubygems/status/518821243320287232 %}

An example of pulling from a timeline:
{% twitter https://twitter.com/jekyllrb maxwidth=500 limit=3 %}

For more details on using the plugin visit: [jekyll-twitter-plugin](https://github.com/rob-murray/jekyll-twitter-plugin)

---

## Blockquotes

<blockquote>
    We do not grow absolutely, chronologically. We grow sometimes in one dimension, and not in another, unevenly. We grow partially. We are relative. We are mature in one realm, childish in another.
    —Anais Nin
</blockquote>

---

## Layouts

The main text column is referred to as the body.
It is the assumed layout of any direct descendants of the `d-article` element.

<div class="fake-img l-body">
  <p>.l-body</p>
</div>

For images you want to display a little larger, try `.l-page`:

<div class="fake-img l-page">
  <p>.l-page</p>
</div>

All of these have an outset variant if you want to poke out from the body text a little bit.
For instance:

<div class="fake-img l-body-outset">
  <p>.l-body-outset</p>
</div>

<div class="fake-img l-page-outset">
  <p>.l-page-outset</p>
</div>

Occasionally you’ll want to use the full browser width.
For this, use `.l-screen`.
You can also inset the element a little from the edge of the browser by using the inset variant.

<div class="fake-img l-screen">
  <p>.l-screen</p>
</div>
<div class="fake-img l-screen-inset">
  <p>.l-screen-inset</p>
</div>

The final layout is for marginalia, asides, and footnotes.
It does not interrupt the normal flow of `.l-body`-sized text except on mobile screen sizes.

<div class="fake-img l-gutter">
  <p>.l-gutter</p>
</div>

---

## Other Typography?

Emphasis, aka italics, with _asterisks_ (`*asterisks*`) or _underscores_ (`_underscores_`).

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item

- Unordered sub-list.

1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
2. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.
   Note that this line is separate, but within the same paragraph.
   (This is contrary to the typical GFM line break behavior, where trailing spaces are not required.)

- Unordered lists can use asterisks

* Or minuses

- Or pluses

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

Inline `code` has `back-ticks around` it.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print(s)
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $$1600$$ |
| col 2 is      |   centered    |   $$12$$ |
| zebra stripes |   are neat    |    $$1$$ |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.
