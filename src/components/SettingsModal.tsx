import React, { useState, useRef } from 'react';
import { 
  X, 
  Settings, 
  User, 
  FolderGit2, 
  GraduationCap, 
  FileText, 
  Palette, 
  Database, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Upload, 
  Check, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { PortfolioData, ProjectItem } from '../types/portfolio';
import { saveCustomResume, removeCustomResume } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  initialTab?: 'general' | 'projects' | 'education' | 'resume' | 'appearance' | 'backup';
  data: PortfolioData;
  onClose: () => void;
  onSaveData: (updated: PortfolioData) => Promise<void>;
  onResetData: () => Promise<void>;
  onOpenPhotoModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  initialTab = 'general',
  data,
  onClose,
  onSaveData,
  onResetData,
  onOpenPhotoModal,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'education' | 'resume' | 'appearance' | 'backup'>(initialTab);
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSaveData(formData);
      setIsSaving(false);
      setStatusMessage({ text: 'Changes saved successfully to browser storage!', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      setIsSaving(false);
      setStatusMessage({ text: 'Error saving settings.', type: 'error' });
    }
  };

  const handleResetConfirm = async () => {
    try {
      await onResetData();
      setConfirmReset(false);
      onClose();
    } catch {
      setStatusMessage({ text: 'Error resetting data.', type: 'error' });
    }
  };

  const handleResumeFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setStatusMessage({ text: 'Please select a valid PDF file for your resume.', type: 'error' });
      return;
    }

    try {
      const res = await saveCustomResume(file);
      const updated: PortfolioData = {
        ...formData,
        hasCustomResume: true,
        resumeFileName: res.fileName,
      };
      setFormData(updated);
      await onSaveData(updated);
      setStatusMessage({ text: `Custom resume "${file.name}" saved!`, type: 'success' });
    } catch {
      setStatusMessage({ text: 'Failed to save custom resume PDF.', type: 'error' });
    }
  };

  const handleRemoveCustomResume = async () => {
    try {
      await removeCustomResume();
      const updated: PortfolioData = {
        ...formData,
        hasCustomResume: false,
        resumeFileName: undefined,
      };
      setFormData(updated);
      await onSaveData(updated);
      setStatusMessage({ text: 'Custom resume removed. Restored default resume.', type: 'success' });
    } catch {
      setStatusMessage({ text: 'Failed to reset resume.', type: 'error' });
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(formData, null, 2))}`;
    const a = document.createElement('a');
    a.href = jsonString;
    a.download = `aadhipradhap_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo) {
          setFormData(parsed);
          await onSaveData(parsed);
          setStatusMessage({ text: 'Portfolio configuration imported successfully!', type: 'success' });
        } else {
          setStatusMessage({ text: 'Invalid portfolio JSON structure.', type: 'error' });
        }
      } catch {
        setStatusMessage({ text: 'Failed to parse JSON backup file.', type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  // Project item handlers
  const handleUpdateProject = (index: number, field: keyof ProjectItem, value: any) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Software Project',
      tagline: 'Engineering Project Tagline',
      description: 'Describe the project architecture and what problem it solves.',
      isFeatured: false,
      technologies: ['Python', 'HTML', 'JavaScript'],
      features: ['Core algorithm processing', 'User interaction dashboard'],
      liveDemoUrl: '',
      githubUrl: '',
      status: 'In Development',
    };
    setFormData({ ...formData, projects: [...formData.projects, newProj] });
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Portfolio Admin & Customizer</span>
              </h2>
              <p className="text-xs text-slate-400">
                Modify content, project links, resume file, and visual styles without touching code.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local-Only Editing Mode Banner */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong>Local Browser Edition:</strong> All modifications persist immediately in your device's IndexedDB. Export a JSON backup to keep safe copies.
            </span>
          </div>
          {statusMessage && (
            <span className={`text-xs font-semibold ${statusMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {statusMessage.text}
            </span>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 overflow-x-auto gap-2 py-2">
          {[
            { id: 'general', label: 'Personal Info', icon: User },
            { id: 'projects', label: 'Projects & Links', icon: FolderGit2 },
            { id: 'education', label: 'Education & Skills', icon: GraduationCap },
            { id: 'resume', label: 'Photo & Resume', icon: FileText },
            { id: 'appearance', label: 'Theme & Accent', icon: Palette },
            { id: 'backup', label: 'Backup & Reset', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Professional Title</label>
                  <input
                    type="text"
                    value={formData.personalInfo.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={formData.personalInfo.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, location: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={formData.personalInfo.linkedIn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, linkedIn: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Short Hero Introduction</label>
                <textarea
                  rows={2}
                  value={formData.personalInfo.shortIntro}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, shortIntro: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">About Story & Passion</label>
                <textarea
                  rows={4}
                  value={formData.personalInfo.aboutStory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, aboutStory: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & LINKS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Project Showcase Management</h3>
                  <p className="text-xs text-slate-400">
                    Configure demo URLs, GitHub repositories, and feature bullets.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400">
                          {project.isFeatured ? '★ Featured Project' : `Project #${index + 1}`}
                        </span>
                        <span className="text-xs text-slate-400">· {project.title}</span>
                      </div>
                      {!project.isFeatured && (
                        <button
                          onClick={() => handleDeleteProject(index)}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Tagline / Subtitle</label>
                        <input
                          type="text"
                          value={project.tagline}
                          onChange={(e) => handleUpdateProject(index, 'tagline', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">Description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    {/* URLs: Live Demo and GitHub Repo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                          <span>Live Demo URL</span>
                          <span className="text-[10px] text-slate-500">Leave blank if not yet hosted</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://your-demo-url.com"
                          value={project.liveDemoUrl || ''}
                          onChange={(e) => handleUpdateProject(index, 'liveDemoUrl', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                          <span>GitHub Repository URL</span>
                          <span className="text-[10px] text-slate-500">Leave blank if private</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://github.com/your-username/repo"
                          value={project.githubUrl || ''}
                          onChange={(e) => handleUpdateProject(index, 'githubUrl', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) =>
                          handleUpdateProject(
                            index,
                            'technologies',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION & SKILLS */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Education Entries</h3>
                <div className="space-y-4">
                  {formData.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs text-emerald-400 font-bold">
                        <span>{edu.level}</span>
                        <span className="font-mono">{edu.period}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[idx] = { ...updated[idx], institution: e.target.value };
                            setFormData({ ...formData, education: updated });
                          }}
                          className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white"
                        />
                        <input
                          type="text"
                          value={edu.score}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[idx] = { ...updated[idx], score: e.target.value };
                            setFormData({ ...formData, education: updated });
                          }}
                          className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white mb-2">Technical Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.skills.map((skill, idx) => (
                    <div key={skill.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs font-semibold text-white">
                        <span>{skill.name}</span>
                        <span className="text-[11px] text-slate-400">{skill.category}</span>
                      </div>
                      <input
                        type="text"
                        value={skill.proficiencyLabel}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[idx] = { ...updated[idx], proficiencyLabel: e.target.value };
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PHOTO & RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6 max-w-2xl">
              {/* Profile Photo Quick Section */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Profile Photo Controls</h3>
                <p className="text-xs text-slate-400">
                  Crop, rotate, and zoom your portrait directly in the visual editor.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPhotoModal();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer"
                >
                  Launch Profile Photo Cropper
                </button>
              </div>

              {/* Custom Resume PDF Replacement Section */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Official Resume PDF File</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload your actual signed or curated resume PDF to replace the default auto-generated document.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {formData.hasCustomResume
                          ? formData.resumeFileName || 'Custom Uploaded Resume.pdf'
                          : 'Default Resume Generator Active'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formData.hasCustomResume
                          ? 'Downloads this specific PDF upon clicking "Download Resume"'
                          : 'Dynamically formats all resume data into printable document'}
                      </div>
                    </div>
                  </div>

                  {formData.hasCustomResume && (
                    <button
                      onClick={handleRemoveCustomResume}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reset to Default</span>
                    </button>
                  )}
                </div>

                <div>
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => resumeInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom PDF File</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 max-w-xl">
              {/* Theme */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Theme Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['dark', 'light'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormData({ ...formData, theme: t })}
                      className={`p-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer transition-all ${
                        formData.theme === t
                          ? 'bg-emerald-950/40 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t} Mode
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Accent Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'emerald', label: 'Emerald Green', hex: '#10b981' },
                    { id: 'cyan', label: 'Tech Cyan', hex: '#06b6d4' },
                    { id: 'sapphire', label: 'Sapphire Blue', hex: '#3b82f6' },
                    { id: 'teal', label: 'Sea Teal', hex: '#14b8a6' },
                  ].map((accent) => (
                    <button
                      key={accent.id}
                      onClick={() => setFormData({ ...formData, accentColor: accent.id as any })}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                        formData.accentColor === accent.id
                          ? 'bg-slate-950 border-emerald-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: accent.hex }} />
                      <span>{accent.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">JSON Data Backup & Portability</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export all your customized profile details, project URLs, and settings into a JSON backup file. You can import this file anytime to restore your edits on another browser or machine.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Export JSON Backup</span>
                  </button>

                  <input
                    ref={backupInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                  <button
                    onClick={() => backupInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON Backup</span>
                  </button>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-300 text-sm font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Restore Original Resume Defaults</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This will reset all portfolio text, project cards, profile photo, and resume settings back to Aadhipradhap's original resume details.
                </p>

                {confirmReset ? (
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleResetConfirm}
                      className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all cursor-pointer"
                    >
                      Yes, Confirm Reset to Default
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-slate-950 border border-rose-900/60 rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Portfolio Content</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
