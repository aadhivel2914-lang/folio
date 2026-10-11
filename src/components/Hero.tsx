import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Phone, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Sparkles 
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface HeroProps {
  data: PortfolioData;
  profilePhoto: string | null;
  onOpenPhotoModal: () => void;
  onDownloadResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  profilePhoto,
  onOpenPhotoModal,
  onDownloadResume,
}) => {
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  useEffect(() => {
    if (!data.personalInfo.interestHighlights.length) return;
    const interval = setInterval(() => {
      setCurrentInterestIndex((prev) => 
        (prev + 1) % data.personalInfo.interestHighlights.length
      );
    }, 3200);
    return () => clearInterval(interval);
  }, [data.personalInfo.interestHighlights]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen Hero: 2-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="font-semibold tracking-wide">Aspiring IT Professional</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">AI & Data Science Enthusiast</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                Salem, India
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hello, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {data.personalInfo.name}
              </span>
            </h1>

            {/* Animated Rotating Specialty Highlight */}
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-slate-400 mr-2">Focusing on:</span>
              <span 
                key={currentInterestIndex}
                className="text-sm sm:text-base font-semibold text-emerald-300 transition-opacity duration-300"
              >
                {data.personalInfo.interestHighlights[currentInterestIndex] || 'Artificial Intelligence & Data Science'}
              </span>
            </div>

            {/* Introduction prose */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {data.personalInfo.shortIntro}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 rounded-xl transition-all whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-emerald-300 hover:underline transition-colors whitespace-nowrap"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 flex items-center gap-4 text-slate-400">
              <a
                href={data.personalInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${data.personalInfo.email}`}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${data.personalInfo.phone.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                title="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>

              <span className="text-xs text-slate-500 border-l border-slate-800 pl-4 py-1">
                Open to internships & junior engineering roles
              </span>
            </div>

          </div>

          {/* Right Column: Hero Profile Photo Container with Upload/Change */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Animated subtle halo backdrop */}
              <div 
                className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-500" 
                aria-hidden="true" 
              />

              {/* Main Avatar Circular Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-2 bg-gradient-to-b from-emerald-500/40 via-slate-800 to-slate-950 shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-700/60">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={data.personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* High-fidelity default stylized avatar with gradient initials & tech pattern */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-center p-6 select-none">
                      <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl font-extrabold text-emerald-400 mb-3 shadow-inner">
                        AV
                      </div>
                      <span className="text-base font-bold text-white tracking-wide">
                        {data.personalInfo.name}
                      </span>
                      <span className="text-xs text-slate-400 mt-1 max-w-[180px]">
                        AI & Data Science Student
                      </span>
                    </div>
                  )}

                  {/* Change Photo Hover Overlay */}
                  <button
                    onClick={onOpenPhotoModal}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 text-white transition-all duration-200 cursor-pointer"
                    title="Change profile photo"
                  >
                    <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-emerald-200">
                      Change Profile Photo
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Crop & Adjust Anytime
                    </span>
                  </button>
                </div>

                {/* Quick Camera Action Pill Button attached to bottom */}
                <button
                  onClick={onOpenPhotoModal}
                  aria-label="Upload or replace photo"
                  className="absolute bottom-2 right-4 p-3 rounded-full bg-slate-900 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-slate-700 shadow-lg transition-all cursor-pointer group/btn"
                  title="Upload profile photo"
                >
                  <Camera className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Proof & Academic strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-xs font-medium text-slate-500">Academic Standing</div>
            <div className="text-sm sm:text-base font-semibold text-white mt-1">2024 – 2027 Cohort</div>
            <div className="text-xs text-emerald-400">Sona College of Arts & Science</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500">Degree Focus</div>
            <div className="text-sm sm:text-base font-semibold text-white mt-1">B.Sc. CS (AI & DS)</div>
            <div className="text-xs text-slate-400">Artificial Intelligence</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500">Industry Training</div>
            <div className="text-sm sm:text-base font-semibold text-white mt-1">Futogen Institutions</div>
            <div className="text-xs text-emerald-400">Full Stack Intern (May–June '24)</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500">Flagship Project</div>
            <div className="text-sm sm:text-base font-semibold text-white mt-1">AI Certificate Check</div>
            <div className="text-xs text-teal-400">Computer Vision & OCR</div>
          </div>
        </div>

      </div>
    </section>
  );
};
