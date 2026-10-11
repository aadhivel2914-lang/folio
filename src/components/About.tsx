import React from 'react';
import { 
  BrainCircuit, 
  Code2, 
  Sparkles, 
  Globe, 
  MapPin, 
  GraduationCap, 
  BookOpen 
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface AboutProps {
  data: PortfolioData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Background & Mission
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Story (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed">
            <p className="text-base sm:text-lg text-slate-200 font-medium">
              {data.personalInfo.aboutStory}
            </p>

            <p>
              My academic journey is anchored at <strong className="text-white">Sona College of Arts and Science</strong> in Salem, where I explore the intersection of machine learning algorithms and practical software engineering. Rather than treating AI as merely theoretical equations, I focus on applying computer vision, optical character recognition, and modern web frameworks to automate and secure real-world processes.
            </p>

            <p>
              During my industrial internship at <strong className="text-white">Futogen Institutions</strong>, I built full-stack workflows from front-facing responsive components down to database transactions. I approach every challenge with disciplined problem-solving, clean code habits, and enthusiasm for learning emerging libraries and tools.
            </p>

            {/* Quick Unboxed Detail Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Current Location</div>
                  <div className="text-sm font-semibold text-white">{data.personalInfo.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Degree & Graduation</div>
                  <div className="text-sm font-semibold text-white">B.Sc. CS (AI & DS) · 2024–2027</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars & Languages (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Core Competencies Box */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Core Engineering Pillars</span>
              </h3>

              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <BrainCircuit className="w-4 h-4 text-emerald-400" />
                    <span>Artificial Intelligence & Vision</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    OCR extraction, fraud pattern detection, and computer vision classification pipelines using Python.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Code2 className="w-4 h-4 text-teal-400" />
                    <span>Algorithmic Programming</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    Solid grounding in C, C++, and Python for data structures, object-oriented systems, and clean logic.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Full Stack Web Development</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    Responsive frontend UI architectures, Flask microservices, REST APIs, and database connectivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Languages spoken */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Languages</span>
              </h3>

              <div className="space-y-3">
                {data.personalInfo.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between py-1.5 border-b border-slate-800/80 last:border-0">
                    <span className="text-sm font-medium text-white">{lang.name}</span>
                    <span className="text-xs text-emerald-400 font-medium">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
