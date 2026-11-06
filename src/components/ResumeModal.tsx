import React from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Wajid Karim — AI Engineer Resume
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <span>Wajid_d836326b.pdf</span>
                <span aria-hidden="true">·</span>
                <span>Production Verified</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Wajid_Karim_AI_Engineer_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF or Preview Container */}
        <div className="flex-1 bg-neutral-900 relative">
          <object
            data={PERSONAL_INFO.resumePdfUrl}
            type="application/pdf"
            className="w-full h-full border-none"
          >
            {/* Fallback if browser PDF plugin is blocked or disabled */}
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-neutral-950">
              <FileText className="w-16 h-16 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Wajid Karim — Curriculum Vitae
              </h3>
              <p className="text-sm text-neutral-400 max-w-md mb-6">
                Your browser does not support inline PDF viewing, or preview was restricted. You can open or download the complete PDF resume directly:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  download="Wajid_Karim_AI_Engineer_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Modal Quick Contact Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="text-neutral-300">{PERSONAL_INFO.email}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>{PERSONAL_INFO.formattedPhone}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>github.com/WajidKarimm</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
