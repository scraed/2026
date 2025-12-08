// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/2026/";
    },
  },{id: "nav-about",
          title: "about",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/2026/about/";
          },
        },{id: "nav-call-for-blogposts",
          title: "call for blogposts",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/2026/call/";
          },
        },{id: "nav-submitting",
          title: "submitting",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/2026/submitting/";
          },
        },{id: "nav-reviewing",
          title: "reviewing",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/2026/reviewing/";
          },
        },{id: "dropdown-lt-strong-gt-2026-lt-strong-gt",
              title: "&lt;strong&gt;2026&lt;/strong&gt;",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://iclr-blogposts.github.io/2026/";
              },
            },{id: "dropdown-2025",
              title: "2025",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://iclr-blogposts.github.io/2025/";
              },
            },{id: "dropdown-2024",
              title: "2024",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://iclr-blogposts.github.io/2024/";
              },
            },{id: "dropdown-2023",
              title: "2023",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://iclr-blogposts.github.io/2023/";
              },
            },{id: "dropdown-2022",
              title: "2022",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://iclr-blog-track.github.io/home/";
              },
            },{id: "post-fairness-audits-as-theater-when-metrics-mask-structural-harm",
        
          title: "Fairness Audits as Theater: When Metrics Mask Structural Harm",
        
        description: "This blog post examines why contemporary fairness audits fail to prevent algorithmic harm, despite growing adoption. We analyze structural limitations and propose substantive alternatives grounded in participatory accountability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/fairness-audits/";
          
        },
      },{id: "post-why-vlms-waste-their-vision",
        
          title: "Why vlms waste their vision",
        
        description: "Despite the robustness of standalone vision encoders, they often collapse to near-chance performance within Vision Language Models (VLMs) by ignoring visual data in favor of language priors. We investigate this paradox by reconciling conflicting theoretical and empirical literature through the lens of attention budgets and information exchange rates. Ultimately, we propose a new mental model that explains why standard multimodal fusion fails and how to restore effective integration.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/why-vlms-waste-their-vision/";
          
        },
      },{id: "post-uncertainty-lifecycle-in-deep-learning",
        
          title: "Uncertainty Lifecycle in Deep Learning",
        
        description: "Uncertainty modeling in deep learning has different attributes such as uncertainty propagation, uncertainty estimation, uncertainty decomposition, uncertainty attribution and uncertainty sensitivity, that are extensively discussed in literature. However, there is no proper structure explaining how these different components interact with each other at different stages of Deep Learning pipeline. We propose to structure the flow and transformation of uncertainty from input to prediction through the model, by appropriately positioning them. And we call this structure as “Uncertainty Lifecycle”. The “Uncertainty lifecycle” can be represented as a structured process for handling, quantifying, analyzing, and interpreting uncertainties at different stages of Deep Learning pipeline.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/uncertainty-lifecycle-in-deep-learning/";
          
        },
      },{id: "post-the-information-shadow-why-there-are-things-llms-can-never-ever-know",
        
          title: "The Information Shadow - Why There Are Things LLMs Can Never, Ever Know...",
        
        description: "This blogpost introduces the idea of the information shadow - the region of reality that large language models can never fully know, no matter their scale or training data. We argue that some truths are fundamentally inaccessible because they cannot be expressed in language, cannot be inferred from observable data, or cannot be reached by gradient-based training dynamics. Through thought experiments and concrete probes, the post shows how representational limits, identifiability barriers, and optimization constraints create predictable blind spots in model behavior. Understanding this shadow is essential for building safer systems, designing better benchmarks, and avoiding misplaced confidence in model outputs. The goal is not to diminish LLMs, but to map the structural edges of their intelligence.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/the-information-shadow/";
          
        },
      },{id: "post-the-evolution-of-flashattention",
        
          title: "The Evolution of FlashAttention",
        
        description: "We present a mathematical &amp; technical overview of FlashAttention and its evolution across versions 1 to 4. We explain why IO-aware design became central to scalable transformers and how these kernels shape modern long-context LLMs as memory patterns and hardware limits shift. We then describe the changes across versions with Triton examples and place these kernels in the context of recent work on efficient attention. We close by outlining principles that can guide the next generation of attention algorithms.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/the-evolution-of-flashattention/";
          
        },
      },{id: "post-the-bottlenecks-to-scaling-foundation-models-for-robotics",
        
          title: "The Bottlenecks to Scaling Foundation Models for Robotics",
        
        description: "Current approaches to building Vision-Language-Action (VLA) models largely rely on combining pre-trained Vision-Language Models (VLMs) with imitation learning. While effective in narrow benchmarks, this paradigm faces fundamental limitations for developing general-purpose robots that operate in complex, dynamic environments. In this article, I first review the standard training recipe and identify key bottlenecks, drawing on both my observations and existing empirical evidence. I then outline a path forward: integrating online reinforcement learning with pre-trained VLMs to enable lightweight, computationally efficient methods that scale with available resources.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/the-bottlenecks-to-scaling-foundation-models-for-robotics/";
          
        },
      },{id: "post-rethinking-the-diffusion-model-from-a-langevin-perspective",
        
          title: "Rethinking the Diffusion Model from a Langevin Perspective",
        
        description: "Diffusion models are often introduced from multiple perspectives—such as VAEs, score matching, or flow matching—accompanied by dense and technically demanding mathematics that can be difficult for beginners to grasp. This article offers a fresh Langevin perspective on diffusion models to lower the technical barrier, aiming to present diffusion models in a simpler, clearer, and more intuitive way while addressing the following questions 1. How does the reverse process invert the forward process to generate data from pure noise? 2. How can ODE-based and SDE-based diffusion models be unified under a single framework? 3. Why are diffusion models theoretically superior to ordinary VAEs? 4. How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles? We demonstrate that the Langevin perspective offers clear and straightforward answers to these questions, providing pedagogical value for both learners and experienced researchers seeking deeper intuition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/rethinking-diffusion-langevin/";
          
        },
      },{id: "post-faster-svd-via-accelerated-newton-schulz-iteration",
        
          title: "Faster SVD via Accelerated Newton-Schulz Iteration",
        
        description: "Traditional SVD algorithms rely heavily on QR factorizations, which scale poorly on GPUs. We show how the recently proposed Chebyshev-Accelerated Newton-Schulz (CANS) iteration can replace them and produce an SVD routine that is faster across a range of matrix types and precisions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/polar-svd/";
          
        },
      },{id: "post-a-philosophy-of-model-editing-what-does-it-mean-to-change-knowledge-in-a-neural-network",
        
          title: "A Philosophy of Model Editing - What Does It Mean to “Change Knowledge”...",
        
        description: "This blogpost explores what it truly means to change knowledge inside a neural network. Unlike symbolic systems, large language models do not store facts in explicit locations; they implement them through distributed geometric transformations. Editing a model therefore reshapes regions of its activation space, alters relational structures, and sometimes shifts broader behavioral tendencies. We examine how local edits differ from global ones, why forgetting resembles suppression rather than deletion, and how repeated modifications can change a model’s identity. By framing model editing as a philosophical and structural question rather than a purely technical procedure, this piece highlights the need to evaluate edits not only for local correctness but also for their impact on coherence, ontology, and long-term behavior.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/philosophy-of-model-editing/";
          
        },
      },{id: "post-there-is-no-in-timeseries-rethinking-tsfm-through-the-lens-of-invariance",
        
          title: "There is No 🍎 in Timeseries: Rethinking TSFM through the Lens of Invariance...",
        
        description: "Timeseries foundation models (TSFMs) are trained on scrape-everything-on-the-interet paradigm, yet the internet is only semantically complete for text and images, not for timeseries, leading to poor performance. It contains countless texts and images of 🍎, but there is no timeseries that captures the concept of 🍎. This mismatch calls for a different pretraining strategy for timeseries, and we argue that the correct organising principle is invariance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/no-apple/";
          
        },
      },{id: "post-in-context-neurofeedback-can-large-language-models-truly-control-their-internal-representations",
        
          title: "In-Context Neurofeedback: Can Large Language Models Truly Control Their Internal Representations?",
        
        description: "Whether large language models (LLMs) can control their own internal representations matters for understanding machine metacognition and for AI safety. A recent study accepted at NeurIPS 2025 claimed that LLMs can control these internal representations, but this study cannot rule out the possibility that such control relies on superficial mechanisms because the control targets are not privileged. We propose in-context neurofeedback, a method that uses multi-turn conversation to control internal representations while ensuring privileged access requirements, and provide a methodological framework for future investigations into machine metacognition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/neurofeedback/";
          
        },
      },{id: "post-evaluating-machine-learned-inter-atomic-potentials-for-a-practical-simulation-workflow",
        
          title: "Evaluating Machine-Learned Inter-Atomic Potentials for a Practical Simulation Workflow",
        
        description: "MLIPs are a promising new paradigm in atomistic simulation, potentially offering the accuracy of ab-initio methods at the speed of empirical potentials. In this blog post, we give an overview of recent MLIP architectures, followed by an evaluation on a practical CO2 adsorption simulation. We find that as of today these models, though promising, are far from plug-and-play, requiring significant engineering effort to operate within established simulation frameworks, while also failing to produce physically consistent results.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/mlip-practical/";
          
        },
      },{id: "post-learning-to-maximize-rewards-via-reaching-goals",
        
          title: "Learning to Maximize Rewards via Reaching Goals",
        
        description: "Goal-conditioned reinforcement learning learns to reach goals instead of optimizing hand-crafted rewards. Despite its popularity, the community often categorizes goal-conditioned reinforcement learning as a special case of reinforcement learning. In this post, we aim to build a direct conversion from any reward-maximization reinforcement learning problem to a goal-conditioned reinforcement learning problem, and to draw connections with the stochastic shortest path framework. Our conversion provides a new perspective on the reinforcement learning problem: maximizing rewards is equivalent to reaching some goals.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/mdp-to-gcmdp/";
          
        },
      },{id: "post-the-layered-ontology-of-models-resolving-the-epistemological-crisis-of-ai",
        
          title: "The Layered Ontology of Models, Resolving the Epistemological Crisis of AI",
        
        description: "We propose a five-layer model framework and discuss the concepts of Meaning and Truth in the era of large models through two thought experiments.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/layered-ontology-model/";
          
        },
      },{id: "post-how-to-open-the-black-box-amp-58-modern-models-for-mechanistic-interpretability",
        
          title: "How To Open the Black Box&amp;#58 Modern Models for Mechanistic Interpretability",
        
        description: "Understanding how transformers represent and transform internal features is a core challenge in mechanistic interpretability. Traditional tools like attention maps and probing reveal only partial structure, often blurred by polysemanticity and superposition. New model-based methods offer more principled insight&amp;#58 Sparse Autoencoders extract sparse, interpretable features from dense activations; Semi-Nonnegative Matrix Factorization uncovers how neuron groups themselves encode concepts; Cross-Layer Transcoders track how these representations evolve across depth; and Weight-Sparse Transformers encourage inherently modular computation through architectural sparsity. Together, these approaches provide complementary pathways for opening the black box and understanding the circuits that underpin transformer behavior.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/interpret-model/";
          
        },
      },{id: "post-industrial-agent-benchmarking-what-300-real-evaluations-reveal-about-the-limits-of-agentic-ai",
        
          title: "Industrial Agent Benchmarking What 300+ Real Evaluations Reveal About the Limits of Agentic...",
        
        description: "A community-scale evaluation of multi-agent systems using AssetOpsBench and a privacy-preserving Codabench pipeline, exposing real-world failure modes and methodological gaps in industrial AI agent evaluation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/industrial-agent-benchmarking/";
          
        },
      },{id: "post-heuristic-based-ideation-for-guiding-llms-toward-structured-creativity",
        
          title: "Heuristic-Based Ideation for Guiding LLMs Toward Structured Creativity",
        
        description: "Large Language Models (LLMs) hold immense promise for accelerating scientific discovery, yet current LLM-based ideation methods often rely on ad-hoc strategies rather than systematic frameworks. This blog introduces Ideation Heuristics, a systematic approach that formalizes 20 cognitive heuristics that structure how researchers generate new ideas. We show that researchers across disciplines find these heuristics highly useful, and we demonstrate how they can be operationalized through Claude skills.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/ideation-heuristics/";
          
        },
      },{id: "post-in-context-learning-of-representations-can-be-explained-by-induction-circuits",
        
          title: "In-context learning of representations can be explained by induction circuits",
        
        description: "Park et al., 2025 demonstrate that large language models can learn to trace random walks on graphs presented in context, and observe that token representations reorganize to reflect the underlying graph structure. This has been interpreted as evidence that models &#39;flexibly manipulate their representations&#39; to reflect in-context semantics, and that this reorganization enables task performance. We offer a simpler mechanistic explanation. We first observe that task performance can be fully explained by induction circuits (Olsson et al., 2022), and show that ablating the attention heads that comprise these circuits substantially degrades performance. As for the geometric structure, we propose that it could result from previous token heads effectively mixing the representations of graph neighbors together. We show that a single round of such &#39;neighbor mixing&#39; on random embeddings recreates the observed graph correspondence in PCA visualizations. These results suggest that apparent &#39;representation reorganization&#39; may be a byproduct of the model&#39;s induction circuits, rather than a critical strategy useful for in-context learning.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/iclr-induction/";
          
        },
      },{id: "post-when-sota-meets-reality-lessons-from-deploying-nlp-at-a-large-healthcare-organization",
        
          title: "When SOTA Meets Reality: Lessons from Deploying NLP at a Large Healthcare Organization...",
        
        description: "In academia, we optimize for accuracy. In healthcare, we optimize for patient outcomes. This is the story of how a large healthcare organization reduced a multi-year backlog not by using the largest or newest model, but by using the right one.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/healthcare-nlp/";
          
        },
      },{id: "post-ready-for-general-agents-let-39-s-test-it",
        
          title: "Ready For General Agents? Let&#39;s Test It.",
        
        description: "General-purpose agents are emerging, but current evaluation tools cannot yet measure how well they adapt to unfamiliar environments or protocols; we outline the gaps and a path to a protocol-agnostic framework.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/general-agent-evaluation/";
          
        },
      },{id: "post-flow-where-you-want",
        
          title: "Flow Where You Want",
        
        description: "This tutorial demonstrates how to add inference-time controls to pretrained flow-based generative models. Using an unconditional MNIST flow model, we apply classifier guidance and inpainting by adding velocity corrections during sampling. We also explore PnP-Flow, which satisfies constraints through iterative projection rather than velocity correction.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/flow-where-you-want/";
          
        },
      },{id: "post-the-coverage-boundary-why-high-fidelity-primitives-don-39-t-compose",
        
          title: "The Coverage Boundary: Why High-Fidelity Primitives Don&#39;t Compose",
        
        description: "A controlled experiment showing that adversarially trained primitives hit a glass ceiling on compositional generalization, while low-fidelity pedagogical primitives achieve perfect transfer.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/fidelity-trap/";
          
        },
      },{id: "post-approximating-faster-transformers",
        
          title: "Approximating Faster Transformers",
        
        description: "This post offers a comprehensive overview of sketching and sampling algorithms for DistilBERT",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/fastermatrices/";
          
        },
      },{id: "post-endocrine-to-synaptic-learnable-signaling-primitives-for-robust-multi-agent-ai",
        
          title: "Endocrine-to-Synaptic: Learnable Signaling Primitives for Robust Multi-Agent AI",
        
        description: "A bio-inspired multi-agent communication framework that uses five cellular signaling modes, signal amplification cascades, and dynamic network adaptation to achieve scalable, robust, and energy-efficient coordination in large distributed AI systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/endocrine-to-synaptic/";
          
        },
      },{id: "post-sample-blog-post",
        
          title: "Sample Blog Post",
        
        description: "Your blog post&#39;s abstract. Please add your abstract or summary here and not in the main body of your text. Do not include math/latex or hyperlinks.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/distill-example/";
          
        },
      },{id: "post-diffusion-guidance-opportunities-for-physical-sciences",
        
          title: "Diffusion Guidance - Opportunities for Physical Sciences",
        
        description: "Guidance has been a central driver of the success of diffusion models, enabling precise control over the sampling process toward desired target conditions. The most widely used techniques include Classifier Guidance and Classifier-Free Guidance. Recently, however, there has been growing interest in alternative guidance strategies. In this blog post, we review recent progress in training-free diffusion guidance methods and highlight their applications in scientific domains.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/diffusion-guidance/";
          
        },
      },{id: "post-can-coding-agents-be-general-agents",
        
          title: "Can Coding Agents be General Agents?",
        
        description: "As coding agents have seen rapid capability and adoption gains, users are applying them to general tasks beyond software engineering. In this post, we investigate whether coding agents can successfully generalize to end-to-end business process automation. We identify gaps in current evaluations, and conduct a case study to evaluate a coding agent on practical business tasks in an open-core Enterprise Resource Planning system. We find that the agent reliably completes simple tasks but exhibits characteristic failures on complex tasks, suggesting that bridging domain logic and code execution is a key bottleneck to generalizability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/coding-agents/";
          
        },
      },{id: "post-boundlessness-overtaking-benchmarks-the-crisis-of-evaluating-ai-scientists",
        
          title: "Boundlessness Overtaking Benchmarks: The Crisis of Evaluating AI Scientists",
        
        description: "As AI systems begin drafting full research reports, our long-standing evaluation mindset is hitting its limits. We are used to benchmarking models on massive data sets with well-defined, comparable metrics. But modern AI-generated science is now judged on only a small number of long, open-ended research outputs, making traditional notions of generalization hard to verify. In the absence of standard evaluation frameworks, researchers find themselves creating case-specific evaluation criteria. This blog is a wake-up call, a look at how quickly LLM-based scientific agents are outgrowing our inherited evaluation paradigms, and why we must rethink our long-held assumptions to build rigorous and standardized ways of assessing this new form of AI-driven scientific work.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/boundlessness-overtaking-benchmarks/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2025/2026-04-27-hallucination-cs/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/2026/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/2026/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/2026/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/2026/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
