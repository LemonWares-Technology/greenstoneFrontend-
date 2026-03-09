import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-8 text-center ${className}`}
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
        <AlertTriangle size={24} className="text-red-400" />
      </div>
      <div>
        <p className="text-white/80 font-medium text-sm mb-1">Something went wrong</p>
        <p className="text-white/40 text-xs max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-5 py-2.5 rounded-full hover:bg-brand-primary/20 transition-colors"
        >
          <RefreshCw size={12} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
