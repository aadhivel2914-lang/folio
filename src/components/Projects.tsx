import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Scan, 
  Play, 
  Settings, 
  Layers, 
  Terminal 
} from 'lucide-react';
import { ProjectItem, PortfolioData } from '../types/portfolio';

interface ProjectsProps {
  data: PortfolioData;
  onOpenDemoModal: () => void;
  onOpenSettings: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  data, 
  onOpenDemoModal, 
  onOpenSettings 
}) => {
  const featuredProject = data.projects.find((p) => p.isFeatured) || data.projects[0];
  const otherProjects = data.projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projects & Engineering Research
            </h2>
            <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">
              Specialized projects focusing on applied computer vision, optical character recognition, and reliable web applications.
            </p>
          </div>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all self-start md:self-auto cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manage Project Cards</span>
          </button>
        </div>

        {/* ========================================================
            FEATURED PROJECT SPOTLIGHT: AI Fake Certificate Detection
            ======================================================== */}
        {featuredProject && (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-16">
            
            {/* Ambient Background Aura */}
            <div 
              className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" 
              aria-hidden="true" 
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column (7 cols): Information & Features */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Clean unboxed tag kicker */}
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <span className="font-semibold tracking-wider uppercase">Final-Year Project</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">{featuredProject.status}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {featuredProject.title}
                </h3>

                <p className="text-emerald-300 text-sm sm:text-base font-medium">
                  {featuredProject.tagline}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Key Features to display */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Core Capabilities:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {featuredProject.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies List */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-400 mr-2">Technologies:</span>
                  {featuredProject.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="text-emerald-300 font-mono font-medium">{tech}</span>
                      {idx < featuredProject.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {/* Interactive Simulation Tester Button */}
                  <button
                    onClick={onOpenDemoModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Launch Verification Simulation</span>
                  </button>

                  {/* Configurable Live Demo Link */}
                  {featuredProject.liveDemoUrl ? (
                    <a
                      href={featuredProject.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <button
                      onClick={onOpenSettings}
                      title="Set live demo URL in settings"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800/80 rounded-xl transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-500" />
                      <span>Live Demo (Add Link)</span>
                    </button>
                  )}

                  {/* Configurable GitHub Repository Link */}
                  {featuredProject.githubUrl ? (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
                    >
                      <Github className="w-4 h-4 text-slate-300" />
                      <span>Source Code</span>
                    </a>
                  ) : (
                    <button
                      onClick={onOpenSettings}
                      title="Set GitHub URL in settings"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800/80 rounded-xl transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-slate-500" />
                      <span>GitHub (Add Link)</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column (5 cols): Visual Interactive Preview Showcase */}
              <div className="lg:col-span-5">
                <div 
                  onClick={onOpenDemoModal}
                  className="relative group/box cursor-pointer rounded-2xl border border-slate-700/80 bg-slate-950 p-6 overflow-hidden transition-all hover:border-emerald-500/50 shadow-xl"
                >
                  {/* Subtle holographic grid lines */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                  {/* Mock Verification Scanner UI Preview */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                      <span className="font-mono flex items-center gap-1.5 text-emerald-400">
                        <Scan className="w-4 h-4" />
                        OCR & CNN Verification Suite
                      </span>
                      <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        Interactive
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Authenticity Score</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">97.4% High Confidence</span>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[97%]" />
                      </div>

                      <div className="text-[11px] text-slate-400 pt-1 flex justify-between">
                        <span>Font Kerning: Uniform</span>
                        <span>Seal Relief: Genuine</span>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-xs font-semibold text-emerald-400 group-hover/box:text-emerald-300 flex items-center justify-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-emerald-400" />
                        Click to test interactive certificate inspector
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Other / Additional Reusable Project Cards (if added through settings) */}
        {otherProjects.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Additional Projects</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="text-xs text-emerald-400 font-mono">{project.status}</div>
                    <h5 className="text-lg font-bold text-white">{project.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-400 pt-2">
                      {project.technologies.map((t) => (
                        <span key={t} className="text-emerald-300 font-mono text-[11px]">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
                    {project.liveDemoUrl && (
                      <a 
                        href={project.liveDemoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-slate-300 hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
