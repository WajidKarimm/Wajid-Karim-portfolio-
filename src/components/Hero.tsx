import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Check, 
  Copy, 
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onExploreProjects: () => void;
  onOpenArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenContact,
  onExploreProjects,
  onOpenArchitecture,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      {/* Background ambient lighting - subtle technical glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-950/20 via-sky-950/15 to-transparent blur-3xl pointer-events-none rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Kicker - clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 mb-4 tracking-wide uppercase">
              <span>AI Systems & LLMOps</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>LangGraph & RAG Specialist</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-6">
              Engineering Production Multi-Agent Systems & High-Faithfulness RAG Pipelines.
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
              Hi, I&apos;m <span className="font-semibold text-white">{PERSONAL_INFO.name}</span>. I build and deploy intelligent agentic workflows, stateful multi-agent graphs, and scalable vector retrieval engines across healthcare, automation, and analytics domains. Specializing in LangGraph, pgvector, structured outputs, and LLMOps observability.
            </p>

            {/* Clean Unboxed Metadata Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-neutral-400 mb-8 border-y border-neutral-800/80 py-3.5">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.formattedPhone}</span>
              </div>
            </div>

            {/* Interactive Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-sm hover:shadow-cyan-500/20 whitespace-nowrap shrink-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenArchitecture}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Agent Architecture Visualizer</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-850 hover:border-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4 text-neutral-400" />
                <span>Resume PDF</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Visual Container (Wajid's Photo with Architectural Framing) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl border border-neutral-800/90 bg-neutral-900/50 p-4 sm:p-5 shadow-2xl backdrop-blur-sm overflow-hidden group">
              
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={PERSONAL_INFO.photoUrl}
                  alt="Wajid Karim - AI Engineer"
                  className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02] group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle gradient scrim at base for readable overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Overlaid Verified Status Strip */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-white">Wajid Karim</span>
                    <span className="font-mono text-cyan-400 text-[11px]">AI Engineer</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>Multi-Agent & RAG Systems</span>
                    <span className="text-neutral-500">Gilgit, PK</span>
                  </div>
                </div>
              </div>

              {/* Quick Profile Links */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/WajidKarimm</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>in/wajid-karim</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width 4-Column Metric Strip (Placed below hero split as required by Constitution) */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {METRICS.map((metric, idx) => (
              <div 
                key={idx} 
                className="flex flex-col"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums mb-1 flex items-baseline gap-1">
                  <span>{metric.value}</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 leading-snug">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
