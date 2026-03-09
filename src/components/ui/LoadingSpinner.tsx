import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  label = 'Loading...',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <div
        className={`${sizeMap[size]} border-brand-primary/20 border-t-brand-primary rounded-full animate-spin`}
      />
      {label && (
        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
