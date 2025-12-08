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
      },{id: "post-beyond-attention-as-a-graph",
        
          title: "Beyond Attention as a Graph",
        
        description: "We extend a graph-based perspective on attention to higher-order topological structures, exploring 2-simplicial attention and its implications for transformer depth and expressivity.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/beyond-attention-as-graph/";
          
        },
      },{id: "post-attention-sinks-from-the-graph-perspective",
        
          title: "Attention Sinks from the Graph Perspective",
        
        description: "We explore attention sinks in decoder-only transformers through the lens of message passing on graphs, revealing an intrinsic structural bias toward early tokens that may explain this phenomenon.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/attention-sinks-graph-perspective/";
          
        },
      },{id: "post-what-can-you-do-when-you-have-zero-rewards-during-rl",
        
          title: "What Can You Do When You Have Zero Rewards During RL?",
        
        description: "If your base model has zero success rates, performing RL with outcome rewards won&#39;t do anything. What can you do then? 🤔TL;DR: simply adding easy samples to your training dataset can unlock RL training!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/zero-rewards/";
          
        },
      },{id: "post-the-witness-problem-in-multi-agent-cooperation",
        
          title: "The Witness Problem in Multi-Agent Cooperation",
        
        description: "I built cognitive modules for Concordia agents and found that agent intelligence isn&#39;t the bottleneck. Strategic cooperation fails because the observation layer can&#39;t recognize strategic behavior.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/witness-problem/";
          
        },
      },{id: "post-why-ai-evaluations-need-error-bars",
        
          title: "Why AI Evaluations Need Error Bars",
        
        description: "AI evaluations often rely on single-run scores even though models, agents, and judges are inherently stochastic, making many reported differences unstable. This post surveys statistical tools—error bars, reliability measures, Bayesian models—that show and help manage this variance. Overall, it highlights how incorporating established statistical practices can make evaluations more trustworthy and informative.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/why-ai-evaluations-need-error-bars/";
          
        },
      },{id: "post-computer-use-survey-a-visual-survey-of-computer-use-agents",
        
          title: "Computer Use Survey - A Visual Survey of Computer Use Agents",
        
        description: "In recent years, AI systems operating on the web and in computer environments have become a major topic of interest for both academia and industry. The goal of this blog is to provide an interesting and interactive survey of historical and recent works on computer use agents. We define key terms used in the literature, catalogue the expansive list of environments and datasets, discuss the evolution of the methodologies, and assess both today’s landscape and possible paths forward.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/web-agent/";
          
        },
      },{id: "post-trade-offs-in-llm-compute-for-reasoning-intensive-information-retrieval",
        
          title: "Trade-offs in LLM Compute for Reasoning-Intensive Information Retrieval",
        
        description: "Large Language Models have become essential for reasoning-intensive information retrieval, but their computational cost raises a critical question: where should compute be allocated for maximum effectiveness? Using the BRIGHT benchmark and the Gemini 2.5 model family, we systematically evaluate trade-offs across model strength, inference-time thinking depth, and reranking depth. Our controlled experiments reveal the marginal gains of investing compute in query expansion versus reranking, providing practical guidance for optimizing cost-performance in LLM-augmented retrieval pipelines.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/trade-offs-in-llm-compute-for-reasoning-intensive-information-retrieval/";
          
        },
      },{id: "post-the-bottlenecks-to-scaling-foundation-models-for-robotics",
        
          title: "The Bottlenecks to Scaling Foundation Models for Robotics",
        
        description: "Current approaches to building Vision-Language-Action (VLA) models largely rely on combining pre-trained Vision-Language Models (VLMs) with imitation learning. While effective in narrow benchmarks, this paradigm faces fundamental limitations for developing general-purpose robots that operate in complex, dynamic environments. In this article, I first review the standard training recipe and identify key bottlenecks, drawing on both my observations and existing empirical evidence. I then outline a path forward: integrating online reinforcement learning with pre-trained VLMs to enable lightweight, computationally efficient methods that scale with available resources.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/the-bottlenecks-to-scaling-foundation-models-for-robotics/";
          
        },
      },{id: "post-task-complexity-analysis",
        
          title: "Task Complexity Analysis",
        
        description: "We analyzed and compared 3 different sampling strategies to sample 100 questions from MATH 500 and Hendrycks&#39; 4500 (the remaining questions from Hendrycks&#39; math dataset that wasn&#39;t selected for MATH500). We ran the subsets on 13 different small (apparent difficulty (the levels assigned by Hendrycks&#39; creators) than MATH 500 results in a more stable ranking for the low performing models, but the baseline apparent difficulty split is the most stable for the top performing models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/task-complexity-analysis/";
          
        },
      },{id: "post-revisiting-the-nethack-learning-environment",
        
          title: "Revisiting The NetHack Learning Environment",
        
        description: "The NetHack Learning Environment (NLE) was proposed as a challenging benchmark to test an agents abilities to perform complex reasoning over long time horizons in a stochastic, partially-observed, procedurally generated setting. To date, no approach, including those based on reinforcement learning, using large pretrained models, using handcoded symbolic agents, imitating expert trajectories or any hybrid method has achieved significant progress towards completing the game. We take a deeper look into the mechanics and interface of the NLE and show that much of the complexity of NetHack is inaccessible due to constraints on the observation and action spaces. We propose a series of modifications and show that they meaningfully improve performance on the NLE.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/revisiting-the-nle/";
          
        },
      },{id: "post-mimicking-or-reasoning-rethinking-multi-modal-in-context-learning-in-vision-language-models",
        
          title: "Mimicking or Reasoning: Rethinking Multi-Modal In-Context Learning in Vision-Language Models",
        
        description: "Vision-language models (VLMs) are widely assumed to exhibit in-context learning (ICL), a property similar to that of their language-only counterparts. While recent work suggests VLMs can perform multimodal ICL (MM-ICL), studies show they often rely on shallow heuristics such as copying or majority voting, rather than true task understanding. We revisit this assumption by evaluating VLMs under distribution shifts, where support examples come from a dataset different from the query. Surprisingly, performance often degrades with more demonstrations, and models tend to copy answers rather than learn from them. To investigate further, we propose a new MM-ICL with reasoning pipeline that augments each demonstration with a generated rationale alongside the answer. We conduct extensive and comprehensive experiments on both perception- and reasoning-required datasets with open-source VLMs ranging from 3B to 72B and proprietary models such as Gemini 2.0 and 2.5. We conduct controlled studies varying shot count, retrieval method, rationale quality, and distribution. Our results show limited performance sensitivity across these factors, indicating that current VLMs fail to effectively utilize demonstration-level information and thus do not inherit the strong few-shot abilities of large language models (LLMs). We further conduct a mechanistic analysis showing that VLMs exhibit weak prefix matching and lack induction-head-like behavior, which potentially explains the failure of MM-ICL.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/rethinking-mmicl/";
          
        },
      },{id: "post-rethinking-the-diffusion-model-from-a-langevin-perspective",
        
          title: "Rethinking the Diffusion Model from a Langevin Perspective",
        
        description: "Diffusion models are often introduced from multiple perspectives—such as VAEs, score matching, or flow matching—accompanied by dense and technically demanding mathematics that can be difficult for beginners to grasp. This article systematically organizes the diffusion model from a fresh Langevin perspective, aiming to present diffusion models in a simpler, clearer, and more intuitive way while addressing the following questions 1. How does the reverse process invert the forward process to generate data from pure noise? 2. How can ODE-based and SDE-based diffusion models be unified under a single framework? 3. Why are diffusion models theoretically superior to ordinary VAEs? 4. How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles? We demonstrate that the diffusion model offers clear and straightforward answers to these questions, providing pedagogical value for both learners and experienced researchers seeking deeper intuition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/rethinking-diffusion-langevin/";
          
        },
      },{id: "post-extracting-model-precision-from-20-logprobs",
        
          title: "Extracting Model Precision from 20 Logprobs",
        
        description: "We demonstrate that the internal floating-point precision of language models can be inferred from API-exposed logprobs.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/precision-extraction/";
          
        },
      },{id: "post-learning-to-maximize-rewards-via-reaching-goals",
        
          title: "Learning to Maximize Rewards via Reaching Goals",
        
        description: "Goal-conditioned reinforcement learning learns to reach goals instead of optimizing hand-crafted rewards. Despite its popularity, the community often categorizes goal-conditioned reinforcement learning as a special case of reinforcement learning. In this post, we aim to build a direct conversion from any reward-maximization reinforcement learning problem to a goal-conditioned reinforcement learning problem, and to draw connections with the stochastic shortest path framework. Our conversion provides a new perspective on the reinforcement learning problem: maximizing rewards is equivalent to reaching some goals.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/mdp-to-gcmdp/";
          
        },
      },{id: "post-loneliness-as-a-case-study-for-social-reward-misalignment",
        
          title: "Loneliness as a Case Study for Social Reward Misalignment",
        
        description: "The goal of this blogpost is to use loneliness as a clean case study of social proxy-reward misalignment in RL. We introduce a minimal homeostatic environment with loneliness drift and accumulated harm, and show that engagement-optimized agents learn short-term “social snack” policies that reduce the error signal without improving the underlying social state. This simple testbed highlights why reward inference or well-being objectives may be a better foundation than engagement proxies for socially aligned AI.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/loneliness-social-misalignment/";
          
        },
      },{id: "post-a-small-observation-on-schulman-39-s-kl-divergence-estimator",
        
          title: "A small observation on Schulman&#39;s KL divergence estimator",
        
        description: "The unbiased estimator of the Kullback–Leibler divergence introduced by John Schulman has a free parameter. Schulman sets it to one to yield non-negativity. Interestingly, we can prove that this parameter choice coincidentally also approximately minimizes variance",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/kl-estimator/";
          
        },
      },{id: "post-charting-the-depths-interpretability-tools-to-enhance-llm-safety",
        
          title: "Charting the Depths: Interpretability Tools to Enhance LLM Safety",
        
        description: "Motivated by the increasing deployment of LLMs for safety-critical applications, we provide an accessible introduction to a practical suite of interpretability tools useful for understanding LLMs’ behavior during safety-critical decisions. Previous discussions of interpretability are often heavily focused on these methods&#39; technical aspects, rather than giving practical guidance for their immediate use; here, we provide practitioners with an overview of a range of methods for understanding LLM behavior. For each method covered, we highlight what it can and cannot tell us, and how this can help inform deployment decisions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/interp-safety/";
          
        },
      },{id: "post-industrial-agent-benchmarking-what-300-real-evaluations-reveal-about-the-limits-of-agentic-ai",
        
          title: "Industrial Agent Benchmarking - What 300+ Real Evaluations Reveal About the Limits of...",
        
        description: "A community-scale evaluation of multi-agent systems using AssetOpsBench and a privacy-preserving Codabench pipeline, exposing real-world failure modes and methodological gaps in industrial AI agent evaluation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/industrial-agent-benchmarking/";
          
        },
      },{id: "post-ready-for-general-agents-let-39-s-test-it",
        
          title: "Ready For General Agents? Let&#39;s Test It.",
        
        description: "General-purpose agents are emerging, but current evaluation tools cannot yet measure how well they adapt to unfamiliar environments or protocols; we outline the gaps and a path to a protocol-agnostic framework.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/general-agent-evaluation/";
          
        },
      },{id: "post-learning-function-space-maps-a-red-herring",
        
          title: "Learning Function Space Maps: A Red Herring?",
        
        description: "Much interest has been generated in the space of learning function space maps, such as in deep operator networks and neural operators. In this post, we explore whether viewing data in their underlying, infinite-dimensional form offers benefits in the manner professed or whether this is a fad.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/function-space-maps/";
          
        },
      },{id: "post-flow-where-you-want",
        
          title: "Flow Where You Want",
        
        description: "This tutorial demonstrates how to add inference-time controls to pretrained flow-based generative models. Using an unconditional MNIST flow model, we apply classifier guidance and inpainting by adding velocity corrections during sampling. We also explore PnP-Flow, which satisfies constraints through iterative projection rather than velocity correction.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/flow-where-you-want/";
          
        },
      },{id: "post-endocrine-to-synaptic-learnable-signaling-primitives-for-robust-multi-agent-ai",
        
          title: "Endocrine-to-Synaptic: Learnable Signaling Primitives for Robust Multi-Agent AI",
        
        description: "A bio-inspired multi-agent communication framework that uses five cellular signaling modes, signal amplification cascades, and dynamic network adaptation to achieve scalable, robust, and energy-efficient coordination in large distributed AI systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/endocrine-to-synaptic/";
          
        },
      },{id: "post-dynamics-of-forgetting",
        
          title: "Dynamics of Forgetting",
        
        description: "We analyze catastrophic forgetting through spectral decompositions of weights and updates, revealing when optimization refines existing circuits versus builds interfering new ones. Leveraging this, we design spectral techniques that suppress destructive update components while preserving structure.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/dynamics-of-forgetting/";
          
        },
      },{id: "post-sample-blog-post",
        
          title: "Sample Blog Post",
        
        description: "Your blog post&#39;s abstract. Please add your abstract or summary here and not in the main body of your text. Do not include math/latex or hyperlinks.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/distill-example/";
          
        },
      },{id: "post-dissecting-non-determinism-in-large-language-models",
        
          title: "Dissecting Non-Determinism in Large Language Models",
        
        description: "The Large Language Models (LLMs) evolve into the backbone of complex decision-making systems, their inherent non-deterministic nature poses a significant threat to the validity of experimental results. This blog explores the impact of stochasticity, prompt brittleness, and LLM-as-a-Judge during both response generation and evaluation. We conclude that understanding these dynamics is essential to prevent misleading conclusions, advocating for consistency oriented practices that treat non-determinism as a critical variable in rigorous experimentation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/dissecting-non-determinism/";
          
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
      },{id: "post-hypes-and-hopes-for-causal-inference-for-brain-dynamics",
        
          title: "Hypes and Hopes for Causal Inference for Brain Dynamics",
        
        description: "We study whether modern identifiability-based nonlinear ICA methods, in particular Time-Contrastive Learning (TCL), can recover meaningful sources from realistic scalp-level brain recordings such as EEG. Using simulated data, EEG sensor data, and source-reconstructed cortical activity, we evaluate whether TCL provides representations aligned with the underlying sources.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/causal-ts/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2025/2026-04-27-sampler-eval-trilemma/";
          
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
