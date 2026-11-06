import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Cpu, 
  Database, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Activity, 
  Code2,
  FileSearch,
  Bot
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  system: string;
  userQuery: string;
  expectedRouting: string;
  nodes: {
    id: string;
    label: string;
    role: string;
    action: string;
    status: 'pending' | 'running' | 'completed';
    details: string;
  }[];
  finalOutput: {
    intent: string;
    confidence: string;
    retrievedSource: string;
    tokenCount: number;
    latencyMs: number;
    faithfulnessScore: number;
    responsePreview: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "healthcare-triage",
    title: "ASA-Agent: Healthcare Triage & Dual RAG",
    system: "LangGraph + pgvector + MLflow (Canvas Solution)",
    userQuery: "Patient reporting acute chest pain with shortness of breath while asking for Dr. Harris clinic hours tomorrow.",
    expectedRouting: "Emergency Intent Node -> Clinical Safety Protocol -> Parallel FAQ Retrieval",
    nodes: [
      {
        id: "intent_router",
        label: "Intent Router",
        role: "LangChain NLP Classifier",
        action: "Extract entities & detect critical medical priority",
        status: "pending",
        details: "Detected acute symptom tokens ('chest pain', 'shortness of breath'). Triage priority elevated to HIGH (Code Red)."
      },
      {
        id: "emergency_protocol",
        label: "Emergency Protocol Node",
        role: "Deterministic Safety Gate",
        action: "Activate urgent care instructions before standard FAQ",
        status: "pending",
        details: "Triggering emergency response protocol: advising immediate emergency contact (911/ER) prior to scheduling."
      },
      {
        id: "pgvector_retriever",
        label: "pgvector Retriever",
        role: "PostgreSQL HNSW Cosine Search",
        action: "Query clinical_guidelines with OpenAI small-3 embeddings",
        status: "pending",
        details: "Top-15 dense vectors fetched from pgvector in 18ms. Cross-encoder re-ranking selected top-3 verified guidelines."
      },
      {
        id: "pydantic_validator",
        label: "Pydantic Validator",
        role: "Strict Schema Enforcement",
        action: "Validate structured ClinicalResponse payload",
        status: "pending",
        details: "Output verified against ClinicalResponse schema. Faithfulness score: 0.98. Zero hallucinations detected."
      }
    ],
    finalOutput: {
      intent: "Emergency_Symptom_Triage + Doctor_Schedule_Query",
      confidence: "99.4%",
      retrievedSource: "PostgreSQL pgvector (table: clinical_knowledge_v2)",
      tokenCount: 412,
      latencyMs: 142,
      faithfulnessScore: 0.98,
      responsePreview: "CRITICAL: Given the acute chest pain and shortness of breath, please immediately seek emergency medical attention (dial 911 or visit the nearest emergency room). \n\nFor reference once stabilized: Dr. Harris's clinic hours tomorrow are 09:00 AM – 04:30 PM (Main Medical Pavilion, Suite 402)."
    }
  },
  {
    id: "multi-agent-supervisor",
    title: "Multi-Agent Supervisor: Research & Analysis",
    system: "LangGraph + Groq + SQLite Checkpointer",
    userQuery: "Analyze latest market adoption of pgvector vs dedicated vector databases, summarize benchmark latencies, and calculate cost efficiency.",
    expectedRouting: "Supervisor Node -> Researcher Agent (DuckDuckGo) -> Wikipedia Agent -> Python Analyst",
    nodes: [
      {
        id: "supervisor_node",
        label: "Supervisor Node",
        role: "Groq LLaMA-3.3 70B Orchestrator",
        action: "Deconstruct multi-step prompt into directed agent subtasks",
        status: "pending",
        details: "Determined subtasks: 1. Live web benchmark retrieval, 2. Architectural schema comparison, 3. Python cost math."
      },
      {
        id: "researcher_worker",
        label: "Researcher Agent",
        role: "DuckDuckGo Web Search Tool",
        action: "Fetch 2025/2026 pgvector HNSW benchmark reports",
        status: "pending",
        details: "Queried pgvector indexing performance: 95% recall at sub-50ms latency for 1M vectors. Synthesized 4 articles."
      },
      {
        id: "python_analyst",
        label: "Python Analyst",
        role: "Sandboxed Computation Tool",
        action: "Run Python script calculating infrastructure TCO",
        status: "pending",
        details: "Calculated 68% server cost reduction by co-locating relational data with pgvector vs standalone vector SaaS."
      },
      {
        id: "sqlite_checkpointer",
        label: "SQLite Checkpointer",
        role: "Stateful Session Persistence",
        action: "Save execution trace & conversation state",
        status: "pending",
        details: "Thread checkpoint #tx_8841 committed to SQLite. State graph execution completed in 3 iterations without loops."
      }
    ],
    finalOutput: {
      intent: "Technical_Comparative_Analysis + TCO_Computation",
      confidence: "98.7%",
      retrievedSource: "DuckDuckGo API + Internal Postgres Benchmarks",
      tokenCount: 780,
      latencyMs: 235,
      faithfulnessScore: 0.99,
      responsePreview: "Executive Synthesis: PostgreSQL + pgvector provides single-database transactional consistency with HNSW indexing reaching 95% recall under 50ms for 1M 1536-dim embeddings. \n\nFinancial Analysis: Eliminating external vector SaaS eliminates $840/mo in transfer fees and achieves an estimated 68% net infrastructure TCO savings."
    }
  }
];

export const AgentGraphVisualizer: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [viewCode, setViewCode] = useState(false);

  const scenario = SCENARIOS[selectedScenarioIndex];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);

    const stepDuration = 700;
    scenario.nodes.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
      }, (idx + 1) * stepDuration);
    });

    setTimeout(() => {
      setActiveStep(scenario.nodes.length);
      setIsRunning(false);
    }, (scenario.nodes.length + 1) * stepDuration);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setIsRunning(false);
  };

  return (
    <section id="architecture" className="py-16 border-t border-neutral-800/80 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              <span>Interactive Architectural Demo</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>LangGraph & RAG Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Multi-Agent Orchestration & State Flow
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Inspect how Wajid designs and deploys resilient agent topologies with intent routing, dense vector retrieval, schema guards, and persistent checkpoints.
            </p>
          </div>

          {/* Scenario Selector Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  handleReset();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedScenarioIndex === idx
                    ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {idx === 0 ? "Healthcare Dual-RAG" : "Multi-Agent Supervisor"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Visualizer Container */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm">
          
          {/* Query Bar */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-400 font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-neutral-300 font-semibold">{scenario.system}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewCode(!viewCode)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded hover:border-neutral-700 transition-colors"
                >
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>{viewCode ? "Hide Graph Code" : "Inspect LangGraph Code"}</span>
                </button>
                <button
                  onClick={activeStep >= 0 ? handleReset : handleRunSimulation}
                  disabled={isRunning}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded transition-all whitespace-nowrap ${
                    activeStep >= scenario.nodes.length
                      ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                      : 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Activity className="w-3.5 h-3.5 animate-spin" />
                      <span>Executing Graph...</span>
                    </>
                  ) : activeStep >= scenario.nodes.length ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Trace</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Agent Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-850 flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider shrink-0 mt-0.5">
                Input Query:
              </span>
              <p className="text-sm font-medium text-white italic">
                &ldquo;{scenario.userQuery}&rdquo;
              </p>
            </div>
          </div>

          {/* Conditional LangGraph Code Snippet */}
          {viewCode && (
            <div className="mb-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono overflow-x-auto text-neutral-300">
              <div className="text-neutral-500 mb-2"># LangGraph State Machine & Schema Definition</div>
              <pre className="text-cyan-300/90 leading-relaxed">
{selectedScenarioIndex === 0 ? `from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field

class ClinicalTriageState(TypedDict):
    patient_id: str
    query: str
    triage_priority: str
    retrieved_chunks: list[dict]
    faithfulness_score: float
    final_response: str

workflow = StateGraph(ClinicalTriageState)
workflow.add_node("intent_router", triage_intent_classifier)
workflow.add_node("emergency_protocol", emergency_safety_node)
workflow.add_node("pgvector_retriever", pgvector_dense_search)
workflow.add_node("pydantic_validator", validate_clinical_output)

# Conditional edge based on priority
workflow.add_conditional_edges(
    "intent_router",
    lambda state: "emergency_protocol" if state["triage_priority"] == "CRITICAL" else "pgvector_retriever",
    {"emergency_protocol": "emergency_protocol", "pgvector_retriever": "pgvector_retriever"}
)
workflow.add_edge("emergency_protocol", "pgvector_retriever")
workflow.add_edge("pgvector_retriever", "pydantic_validator")
workflow.add_edge("pydantic_validator", END)` : `from langgraph.graph import StateGraph, END
from langgraph.checkpoint.sqlite import SqliteSaver

workflow = StateGraph(AgentSupervisorState)
workflow.add_node("supervisor", supervisor_router_node)
workflow.add_node("researcher", duckduckgo_research_worker)
workflow.add_node("analyst", python_code_interpreter)
workflow.add_node("checkpoint_writer", sqlite_persistence_node)

workflow.add_conditional_edges(
    "supervisor",
    lambda state: state["next_worker"],
    {"researcher": "researcher", "analyst": "analyst", "FINISH": "checkpoint_writer"}
)
workflow.add_edge("researcher", "supervisor")
workflow.add_edge("analyst", "supervisor")
workflow.add_edge("checkpoint_writer", END)`}
              </pre>
            </div>
          )}

          {/* Directed Agent Graph Nodes Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {scenario.nodes.map((node, idx) => {
              const isCurrent = activeStep === idx;
              const isDone = activeStep > idx;

              return (
                <div
                  key={node.id}
                  className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-neutral-900 border-cyan-400 shadow-md shadow-cyan-500/10 scale-[1.02]'
                      : isDone
                      ? 'bg-neutral-950/90 border-emerald-500/60'
                      : 'bg-neutral-950/60 border-neutral-800/80 opacity-70'
                  }`}
                >
                  <div>
                    {/* Node Header */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-neutral-400">Step 0{idx + 1}</span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASS</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 animate-pulse">
                          <Activity className="w-3.5 h-3.5" />
                          <span>EXEC</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-600">IDLE</span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">{node.label}</h3>
                    <div className="text-xs text-cyan-400/90 font-mono mb-2">{node.role}</div>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-3">{node.action}</p>
                  </div>

                  {/* Runtime Trace detail when active or completed */}
                  {(isDone || isCurrent) && (
                    <div className="pt-2.5 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-300 bg-neutral-900/50 p-2 rounded">
                      {node.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Execution Trace & Telemetry Result Card */}
          {activeStep >= scenario.nodes.length && (
            <div className="rounded-xl border border-emerald-500/40 bg-neutral-950 p-5 mt-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-850">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Execution Succeeded & Verified</span>
                  <span className="text-xs text-neutral-400">· Zero Hallucinations · Pydantic Schema Valid</span>
                </div>

                {/* Telemetry Metrics */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
                  <div>
                    <span className="text-neutral-500">Latency:</span>{' '}
                    <span className="text-cyan-400 font-semibold">{scenario.finalOutput.latencyMs}ms</span>
                  </div>
                  <span className="text-neutral-700">·</span>
                  <div>
                    <span className="text-neutral-500">Tokens:</span>{' '}
                    <span className="text-cyan-400 font-semibold">{scenario.finalOutput.tokenCount}</span>
                  </div>
                  <span className="text-neutral-700">·</span>
                  <div>
                    <span className="text-neutral-500">Faithfulness:</span>{' '}
                    <span className="text-emerald-400 font-semibold">{scenario.finalOutput.faithfulnessScore}</span>
                  </div>
                </div>
              </div>

              {/* Output Response */}
              <div className="mt-4">
                <div className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
                  Generated Structured Output (Streamed to Client):
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/70 border border-neutral-800 text-sm text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
                  {scenario.finalOutput.responsePreview}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span>Knowledge Grounding:</span>
                  <span className="text-cyan-400">{scenario.finalOutput.retrievedSource}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
