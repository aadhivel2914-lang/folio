import React, { useState } from 'react';
import { Terminal, Code, Cpu, Layout, CheckCircle, Sparkles } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface SkillsProps {
  data: PortfolioData;
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Programming' | 'Web Technologies'>('All');

  const filteredSkills = data.skills.filter((skill) => {
    if (activeFilter === 'All') return true;
    return skill.category === activeFilter;
  });

  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'python':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'c':
        return <Cpu className="w-6 h-6 text-teal-400" />;
      case 'c++':
        return <Code className="w-6 h-6 text-cyan-400" />;
      case 'html':
        return <Layout className="w-6 h-6 text-amber-400" />;
      default:
        return <Code className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
              Technical Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Core Technical Skills
            </h2>
            <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">
              Grounded competency in algorithmic languages, software fundamentals, and web markup demonstrated through coursework and live projects.
            </p>
          </div>

          {/* Interactive Filter Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start md:self-auto">
            {(['All', 'Programming', 'Web Technologies'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {skill.name}
                </h3>

                <div className="text-xs font-medium text-emerald-400 mt-1 mb-3">
                  {skill.proficiencyLabel}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Key Concept Elements */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Concepts
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-300">
                  {skill.keyConcepts.map((concept, idx) => (
                    <React.Fragment key={concept}>
                      <span className="hover:text-emerald-400 transition-colors">{concept}</span>
                      {idx < skill.keyConcepts.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
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
