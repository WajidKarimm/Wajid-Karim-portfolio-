import React from 'react';
import { GraduationCap, Award, BookOpen, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsEducation: React.FC = () => {
  return (
    <section id="credentials" className="py-16 border-t border-neutral-800/80 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
            <span>Academic & Professional Credentials</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Verified Knowledge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Education & Specialized Certifications
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
            Formal computer science degree coupled with rigorous technical certifications in LLM engineering, neural architectures, and applied data science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education - Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase font-mono tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Degree Education</span>
            </h3>

            {EDUCATION.map((edu, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40"
              >
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  {edu.location}
                </div>
                <h4 className="text-lg font-bold text-white">
                  {edu.degree}
                </h4>
                <div className="text-sm font-semibold text-neutral-300 mt-1">
                  {edu.institution}
                </div>

                {edu.details && (
                  <ul className="mt-4 space-y-2 text-xs text-neutral-400">
                    {edu.details.map((detail, didx) => (
                      <li key={didx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Languages & Soft Skills Card */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                <span>Languages & Working Practices</span>
              </h3>
              
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="font-semibold text-white">English</span>
                  <span className="font-mono text-neutral-400">Professional Fluency</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="font-semibold text-white">Urdu</span>
                  <span className="font-mono text-neutral-400">Native Speaker</span>
                </div>
                <div className="pt-1">
                  <span className="text-neutral-500 font-mono block mb-1">Methodologies:</span>
                  <p className="text-neutral-400 leading-relaxed">
                    Agile/Scrum sprints, Git CI/CD workflows, systems-level debugging, autonomous problem solving, cross-functional engineering communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications - Right Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase font-mono tracking-wider">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Specialized Certifications & Fellowships</span>
            </h3>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-neutral-800/80">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {cert.title}
                      </h4>
                      <div className="text-xs font-mono text-cyan-400 mt-0.5">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5 text-xs font-mono">
                    {cert.topics.map((topic, tidx) => (
                      <span
                        key={tidx}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
