import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
            <span>Career History</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Production Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Professional Experience & Fellowships
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
            Track record of designing, shipping, and optimizing AI applications, from full-scale multi-agent healthcare systems to predictive machine learning pipelines.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-neutral-800">
          {EXPERIENCES.map((exp, idx) => (
            <div 
              key={idx} 
              className="relative flex items-start gap-4 sm:gap-6 pl-8 sm:pl-12 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-1.5 sm:left-3.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-neutral-900 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />

              {/* Experience Card */}
              <div className="w-full p-6 sm:p-7 rounded-2xl border border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-900/70 transition-all duration-300">
                
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800/80">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 font-mono mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  {/* Clean unboxed dates & location */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{exp.period}</span>
                    </div>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {exp.summary && (
                  <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                    {exp.summary}
                  </p>
                )}

                {/* Achievements Bullet Points */}
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-300">
                  {exp.bulletPoints.map((bp, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Used Strip */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                    Stack:
                  </span>
                  {exp.technologies.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
