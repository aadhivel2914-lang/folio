import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface EducationProps {
  data: PortfolioData;
}

export const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education Timeline
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Formal degrees and matriculation history from primary schools to undergraduate studies in Salem, Tamil Nadu.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {data.education.map((item, index) => (
            <div key={item.id} className="relative pl-8 sm:pl-10 group">
              
              {/* Timeline Node */}
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-300 transition-all shadow-sm shadow-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* Education Card */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {item.status}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      {item.level}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono tabular-nums">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-semibold text-emerald-300 font-mono tabular-nums">
                      Score: {item.score}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
