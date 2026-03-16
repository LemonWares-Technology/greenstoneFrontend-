import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, X } from 'lucide-react';
import { uploadService } from '../../services/upload';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  accept?: string;
  hint?: string;
}

const AdminImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  required = false,
  accept = 'image/*',
  hint = 'PNG, JPG, GIF up to 10MB',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, GIF).');
      return;
    }
    setError(null);
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

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">
          {label} {required && '*'}
        </label>
      )}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-green-800/10 bg-green-50/50 h-40">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-green-900/0 hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="opacity-0 hover:opacity-100 transition-opacity px-4 py-2 rounded-lg bg-white/90 text-green-800 font-bold text-sm shadow"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : 'Change'}
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="opacity-0 hover:opacity-100 transition-opacity p-2 rounded-lg bg-red-500/90 text-white"
            >
              <X size={16} />
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onInputChange}
            className="sr-only"
          />
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
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onInputChange}
            className="sr-only"
          />
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  );
};

export default AdminImageUpload;
