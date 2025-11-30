---
layout: distill
title: Rethinking the Diffusion Model from a Langevin Perspective bbb
description: >
  Diffusion models are often introduced from multiple perspectives—such as VAEs, score matching, or flow matching—accompanied by dense and technically demanding mathematics that can be difficult for beginners to grasp. This article offers a fresh Langevin perspective on diffusion models to lower the technical barrier, aiming to present diffusion models in a simpler, clearer, and more intuitive way while addressing the following questions:
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

Modern diffusion models are built upon two fundamental processes: the forward process, which gradually corrupts data with noise during training, and the reverse process, which generates data by sampling from noise. The development of diffusion models has diverged into several valuable perspectives, illuminating different aspects of these processes. Most interpretations fall into three main frameworks: the Variational Autoencoder (VAE) perspective, the score-based perspective, and the flow-based perspective. Although there are many tutorials available, learning the core theory of diffusion models remains challenging for beginners due to mathematically dense derivations and fragmented intuitions scattered across these different perspectives. 

The VAE perspective interprets the forward and reverse diffusion processes as an encoder and decoder, respectively, and uses the Evidence Lower Bound (ELBO) as the training objective <d-cite key="Luo2022UnderstandingDM"></d-cite><d-cite key="Ho2020DenoisingDP"></d-cite>. While this approach is intuitive and familiar to those with a background in VAEs, treating the diffusion model as a VAE makes the derivation of the reverse process tedious and obscures the reasons why the diffusion process makes diffusion models superior to ordinary VAEs.

The score-based perspective <d-cite key="Song2020ScoreBasedGM"></d-cite> places a clearer emphasis on the paired relationship between the forward and reverse processes, which makes diffusion models superior. It typically introduces the forward process first, and then presents the reverse process by referencing Anderson (1982) <d-cite key="Anderson1982ReversetimeDE"></d-cite>. However, fully understanding the reverse process in this framework requires familiarity with advanced concepts such as the Kolmogorov backward equations and the continuity equation, which makes this approach less accessible. Additionally, the score matching objective is specifically tailored for score models, making it less straightforward to generalize to other approaches such as flow matching models.

A third valuable viewpoint is the flow-based perspective <d-cite key="liu2022flow"></d-cite>, which has rapidly gained popularity in modern diffusion models. Although this approach is theoretically equivalent to both the VAE and score-based frameworks <d-cite key="gao2025diffusion"></d-cite>, it distinguishes itself by highlighting a clear and intuitive straight-line interpolation between data and noise. This conceptual clarity makes the flow-based perspective accessible and attractive. However, its simplicity can be misleading: it can give the impression that it is a fundamentally simpler model rather than an equivalent reformulation of other perspectives.

In this article, we aim to present a perspective that is both mathematically simple and intuitively clear: the Langevin perspective. This approach, relying only on fundamental techniques from stochastic differential equations (SDEs), provides a straightforward derivation of the reverse processes as well as a unified, first-principle derivation of the denoising, score matching, and flow matching objectives.

The central insight of the Langevin perspective is captured by the following triangular relationship:

<div class="row mt-3">
    <div class="col-md-12 col-lg-10 offset-lg-1 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/2026-04-27-rethinking-diffusion-Langevin/forward-reverse-langevin.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

which illustrates that the forward and reverse diffusion steps are a split of a step of Langevin dynamics.

