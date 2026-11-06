import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    inquiryType: 'Full-Time AI Role',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Build mailto link for direct transmission
    const subject = encodeURIComponent(`[${formState.inquiryType}] From ${formState.name}`);
    const body = encodeURIComponent(
      `Sender Name: ${formState.name}\nSender Email: ${formState.email}\nInquiry Type: ${formState.inquiryType}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
            <span>Get in Touch</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Direct Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Professional Contact & Collaboration
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
            Open to senior AI engineering opportunities, multi-agent systems architecture, RAG consulting, and high-impact open source initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                    Direct Email
                  </span>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                title="Copy email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                    Phone / WhatsApp
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.formattedPhone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://wa.me/923554592544`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-900 rounded transition-colors"
                  title="Open WhatsApp chat"
                >
                  WhatsApp
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                  Location & Timezone
                </span>
                <span className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.location} (PKT / UTC+5)
                </span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/70 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/70 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Composer (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
              <h3 className="text-base font-bold text-white tracking-tight mb-1">
                Send an Inquiry or Project Proposal
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill out the brief below to route directly to Wajid&apos;s verified inbox.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl border border-emerald-500/40 bg-neutral-950 text-center">
                  <Check className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">
                    Opening Mail Client...
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                    Your inquiry details have been assembled. If your default mail application didn&apos;t open automatically, you can email directly to:
                  </p>
                  <div className="font-mono text-xs text-cyan-400 mb-4 select-all">
                    {PERSONAL_INFO.email}
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Inquiry Focus
                    </label>
                    <select
                      value={formState.inquiryType}
                      onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Full-Time AI Role">Full-Time AI / LLM Engineer Role</option>
                      <option value="Multi-Agent Systems Consultation">Multi-Agent Systems Architecture</option>
                      <option value="RAG Pipeline Optimization">RAG & pgvector Pipeline Audit</option>
                      <option value="Open Source Collaboration">Open Source Collaboration</option>
                      <option value="General Conversation">General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Message & Requirements
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your project scope, technical timeline, or role requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-sm hover:shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Wajid</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
