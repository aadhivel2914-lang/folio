import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Scan, 
  RefreshCw, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface CertificateDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestSample {
  id: string;
  name: string;
  type: 'authentic' | 'tampered_font' | 'fraudulent_seal';
  candidateName: string;
  degree: string;
  institution: string;
  rollNumber: string;
  confidenceScore: number;
  status: 'AUTHENTIC' | 'SUSPICIOUS_ALTERATION' | 'HIGH_RISK_FRAUD';
  findings: string[];
  ocrExtractedText: string;
}

const SAMPLE_CERTIFICATES: TestSample[] = [
  {
    id: 'sample-1',
    name: 'Sample 1: Verified Degree Certificate',
    type: 'authentic',
    candidateName: 'Aadhipradhap V',
    degree: 'B.Sc. Computer Science (AI & Data Science)',
    institution: 'Sona College of Arts and Science',
    rollNumber: 'SCAS-AIDS-2024-042',
    confidenceScore: 97.4,
    status: 'AUTHENTIC',
    findings: [
      'Institutional crest vectors match template database.',
      'Font metrics and kerning across name/roll number show uniform glyph baseline.',
      'Digital micro-texture and guilloche border pattern uncorrupted.',
      'Signature contour integrity verified against registered faculty signatures.',
    ],
    ocrExtractedText: 'SONA COLLEGE OF ARTS AND SCIENCE | Salem, Tamil Nadu | This is to certify that Aadhipradhap V has pursued B.Sc. Computer Science (AI & Data Science) | Roll: SCAS-AIDS-2024-042 | Regular Mode | Issued with University Seal',
  },
  {
    id: 'sample-2',
    name: 'Sample 2: Font Metric & Marksheet Tampering',
    type: 'tampered_font',
    candidateName: 'R. Sharma (Altered CGPA)',
    degree: 'B.Tech Information Technology',
    institution: 'State Technical University',
    rollNumber: 'STU-IT-2023-881',
    confidenceScore: 42.1,
    status: 'SUSPICIOUS_ALTERATION',
    findings: [
      'Discrepancy detected in text bounding box around marks column.',
      'Raster compression artifacts around "9.4 CGPA" indicate localized brush manipulation.',
      'Font anti-aliasing mismatch between candidate name and parent template font.',
      'Edge blur gradients around numeric score do not match certificate substrate.',
    ],
    ocrExtractedText: 'STATE TECHNICAL UNIVERSITY | Grade Sheet | R. Sharma | Roll: STU-IT-2023-881 | [ALERT: CGPA glyphs 9.4 patched with secondary font layer - font mismatch detected]',
  },
  {
    id: 'sample-3',
    name: 'Sample 3: Synthetic Stamp & Fraudulent Seal',
    type: 'fraudulent_seal',
    candidateName: 'K. Vignesh (Forged Credential)',
    degree: 'B.Sc. Data Analytics',
    institution: 'Metropolitan Institute',
    rollNumber: 'MI-2022-INVALID',
    confidenceScore: 18.5,
    status: 'HIGH_RISK_FRAUD',
    findings: [
      'University seal lacks radial symmetry and official relief geometry.',
      'Serial registration number does not conform to institution checksum algorithm.',
      'Watermark opacity variance exceeds threshold by 68%.',
      'Preliminary authenticity check failed on all primary security layers.',
    ],
    ocrExtractedText: 'METROPOLITAN INSTITUTE | Certificate of Completion | K. Vignesh | [FLAG: Forged rubber stamp overlay detected - opacity and pixel bleed incongruent]',
  },
];

export const CertificateDemoModal: React.FC<CertificateDemoModalProps> = ({ isOpen, onClose }) => {
  const [selectedSample, setSelectedSample] = useState<TestSample>(SAMPLE_CERTIFICATES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customPreviewUrl, setCustomPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<TestSample | null>(SAMPLE_CERTIFICATES[0]);

  if (!isOpen) return null;

  const handleSelectSample = (sample: TestSample) => {
    setCustomFile(null);
    setCustomPreviewUrl(null);
    setSelectedSample(sample);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(sample);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomFile(file);
    const url = URL.createObjectURL(file);
    setCustomPreviewUrl(url);
    setIsAnalyzing(true);

    // Run simulated OCR & CNN Feature Analysis on uploaded image
    setTimeout(() => {
      const isLikelyLegit = file.size > 80000;
      const customAnalysis: TestSample = {
        id: 'uploaded-custom',
        name: file.name,
        type: isLikelyLegit ? 'authentic' : 'tampered_font',
        candidateName: 'Extracted from Document Upload',
        degree: 'Certificate OCR Parsing Complete',
        institution: 'Detected Document Header',
        rollNumber: `DOC-VERIFIED-${Math.floor(1000 + Math.random() * 9000)}`,
        confidenceScore: isLikelyLegit ? 89.2 : 48.7,
        status: isLikelyLegit ? 'AUTHENTIC' : 'SUSPICIOUS_ALTERATION',
        findings: [
          `Image resolution: ${file.size > 500000 ? 'High Fidelity (300 DPI+)' : 'Standard Resolution'}`,
          'Document boundary detected and perspective deskewed.',
          'OCR text extraction processed via Tesseract OCR engine model.',
          isLikelyLegit 
            ? 'No visual tampering or pixel cloning detected across critical text boundaries.' 
            : 'Subtle compression variance around text blocks flagged for human auditor review.',
        ],
        ocrExtractedText: `[OCR STREAM]: Document '${file.name}' (${(file.size / 1024).toFixed(1)} KB) scanned. Extracted text lines match standard academic certificate geometry.`,
      };
      setAnalysisResult(customAnalysis);
      setIsAnalyzing(false);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>AI Fake Certificate Detection — Interactive Simulation</span>
              </h2>
              <p className="text-xs text-slate-400">
                Interactive preview of Aadhipradhap's computer vision and OCR verification pipeline.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Preset Sample Selectors & Custom Upload */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Select a Test Certificate or Upload Your Own
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {SAMPLE_CERTIFICATES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    !customFile && selectedSample.id === sample.id
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold truncate text-white">{sample.name}</div>
                  <div className="text-[11px] mt-1 text-slate-400">
                    Expected: {sample.status === 'AUTHENTIC' ? 'Genuine' : 'Tampered'}
                  </div>
                </button>
              ))}

              {/* Upload custom certificate button */}
              <label className="p-3 rounded-xl border border-dashed border-slate-700 hover:border-emerald-400 bg-slate-950 flex items-center justify-center gap-2 text-xs font-medium text-slate-300 hover:text-emerald-300 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Sample Image</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Analysis View Area */}
          {isAnalyzing ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3 bg-slate-950/60 rounded-2xl border border-slate-800">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              <div className="text-sm font-semibold text-white">Running AI Verification Pipeline...</div>
              <div className="text-xs text-slate-400">
                Segmenting glyphs · Extracting OCR text · Checking watermark contours · Computing authenticity confidence
              </div>
            </div>
          ) : analysisResult ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left 6 cols: Document Scanner Visualization */}
              <div className="md:col-span-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Inspection Viewport
                  </span>
                  <span className="font-mono text-emerald-400">OCR + Feature Mask</span>
                </div>

                {/* Simulated Certificate Canvas */}
                <div className="relative rounded-xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 min-h-[220px] flex flex-col justify-between overflow-hidden shadow-inner">
                  {/* Subtle watermark badge */}
                  <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
                    <ShieldCheck className="w-32 h-32 text-emerald-400" />
                  </div>

                  {customPreviewUrl ? (
                    <img 
                      src={customPreviewUrl} 
                      alt="Uploaded Certificate" 
                      className="max-h-48 object-contain mx-auto rounded"
                    />
                  ) : (
                    <div className="space-y-3 relative z-10 text-left">
                      <div className="text-center pb-2 border-b border-slate-800">
                        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                          {analysisResult.institution}
                        </div>
                        <div className="text-xs text-slate-400">Official Degree & Transcript</div>
                      </div>

                      <div className="space-y-1 py-2">
                        <div className="text-xs text-slate-400">Candidate Name:</div>
                        <div className="text-sm font-bold text-white">{analysisResult.candidateName}</div>
                      </div>

                      <div className="flex justify-between items-end pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 font-mono">
                        <span>Roll: {analysisResult.rollNumber}</span>
                        <span className="text-emerald-400">Seal Verified</span>
                      </div>
                    </div>
                  )}

                  {/* Scanning Laser Line Simulation */}
                  <div className="absolute inset-x-0 h-0.5 bg-emerald-400/80 shadow-[0_0_12px_#34d399] top-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                {/* Extracted OCR Feed */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                  <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-emerald-400" />
                    OCR Raw String Extraction:
                  </div>
                  <div className="text-slate-300 break-words leading-relaxed">
                    {analysisResult.ocrExtractedText}
                  </div>
                </div>
              </div>

              {/* Right 6 cols: Verification Score & Diagnostic Findings */}
              <div className="md:col-span-6 space-y-4">
                
                {/* Confidence Card */}
                <div className={`p-5 rounded-2xl border ${
                  analysisResult.status === 'AUTHENTIC'
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : analysisResult.status === 'SUSPICIOUS_ALTERATION'
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {analysisResult.status === 'AUTHENTIC' ? (
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-amber-400" />
                      )}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider">
                          Authenticity Status
                        </div>
                        <div className="text-lg font-bold text-white">
                          {analysisResult.status.replace(/_/g, ' ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Confidence Score</div>
                      <div className="text-2xl font-black font-mono tabular-nums text-white">
                        {analysisResult.confidenceScore}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Algorithmic Diagnostic Findings */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Feature Inspection Breakdown
                  </div>

                  <div className="space-y-2.5">
                    {analysisResult.findings.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Technical Note */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Designed with <strong className="text-slate-200">Python & Flask</strong> backend, utilizing OpenCV for edge morphology and contour checks, coupled with OCR text analysis against MySQL validation records.
                  </p>
                </div>

              </div>

            </div>
          ) : null}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Final-Year Project by Aadhipradhap V · Sona College of Arts & Science
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Simulation
          </button>
        </div>

      </div>
    </div>
  );
};
