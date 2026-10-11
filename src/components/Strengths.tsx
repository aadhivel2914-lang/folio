import React from 'react';
import { 
  Cpu, 
  Zap, 
  Users, 
  MessageSquare, 
  RefreshCw, 
  Target 
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface StrengthsProps {
  data: PortfolioData;
}

export const Strengths: React.FC<StrengthsProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-teal-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-teal-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-cyan-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="strengths" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Work Ethic & Professional Attributes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Strengths
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Core personal strengths and professional soft skills brought to development teams and software engineering tasks.
          </p>
        </div>

        {/* Strengths 3-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.strengths.map((strength) => (
            <div
              key={strength.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800">
                {getIcon(strength.iconName)}
              </div>

              <h3 className="text-lg font-bold text-white">
                {strength.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {strength.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
