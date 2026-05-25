import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, X } from 'lucide-react';
import { uploadService } from '../../services/upload';
import { getImageUrl } from '../../utils/imageUrl';

export const ADMIN_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const ADMIN_IMAGE_ACCEPT =
  'image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.avif,.svg';

export function validateAdminImageFile(file: File): string | null {
  if (file.size > ADMIN_IMAGE_MAX_BYTES) {
    return 'Image must be 10 MB or smaller.';
  }
  const ok =
    file.type.startsWith('image/') ||
    /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(file.name);
  if (!ok) {
    return 'Use JPG, PNG, WebP, GIF, AVIF, or SVG.';
  }
  return null;
}

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  accept?: string;
  hint?: string;
  /** `immediate` uploads to POST /api/upload. `deferred` keeps the file for multipart resource forms. */
  mode?: 'immediate' | 'deferred';
  /** When mode is `deferred`, called with the selected file or null when cleared. */
  onFileChange?: (file: File | null) => void;
}

const AdminImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  required = false,
  accept = ADMIN_IMAGE_ACCEPT,
  hint = 'JPG, PNG, WebP, GIF, AVIF, SVG up to 10 MB',
  mode = 'immediate',
  onFileChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [deferredPreview, setDeferredPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (deferredPreview) URL.revokeObjectURL(deferredPreview);
    };
  }, [deferredPreview]);

  const displaySrc = mode === 'deferred' && deferredPreview ? deferredPreview : getImageUrl(value);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    const validation = validateAdminImageFile(file);
    if (validation) {
      setError(validation);
      return;
    }
    setError(null);

    if (mode === 'deferred') {
      if (deferredPreview) URL.revokeObjectURL(deferredPreview);
      const next = URL.createObjectURL(file);
      setDeferredPreview(next);
      onFileChange?.(file);
      return;
    }

    setUploading(true);
    try {
      const res = await uploadService.uploadFile(file);
      const url = res?.data?.url ?? (res as { url?: string })?.url;
      if (url) onChange(url);
      else setError('Upload succeeded but no URL returned.');
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message ?? 'Upload failed. Try again or use a smaller image.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const clearDeferred = () => {
    if (deferredPreview) URL.revokeObjectURL(deferredPreview);
    setDeferredPreview(null);
    onFileChange?.(null);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const handleRemove = () => {
    if (mode === 'deferred') {
      clearDeferred();
    }
    onChange('');
  };

  const hasPreview = Boolean(displaySrc);

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">
          {label} {required && '*'}
        </label>
      )}
      {hasPreview ? (
        <div className="relative group rounded-xl overflow-hidden border border-green-800/10 bg-green-50/50 h-40">
          <img src={displaySrc} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/20 group-focus-within:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity px-4 py-2 rounded-lg bg-white/90 text-green-800 font-bold text-sm shadow"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : 'Change'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-2 rounded-lg bg-red-500/90 text-white"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <input ref={inputRef} type="file" accept={accept} onChange={onInputChange} className="sr-only" />
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            dragOver ? 'border-brand-primary bg-brand-primary/10' : 'border-green-800/10 hover:bg-green-50/50'
          } ${uploading ? 'pointer-events-none' : ''}`}
        >
          <div className="space-y-1 text-center">
            {uploading ? (
              <Loader2 size={40} className="mx-auto animate-spin text-brand-primary" />
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-green-800/30 group-hover:text-brand-primary transition-colors" />
            )}
            <div className="flex text-sm text-green-800/70 justify-center gap-1">
              <span className="font-medium text-green-800 hover:text-brand-primary">Upload a file</span>
              <span>or drag and drop</span>
            </div>
            <p className="text-xs text-green-800/50">{hint}</p>
          </div>
          <input ref={inputRef} type="file" accept={accept} onChange={onInputChange} className="sr-only" />
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  );
};

export default AdminImageUpload;
