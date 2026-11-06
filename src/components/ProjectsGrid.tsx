import React, { useState } from 'react';
import { 
  Github, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Database, 
  Eye, 
  Terminal,
  ExternalLink,
  Code2
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'agents' | 'rag' | 'vision' | 'ml'>('all');

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-16 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              <span>Open Source & Production Repositories</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>github.com/WajidKarimm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Systems & Repositories
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Production architectures spanning stateful multi-agent supervisors, dual healthcare RAG pipelines with pgvector, browser automation with MCP, and computer vision models.
            </p>
          </div>

          {/* Interactive Filter Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('agents')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === 'agents'
                  ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Multi-Agent & LLM
            </button>
            <button
              onClick={() => setFilter('rag')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === 'rag'
                  ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              RAG & pgvector
            </button>
            <button
              onClick={() => setFilter('vision')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === 'vision'
                  ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Computer Vision
            </button>
            <button
              onClick={() => setFilter('ml')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === 'ml'
                  ? 'bg-neutral-800 text-cyan-400 shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ML Pipelines
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isFeatured = project.featured;

            return (
              <div
                key={project.id}
                className={`group relative rounded-2xl border border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-900/70 p-6 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700/80 shadow-sm ${
                  isFeatured ? 'lg:col-span-1 border-neutral-750' : ''
                }`}
              >
                <div>
                  {/* Clean Unboxed Metadata Header (No pill badges) */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-medium">{project.categoryLabel}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{project.date}</span>
                    </div>

                    {isFeatured && (
                      <span className="text-[11px] text-amber-400 font-mono font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
                    {project.title}
                  </h3>

                  {/* Tagline / Summary */}
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-6 text-xs text-neutral-400">
                    {project.bulletPoints.slice(0, 2).map((bp, bidx) => (
                      <div key={bidx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400/80 font-mono">▸</span>
                        <span className="line-clamp-2">{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400">
                    {project.techStack.slice(0, 4).map((tech, tidx) => (
                      <span 
                        key={tidx}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-850 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-neutral-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect Details</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                      title="Open GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub Callout Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Looking for all repositories and commit history?
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Visit <span className="font-mono text-neutral-200">github.com/WajidKarimm</span> for source code, forks, and experimental agent scripts.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/WajidKarimm"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Visit @WajidKarimm on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
