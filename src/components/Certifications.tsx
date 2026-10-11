import React from 'react';
import { Award, CheckCircle, ShieldCheck, ExternalLink, Calendar, Building } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface CertificationsProps {
  data: PortfolioData;
}

export const Certifications: React.FC<CertificationsProps> = ({ data }) => {
  return (
    <section id="certifications" className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Verified Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Industry and institutional accreditations earned through intensive hands-on development programs.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {data.certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {cert.issuePeriod}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {cert.title}
                </h3>

                <div className="text-sm font-medium text-emerald-400 flex items-center gap-1.5 mb-3">
                  <Building className="w-4 h-4" />
                  <span>{cert.issuer}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Covered Skills */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Competencies Verified:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {cert.credentialId && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Credential ID:</span>
                  <span className="text-slate-200">{cert.credentialId}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
