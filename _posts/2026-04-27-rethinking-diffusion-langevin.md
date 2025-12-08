---
layout: distill
title: Rethinking the Diffusion Model from a Langevin Perspective
description:
  Diffusion models are often introduced from multiple perspectives—such as VAEs, score matching, or flow matching—accompanied by dense and technically demanding mathematics that can be difficult for beginners to grasp. This article offers a fresh Langevin perspective on diffusion models to lower the technical barrier, aiming to present diffusion models in a simpler, clearer, and more intuitive way while addressing the following questions
  1. How does the reverse process invert the forward process to generate data from pure noise? 
  2. How can ODE-based and SDE-based diffusion models be unified under a single framework? 
  3. Why are diffusion models theoretically superior to ordinary VAEs? 
  4. How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles? 
  We demonstrate that the Langevin perspective offers clear and straightforward answers to these questions, providing pedagogical value for both learners and experienced researchers seeking deeper intuition.
date: 2026-04-27
future: true
htmlwidgets: true
hidden: true

# Mermaid diagrams
mermaid:
  enabled: true
  zoomable: true

# Anonymize when submitting
authors:
  - name: Anonymous



# must be the exact same name as your blogpost
bibliography: 2026-04-27-rethinking-diffusion-langevin.bib

# Add a table of contents to your post.
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - please use this format rather than manually creating a markdown table of contents.
toc:
  - name: Langevin Dynamics as 'Identity' Operation
  - name: Spliting the Identity into Forward and Reverse Processes
  - name: The Forward Diffusion Process for training
  - name: The Reverse Diffusion Process for Sampling
    subsections:
      - name: "How does the reverse process invert the forward process to generate data from pure noise?"
      - name: "How can ODE-based and SDE-based diffusion models be unified under a single framework?"
  - name: Forward-Reverse Duality
    subsections:
      - name: "Why are diffusion models theoretically superior to ordinary VAEs"
  - name: Maximal likelihood Training of Diffusion Models
    subsections:
      - name: "How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles?"
  - name: Conclusion

# Below is an example of injecting additional post-specific styles.
# This is used in the 'Layouts' section of this post.
# If you use this post as a template, delete this _styles block.
_styles: >
  /* Highlight Box for Key Insights */
  .insight-box {
    background-color: rgba(0, 0, 0, 0.03);
    border-left: 4px solid var(--global-theme-color);
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  }
  .insight-box strong {
    color: var(--global-theme-color);
  }

  /* Table Styling */
  .table-wrapper {
    overflow-x: auto;
    max-width: 100%;
    margin: 2.5rem 0;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    border: 1px solid var(--global-divider-color);
    background: var(--global-card-bg-color);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0; /* Controlled by wrapper */
    font-size: 0.95rem;
    background: var(--global-card-bg-color);
  }
  th {
    background-color: rgba(var(--global-theme-color-rgb), 0.1);
    color: var(--global-theme-color);
    font-weight: 700;
    padding: 16px 20px;
    text-align: left;
    border-bottom: 2px solid rgba(var(--global-theme-color-rgb), 0.2);
    font-size: 0.85rem;
    letter-spacing: 0.05em;
  }
  td {
    padding: 14px 20px;
    border-bottom: 1px solid var(--global-divider-color);
    vertical-align: middle;
    color: var(--global-text-color);
  }
  tr:nth-child(even) {
    background-color: rgba(var(--global-theme-color-rgb), 0.04);
  }
  tr:last-child td {
    border-bottom: none;
  }
  tr:hover td {
    background-color: rgba(var(--global-theme-color-rgb), 0.10);
    transition: background-color 0.2s ease;
  }

  /* Details / Accordion Styling */
  details {
    background-color: var(--global-card-bg-color) !important;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    padding: 0; /* Padding moved to children */
    margin: 1.5rem 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    transition: all 0.2s ease;
  }
  details[open] {
    border-color: var(--global-theme-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  details > summary {
    cursor: pointer;
    font-weight: 300;
    padding: 1rem;
    list-style: none;
    background-color: transparent;
    color: var(--global-text-color-light);
    border-bottom: 1px solid transparent;
    transition: background 0.2s, color 0.2s;
    border-radius: 8px;
  }
  details[open] > summary {
    border-bottom: 1px solid var(--global-divider-color);
    border-radius: 8px 8px 0 0;
    background-color: rgba(var(--global-theme-color-rgb), 0.05);
    color: var(--global-theme-color);
  }
  details > summary:hover {
    background-color: rgba(var(--global-theme-color-rgb), 0.06);
  }
  /* Wrapper for details content to provide padding */
  details > div.details-content {
    padding: 1.5rem;
    background: var(--global-card-bg-color);
    border-radius: 0 0 8px 8px;
  }

  /* Math Block Enhancements */
  .math-block {
    background: #fcfcfc;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  /* Fake Image (kept from original) */
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }

  /* Dark-mode: invert all images in this article for better contrast */
  html[data-theme="dark"] .post.distill img {
    filter: invert(1) hue-rotate(180deg);
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

  /* Mermaid Fixes */
  .mermaid, svg.mermaid {
    background: transparent !important;
    background-color: transparent !important;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
  .mermaid .node rect,
  .mermaid .node polygon {
    fill: transparent !important;
    stroke: transparent !important;
  }
  .mermaid .edgeLabel rect {
    fill: transparent !important;
    stroke: transparent !important;
  }

  /* Guiding question heading styling */
  .post.distill h4 .guiding-question {
    font-style: italic;
    font-weight: 500;
    color: var(--global-text-color-light);
  }
---

Modern diffusion models are built upon two fundamental processes: the forward process, which gradually corrupts data with noise during training, and the reverse process, which generates data by sampling from noise. The development of diffusion models has diverged into several valuable perspectives, illuminating different aspects of these processes. Most interpretations fall into three main frameworks: the Variational Autoencoder (VAE) perspective, the score-based perspective, and the flow-based perspective. Although there are many tutorials available, learning the core theory of diffusion models remains challenging for beginners due to mathematically dense derivations and fragmented intuitions scattered across these different perspectives. 

The **VAE perspective** treats the forward diffusion process as an encoder that adds noise to the data and the reverse process as a decoder that removes noise, with the Evidence Lower Bound (ELBO) serving as the training objective <d-cite key="Luo2022UnderstandingDM"></d-cite><d-cite key="Ho2020DenoisingDP"></d-cite>. This framework is straightforward for those familiar with VAEs. However, it does not clearly explain why the iterative denoising in diffusion models outperforms the one-step decoding typical of ordinary VAEs.

The **score-based perspective** <d-cite key="Song2020ScoreBasedGM"></d-cite> places a clearer emphasis on the paired relationship between the forward and reverse processes, which makes diffusion models superior. It typically introduces the forward process first, and then presents the reverse process by referencing Anderson (1982) <d-cite key="Anderson1982ReversetimeDE"></d-cite>. However, fully understanding the reverse process in this framework requires familiarity with advanced concepts such as the Kolmogorov backward equations and the continuity equation, which makes this approach less accessible. Additionally, the score matching objective is specifically tailored for score models, making it less straightforward to generalize to other approaches such as flow matching models.

A third valuable viewpoint is the **flow-based perspective** <d-cite key="liu2022flow"></d-cite>, which has rapidly gained popularity in modern diffusion models. Although this approach is theoretically equivalent to both the VAE and score-based frameworks <d-cite key="gao2025diffusion"></d-cite>, it distinguishes itself by highlighting a clear and intuitive straight-line interpolation between data and noise. This conceptual clarity makes the flow-based perspective accessible and attractive. However, its simplicity can be misleading: it can give the impression that it is a fundamentally simpler model rather than an equivalent reformulation of other perspectives.

In this article, we aim to present a perspective that is both mathematically simple and intuitively clear: the Langevin perspective. This approach, relying only on fundamental techniques from stochastic differential equations (SDEs), provides a straightforward derivation of the reverse processes as well as a unified, first-principle derivation of the denoising, score matching, and flow matching objectives.

<div class="insight-box" markdown="1">

**Central Insight:** The Langevin perspective reveals a fundamental triangular relationship:

<div class="row mt-3">
    <div class="col-md-12 col-lg-10 offset-lg-1 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/forward-reverse-langevin.png" class="img-fluid rounded" %}
    </div>
</div>

This illustrates that the forward and reverse diffusion steps are simply a **split** of a single step of Langevin dynamics.

</div>

# Langevin Dynamics as 'Identity' Operation

Langevin dynamics <d-cite key="Langevin1908"></d-cite> is a stochastic process for sampling from a target probability distribution $$p(\mathbf{x})$$. One common form is the SDE:

$$
d\mathbf{x}_t = g(t)\, \mathbf{s}(\mathbf{x}_t) dt + \sqrt{2 g(t)}\, d\mathbf{W}_t, 
$$

where $$s(\mathbf{x}) = \nabla_{\mathbf{x}} \log p(\mathbf{x})$$ is the score function of $$p(\mathbf{x})$$, $g(t)$ is an arbitrary positive function satisfying $s = \int_0^\infty g(t) dt = \infty$. The $d\mathbf{W}$ term is a Brownian noise what can be treated as $\sqrt{dt} \boldsymbol{\epsilon}$, where $\boldsymbol{\epsilon}$ is a standard Gaussian noise. 

This dynamics is often used as a Monte Carlo sampler to draw samples from $$p(\mathbf{x})$$, since $$p(\mathbf{x})$$ is its **stationary distribution**—the distribution that $$\mathbf{x}_t$$ converges to and and remains at as $$t \to \infty$$, regardless of the initial distribution of $$\mathbf{x}_0$$. 




<details markdown="1">
<summary>Optional: Derivation that $p(\mathbf{x})$ is the stationary distribution of Langevin dynamics</summary>
<div class="details-content" markdown="1">

1. Set $g(t) = 1$ by rescaling time as $t' = \int_0^t g(\tau)\, d\tau$. Under this change of variables, the dynamics become $$d\mathbf{x}_{t'} = \mathbf{s}(\mathbf{x}_{t'})\, dt' + \sqrt{2}\, d\mathbf{W}_{t'}$$, which is equivalent to the case $g(t') = 1$. Thus, $g(t)$ only sets the time unit and does not affect the stationary distribution.


2. Write the dynamics in “energy” form as $$d\mathbf{x}_t = -\nabla E(\mathbf{x})\,dt + \sqrt{2}\,d\mathbf{W}_t$$. The random term $d\mathbf{W}_t$ perturbs the system toward equilibrium, where states with the same energy $E(\mathbf{x})$ should have equal probability. Thus, the stationary distribution is $p(\mathbf{x}) = f(E(\mathbf{x}))$ for some function $f$.

3. Consider $N$ independent copies $\mathbf{x}_1, \dots, \mathbf{x}_N$. Their joint density is the product $f(E(\mathbf{x}_1)) \cdots f(E(\mathbf{x}_N))$. When treating them as a single system, the total energy is additive: $E(\mathbf{x}_1, \dots, \mathbf{x}_N) = \sum E(\mathbf{x}_i)$. Therefore, the joint stationary density must also be $g(\sum E(\mathbf{x}_i))$ for some function $g$. The only function $f$ that turns products into additions is the exponential: $f(E) = e^{-\beta E}$. This yields $p(\mathbf{x}) \propto e^{-\beta E(\mathbf{x})}$.

4. To find $\beta$, take $E(\mathbf{x}) = \frac{1}{2} \|\mathbf{x}\|^2$, giving the well known Ornstein–Uhlenbeck process  $d\mathbf{x}_t = -\mathbf{x}\,dt + \sqrt{2}\,d\mathbf{W}_t$ <d-cite key="OrnsteinUhlenbeckWikipedia"></d-cite> with known stationary $\mathcal{N}(0, I)$, density $\propto e^{-\frac{1}{2} \|\mathbf{x}\|^2}$. Matching forms gives $\beta = 1$.

Thus, the dynamics $$d\mathbf{x}_t = -\nabla E(\mathbf{x})\,dt + \sqrt{2}\,d\mathbf{W}_t$$ has stationary distribution $$\propto e^{-E(\mathbf{x})}$$, and $$d\mathbf{x}_t = \nabla_{\mathbf{x}} \log p(\mathbf{x}) \, dt + \sqrt{2} \, d\mathbf{W}_t$$ has stationary distribution $p(\mathbf{x})$. 

</div>
</details>

Langevin dynamics, while widely used for sampling from complex distributions, becomes inefficient in high-dimensional or multi-modal settings due to slow mixing and sensitivity to hyperparameters such as step size and noise scale. However, Langevin dynamics play a crucial role as the foundation of diffusion models due to an important property: for $$p(\mathbf{x})$$, Langevin dynamics act as an "identity" operation on the distribution, transforming a sample from $$p(\mathbf{x})$$ into a new, independent sample from the same distribution.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/langevin_id.png" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    Langevin dynamics acts as an identity operation on $p(\mathbf{x})$: starting from a sample $\mathbf{x} \sim p(\mathbf{x})$, it produces a new sample $\mathbf{x}'$ from the same distribution.
</div>

# Spliting the Identity into Forward and Reverse Processes

One key reason Langevin dynamics struggles in high-dimensional settings is the challenge of initialization. The score function required by it is learned from real data and is therefore reliable only near true data points, while being poorly estimated elsewhere. Yet in generative modeling we need to start from locations that may be far from the data manifold. Finding an initialization that is both realistic and close enough to the true data manifold is difficult, making effective generation with Langevin dynamics challenging in practice. In short, Langevin dynamics is well-suited for generating new samples from an existing one, but ill-suited for generating samples entirely from scratch.

An enhancement to Langevin dynamics is the Annealed Langevin dynamics <d-cite key="song2019generative"></d-cite>. Instead of using a single Langevin sampler, this method involves training a sequence of Langevin dynamics, each corresponding to a different level of noise added to the data. Starting from pure noise, the method gradually reduces the noise level, switching between these samplers at each step. In this way, samples are progressively transformed from random noise into data-like samples, using Langevin dynamics that are effective for each stage of noise contamination. This approach highlights the importance of using multiple noise levels.

Diffusion models take this concept a step further by completely separating the training and inference processes: one process trains the model at different noise levels, while another process samples from noise to generate data.

## The Forward Diffusion Process for training

The forward diffusion process in DDPM generates the necessary training data: clean images and their progressively noised counterparts. In continuous time, a very general way to describe such a process is by an Itô SDE of the form

$$
d \mathbf{x}_t = f(\mathbf{x}_t, t)\, dt + g(t)\, d\mathbf{W}_t, \label{Forward Process}
$$

where $$t \in [0,T]$$ is the forward diffusion time, $$\mathbf{x}_t$$ is the noise-contaminated image at time $$t$$, $$\mathbf{W}_t$$ is a Brownian motion, $$f(\mathbf{x}_t, t)$$ is the drift, and $$g(t)$$ scales the injected noise. Different choices of $$f$$ and $$g$$ correspond to different forward-diffusion parameterizations used in diffusion models.

In practice, diffusion models are usually instantiated by choosing specific parameterizations of this SDE. The most common ones are the **variance-preserving (VP)** process, implemented in DDPMs as an Ornstein–Uhlenbeck dynamics that gently pulls samples toward the origin while injecting noise so that the marginal converges to a standard Gaussian; the **variance-exploding (VE)** process, where there is no restoring drift and the noise scale grows with time so that the variance “explodes”; and **flow-matching** formulations, which view generation as following a time-dependent flow that implements an “straight line” interpolation between data and noise under a carefully designed schedule.

The table below summarizes these three forward processes of different model types, as well as their corresponding SDEs expressed in terms of their respective noise-levels. In what follows, we adopt Karras'<d-cite key="Karras2022Elucidating"></d-cite> notation for the VE parameterization .

<div class="table-wrapper" markdown="1">

| **Model Type** | **Forward SDE** | **Noise-level parameter** | **Relation between initial and noisy variable** |
| --- | --- | --- | --- |
| Variance-preserving (VP) | $$d x_t = - \tfrac{1}{2} x_t\, dt + dW_t$$ | $$\alpha_t = e^{-t}$$ | $$x_t = \sqrt{\alpha_t}\, x_0 + \sqrt{1-\alpha_t}\, \boldsymbol{\epsilon}$$ |
| Variance-exploding-Karras (VE-Karras) | $$dz_{\sigma} = \sqrt{2\sigma}\, dW_{\sigma}$$ | $$\sigma$$ | $$z_\sigma = z_0 + \sigma\, \boldsymbol{\epsilon}$$ |
| Rectified flow | $$dr_{s} = -\frac{r_s}{1-s}\, ds + \sqrt{\frac{2s}{1-s}}\, dW_{s}$$ | $$s$$ | $$r_s = (1-s)\, r_0 + s\, \boldsymbol{\epsilon}$$ |

</div>

Each forward process has a characteristic way of mixing data and noise: The VP model uses the Ornstein–Uhlenbeck (OU) process, blending the data with noise in a geometric (Pythagorean) fashion. The VE-Karras model adds noise directly to the data without a restoring drift, while the Rectified flow model creates a straight-line interpolation between data and noise. Despite their differences, all these SDEs are fundamentally equivalent—they differ only by how time and state are reparameterized. For clarity, the table below shows the transformations between time parameters and state variables for each model:


<div class="table-wrapper" markdown="1">

| **Model Type** | **Time variable** | **Time domain** | **State variable notation** |
| --- | --- | --- | --- |
| Variance-preserving (VP) | $$t$$ | $$[0, T]$$ | $$x_t$$ |
| Variance-exploding-Karras (VE-Karras) | $$\sigma = \sqrt{e^{t} - 1}$$ | $$[0, \Sigma]$$ | $$z_{\sigma(t)} = x_t e^{\frac{t}{2}}$$ |
| Rectified flow | $$s= \dfrac{\sqrt{e^{t} - 1}}{1 + \sqrt{e^{t} - 1}}$$ | $$[0, 1]$$ | $$r_{s(t)} = x_t \dfrac{e^{\frac{t}{2}}}{1 + \sqrt{e^{t} - 1}} $$ |

</div>

No matter which notation we choose, A forward diffusion step with a step size of $$\Delta t$$ acts as adding more noise to data, which is displayed in the following picture:

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/forward.png" class="img-fluid rounded" %}
    </div>
</div>

<div class="caption">
    A forward diffusion step with step size $\Delta t$ adds Gaussian noise to data, pushing samples closer to a Gaussian distribution.
</div>


## The Reverse Diffusion Process for Sampling

The reverse diffusion process is the conjugate of the forward process. While the forward process evolves $p_t(\mathbf{x})$ toward Gaussian noise, the reverse process reverses this evolution, restoring Gaussian noise to $p_t$.

The concept behind the reverse process is intuitive: since Langevin dynamics acts as an identity operation on a distribution—preserving it unchanged—any forward process composed with its corresponding reverse process should similarly yield an Langevin dynamics. Specifically, at any time $t$, combining the forward and reverse processes should reproduce the Langevin dynamics for the distribution $p_t(\mathbf{x})$, as illustrated in the following diagram.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/forward-reverse-langevin.png" class="img-fluid rounded" %}
    </div>
</div>
<div class="caption">
    The forward and reverse diffusion processes compose to reproduce Langevin dynamics.
</div>


To formalize this, consider the VP case with the following Langevin dynamics for $p_t(\mathbf{x})$ with a time variable $\tau$, distinguished from the forward diffusion time $t$. This dynamics can be decomposed into forward and reverse components as follows:  

<div class="table-wrapper" markdown="1">

$$
\begin{split}  
d\mathbf{x}_\tau &= \mathbf{s}(\mathbf{x}_\tau, t) d\tau + \sqrt{2}\, d\mathbf{W}_\tau, \\
&= \underbrace{-\frac{1}{2} \mathbf{x}_\tau d\tau + d\mathbf{W}_\tau^{(1)}}_{\text{Forward}} + \underbrace{ \left( \frac{1}{2} \mathbf{x}_\tau + \mathbf{s}(\mathbf{x}_\tau, t) \right)d\tau + d\mathbf{W}_\tau^{(2)}}_{\text{Reverse} },  
\end{split}  
$$

</div>

where $$\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$$ is the score function of $$p_t(\mathbf{x})$$. Here, we split the noise term $$\sqrt{2}\, d\mathbf{W}_\tau$$ into two independent Gaussian increments, $$d\mathbf{W}_\tau^{(1)}$$ and $$d\mathbf{W}_\tau^{(2)}$$, such that their sum equals the original noise: $$\sqrt{2}\, d\mathbf{W}_\tau = d\mathbf{W}_\tau^{(1)} + d\mathbf{W}_\tau^{(2)}.$$ This split is possible because Gaussian random variables satisfy the property that their sum is Gaussian, and independent Gaussians add in variance; specifically, if $$d\mathbf{W}_\tau^{(1)}$$ and $$d\mathbf{W}_\tau^{(2)}$$ are independent standard Brownian increments (each with variance $d\tau$), their sum has variance $$2\,d\tau$$, matching the original $$\sqrt{2}\,d\mathbf{W}_\tau$$.

This decomposition now lets us directly return to the first guiding question posed in the introduction.

#### <span class="guiding-question">How does the reverse process invert the forward process to generate data from pure noise?</span>

The "Forward" part in this decomposition corresponds to the forward diffusion process, effectively **increasing the forward diffusion time $t$ by $d\tau$**, bringing the distribution to $p_{t + d\tau}(\mathbf{x})$. Since the forward and reverse components combine to form an "identity" operation, the "Reverse" part must reverse the forward process—**decreasing the forward diffusion time $t$ by $d\tau$** and restoring the distribution back to $p_t(\mathbf{x})$.



Now we can read the reverse process according to the reverse part in the equation above, and a reverse diffusion time $t'$ different from the forward diffusion time $t$:

$$
d\mathbf{x}_{t'} = \left( \frac{1}{2} \mathbf{x}_{t'}+ \mathbf{s}(\mathbf{x}_{t'}, t) \right) dt' + d\mathbf{W}_{t'}.
$$

The reverse diffusion process itself is also a standalone SDE that advances the reverse diffusion time $t'$. If $$\mathbf{x}_{t'} \sim q_{t'}(\mathbf{x})$$, then one step of the reverse diffusion process with $dt' = \Delta t'$ brings it to $$\mathbf{x}_{t' + \Delta t'} \sim q_{t' + \Delta t'}(\mathbf{x})$$.

#### How can ODE-based and SDE-based diffusion models be unified under a single framework?

The same decomposition approach can be applied to other diffusion schemes. The following table summarizes how each parameterization relates its Langevin dynamics to its corresponding forward and reverse processes:

<div class="table-wrapper" markdown="1">

| **Model Type** | **Langevin dynamics** | **Forward Split** | **Reverse Split** |
| --- | --- | --- | --- |
| VP-SDE | $$dx = \mathbf{s}_x\, d\tau + \sqrt{2}\, d W_\tau$$ | $$d x = - \tfrac{1}{2} x\, d\tau + dW_\tau$$ | $$dx = \left[ \frac{1}{2} x + \mathbf{s}_x \right] d\tau + dW_{\tau}$$ |
| VP-ODE | $$dx = \frac{1}{2} \mathbf{s}_x\, d\tau + d W_\tau$$ | $$d x = - \tfrac{1}{2} x\, d\tau$$ | $$dx = \frac{1}{2} \left( x + \mathbf{s}_x \right) d\tau$$ |
| VE-Karras | $$dz = \tau\, \mathbf{s}_z\, d\tau + \sqrt{2 \tau}\, d W_\tau$$ | $$dz = \sqrt{2\tau}\, dW_{\tau}$$ |  $$dz = \tau\, \mathbf{s}_z\, d\tau $$ |
| Rectified flow | $$dr = \frac{\tau}{1+\tau} \mathbf{s}_r\, d\tau + \sqrt{\frac{2\tau}{1+\tau}}\, d W_\tau$$  | $$dr = -\frac{r}{1-\tau}\, d\tau + \sqrt{\frac{2\tau}{1-\tau}}\, dW_{\tau}$$  |  $$dr = \frac{\tau\, \mathbf{s}_r + r}{1-\tau} d\tau$$ |

</div>


A key observation from this table is that we present two distinct splittings for the VP model: the SDE and ODE versions. Both are essentially decompositions of different Langevin dynamics, differing only in their time scaling functions $g(\tau)$. The ODE version corresponds to a splitting where the reverse process contains no stochastic term $dW$, effectively eliminating the Brownian noise component. 

Besides the decomposition of Langevin dynamics, we still have one problem: note that the $\mathbf{s}(\mathbf{x}_{t'}, t)$ term in the reverse process still depends on the forward time $t$, not the reverse time $t'$; we need the relationship between the forward time $t$ and the reverse time $t'$ to close the equation. 

Note that a single reverse-time step $dt'$ can be understood in two complementary ways:

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

The above analysis applies not only to SDE reverse processes but also to ODE reverse processes. The following table summarizes the reverse diffusion processes for different model types:

<div class="table-wrapper" markdown="1">

| **Model Type** | **Reverse Time** | **Reverse time domain** | **Reverse Process** | **Relation to Score** |
| --- | --- | --- | --- | --- |
| VP-SDE | $$t' = T - t$$ | $$t' \in [0, T]$$ | $$dx_{t'} = \left[ \frac{1}{2} x_{t'}+ \mathbf{s}(x_{t'}, T-t') \right] dt' + dW_{t'}$$ | $$\mathbf{s}(x, t) = \mathbf{s}_x(x, t)$$  |
| VP-ODE | $$t' = T - t$$ | $$t' \in [0, T]$$ | $$dx_{t'} = \frac{1}{2} \left[ x_{t'} + \mathbf{s} (x_{t'}, T-t') \right] dt' $$ | $$ \mathbf{s}(x, t) = \mathbf{s}_x(x, t)$$  |
| VE-Karras | $$\sigma' = \Sigma - \sigma$$ | $$\sigma' \in [0, \Sigma]$$ | $$dz_{\sigma'} = -\boldsymbol{\epsilon}(z_{\sigma'}, \Sigma-\sigma')d \sigma'$$ | $$\boldsymbol{\epsilon}(z, \sigma) =  -\sigma \mathbf{s}_z(z, \sigma) $$|
| Rectified flow | $$s' = 1 - s$$ | $$s' \in [0, 1]$$ | $$dr_{s'} = -\mathbf{v} (r_{s'}, 1-s') ds'$$ | $$\mathbf{v}(r, s) =  - \frac{s\, \mathbf{s}_r(r,s) + r_{s'}}{1-s} $$ |

</div>




### Forward-Reverse Duality
We have established that a single reverse step undoes a forward step: advancing the reverse time $$t'$$ by an amount corresponds to decreasing the forward time $$t$$ by the same amount. Now, let's examine what happens when we combine multiple forward and reverse steps. Consider this sequence: begin with a data sample $$\mathbf{x}_0$$, propagate it through the forward process to obtain $$\mathbf{x}_T$$, then use $$\mathbf{x}_T$$ as the starting point $$\mathbf{x}_{0'}$$ for the reverse process and evolve it to $$\mathbf{x}_{T'}$$. Part of this forward-reverse cycle is illustrated in the figure below.

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/FastestDiffusionTheory_08.jpg" class="img-fluid rounded diffusion-cycle-figure" %}
    </div>
</div>
<div class="caption">
    Part of a forward–reverse diffusion cycle: the last two steps of the forward process (green arrows, increasing $t$) followed by the first two steps of the reverse process (blue arrows, increasing $t'$ while decreasing $t$).
</div>

The green arrows represent consecutive forward process steps that advance the forward diffusion time $$t$$, while the blue arrows indicate consecutive reverse process steps that advance the reverse diffusion time $$t'$$. 

We examine the relationship between $$\mathbf{x}_{t}$$ in the forward diffusion process and $$\mathbf{x}_{t'=T-t}$$ in the reverse diffusion process. The composition of a forward and a reverse step constitutes a Langevin dynamics step. This allows us to connect $$\mathbf{x}$$ in the forward process with those in the reverse process through Langevin dynamics steps, as illustrated below:

<div class="row mt-3">
    <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-langevin/FastestDiffusionTheory_09.jpg" class="img-fluid rounded" %}
    </div>
</div>

<div class="caption">
    Each horizontal row shows a Langevin dynamics step that maps a forward sample $\mathbf{x}_t$ to a new reverse sample $\mathbf{x}_{(T-t)'}$ from the same probability density.
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



#### Why are diffusion models theoretically superior to ordinary VAEs

The above result means that if we run the reverse process from time $$t' = 0$$ to $$t' = T$$, the final samples follow exactly the same distribution as the original training data $$p_0$$. In other words, the forward and reverse processes form an exact prior–posterior pair: the forward process maps data to noise, and the reverse process maps noise back to data. In practice, training introduces approximation error, but the theoretical target is exact equality. Ordinary VAEs, by contrast, only require the decoder to approximate the encoder’s posterior, with no guarantee of exactness even at the ELBO optimum.

Now we have demonstrated that **reverse diffusion**—the dual of the forward process—can generate image data from noise. However, this requires access to the score function $\mathbf{s}(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x})$ at every timestep $t$. In practice, we approximate this function using a neural network.  In the next section, we will explain how to train such score networks.  

# Maximal likelihood Training of Diffusion Models

Training the reverse diffusion process involves addressing two fundamental questions: (1) What mathematical quantity should we model, and (2) What objective function should guide the training? 

The core mathematical object to model is the **score function**—the gradient of the log-probability density. However, contemporary implementations often parameterize the model to predict alternative quantities such as noise, clean data, or flow velocity. While these different parameterizations are mathematically equivalent (being rescaled versions of the same underlying score function), it is less transparent how the they should be explicitly incorporated into the same training objective.

Our goal is to derive the training objective directly from first principles, beginning with the maximum likelihood framework. By doing so, we reveal the fundamental connection between diffusion model loss and exact maximum likelihood, without presupposing the existence or explicit usage of the score function.


Suppose we have two distributions $p(\mathbf{x}, t)$ and $q(\mathbf{x}, t)$ that both evolve under the same forward diffusion process. Think of $p$ as the **true data distribution** pushed forward by the diffusion dynamics, and $q$ as the **model distribution**. At any fixed time $t$, their Kullback–Leibler (KL) divergence is

$$
\mathrm{KL}\big(p_t \Vert q_t\big)
= \int p(\mathbf{x}, t)\,\log \frac{p(\mathbf{x}, t)}{q(\mathbf{x}, t)}\,d\mathbf{x}.
$$

Maximum likelihood training aims to minimize the KL divergence $\mathrm{KL}(p_0 \Vert q_0)$ at time $t=0$, where $p_0$ is the true data distribution and $q_0$ is the model distribution. However, in diffusion models, we introduce a forward process that evolves distributions over time $t$, and we learn a reverse process that maps from noisy states at different times back to clean data. This temporal structure suggests that rather than focusing solely on the KL divergence at $t=0$, we should consider how this divergence evolves throughout the entire diffusion process. The key insight is to "distribute" the KL minimization objective across all diffusion times by examining the time derivative of $\mathrm{KL}(p_t \Vert q_t)$ along the forward dynamics.

Formally, we can express this idea by rewriting the KL at time $t=0$ as an integral over its time derivative:

$$
\mathrm{KL}\big(p_0 \Vert q_0\big)
= \mathrm{KL}\big(p_0 \Vert q_0\big) - \mathrm{KL}\big(p_\infty \Vert q_\infty\big)
= -\int_0^{\infty}\frac{d}{dt}  \mathrm{KL}\big(p_t \Vert q_t\big)\, dt
$$

where the second equality uses $\mathrm{KL}\big(p_\infty \Vert q_\infty\big) = 0$ at infinitely large time $t$, since both $p$ and $q$ converge to the same Gaussian noise distribution. 

This naturally identifies the **instantaneous contribution** to the likelihood objective at time $t$ as

$$L_t = -\frac{d}{dt}  \mathrm{KL}\big(p_t \Vert q_t\big),$$

so that minimizing $\mathrm{KL}(p_0 \Vert q_0)$ is equivalent to minimizing these contributions $L_t$ on average over diffusion time.


We now show that as long as the forward diffusion process takes the form:

$$
d\mathbf{x} = f(\mathbf{x}, t) \, dt + g(t) \, d\mathbf{W}.
$$

the instantaneous contribution is

$$
\begin{align*}
L_t
  &= \frac{1}{2} g(t)^2
     \int p(\mathbf{x}, t)\,
          \big\|\nabla \log p(\mathbf{x}, t)
                - \nabla \log q(\mathbf{x}, t)\big\|^2
        d\mathbf{x} \\
  &= \frac{1}{2} g(t)^2 \mathbb{E}_{\mathbf{x} \sim p(\mathbf{x}, t)}
            \big\|\nabla \log p(\mathbf{x}, t)
                  - \nabla \log q(\mathbf{x}, t)\big\|^2
\end{align*}
$$


where the score functions $$\nabla \log p(\mathbf{x}, t)$$ and $$\nabla \log q(\mathbf{x}, t)$$ for the true data distribution and the model distribution appear naturally inside the objective.




<details markdown="1">
<summary>Derivation Step 1 (optional): how the forward SDE induces the Fokker–Planck equation for $p_t(\mathbf{x})$</summary>
<div class="details-content" markdown="1">

Given the SDE

$$
d\mathbf{x} = f(\mathbf{x}, t) \, dt + g(t) \, d\mathbf{W},
$$

we first ask: **how does the probabilistic density $p_t(\mathbf{x})$ evolve in time?**  
The answer is the **Fokker–Planck equation**, which describes the time evolution of the probability density $p(\mathbf{x}, t)$ induced by the SDE:

$$
\frac{\partial p}{\partial t}
= -\nabla \cdot \left[f(\mathbf{x}, t)\, p\right]
  + \frac{1}{2}g(t)^2\, \nabla^2  p .
$$

This PDE shows how **drift** $f$ and **diffusion** $g$ jointly shape the distribution. Rigorous derivations can be found in standard references; here we only sketch an intuitive 1D argument for the drift part:

**Drift term $f$.** Start with a 1D motion with **constant velocity** $v$, so $dx = v\,dt$. After time $t$, a particle now at position $x$ must have come from $x - vt$ at time $0$, so

$$
p(x, t) = p(x - vt, 0).
$$

Differentiating this identity w.r.t. $t$ gives the continuity equation

$$
\frac{\partial p}{\partial t}
  + \frac{\partial}{\partial x}\big(v\, p(x, t)\big) = 0,
$$

For a general 1D deterministic dynamics $dx = f(x, t)\,dt$, the same reasoning yields

$$
\frac{\partial p}{\partial t}
  + \frac{\partial}{\partial x}\big(f(x, t)\, p(x, t)\big) = 0.
$$

We keep $f(x, t)$ inside the $\partial_x$ because this term represents the probability flux. This guarantees conservation: integrating the total derivative $\partial_x(f p)$ over all space gives zero (assuming $p$ vanishes at boundaries), preserving the total probability.

**Noise term $g\,dW$.** Consider now the pure diffusion SDE $dx = g\,dW$ with constant $g$ and initial condition $x(0) = 0$. At time $t$, the accumulated Brownian motion from $0$ to $t$ is Gaussian with variance $t$, so $x(t)$ is Gaussian with variance $g^2 t$ and density

$$
p(x, t) = \frac{1}{\sqrt{2\pi g^2 t}} \exp\!\left(-\frac{x^2}{2 g^2 t}\right).
$$

One can check directly that this density satisfies the diffusion equation

$$
\frac{\partial p}{\partial t} - \frac{1}{2} g^2 \frac{\partial^2 p}{\partial x^2} = 0.
$$

Combining drift and diffusion, we obtain that

$$
\frac{\partial p}{\partial t}
  = -\frac{\partial}{\partial x} \left[f(x, t)\, p\right]
    + \frac{1}{2} g(t)^2 \frac{\partial^2 p}{\partial x^2},
$$

which is the 1D specialization of the Fokker–Planck equation stated above.

</div>
</details>


<details markdown="1">
<summary>Derivation Step 2 (optional): why this forward diffusion yields the squared-score objective above</summary>
<div class="details-content" markdown="1">

We now analyze **how the KL divergence between two solutions of the same Fokker–Planck equation evolves in time**.

Assume that both $p(\mathbf{x}, t)$ and $q(\mathbf{x}, t)$ satisfy the same Fokker–Planck equation with drift $f(\mathbf{x}, t)$ and diffusion strength $g(t)$:

$$
\frac{\partial p}{\partial t}
= -\nabla \cdot \big(f p\big)
  + \frac{1}{2} g(t)^2 \nabla^2 p,
\qquad
\frac{\partial q}{\partial t}
= -\nabla \cdot \big(f q\big)
  + \frac{1}{2} g(t)^2 \nabla^2 q.
$$

Define

$$
\mathrm{KL}\big(p_t \Vert q_t\big)
:= \int p(\mathbf{x}, t)\,\log\frac{p(\mathbf{x}, t)}{q(\mathbf{x}, t)}\,d\mathbf{x}.
$$

**Step 1: Differentiate the KL.**  
Differentiating under the integral sign and using $\int \partial_t p\,d\mathbf{x}=0$ (mass conservation), we obtain

$$
\frac{d}{dt}\mathrm{KL}\big(p_t \Vert q_t\big)
= \int \left(\log\frac{p}{q}\right)\partial_t p\,d\mathbf{x}
  - \int \frac{p}{q}\,\partial_t q\,d\mathbf{x}.
$$

Introduce the Fokker–Planck operator

$$
\mathcal{L}u = -\nabla\cdot(fu) + \frac{1}{2}g(t)^2\nabla^2 u,
$$

so that $\partial_t p = \mathcal{L}p$ and $\partial_t q = \mathcal{L}q$. Let $r = p/q$. Then

$$
\frac{d}{dt}\mathrm{KL}\big(p_t \Vert q_t\big)
= \int \log r\,\mathcal{L}p\,d\mathbf{x} - \int r\,\mathcal{L}q\,d\mathbf{x}.
$$

**Step 2: Drift does not change the KL.**  
For the drift operator $-\nabla\cdot(fu)$, integration by parts (with vanishing boundary terms) gives

$$
\int \log r\,\big[-\nabla\cdot(fp)\big]\,d\mathbf{x}
 = \int p\,f\cdot\nabla\log r\,d\mathbf{x},
$$

$$
\int r\,\big[-\nabla\cdot(fq)\big]\,d\mathbf{x}
 = \int q\,f\cdot\nabla r\,d\mathbf{x}.
$$

Using $r = p/q$ and $\nabla\log r = \nabla r / r$, one checks

$$
p\,f\cdot\nabla\log r - q\,f\cdot\nabla r = 0,
$$

so the **drift part cancels exactly** and does not affect $\mathrm{KL}(p_t\Vert q_t)$.

**Step 3: Diffusion decreases the KL.**  
For the diffusion operator $\tfrac{1}{2}g(t)^2\nabla^2 u$, integration by parts yields

$$
\int \log r\cdot\frac{1}{2}g(t)^2\nabla^2 p\,d\mathbf{x}
 = -\frac{1}{2}g(t)^2\int \nabla\log r\cdot\nabla p\,d\mathbf{x},
$$

$$
\int r\cdot\frac{1}{2}g(t)^2\nabla^2 q\,d\mathbf{x}
 = -\frac{1}{2}g(t)^2\int \nabla r\cdot\nabla q\,d\mathbf{x}.
$$

Using

$$
\nabla p = p\,\nabla\log p, \qquad
\nabla q = q\,\nabla\log q,\qquad
\nabla r = \nabla\!\left(\frac{p}{q}\right)
         = r\big(\nabla\log p - \nabla\log q\big),
$$

we obtain

$$
\nabla\log r\cdot\nabla p
= p\big(\nabla\log p - \nabla\log q\big)\cdot\nabla\log p,
$$

$$
\nabla r\cdot\nabla q
= p\big(\nabla\log p - \nabla\log q\big)\cdot\nabla\log q.
$$

Subtracting these contributions gives

$$
-\frac{1}{2}g(t)^2\int \nabla\log r\cdot\nabla p\,d\mathbf{x}
+\frac{1}{2}g(t)^2\int \nabla r\cdot\nabla q\,d\mathbf{x}
= -\frac{1}{2}g(t)^2\int p(\mathbf{x},t)
   \big\|\nabla\log p - \nabla\log q\big\|^2\,d\mathbf{x}.
$$

**Step 4: Conclusion.**  
Putting drift and diffusion together,

$$
\frac{d}{dt}\mathrm{KL}\big(p_t\Vert q_t\big)
= -\frac{1}{2}g(t)^2
   \int p(\mathbf{x},t)\,
        \big\|\nabla\log p(\mathbf{x},t)
              - \nabla\log q(\mathbf{x},t)\big\|^2
      d\mathbf{x}
\;\le 0.
$$

Thus, along the forward diffusion process, the KL divergence between any two solutions of the same Fokker–Planck equation is **non-increasing**: diffusion strictly contracts KL (with equality only if the scores $\nabla\log p$ and $\nabla\log q$ coincide almost everywhere). This monotone decrease of $\mathrm{KL}(p_t \Vert q_t)$ justifies decomposing the global maximum-likelihood objective into local-in-time, squared-score terms associated with each diffusion step.

</div>
</details>

In practice, we approximate the score function $$\nabla \log q(\mathbf{x}, t)$$ using a neural network. For the standard score-based model, we directly model $\mathbf{s}_\theta(\mathbf{x}, t)$. For other formulations like VE-Karras and Rectified flow models, we instead model related functions: $\boldsymbol{\epsilon}$ (noise prediction) or $\mathbf{v}$ (velocity field), which can be transformed to obtain the score.


The only thing remains to handle is the score of the true data distribution $$\nabla \log p(\mathbf{x}, t)$$, which should be approximated by an empirical value from samples since we don't know its value. In fact, we have

$$
\text{argmin}_{\mathbf{s}_\theta}
   \mathbb{E}_{\mathbf{x}_0 \sim p_0}\,
   \mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}
            \big\|\nabla \log p(\mathbf{x}_t | \mathbf{x}_0)
                  - \mathbf{s}_\theta\big\|^2 = \text{argmin}_{\mathbf{s}_\theta}
   \mathbb{E}_{\mathbf{x} \sim p(\mathbf{x}, t)}
            \big\|\nabla \log p(\mathbf{x}, t)
                  - \mathbf{s}_\theta\big\|^2
$$

where the LHS is the denoising score matching (DSM) loss while RHS is the score matching loss.

<details markdown="1">
<summary>Derivation (optional): equivalence between DSM and SM losses</summary>
<div class="details-content" markdown="1">

We now prove that the *denoising score matching* (DSM) loss and the *score matching* (SM) loss at time $t$ have the same minimizer.

**Step 1: Define the two losses.**  
Let us write the *denoising score matching* (DSM) loss at time $t$ as

$$
L_{\text{DSM}}(\mathbf{s}_\theta)
= \mathbb{E}_{\mathbf{x}_0 \sim p_0}\,
   \mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}
   \big\|
      \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t \mid \mathbf{x}_0)
      - \mathbf{s}_\theta(\mathbf{x}_t, t)
   \big\|^2,
$$

and the *score matching* (SM) loss on the marginal $p_t(\mathbf{x}_t)$ as

$$
L_{\text{SM}}(\mathbf{s}_\theta)
= \mathbb{E}_{\mathbf{x}_t \sim p_t}
   \big\|
      \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t)
      - \mathbf{s}_\theta(\mathbf{x}_t, t)
   \big\|^2.
$$

Here $p_t(\mathbf{x}_t) = \int p_t(\mathbf{x}_t \mid \mathbf{x}_0)\,p_0(\mathbf{x}_0)\,d\mathbf{x}_0$ is the marginal of the forward process at time $t$.

**Step 2: Introduce conditional and marginal scores.**  
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

**Step 3: Expand both objectives.**  
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

**Step 4: Match the first and last terms.**  
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
$$\mathbb{E}_{\mathbf{x}_0, \mathbf{x}_t}\|\mathbf{s}(\mathbf{x}_t \mid \mathbf{x}_0)\|^2$$
and
$$\mathbb{E}_{\mathbf{x}_t}\|\mathbf{s}(\mathbf{x}_t, t)\|^2$$,
do **not** depend on $\mathbf{s}_\theta$ at all, so they can only shift the loss by a constant.

**Step 5: Handle the cross term.**  
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

Taking $$f(\mathbf{x}_t)$$ to be each component of $$\mathbf{s}_\theta(\mathbf{x}_t, t)$$ shows that the DSM and SM cross terms are identical:

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

**Conclusion.** Putting everything together, we have

$$
L_{\text{DSM}}(\mathbf{s}_\theta)
= L_{\text{SM}}(\mathbf{s}_\theta) + C,
$$

where $C$ is a constant independent of $\mathbf{s}_\theta$. Hence both objectives are minimized by the same function, namely the true marginal score

$$
\mathbf{s}_\theta^\star(\mathbf{x}_t, t) = \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t).
$$

</div>
</details>



This tells us that training the diffusion model, we only need to figure out the $$\nabla \log p(\mathbf{x}_t \| \mathbf{x}_0)$$, then minimize the loss

$$
L_t= \frac{1}{2} g(t)^2\mathbb{E}_{\mathbf{x}_0 \sim p_0}\,
   \mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}
            \big\|\nabla \log p(\mathbf{x}_t | \mathbf{x}_0)
                  - \mathbf{s}_\theta\big\|^2 
$$

#### How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles?

With the above loss, we can unify training objective for different parameterizations considered in this article:

<div class="table-wrapper" markdown="1">

| **Model Type** | **Relation between initial and noisy variable** | **Function modeled by NN** | **$\mathbf{s}_\theta$ in terms of NN** | **$\nabla \log p(x_t \mid x_0)$** | **Loss $L_t$** |
| --- | --- | --- | --- | --- | --- |
| Variance-preserving (VP) | $$x_t = \sqrt{\alpha_t}\, x_0 + \sqrt{1-\alpha_t}\, \boldsymbol{\epsilon}$$ | $$\mathbf{s}_{\theta}(x_t, t)$$ | $$\mathbf{s}_{\theta}(x_t, t)$$ | $$-\frac{\boldsymbol{\epsilon}}{\sqrt{1-\alpha_t}}$$ | $$\frac{1}{2}\mathbb{E}_{\mathbf{x}_0 \sim p_0}\mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}\|\| -\frac{\boldsymbol{\epsilon}}{\sqrt{1-\alpha_t}} - \mathbf{s}_{\theta}(x_t, t) \|\|^2$$ |
| Variance-exploding-Karras (VE-Karras) | $$z_\sigma = z_0 + \sigma\, \boldsymbol{\epsilon}$$ | $$\boldsymbol{\epsilon}_{\theta}(z_\sigma, \sigma)$$ | $$-\frac{\boldsymbol{\epsilon}_{\theta}(z_\sigma, \sigma)}{\sigma}$$ | $$-\frac{\boldsymbol{\epsilon}}{\sigma}$$ | $$\frac{1}{\sigma}\mathbb{E}_{\mathbf{z}_0 \sim p_0}\mathbb{E}_{\mathbf{z}_\sigma \sim p_\sigma(\cdot \mid \mathbf{z}_0)} \|\| \boldsymbol{\epsilon}_{\theta}(z_\sigma, \sigma) - \boldsymbol{\epsilon} \|\|^2$$ |
| Rectified flow | $$r_s = (1-s)\, r_0 + s\, \boldsymbol{\epsilon}$$ | $$\mathbf{v}_{\theta}(r_s, s)$$ | $$\frac{ -\mathbf{v}_{\theta}(r_s, s) (1-s) - r_s }{s}$$ | $$-\frac{\boldsymbol{\epsilon}}{s}$$ | $$\frac{1-s}{s} \mathbb{E}_{\mathbf{r}_0 \sim p_0}\mathbb{E}_{\mathbf{r}_s \sim p_s(\cdot \mid \mathbf{r}_0)} \|\| \boldsymbol{\epsilon}- r_0 - \mathbf{v}_{\theta}(r_s, s)    \|\|^2$$ |

</div>



The table above shows the loss functions for different diffusion model types. For the VP model, the loss represents score matching that trains the score function. For the VE-Karras model, the loss is a denoising objective with a noise prediction model $\epsilon_\theta$. For the Rectified flow model, the loss is flow matching. These training objectives are now unified under the same maximum likelihood framework, answering the question:


A note on loss weighting: In practice, the coefficient outside the L2 norm (such as $\frac{1}{2}$, $\frac{1}{\sigma}$, or $\frac{1-s}{s}$) is often omitted or replaced with a custom weighting schedule to improve training performance. This is valid because modifying this coefficient only changes the relative importance of the loss across different time steps $t$—it does not affect the optimal solution at any individual time $t$. In other words, reweighting adjusts how much we prioritize learning at different noise levels, but the target (the true score or velocity) remains unchanged.

Combining all results from previous discussion, we summarize the forward, reverse, and loss for each diffusion type:

<div class="table-wrapper" markdown="1">

| **Model Type** | **Forward Process** | **Reverse Process** | **Loss (up to a weight factor)** |
| --- | --- | --- | --- |
| VP-SDE | $$x_t = \sqrt{\alpha_t}\, x_0 + \sqrt{1-\alpha_t}\, \boldsymbol{\epsilon}$$ | $$dx_{t'} = \left[ \frac{1}{2} x_{t'}+ \mathbf{s}(x_{t'}, T-t') \right] dt' + dW_{t'}$$ | $$\mathbb{E}_{\mathbf{x}_0 \sim p_0}\mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}\|\| -\frac{\boldsymbol{\epsilon}}{\sqrt{1-\alpha_t}} - \mathbf{s}_{\theta}(x_t, t) \|\|^2$$ |
| VP-ODE | $$x_t = \sqrt{\alpha_t}\, x_0 + \sqrt{1-\alpha_t}\, \boldsymbol{\epsilon}$$ | $$dx_{t'} = \frac{1}{2} \left[ x_{t'} + \mathbf{s} (x_{t'}, T-t') \right] dt' $$ | $$\mathbb{E}_{\mathbf{x}_0 \sim p_0}\mathbb{E}_{\mathbf{x}_t \sim p_t(\cdot \mid \mathbf{x}_0)}\|\| -\frac{\boldsymbol{\epsilon}}{\sqrt{1-\alpha_t}} - \mathbf{s}_{\theta}(x_t, t) \|\|^2$$ |
| VE-Karras | $$z_\sigma = z_0 + \sigma\, \boldsymbol{\epsilon}$$ | $$dz_{\sigma'} = -\boldsymbol{\epsilon}(z_{\sigma'}, \Sigma-\sigma')d \sigma'$$ | $$\mathbb{E}_{\mathbf{z}_0 \sim p_0}\mathbb{E}_{\mathbf{z}_\sigma \sim p_\sigma(\cdot \mid \mathbf{z}_0)} \|\| \boldsymbol{\epsilon}_{\theta}(z_\sigma, \sigma) - \boldsymbol{\epsilon} \|\|^2$$ |
| Rectified flow | $$r_s = (1-s)\, r_0 + s\, \boldsymbol{\epsilon}$$ | $$dr_{s'} = -\mathbf{v} (r_{s'}, 1-s') ds'$$ | $$ \mathbb{E}_{\mathbf{r}_0 \sim p_0}\mathbb{E}_{\mathbf{r}_s \sim p_s(\cdot \mid \mathbf{r}_0)} \|\| \boldsymbol{\epsilon}- r_0 - \mathbf{v}_{\theta}(r_s, s) \|\|^2$$ |

</div>


For the VE-Karras model, the loss trains the network $\boldsymbol{\epsilon}_\theta$ to directly predict the Gaussian noise $\boldsymbol{\epsilon}$ added to the data; this is often called the epsilon-prediction parameterization. Other choices such as x0-prediction or v-prediction are algebraically equivalent reformulations of the same underlying objective.

For the rectified flow model, observe that with $r_s = (1-s)\, r_0 + s\, \boldsymbol{\epsilon}$ we have $r_1 = \boldsymbol{\epsilon}$, so the loss can be written as

$$
\big\| r_1 - r_0 - \mathbf{v}_{\theta}(r_s, s) \big\|^2 .
$$

If we interpret $r_0$ and $r_1$ as the particle positions at times $s=0$ and $s=1$, then $r_1 - r_0$ is the average velocity over $[0,1]$, which motivates viewing $$\mathbf{v}_\theta$$ as a velocity field and writing the reverse process as $dr = -\mathbf{v}(r,s)\, ds$. This has led to the intuition that rectified flows are trained on simple "straight lines" and are therefore conceptually simpler than general diffusion models. However, $$\mathbf{v}_\theta(r,s)$$ still depends on time $s$, so the velocity changes over time and trajectories are not truly straight in state–time space. Since this velocity is directly related to the score function (as shown in the table), rectified flow is best understood as a particular parameterization of diffusion models rather than a fundamentally simpler class.


### Conclusion

From the Langevin perspective, diffusion models become conceptually simple: the forward and reverse processes are just a carefully chosen split of Langevin dynamics, which itself is an "identity map". This viewpoint simultaneously explains how sampling inverts noising, unifies SDE and ODE formulations as different splittings of the same dynamics, and clarifies why diffusion models implement exact maximum likelihood in a way ordinary VAEs do not. It also shows a simple way to demonstrate that denoising, score matching, and flow matching are not competing “recipes,” but equivalent ways of estimating the same underlying score field that governs Langevin dynamics. We hope this perspective helps demystify diffusion models to learners, so that new variants can be understood not as disconnected tricks, but as different parameterizations and discretizations of a single, coherent Langevin story.
