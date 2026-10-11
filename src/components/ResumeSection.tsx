import React from 'react';
import { 
  FileText, 
  Download, 
  Upload, 
  Printer, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumeSectionProps {
  data: PortfolioData;
  onDownloadResume: () => void;
  onOpenSettingsToResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  data,
  onDownloadResume,
  onOpenSettingsToResume,
}) => {
  return (
    <section id="resume" className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Curriculum Vitae
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resume & Credentials
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Download the official resume containing academic scores, internship milestones, and technical competencies.
          </p>
        </div>

        {/* Resume Preview Banner Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Info Side */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {data.personalInfo.name} — Resume
                </h3>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>{data.personalInfo.title}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-400">Salem, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Formatted according to standard ATS engineering specifications. Covers B.Sc. AI & Data Science coursework at Sona College, Full Stack internship at Futogen Institutions, and the AI Fake Certificate Detection project.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {data.hasCustomResume ? 'Custom PDF Uploaded' : 'Default Formatted Resume'}
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Updated for 2024–2027 Cohort</span>
            </div>
          </div>

          {/* Action Buttons Side */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onDownloadResume}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume</span>
            </button>

            <button
              onClick={onOpenSettingsToResume}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Upload / Replace Resume PDF</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
