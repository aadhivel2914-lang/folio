import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Terminal } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ExperienceProps {
  data: PortfolioData;
}

export const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const { internship } = data;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Professional Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Internship Training
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Practical industry exposure and full stack development apprenticeship completed at Futogen Institutions.
          </p>
        </div>

        {/* Featured Internship Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="relative z-10 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Industrial Internship
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {internship.role}
                </h3>
                <div className="flex items-center gap-2 text-slate-300 font-medium text-base mt-1">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>{internship.company}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-300 tabular-nums">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {internship.period}
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {internship.location}
                </span>
              </div>
            </div>

            {/* Overview prose */}
            <p className="text-slate-300 text-base leading-relaxed">
              {internship.description}
            </p>

            {/* Responsibilities & Achievements */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Key Responsibilities & Deliverables
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internship.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                Applied Tooling:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                {internship.technologiesUsed.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span className="text-emerald-300 font-mono">{tech}</span>
                    {idx < internship.technologiesUsed.length - 1 && (
                      <span aria-hidden="true" className="text-slate-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
