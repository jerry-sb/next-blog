import React from 'react';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12 border-4',
    medium: 'w-16 h-16 border-8',
    large: 'w-24 h-24 border-8',
  };

  return (
    <div
      className={clsx(
        'rounded-full z-40 border-solid border-info border-t-white animate-spinner',
        sizeClasses[size]
      )}
    />
  );
};

export default LoadingSpinner;
