import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Settings, 
  Sun, 
  Moon, 
  FileText, 
  Camera, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface NavbarProps {
  data: PortfolioData;
  profilePhoto: string | null;
  onOpenPhotoModal: () => void;
  onOpenSettings: () => void;
  onToggleTheme: () => void;
  onDownloadResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  profilePhoto,
  onOpenPhotoModal,
  onOpenSettings,
  onToggleTheme,
  onDownloadResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with tiny avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPhotoModal}
            title="Click to edit profile photo"
            className="group relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all cursor-pointer bg-slate-900 shrink-0"
          >
            <img 
              src={profilePhoto || '/assets/profile.svg'} 
              alt={data.personalInfo.name} 
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/profile.svg')) {
                  target.src = '/assets/profile.svg';
                }
              }}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <a 
            href="#home" 
            className="flex flex-col text-left group"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              {data.personalInfo.name}
            </span>
            <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">
              B.Sc. AI & Data Science
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line unboxed text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-emerald-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions & Quick Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title={data.theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {data.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>

          {/* Admin / Customizer Button */}
          <button
            onClick={onOpenSettings}
            aria-label="Open portfolio settings"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700/70 hover:border-emerald-500/50 rounded-lg transition-all"
            title="Customize Portfolio (Profile photo, projects, links, colors)"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Resume Download Action */}
          <button
            onClick={onDownloadResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-lg transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-emerald-400 text-base font-medium py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhotoModal();
              }}
              className="text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Change Profile Photo</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Portfolio Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
