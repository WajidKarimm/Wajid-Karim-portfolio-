import React, { useState } from 'react';
import { Search, Sparkles, Cpu, Database, Binary, Cloud, Code, Terminal, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightOnly, setHighlightOnly] = useState(false);

  const filteredCategories = SKILL_CATEGORIES.map(category => {
    const matchingSkills = category.skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHighlight = highlightOnly ? skill.highlight : true;
      return matchesSearch && matchesHighlight;
    });

    return {
      ...category,
      skills: matchingSkills
    };
  }).filter(category => category.skills.length > 0);

  const getCategoryIcon = (title: string) => {
    if (title.includes('AI') || title.includes('LLM')) return <Cpu className="w-4 h-4 text-cyan-400" />;
    if (title.includes('Vector') || title.includes('LLMOps')) return <Database className="w-4 h-4 text-cyan-400" />;
    if (title.includes('NLP') || title.includes('Deep Learning')) return <Binary className="w-4 h-4 text-cyan-400" />;
    if (title.includes('Vision')) return <Sparkles className="w-4 h-4 text-cyan-400" />;
    if (title.includes('Backend') || title.includes('Cloud')) return <Cloud className="w-4 h-4 text-cyan-400" />;
    return <Code className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <section id="skills" className="py-16 border-t border-neutral-800/80 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              <span>Technical Expertise</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Full-Lifecycle AI Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tech Stack & Engineering Skills
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              From multi-agent graph orchestration and pgvector semantic retrieval to computer vision inference and production FastAPI backends.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tools (e.g. LangGraph, pgvector, YOLO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <button
              onClick={() => setHighlightOnly(!highlightOnly)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                highlightOnly
                  ? 'bg-cyan-950/50 text-cyan-300 border-cyan-800'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Strengths Only</span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-800/90 bg-neutral-900/30 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                    {getCategoryIcon(category.title)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="mt-5 space-y-2">
                  {category.skills.map((skill, sidx) => (
                    <div
                      key={sidx}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                        skill.highlight
                          ? 'bg-neutral-900/90 border border-neutral-800 text-white'
                          : 'text-neutral-300 hover:bg-neutral-900/50'
                      }`}
                    >
                      <span className="font-medium flex items-center gap-1.5">
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                        <span>{skill.name}</span>
                      </span>

                      {skill.level && (
                        <span className="text-[11px] font-mono text-neutral-400">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count indicator */}
              <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{category.skills.length} technologies</span>
                <span className="text-neutral-400">Production-Verified</span>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-neutral-900/20 border border-neutral-800 text-neutral-400 text-sm">
            No technologies found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

      </div>
    </section>
  );
};
