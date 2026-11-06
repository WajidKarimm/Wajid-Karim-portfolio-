import { Project, Experience, EducationItem, Certification, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: "Wajid Karim",
  title: "AI Engineer",
  tagline: "Specializing in Multi-Agent Systems, LangGraph Orchestration & Enterprise RAG Pipelines",
  email: "Karimwajid0101@gmail.com",
  phone: "03554592544",
  formattedPhone: "+92 355 4592544",
  location: "Gilgit, Pakistan",
  github: "https://github.com/WajidKarimm",
  githubUsername: "WajidKarimm",
  linkedin: "https://www.linkedin.com/in/wajid-karim",
  photoUrl: "/assets/aistudio/WhatsApp_Image_2026-06-22_at_13.59.29_d1170b3e.jpeg",
  resumePdfUrl: "/assets/aistudio/Wajid_d836326b.pdf",
  bio: "AI Engineer with hands-on production experience in multi-agent systems, LLM pipelines, and RAG architectures. Proven ability to build and deploy intelligent systems across healthcare, automation, and analytics domains. Background spanning the complete ML lifecycle—from high-quality data annotation and embedding optimization to model deployment, structured output enforcement, and latency monitoring.",
  summaryBullets: [
    "Production LangGraph multi-agent architectures with stateful SQLite checkpointing and loop prevention",
    "Dual RAG strategies (FaqNode & FaqNodeNoTool) with pgvector semantic retrieval and hybrid re-ranking",
    "Strict schema enforcement via Pydantic and latency/faithfulness observability using MLflow",
    "Full-stack integration using FastAPI, Flask, WebSockets, Docker, and modern React interfaces"
  ]
};

export const METRICS = [
  { label: "Production AI & Agent Systems", value: "6+" },
  { label: "Inference & Reporting Latency Saved", value: "~40%" },
  { label: "Student ML Model Accuracy", value: "82%" },
  { label: "Vector Search & Retrieval", value: "<150ms" }
];

export const PROJECTS: Project[] = [
  {
    id: "multi-agent-supervisor",
    title: "Multi-Agent Supervisor System",
    tagline: "Stateful agent orchestration with adaptive routing, SQLite checkpointing, and execution trace logging",
    category: "agents",
    categoryLabel: "Multi-Agent & LLM",
    date: "2026",
    featured: true,
    description: "A production-grade multi-agent supervisor system engineered with LangGraph and FastAPI. Features dynamic supervisor routing across specialized agents: Researcher (DuckDuckGo integration), Wikipedia Knowledge Agent, and Python Analyst for mathematical computation.",
    bulletPoints: [
      "Designed a stateful graph architecture with SQLite-based checkpointing for conversation persistence across user sessions and thread-based context management.",
      "Built a high-throughput REST API via FastAPI (/v1/execute) with full execution trace logging, token usage tracking, and loop prevention mechanisms.",
      "Integrated Groq high-speed LLM inference for supervisor decision-making and rapid tool invocation.",
      "Equipped each worker agent with custom tool bindings: web search, structured encyclopedic retrieval, and sandboxed Python code execution."
    ],
    techStack: ["LangGraph", "FastAPI", "Groq LLM", "SQLite", "DuckDuckGo API", "Python 3.11", "Pydantic"],
    githubUrl: "https://github.com/WajidKarimm/multi-agent-supervisor",
    architectureNotes: [
      "StateGraph with Supervisor routing node deciding NEXT_AGENT or FINISH",
      "MemorySaver / SQLiteSaver thread checkpoints to resume multi-turn conversations",
      "Pydantic schema validation preventing infinite conversational recursion",
      "Structured JSON streaming for low-latency client updates"
    ],
    codeSnippet: {
      filename: "supervisor_graph.py",
      language: "python",
      code: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field
from typing import Literal

class RouterOutput(BaseModel):
    next_node: Literal["researcher", "wikipedia", "analyst", "FINISH"] = Field(
        description="The next specialized worker agent to route the query to, or FINISH."
    )
    routing_reasoning: str = Field(description="Operational rationale for dispatch.")

def supervisor_node(state: AgentState):
    llm = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0)
    structured_llm = llm.with_structured_output(RouterOutput)
    decision = structured_llm.invoke(state["messages"])
    return {"next_node": decision.next_node, "execution_trace": [decision.routing_reasoning]}

# Compile stateful execution graph with checkpointing
workflow = StateGraph(AgentState)
workflow.add_node("supervisor", supervisor_node)
workflow.add_node("researcher", researcher_worker)
workflow.add_node("wikipedia", wikipedia_worker)
workflow.add_node("analyst", python_analyst_worker)
app = workflow.compile(checkpointer=sqlite_checkpointer)`
    }
  },
  {
    id: "asa-agent-healthcare",
    title: "ASA-Agent Healthcare Assistant",
    tagline: "Production multi-agent triage and medical RAG pipeline with pgvector and MLflow monitoring",
    category: "rag",
    categoryLabel: "RAG & Healthcare AI",
    date: "2026",
    featured: true,
    description: "A production multi-agent healthcare assistant deployed at Canvas Solution using LangGraph and LangChain. Implements intelligent intent routing across patient appointment scheduling, clinical emergency triage, appointment cancellation, and medical FAQ workflows.",
    bulletPoints: [
      "Engineered dual RAG pipeline architecture (FaqNode & FaqNodeNoTool) with optimized chunking strategies and medical context window management.",
      "Implemented semantic vector search via PostgreSQL pgvector for dense embedding storage and high-precision document retrieval.",
      "Integrated re-ranking algorithms to maximize answer faithfulness and reduce clinical hallucination rates to near-zero.",
      "Enforced strict medical data output formats using Pydantic schemas and tracked inference latency vs quality trade-offs in MLflow."
    ],
    techStack: ["LangGraph", "LangChain", "PostgreSQL", "pgvector", "MLflow", "Pydantic", "FastAPI", "OpenAI"],
    githubUrl: "https://github.com/WajidKarimm/asa-healthcare-agent",
    architectureNotes: [
      "Clinical Intent Classifier routing urgent patient symptoms to Emergency Protocol Node",
      "Dense vector storage in PostgreSQL with pgvector cosine distance index (HNSW)",
      "Cross-encoder re-ranking step before feeding chunks into the LLM context",
      "MLflow evaluation metrics tracking Faithfulness Score, Context Recall, and Answer Relevance"
    ],
    codeSnippet: {
      filename: "rag_retriever.py",
      language: "python",
      code: `from langchain_community.vectorstores import PGVector
from langchain_openai import OpenAIEmbeddings
from sentence_transformers import CrossEncoder

class ClinicalRAGPipeline:
    def __init__(self, connection_string: str):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.store = PGVector(
            connection_string=connection_string,
            embedding_function=self.embeddings,
            collection_name="clinical_guidelines"
        )
        self.reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

    def retrieve_and_rerank(self, query: str, top_k: int = 15, final_k: int = 4):
        initial_docs = self.store.similarity_search(query, k=top_k)
        pairs = [[query, doc.page_content] for doc in initial_docs]
        scores = self.reranker.predict(pairs)
        ranked = sorted(zip(initial_docs, scores), key=lambda x: x[1], reverse=True)
        return [doc for doc, _ in ranked[:final_k]]`
    }
  },
  {
    id: "ai-browser-assistant",
    title: "AI Browser Assistant",
    tagline: "Autonomous browser automation combining Playwright MCP, Gemini & OpenAI models, and React side panels",
    category: "agents",
    categoryLabel: "Multi-Agent Automation",
    date: "2026",
    featured: true,
    description: "An advanced multi-agent browser automation platform capable of real-time web page summarization, smart form filling, DOM navigation, and multi-tab control using state-of-the-art Model Context Protocol (MCP) and LLMs.",
    bulletPoints: [
      "Developed an asynchronous FastAPI backend paired with two Chrome extensions: a Playwright MCP bridge and a React side panel.",
      "Integrated dual model support for OpenAI and Gemini models for contextual DOM reasoning and dynamic task execution.",
      "Constructed modular architecture combining web agent planning, accessibility tree parsing, and interactive user controls.",
      "Achieved sub-500ms DOM extraction latency with automated fallback for complex single-page applications."
    ],
    techStack: ["Python", "FastAPI", "Playwright MCP", "Gemini API", "OpenAI", "React", "Vite", "TypeScript"],
    githubUrl: "https://github.com/WajidKarimm/ai-browser-assistant",
    architectureNotes: [
      "Chrome Extension Side Panel communicating with local FastAPI server via WebSockets",
      "Playwright MCP server controlling sandboxed Chromium instance",
      "Accessibility tree snapshotting to avoid giant raw HTML token consumption",
      "Step-by-step action planner: click, type, scroll, extract, summarize"
    ],
    codeSnippet: {
      filename: "browser_agent.py",
      language: "python",
      code: `from playwright.async_api import async_playwright
from google import genai

async def execute_browser_step(page, planned_action):
    action_type = planned_action.get("type")
    selector = planned_action.get("selector")
    
    if action_type == "click":
        await page.click(selector, timeout=3000)
    elif action_type == "fill":
        await page.fill(selector, planned_action.get("value", ""))
    elif action_type == "extract_text":
        return await page.inner_text(selector)
    await page.wait_for_load_state("domcontentloaded")`
    }
  },
  {
    id: "production-rag-chatbot",
    title: "Production RAG Chatbot",
    tagline: "High-faithfulness conversational retrieval engine with token budget management and query routing",
    category: "rag",
    categoryLabel: "RAG & LLMOps",
    date: "2025",
    featured: false,
    description: "An end-to-end production RAG chatbot deployed via Flask API with semantic chunking, dense vector retrieval via pgvector, and multi-turn context budgeting.",
    bulletPoints: [
      "Engineered token budget management to preserve critical chat history across long conversations without exceeding context limits.",
      "Applied intent classification and named entity extraction (NER) to route user queries dynamically between knowledge bases.",
      "Implemented automated faithfulness scoring and hallucination detection checks before returning responses.",
      "Containerized deployment with Docker and integrated monitoring hooks for token cost tracking."
    ],
    techStack: ["Flask", "LangChain", "PostgreSQL", "pgvector", "OpenAI", "Docker", "Python"],
    githubUrl: "https://github.com/WajidKarimm/production-rag-chatbot",
    architectureNotes: [
      "Sliding window memory with summary compression for multi-turn dialogues",
      "Deterministic routing to distinct vector partitions based on detected intent",
      "Automated evaluation checks verifying citations against retrieved chunks"
    ]
  },
  {
    id: "autonomous-driving-detection",
    title: "Autonomous Driving Object Detection",
    tagline: "Real-time roadside object detection & tracking evaluated with rigorous mAP metrics",
    category: "vision",
    categoryLabel: "Computer Vision",
    date: "2025",
    featured: false,
    description: "Deployed YOLOv8s models for roadside object detection, detecting vehicles, pedestrians, cyclists, and traffic signals with high inference speed and precision.",
    bulletPoints: [
      "Fine-tuned YOLOv8s architecture on roadside driving datasets for real-time edge vehicle and pedestrian recognition.",
      "Evaluated model performance using mean Average Precision (mAP@50 and mAP@50:95) benchmarks and confusion matrices.",
      "Designed visual diagnostic tools to inspect bounding box confidences, false positives, and occlusions.",
      "Integrated DeepSORT algorithm for consistent multi-object tracking across sequential video frames."
    ],
    techStack: ["YOLOv8", "Python", "OpenCV", "PyTorch", "DeepSORT", "NumPy"],
    githubUrl: "https://github.com/WajidKarimm/autonomous-object-detection",
    architectureNotes: [
      "Optimized PyTorch inference pipeline using FP16 quantization",
      "Visual analysis dashboard rendering bounding boxes, track IDs, and velocity vectors",
      "Robust detection across diverse weather conditions and nighttime lighting"
    ]
  },
  {
    id: "student-performance-predictor",
    title: "Student Performance Prediction Pipeline",
    tagline: "End-to-end ML classification pipeline with automated hyperparameter tuning achieving 82% accuracy",
    category: "ml",
    categoryLabel: "Machine Learning & Analytics",
    date: "2024",
    featured: false,
    description: "An end-to-end machine learning system developed with scikit-learn and Flask, predicting student academic outcomes with an 82% accuracy rating.",
    bulletPoints: [
      "Engineered multi-model pipeline comparing Random Forest, Gradient Boosting, and SVM classifiers with automated grid search hyperparameter tuning.",
      "Created data preprocessing pipelines handling missing values, categorical encoding, and feature scaling.",
      "Packaged into a lightweight Flask REST API with interactive frontend dashboards for educational administrators.",
      "Generated actionable feature importance metrics highlighting the most influential academic risk factors."
    ],
    techStack: ["scikit-learn", "Python", "Flask", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/WajidKarimm/student-performance-predictor",
    architectureNotes: [
      "Scikit-learn Pipeline with custom transformers and cross-validation folds",
      "SHAP value analysis for explainable AI predictions",
      "Fast inference under 20ms per student record"
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Engineer",
    company: "Canvas Solution",
    period: "02/2026 – 04/2026",
    location: "Remote / Islamabad, Pakistan",
    summary: "Led the engineering of production multi-agent systems and enterprise RAG architectures for healthcare and conversational automation.",
    bulletPoints: [
      "Built ASA-Agent, a production multi-agent healthcare assistant using LangGraph and LangChain with intent routing across scheduling, emergency, cancellation, and FAQ workflows.",
      "Designed dual RAG pipeline strategy (FaqNode & FaqNodeNoTool) with optimized chunking strategies, embedding models, and context window management for medical knowledge retrieval.",
      "Implemented semantic search via pgvector (PostgreSQL) for dense embedding storage and retrieval; applied re-ranking logic to improve answer faithfulness.",
      "Enforced structured outputs using Pydantic schemas; monitored model performance using MLflow to track inference quality and latency tradeoffs.",
      "Applied NLP techniques including intent classification and entity extraction to route patient queries across specialized agents."
    ],
    technologies: ["LangGraph", "LangChain", "PostgreSQL", "pgvector", "MLflow", "Pydantic", "FastAPI", "OpenAI"]
  },
  {
    role: "AI Data Annotator / ML Intern",
    company: "Unpeel (Startup)",
    period: "12/2025 – 02/2026",
    location: "Hybrid",
    summary: "Spearheaded training data curation and text classification preprocessing for e-commerce AI models.",
    bulletPoints: [
      "Collected and structured children's fashion product datasets across 19 brands for training ML classification models.",
      "Labeled and validated product attributes (gender, clothing type, brand) to support NLP-based text classification pipelines.",
      "Supported the full ML pipeline: data collection to labeling to preprocessing to model training preparation."
    ],
    technologies: ["Python", "Pandas", "NLP Labeling", "Data Structuring", "Text Classification"]
  },
  {
    role: "Machine Learning / Deep Learning Fellow",
    company: "Buildables",
    period: "07/2025 – 11/2025",
    location: "Pakistan",
    summary: "Selected for a competitive 3-month intensive fellowship in ML and Deep Learning, building research-driven practical AI applications.",
    bulletPoints: [
      "Completed 3-month intensive fellowship in ML and Deep Learning; worked on research-driven practical AI projects.",
      "Implemented neural network architectures from scratch using PyTorch and TensorFlow for classification and computer vision tasks.",
      "Received strong mentor recommendation for exceptional technical performance and collaborative problem solving."
    ],
    technologies: ["PyTorch", "TensorFlow", "Deep Learning", "Neural Networks", "Computer Vision"]
  },
  {
    role: "Junior Data Scientist & AI Engineer",
    company: "IT Directorate",
    period: "06/2024 – 12/2024",
    location: "Gilgit, Pakistan",
    summary: "Delivered data-driven strategic models, executive BI dashboards, and operational automation workflows.",
    bulletPoints: [
      "Analyzed organizational data using Python and scikit-learn to build models supporting 3+ strategic decisions by department leadership.",
      "Built predictive dashboards for sales and customer analytics, reducing manual reporting time by ~40% and improving insight turnaround.",
      "Led AI-driven automation projects using TensorFlow/Keras, eliminating repetitive manual processes across 2 operational workflows."
    ],
    technologies: ["Python", "scikit-learn", "TensorFlow", "Keras", "Predictive Analytics", "SQL"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & LLM Orchestration",
    description: "Multi-agent systems, state graphs, and structured generation",
    skills: [
      { name: "LangGraph", level: "Advanced", highlight: true },
      { name: "LangChain", level: "Advanced", highlight: true },
      { name: "Multi-Agent Systems", level: "Advanced", highlight: true },
      { name: "RAG Architectures", level: "Advanced", highlight: true },
      { name: "Prompt Engineering", level: "Advanced" },
      { name: "Pydantic Structured Outputs", level: "Advanced", highlight: true },
      { name: "LLM Fine-Tuning", level: "Proficient" },
      { name: "Agentic Frameworks", level: "Advanced" },
      { name: "OpenAI / Azure OpenAI", level: "Advanced" },
      { name: "Groq LLM Acceleration", level: "Proficient" }
    ]
  },
  {
    title: "Vector DBs & LLMOps",
    description: "Semantic search, ranking, and observability pipelines",
    skills: [
      { name: "pgvector (PostgreSQL)", level: "Advanced", highlight: true },
      { name: "Hybrid Search (Dense + Sparse)", level: "Advanced", highlight: true },
      { name: "Re-Ranking Pipelines", level: "Advanced", highlight: true },
      { name: "Faithfulness Scoring", level: "Advanced" },
      { name: "Hallucination Detection", level: "Advanced" },
      { name: "Token Cost Optimization", level: "Advanced" },
      { name: "Context Window Management", level: "Advanced" },
      { name: "MLflow Observability", level: "Proficient", highlight: true }
    ]
  },
  {
    title: "NLP & Deep Learning",
    description: "Linguistic extraction, embeddings, and foundational models",
    skills: [
      { name: "PyTorch", level: "Proficient", highlight: true },
      { name: "TensorFlow / Keras", level: "Proficient" },
      { name: "Hugging Face Transformers", level: "Proficient", highlight: true },
      { name: "scikit-learn", level: "Advanced" },
      { name: "spaCy & NLTK", level: "Advanced" },
      { name: "Intent Classification", level: "Advanced" },
      { name: "Named Entity Recognition (NER)", level: "Advanced" },
      { name: "Text Similarity & Embeddings", level: "Advanced" }
    ]
  },
  {
    title: "Computer Vision",
    description: "Object detection, spatial tracking, and visual analytics",
    skills: [
      { name: "YOLOv8 / YOLO", level: "Advanced", highlight: true },
      { name: "OpenCV", level: "Advanced", highlight: true },
      { name: "MediaPipe", level: "Proficient" },
      { name: "DeepSORT Tracking", level: "Proficient" },
      { name: "mAP Metric Evaluation", level: "Advanced" }
    ]
  },
  {
    title: "Backend, Cloud & Databases",
    description: "Production API deployment, containerization, and data layers",
    skills: [
      { name: "FastAPI", level: "Advanced", highlight: true },
      { name: "Flask", level: "Advanced" },
      { name: "Django", level: "Proficient" },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "SQL & PostgreSQL", level: "Advanced", highlight: true },
      { name: "Docker", level: "Proficient", highlight: true },
      { name: "Kubernetes", level: "Core" },
      { name: "Microsoft Azure", level: "Proficient" },
      { name: "AWS & GCP", level: "Proficient" },
      { name: "CI/CD & GitHub Actions", level: "Proficient" },
      { name: "MongoDB & MySQL", level: "Proficient" }
    ]
  },
  {
    title: "Frontend & Engineering Practices",
    description: "User interfaces, testing, and development methodologies",
    skills: [
      { name: "React & Vite", level: "Proficient", highlight: true },
      { name: "JavaScript / TypeScript", level: "Proficient" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "WebSockets", level: "Proficient" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Bash & PowerShell", level: "Proficient" },
      { name: "Agile / Scrum", level: "Advanced" },
      { name: "OOP & Systems Thinking", level: "Advanced" }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Karakoram International University (KIU)",
    location: "Gilgit, Pakistan",
    details: [
      "Core curriculum in Data Structures, Algorithms, Artificial Intelligence, Operating Systems, and Distributed Computing.",
      "Active research projects in Applied Machine Learning, Intelligent Systems, and Software Engineering."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AI and Data Science Certification",
    issuer: "National University of Sciences and Technology (NUST)",
    year: "2024",
    topics: ["6-Month Intensive Program", "Machine Learning Fundamentals", "Neural Networks", "NLP & Intent Classification", "NER"]
  },
  {
    title: "Microsoft AI & ML Engineering",
    issuer: "Coursera / Microsoft",
    year: "2025",
    topics: ["Professional Certificate", "Azure ML", "Intelligent Agents", "LLM Deployment Pipelines", "Context Optimization"]
  },
  {
    title: "Summer School in Machine Learning",
    issuer: "Cohere Labs Open Science Community",
    year: "2025",
    topics: ["NLP & AI Agents", "Reinforcement Learning", "LLM Observability", "Mathematical Foundations"]
  }
];
