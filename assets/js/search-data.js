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
            },{id: "post-the-illusion-of-mastery-breaking-the-cycle-of-benchmark-memorization-with-generative-evaluation",
        
          title: "The illusion of mastery: Breaking the Cycle of Benchmark Memorization with Generative Evaluation...",
        
        description: "Static evaluation traps LLMs in a cycle of overfitting, leading to inflated benchmark scores but fragile real-world performance. This post argues for a paradigm shift to Generative Evaluation, a dynamic engine that creates infinite novel tasks. By targeting unseen reasoning patterns and high-impact corner cases, it moves beyond memorization to genuinely measure and incentivize the generalizable intelligence required for AGI.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/illusion-of-mastery/";
          
        },
      },{id: "post-fans-frequency-adaptive-noise-shaping-for-diffusion-models",
        
          title: "FANS - Frequency-Adaptive Noise Shaping for Diffusion Models",
        
        description: "Diffusion models have achieved remarkable success in generative modeling, yet they often struggle with spectral bias,the tendency to prioritize low-frequency patterns while inadequately learning high-frequency details. This limitation stems from the uniform noise scheduling employed during training, which allocates equal denoising capacity across all frequencies regardless of the dataset&#39;s spectral characteristics. We introduce Frequency-Adaptive Noise Shaping (FANS), a principled framework that addresses this fundamental limitation by dynamically shaping noise distributions according to dataset-specific frequency importance. FANS operates on a simple insight - different datasets exhibit distinct spectral signatures, and noise scheduling should reflect these differences. The framework integrates seamlessly with existing diffusion architectures through a simple modification to the noise sampling procedure during training and inference.We validate FANS on synthetic datasets with controlled spectral properties as well as real world data (CIFAR10, CelebA, Texture, MultimodalUniverse) where we demonstrate consistent improvements over vanilla DDPM baselines. Our experiments reveal that FANS particularly excels on high-frequency-rich datasets, producing sharper, more detailed samples while maintaining comparable performance for standard natural image datasets like CIFAR10 and CelebA.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/fans/";
          
        },
      },{id: "post-visual-reversal-curse-from-general-domain-to-remote-sensing-images",
        
          title: "Visual Reversal Curse: From General Domain to Remote Sensing Images",
        
        description: "The &#39;Reversal Curse&#39; highlights a fundamental limitation in AI: models often fail to infer inverse relationships. This post investigates whether this curse extends to Vision Foundation Models and proposes remote sensing image translation as the optimal testbed for evaluating bidirectional visual generalization.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/visual-reversal-curse-from-general-domain-to-remote-sensing-images/";
          
        },
      },{id: "post-text-as-image-a-visual-encoding-approach-for-long-context-understanding",
        
          title: "Text-as-Image, A Visual Encoding Approach for Long-Context Understanding",
        
        description: "Humans process text through visual perception much like viewing images or videos, but current AI systems typically use different encoders and processing pipelines when handling different modalities. In this blog post, we investigate recent works that attempt a human-inspired paradigm for processing texts that is converting textual contexts into images and subsequently using visual language models (VLMs) to process them. We start by explaining technical implementations of such conversions and their strengths. We then perform evaluation on long context understanding benchmarks that are more challenging than those used in prior works, with the objective to better analyze how these methods work or fail. Finally, we implement several improvements to existing approaches, including refined conversion techniques and context preprocessing strategies before conversion to images, observing their impacts on task performance to derive insights on future research directions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/visual-long-context/";
          
        },
      },{id: "post-using-large-language-models-to-simulate-and-predict-human-decision-making",
        
          title: "Using Large Language Models to Simulate and Predict Human Decision-Making",
        
        description: "We explore how large language models can be used to predict human decisions in language-based persuasion games, comparing direct prompting, LLM-based data generation, and hybrid methods that mix synthetic and human data.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/using-large-language-models-to-simulate-and-predict-human-decision-making/";
          
        },
      },{id: "post-what-and-what-not-are-calibrated-uncertainties-actually-useful-for",
        
          title: "What (and What Not) are Calibrated Uncertainties Actually Useful for?",
        
        description: "This blogpost clarifies the practical usefulness of having a model with calibrated probabilities, something that is not often clearly stated in the calibration literature. We show that a calibrated model can be relied on to estimate average loss/reward, however, good calibration does not mean that a model is useful for per-sample decision making.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/useful-calibrated-uncertainties/";
          
        },
      },{id: "post-is-your-algorithm-unlearning-or-untraining",
        
          title: "Is your algorithm Unlearning or Untraining?",
        
        description: "Machine unlearning aims to post-process a trained model in order to remove the influence of specific training examples or higher-level knowledge. We argue that the term unlearning is overloaded, with different use cases belonging to distinct problem formulations. This issue causes confusion in the community: it is often unclear what the goals of different proposed methods are, when they are expected to work, how they should be evaluated, and what baselines they should be compared against. To address this, we establish a fundamental distinction between two notions that we identify as Unlearning and Untraining, aiming to guide the field towards disambiguating technical definitions, to unlock more progress in clarifying goals, designing evaluation metrics for each, and ultimately better algorithms.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/unlearning-or-untraining/";
          
        },
      },{id: "post-unigramlm-an-attempt-at-writing-the-missing-manual",
        
          title: "UnigramLM - An Attempt at Writing the Missing Manual",
        
        description: "This post is my attempt to write down the UnigramLM tokenization algorithm cleanly and explicitly because, well, I still haven&#39;t found such a derivation and I think understanding the theory behind the method could help us make it better. I&#39;ll formalize the generative model around which the algorithm is based, derive the EM updates, explain why pruning is needed (and how it&#39;s done), and point out the spots where the practical implementation defined by the SentencePiece library diverges from the pretty mathematical models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/unigramlm-manual/";
          
        },
      },{id: "post-tracing-the-principles-behind-modern-diffusion-models",
        
          title: "Tracing the Principles Behind Modern Diffusion Models",
        
        description: "Diffusion models can feel like a jungle of acronyms, but the core idea is simple: start from noise and gradually move a cloud of samples until it looks like real data. This post gives an intuition-first tour showing that DDPMs, score-based models, and flow matching are the same recipe with different prediction targets, all rooted in the change-of-variable rule from calculus and powered by one shared “conditional trick” that turns learning into supervised regression. Finally, we zoom out to the speed problem and show how flow map models aim to replace many tiny denoising steps with a few big, accurate jumps toward real-time generation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/tracing-principles-behind-modern-diffusion-models/";
          
        },
      },{id: "post-from-dense-monoliths-to-modular-minds-the-rise-of-symbolic-routing-in-llms",
        
          title: "From Dense Monoliths to Modular Minds: The Rise of Symbolic Routing in LLMs...",
        
        description: "The history of Artificial Intelligence (AI) has largely been defined by a dichotomy: the flexible, probabilistic learning of Connectionism versus the rigorous, compositional logic of Symbolism. However, the emergence of Large Language Models (LLMs) is fostering a synthesis of these paradigms through a fundamental architectural shift: the move from Dense Monoliths to Modular, Routed Systems. This shift is fractal. At the Macro level, LLMs function as central planners, using symbolic protocols to orchestrate external tools and specialized neural agents. Simultaneously, at the Micro level, the models themselves are evolving into sparse, modular structures (such as Mixture-of-Experts) governed by internal routing mechanisms. In this post, we explore this transition toward Symbolic Routing. We discuss how this paradigm enables us to build societies of neural agents, discover latent modularity within dense networks, thus enabling composable, verifiable, interpretable and continually learnable AI system. And we also discuss how to leverage these structures to synthesize training data and formally verify AI reasoning.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/symbolic-connect/";
          
        },
      },{id: "post-speeding-up-training-of-model-free-reinforcement-learning-a-comparative-evaluation-for-fast-and-accurate-learning",
        
          title: "Speeding up Training of Model-Free Reinforcement Learning :A Comparative Evaluation for Fast and...",
        
        description: "Reinforcement Learning (RL) represents a powerful framework for solving sequential decision-making problems in dynamic environments across diverse domains, such as control of robots or optimization of profit. However, its practical implementation requires navigating a variety of software packages, encompassing deep learning libraries (e.g., TensorFlow, PyTorch, JAX/Flax), environment frameworks (e.g., Gymnasium, Numpy), and hyperparameter optimization techniques and libraries. This post critically evaluates the common PyTorch, Gymnasium, and NumPy RL stack by comparing it to a faster alternative:JAX/Flax for both of model training and environment simulation. A Gridworld example evaluating both training speed and accuracy is utilized to test each of these packages. Additionally, we complement our example by a comprehensive tracking and monitoring of the training process using MLflow along with a thorough hyperparameters optimization via Optuna. The post concludes with a discussion of the results and final recommendations for optimal use cases of each of these packages.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/speeding-up-rl/";
          
        },
      },{id: "post-sparsity",
        
          title: "Sparsity",
        
        description: "Large Language Models (LLMs) have brought about a significant change in the field of artificial intelligence, where they have transitioned in scope from being specialized research tools to common resources that drive the next generation of software. With increasing model parameters and training data, LLMs demonstrate new abilities in reasoning, code generation, and solving complex problems that were once considered unattainable. However, scaling these models effectively for long-context applications uniquely poses a challenge. This is primarily due to the inherent limitations of the self-attention mechanism, which has space and time complexity O(N^2). This quadratic bottleneck hinders applications for long documents, high-resolution images, and large codebases, among others. However, what is interesting to observe is that effectively only a few parameters are used when outputting a token, and most calculations are sparse. Hence, Sparsity emerges as an effective solution to this problem. Rather than relying on the N x N attention matrix, one can utilize an approximate or “sparse” version of attention to achieve almost the same results much faster. The backbone of this approach is the idea that tokens do not require the entire context; they only need local context, and thus, most of the computation carried out is wasteful. In this blog, we analyze the types of attention patterns that emerge and how to use them to our advantage for faster and efficient LLMs.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/sparsity/";
          
        },
      },{id: "post-using-graph-neural-networks-in-reinforcement-learning-a-practical-guide",
        
          title: "Using Graph Neural Networks in Reinforcement Learning: A Practical Guide",
        
        description: "Graph Neural Networks (GNNs) have achieved excellent results for modelling relational data in many supervised learning domains. However, much fewer works have explored their potential in Reinforcement Learning (RL) despite the ubiquity of practical problems defined over graphs. In this blog post, we discuss how GNNs can be effectively integrated in Deep RL frameworks, covering crucial design decisions and practical implementation concerns. In doing so, we hope to facilitate unlocking new capabilities for RL agents to reason in graph-structured environments with dynamic action spaces and varying input sizes.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/rl-with-gnns/";
          
        },
      },{id: "post-rethinking-the-diffusion-model-from-a-langevin-perspective",
        
          title: "Rethinking the Diffusion Model from a Langevin Perspective",
        
        description: "Diffusion models are often introduced from multiple perspectives—such as VAEs, score matching, or flow matching—accompanied by dense and technically demanding mathematics that can be difficult for beginners to grasp. This article offers a fresh Langevin perspective on diffusion models to lower the technical barrier, aiming to present diffusion models in a simpler, clearer, and more intuitive way while addressing the following questions 1. How does the reverse process invert the forward process to generate data from pure noise? 2. How can ODE-based and SDE-based diffusion models be unified under a single framework? 3. Why are diffusion models theoretically superior to ordinary VAEs? 4. How can Denoising, Score Matching, and Flow Matching training objectives be unified and derived from first principles? We demonstrate that the Langevin perspective offers clear and straightforward answers to these questions, providing pedagogical value for both learners and experienced researchers seeking deeper intuition.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/rethinking-diffusion-Langevin/";
          
        },
      },{id: "post-performative-prediction-made-practical",
        
          title: "Performative Prediction made practical",
        
        description: "Performative Prediction studies settings where deploying a model induces a distribution shift in the data with the aim of building robust and good-peforming models under these post-deployment effects. Most existing work in this area is theoretical and relies on strict assumptions to converge to those models, which makes the resulting techniques difficult to apply in practice and limits their accessibility to the broader Machine Learning (ML) community. In this blog post, we use visualization techniques 1) to provide an intuitive explanation of Performative Prediction and 2) to extract practical insights for studying convergence when theoretical assumptions do not hold.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/performative-prediction/";
          
        },
      },{id: "post-misalignments-and-rl-failure-modes-in-the-early-stage-of-superintelligence",
        
          title: "Misalignments and RL Failure Modes in the Early Stage of Superintelligence",
        
        description: "With the rapid ability grokking of frontier Large Models (LMs), there is growing attention and research focus on aligning them with human values and intent via large scale reinforcement learning and other techniques. However, as LMs are getting stronger and more agentic, their misalignment and deceptive behaviors are also emerging and becoming increasingly difficult for humans to pre-detect and keep track of. This blog post discusses current misalignment patterns, deceptive behaviors, RL failure modes, and emergent traits in modern large models to further AI safety discussions and advance the development of mitigation strategies for LM misbehaviors.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/misalign-failure-mode/";
          
        },
      },{id: "post-generative-ai-archaeology",
        
          title: "Generative AI Archaeology",
        
        description: "We document the rise of the Generative AI Archaeologist, whose tools include linear algebra and probability theory, jailbreaking, and debuggers, compared to the metal detectors, pickaxes, and radar surveys of traditional archaeology. GenAI Archaeologists have reported findings both through luck by observing unexpected behaviour in publicly accessible models, and by exploiting the mathematical properties of models. In this blog, we survey five types of findings unearthed by GenAI Archaeologists and discuss the status of those findings.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/genai-archaeology/";
          
        },
      },{id: "post-from-trajectories-to-operators-a-unified-flow-map-perspective-on-generative-modeling",
        
          title: "From Trajectories to Operators — A Unified Flow Map Perspective on Generative Modeling...",
        
        description: "In this post, we reframe continuous-time generative modeling from integrating trajectories to learning two-time operators (flow maps). This operator view unifies diffusion, flow matching, and consistency models, and suggests a practical diagnostic — semigroup-consistent jumps yield both step-robust generation and low compositional drift. We derive Eulerian/Lagrangian distillation objectives and use inpainting experiments to show why semigroup-consistent jumps can be both step-robust and composition-stable.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/flow-map-learning/";
          
        },
      },{id: "post-understanding-and-fixing-bottlenecks-in-state-space-models-what-recency-and-over-smoothing-tell-us",
        
          title: "Understanding and Fixing Bottlenecks in State Space Models: What Recency and Over-Smoothing Tell...",
        
        description: "This work analyzes how recency bias and hidden-state over-smoothing emerge in modern State Space Models, revealing the bottlenecks that limit their ability to capture long-range dependencies.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/fixing-bottlenecks-in-state-space-models/";
          
        },
      },{id: "post-the-effect-of-feature-resolution-on-embedding-dimension",
        
          title: "The effect of feature resolution on embedding dimension",
        
        description: "High-dimensional data can be compressed into lower-dimensional embeddings while retaining a relatively large amount of relevant information, a phenomenon which, despite its widespread use, we struggle to fully explain. In this post, we use a common property of datasets - a limit on the number of features per data point - to show how a slight uniform dependence between features can be exploited to reduce the required dimensions by at least a third, while sacrificing no information about the features. To do so, we introduce the concepts of dataset resolution and feature composition of a dataset, and analyse how a set of orderings of the dataset affect the types of partitions we can create of the dataset.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/feature-reduction/";
          
        },
      },{id: "post-elastic-weight-consolidation-ewc-nuts-and-bolts",
        
          title: "Elastic Weight Consolidation (EWC): Nuts and Bolts",
        
        description: "A theoretical deep-dive into the Elastic Weight Consolidation method for continual learning, explaining the mathematical foundations and intuitions behind this influential approach to preventing catastrophic forgetting.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/elastic-weight-consolidation-nuts-bolts/";
          
        },
      },{id: "post-sample-blog-post",
        
          title: "Sample Blog Post",
        
        description: "Your blog post&#39;s abstract. Please add your abstract or summary here and not in the main body of your text. Do not include math/latex or hyperlinks.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/distill-example/";
          
        },
      },{id: "post-why-machines-can-39-t-make-up-their-mind-exploring-a-psychological-perspective-towards-llm-failures",
        
          title: "Why Machines Can&#39;t Make Up Their Mind? - Exploring a Psychological Perspective towards...",
        
        description: "We explore a unifying framework for LLM failures, including hallucinations, sycophancy, multi-hop reasoning breakdowns, and internal contradictions. We interpret these issues as energy minimization in areas with conflicting meaning. This perspective connects cognitive dissonance from psychology to the geometry of neural networks.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/dissonant-machine/";
          
        },
      },{id: "post-discretisation-invariance",
        
          title: "Discretisation invariance",
        
        description: "We are going to talk about discretisation invariance - a recent innovation in scientific machine learning. Discretisation invariance is a requirement that ensures the architecture can process inputs of different resolutions. We will formally define this property, provide examples, generate datasets, train architectures, and discuss whether discretisation invariance is living up to its promise.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/discretisation-invariance/";
          
        },
      },{id: "post-navigating-the-manifold-a-geometric-perspective-on-diffusion-based-inverse-problems",
        
          title: "Navigating the Manifold — A Geometric Perspective on Diffusion-Based Inverse Problems",
        
        description: "This blogpost develops a geometric and probabilistic lens on diffusion priors for inverse problems. We show that a wide range of methods mostly instantiate two operator-splitting paradigms, i.e., posterior-guided sampling and clean-space local-MAP optimization. Through manifold diagrams, Tweedie-based animations, and step-by-step derivations, we explain how these paradigms decouple a pretrained diffusion prior from measurement physics, clarify when they approximate full posterior sampling versus MAP estimation, and distill practical design rules for building robust diffusion-based inverse solvers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/diffusion-inverse-problems/";
          
        },
      },{id: "post-from-u-nets-to-dits-the-architectural-evolution-of-text-to-image-diffusion-models-2021-2025",
        
          title: "From U-Nets to DiTs: The Architectural Evolution of Text-to-Image Diffusion Models (2021–2025)",
        
        description: "A comprehensive analysis of how diffusion model architectures evolved from U-Net backbones to Diffusion Transformers, transforming text-to-image generation capabilities.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/diffusion-architecture-evolution/";
          
        },
      },{id: "post-content-promotion-as-a-strategic-game-how-to-design-agentic-publishers-for-the-evolving-search-ecosystem-in-the-genai-era",
        
          title: "Content Promotion as a Strategic Game: How to Design Agentic Publishers for the...",
        
        description: "With the rise of LLMs, publishers now operate in a dual world where traditional search and chat-like systems coexist. We propose a unified, game-theoretic view of this environment and highlight different tools, such as Multi-Agent Reinforcement Learning, that support the development of competitive content-optimization agents.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/content-promotion-agent-design/";
          
        },
      },{id: "post-beyond-the-rerun-why-reproducibility-is-failing-science",
        
          title: "Beyond the Rerun: Why Reproducibility is Failing Science",
        
        description: "Is reproducibility enough? We discuss the current reproducibility crisis and the limitations that focusing solely on this aspect of scientific project quality imposes on science. We propose a broader approach to the problem of scientific debt and outline practical actions researchers can take in their research. We also draw attention to the need for community action on the issue.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/beyond-the-rerun/";
          
        },
      },{id: "post-llm-judges-on-autopilot",
        
          title: "(LLM-)Judges on autopilot",
        
        description: "How do you evaluate Large Language Model (LLM)-based systems in production at scale? Most teams turn to an LLM-as-a-judge: an approach that grasps the nuances of natural language where classical metrics fall short. But these judge models have their own “will”: sometimes they follow instructions precisely, sometimes they don&#39;t. To address this inconsistency, the judge prompt is calibrated to align with known, trusted cases. The problem? Manual calibration is time-consuming and error-prone. In this blog post, we explore auto-calibration techniques inspired by recent prompt-optimization research. We tackle context collapse by iteratively processing data in batches, similarly to a machine learning training pipeline. Along the way, we share some surprising findings about what works and what doesn&#39;t—including cases where simpler approaches outperform more sophisticated ones.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/auto-calibration/";
          
        },
      },{id: "post-a-human-centric-framework-for-debating-the-ethics-of-ai-consciousness-under-uncertainty",
        
          title: "A Human-centric Framework for Debating the Ethics of AI Consciousness Under Uncertainty",
        
        description: "As AI systems become increasingly sophisticated, questions about machine consciousness and its ethical implications have moved from fringe speculation to mainstream academic debate. We address these limitations through a structured three-level framework grounded in philosophical uncertainty.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/blog/2026/a-human-centric-framework-for-debating-the-ethics-of-ai-consciousness-under-uncertainty/";
          
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
