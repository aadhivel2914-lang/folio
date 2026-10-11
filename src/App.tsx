import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types/portfolio';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import { 
  loadPortfolioData, 
  savePortfolioData, 
  resetPortfolioData, 
  getProfilePhoto, 
  saveProfilePhoto, 
  removeProfilePhoto 
} from './utils/storage';
import { downloadResumeDocument } from './utils/resumeGenerator';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Strengths } from './components/Strengths';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

import { ProfilePhotoModal } from './components/ProfilePhotoModal';
import { SettingsModal } from './components/SettingsModal';
import { CertificateDemoModal } from './components/CertificateDemoModal';
import { Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'general' | 'projects' | 'education' | 'resume' | 'appearance' | 'backup'>('general');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load persistent data from storage on mount
  useEffect(() => {
    async function init() {
      try {
        const [savedData, savedPhoto] = await Promise.all([
          loadPortfolioData(),
          getProfilePhoto(),
        ]);
        setData(savedData);
        setProfilePhoto(savedPhoto);
      } catch (e) {
        console.warn('Initialization storage error:', e);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Sync theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (data.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [data.theme]);

  // Profile Photo handlers
  const handleSavePhoto = async (dataUrl: string) => {
    await saveProfilePhoto(dataUrl);
    setProfilePhoto(dataUrl);
    showToast('Profile photo updated successfully!');
  };

  const handleRemovePhoto = async () => {
    await removeProfilePhoto();
    setProfilePhoto(null);
    showToast('Profile photo removed. Restored default avatar.', 'info');
  };

  // Portfolio Data handlers
  const handleSaveData = async (updated: PortfolioData) => {
    setData(updated);
    await savePortfolioData(updated);
    showToast('Portfolio settings saved!');
  };

  const handleResetData = async () => {
    const restored = await resetPortfolioData();
    setData(restored);
    setProfilePhoto(null);
    showToast('Restored original resume defaults.');
  };

  const handleToggleTheme = async () => {
    const newTheme = data.theme === 'dark' ? 'light' : 'dark';
    const updated: PortfolioData = { ...data, theme: newTheme };
    setData(updated);
    await savePortfolioData(updated);
  };

  const handleDownloadResume = async () => {
    try {
      await downloadResumeDocument(data);
      showToast('Resume ready for download / printing.');
    } catch {
      showToast('Could not generate resume.', 'info');
    }
  };

  const handleOpenSettingsToResume = () => {
    setSettingsTab('resume');
    setSettingsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Loading Aadhipradhap V's Portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      data.theme === 'light' ? 'bg-slate-50 text-slate-900 light' : 'bg-slate-950 text-slate-100 dark'
    } bg-grid-pattern selection:bg-emerald-500/20 selection:text-emerald-300 font-sans`}>
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-2xl text-xs font-medium">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Primary Navigation Bar */}
      <Navbar
        data={data}
        profilePhoto={profilePhoto}
        onOpenPhotoModal={() => setPhotoModalOpen(true)}
        onOpenSettings={() => {
          setSettingsTab('general');
          setSettingsModalOpen(true);
        }}
        onToggleTheme={handleToggleTheme}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Area */}
      <main className="relative">
        <Hero
          data={data}
          profilePhoto={profilePhoto}
          onOpenPhotoModal={() => setPhotoModalOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <About data={data} />

        <Education data={data} />

        <Skills data={data} />

        <Experience data={data} />

        <Projects
          data={data}
          onOpenDemoModal={() => setDemoModalOpen(true)}
          onOpenSettings={() => {
            setSettingsTab('projects');
            setSettingsModalOpen(true);
          }}
        />

        <Certifications data={data} />

        <Strengths data={data} />

        <ResumeSection
          data={data}
          onDownloadResume={handleDownloadResume}
          onOpenSettingsToResume={handleOpenSettingsToResume}
        />

        <Contact data={data} />
      </main>

      {/* Footer */}
      <Footer data={data} />

      {/* Profile Photo Upload & Crop Modal */}
      <ProfilePhotoModal
        isOpen={photoModalOpen}
        currentPhoto={profilePhoto}
        userName={data.personalInfo.name}
        onClose={() => setPhotoModalOpen(false)}
        onSavePhoto={handleSavePhoto}
        onRemovePhoto={handleRemovePhoto}
      />

      {/* Settings / Admin Customization Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        initialTab={settingsTab}
        data={data}
        onClose={() => setSettingsModalOpen(false)}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
        onOpenPhotoModal={() => setPhotoModalOpen(true)}
      />

      {/* AI Fake Certificate Detection Interactive Demo Modal */}
      <CertificateDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

    </div>
  );
}
