import React from 'react';
import { Linkedin, Mail, Phone, ArrowUp, Github } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface FooterProps {
  data: PortfolioData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900 items-start">
          
          {/* Brand & Bio (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {data.personalInfo.name}
            </h3>
            <p className="text-xs text-emerald-400 font-medium">
              {data.personalInfo.title}
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              B.Sc. Computer Science (Artificial Intelligence & Data Science) · Sona College of Arts and Science, Salem (2024–2027).
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Quick Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-emerald-400 transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-400 transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  AI Certificate Detection
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Top (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Connect
            </div>
            <div className="flex items-center gap-3">
              <a
                href={data.personalInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${data.personalInfo.email}`}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${data.personalInfo.phone.replace(/\s+/g, '')}`}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-500 pt-1">
              Salem, Tamil Nadu, India
            </div>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} {data.personalInfo.name}. All rights reserved.
          </div>
          <div>
            Designed with dark navy & emerald palette · Fast & accessible
          </div>
        </div>

      </div>
    </footer>
  );
};
