import React, { useState } from 'react';
import { X, Github, ExternalLink, Copy, Check, Terminal, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-8 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-neutral-800 bg-neutral-900/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5 uppercase">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{project.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Project Architecture & Purpose
            </h3>
            <p className="leading-relaxed text-neutral-200">
              {project.description}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
              Core Technical Deliverables
            </h3>
            <ul className="space-y-2.5">
              {project.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Architecture Invariants</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.architectureNotes.map((note, idx) => (
                  <li key={idx} className="text-neutral-300 flex items-center gap-1.5">
                    <span className="text-neutral-500 font-mono">▸</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Snippet Preview */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{project.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs overflow-x-auto text-neutral-200">
                <pre className="leading-relaxed">
                  {project.codeSnippet.code}
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub (github.com/WajidKarimm)</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
