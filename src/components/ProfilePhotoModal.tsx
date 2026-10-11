import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Trash2, 
  Check, 
  AlertCircle, 
  Camera, 
  Move,
  Info
} from 'lucide-react';
import { CropState } from '../types/portfolio';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  currentPhoto: string | null;
  userName: string;
  onClose: () => void;
  onSavePhoto: (dataUrl: string) => Promise<void>;
  onRemovePhoto: () => Promise<void>;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  currentPhoto,
  userName,
  onClose,
  onSavePhoto,
  onRemovePhoto,
}) => {
  const [selectedRawImage, setSelectedRawImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropState>({ zoom: 1, panX: 0, panY: 0, rotation: 0 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSelectedRawImage(null);
      setCrop({ zoom: 1, panX: 0, panY: 0, rotation: 0 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setErrorMessage(null);

    // Validate type: JPG, JPEG, PNG, WebP
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please choose a JPG, PNG, or WebP image.');
      return;
    }

    // Validate size: max 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 5MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSelectedRawImage(result);
      setCrop({ zoom: 1, panX: 0, panY: 0, rotation: 0 });

      const img = new Image();
      img.onload = () => {
        imageObjRef.current = img;
        drawCroppedPreview(img, { zoom: 1, panX: 0, panY: 0, rotation: 0 });
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file from your device.');
    };
    reader.readAsDataURL(file);
  };

  const drawCroppedPreview = (img: HTMLImageElement, c: CropState) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Circular clipping mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Background fill
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, size, size);

    // Coordinate transforms
    ctx.translate(size / 2 + c.panX, size / 2 + c.panY);
    ctx.rotate((c.rotation * Math.PI) / 180);

    const aspect = img.width / img.height;
    let drawWidth = size * c.zoom;
    let drawHeight = (size / aspect) * c.zoom;
    if (aspect < 1) {
      drawHeight = size * c.zoom;
      drawWidth = size * aspect * c.zoom;
    }

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();

    // Subtle border overlay
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1.5, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#10b981';
    ctx.stroke();
    ctx.restore();
  };

  const handleZoomChange = (delta: number) => {
    const newZoom = Math.min(Math.max(crop.zoom + delta, 0.8), 3.0);
    const updated = { ...crop, zoom: newZoom };
    setCrop(updated);
    if (imageObjRef.current) {
      drawCroppedPreview(imageObjRef.current, updated);
    }
  };

  const handleRotate = () => {
    const newRot = (crop.rotation + 90) % 360;
    const updated = { ...crop, rotation: newRot };
    setCrop(updated);
    if (imageObjRef.current) {
      drawCroppedPreview(imageObjRef.current, updated);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedRawImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - crop.panX, y: e.clientY - crop.panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedRawImage) return;
    const newPanX = e.clientX - dragStart.x;
    const newPanY = e.clientY - dragStart.y;
    const updated = { ...crop, panX: newPanX, panY: newPanY };
    setCrop(updated);
    if (imageObjRef.current) {
      drawCroppedPreview(imageObjRef.current, updated);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;
    try {
      setIsSaving(true);
      // Generate clean WebP/JPEG dataUrl for storage
      const finalDataUrl = canvasRef.current.toDataURL('image/webp', 0.92);
      await onSavePhoto(finalDataUrl);
      setIsSaving(false);
      onClose();
    } catch (e) {
      setIsSaving(false);
      setErrorMessage('Could not save photo to persistent storage.');
    }
  };

  const handleRemove = async () => {
    try {
      setIsSaving(true);
      await onRemovePhoto();
      setSelectedRawImage(null);
      setIsSaving(false);
      onClose();
    } catch {
      setIsSaving(false);
      setErrorMessage('Failed to remove photo.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upload & Adjust Profile Photo</h2>
              <p className="text-xs text-slate-400">Position your headshot for the portfolio</p>
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

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Error message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Canvas or Current Photo Preview Area */}
          <div className="flex flex-col items-center justify-center">
            <div 
              className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-slate-950 flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {selectedRawImage ? (
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-cover pointer-events-none" 
                />
              ) : currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt={userName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl font-bold text-emerald-400 mb-2">
                    AV
                  </div>
                  <span className="text-xs text-slate-400">Default Avatar Active</span>
                </div>
              )}

              {selectedRawImage && (
                <div className="absolute bottom-2 bg-black/60 backdrop-blur-xs text-[10px] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 pointer-events-none">
                  <Move className="w-3 h-3" />
                  <span>Drag to pan</span>
                </div>
              )}
            </div>

            {/* File Picker trigger */}
            <div className="mt-4 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{selectedRawImage || currentPhoto ? 'Choose Another Image' : 'Select Photo from Device'}</span>
              </button>

              {(currentPhoto || selectedRawImage) && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/60 rounded-xl transition-all cursor-pointer"
                  title="Remove custom photo and reset to default avatar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Crop & Positioning Tool Controls (Only active when an image is loaded) */}
          {selectedRawImage && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Position & Scale Controls</span>
                <span className="text-emerald-400 font-mono">Zoom: {crop.zoom.toFixed(1)}x</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                {/* Zoom out */}
                <button
                  onClick={() => handleZoomChange(-0.15)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                {/* Slider */}
                <input
                  type="range"
                  min="0.8"
                  max="3.0"
                  step="0.05"
                  value={crop.zoom}
                  onChange={(e) => {
                    const z = parseFloat(e.target.value);
                    const updated = { ...crop, zoom: z };
                    setCrop(updated);
                    if (imageObjRef.current) drawCroppedPreview(imageObjRef.current, updated);
                  }}
                  className="flex-1 accent-emerald-400 cursor-pointer"
                />

                {/* Zoom in */}
                <button
                  onClick={() => handleZoomChange(0.15)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Rotate 90deg */}
                <button
                  onClick={handleRotate}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Rotate 90 degrees"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Persistent storage disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Local Persistence:</strong> Your photo is saved in your browser's IndexedDB and persists across reloads and tab closures. It does not synchronize automatically across different devices unless connected to an authenticated backend image bucket.
            </span>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {selectedRawImage && (
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isSaving ? 'Saving Photo...' : 'Save & Apply Photo'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
