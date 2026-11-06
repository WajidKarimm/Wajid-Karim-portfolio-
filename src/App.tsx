import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentGraphVisualizer } from './components/AgentGraphVisualizer';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CertificationsEducation } from './components/CertificationsEducation';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Bar strictly adhering to Top Bar Contract */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => scrollToSection('contact')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Split Screen Hero with Wajid's Photo, Metrics & Unboxed Info */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => scrollToSection('contact')}
          onExploreProjects={() => scrollToSection('projects')}
          onOpenArchitecture={() => scrollToSection('architecture')}
        />

        {/* Interactive Multi-Agent Execution & LangGraph Visualizer */}
        <AgentGraphVisualizer />

        {/* Featured Open Source Repositories & Bento Grid */}
        <ProjectsGrid onSelectProject={(proj) => setSelectedProject(proj)} />

        {/* Comprehensive Engineering Tech Stack & Matrix */}
        <SkillsSection />

        {/* Professional Experience & Fellowships Timeline */}
        <ExperienceTimeline />

        {/* Verified Education & Certifications */}
        <CertificationsEducation />

        {/* Professional Contact Information & Proposal Composer */}
        <ContactSection />
      </main>

      {/* Minimalist Anti-Slop Footer */}
      <Footer />

      {/* Project Deep-Dive Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Resume PDF Viewer / Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
