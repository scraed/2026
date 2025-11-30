---
layout: distill
title: Sample Blog Post
description: Your blog post's abstract.
  Please add your abstract or summary here and not in the main body of your text.
  Do not include math/latex or hyperlinks.
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
bibliography: 2026-04-27-distill-example-copy.bib

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


## Citations

Citations are then used in the article body with the `<d-cite>` tag.
The key attribute is a reference to the id provided in the bibliography.
The key attribute can take multiple ids, separated by commas.

The citation is presented inline like this: <d-cite key="gregor2015draw"></d-cite> (a number that displays more information on hover).
If you have an appendix, a bibliography is automatically created and populated in it.

Distill chose a numerical inline citation style to improve readability of citation dense articles and because many of the benefits of longer citations are obviated by displaying more information on hover.
However, we consider it good style to mention author last names if you discuss something at length and it fits into the flow well — the authors are human and it’s nice for them to have the community associate them with their work.
