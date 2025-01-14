import React from 'react';
import clsx from 'clsx';
import { BUTTON_VARIANTS } from '@/app/constants/enum';

interface ButtonProps {
  variant?: BUTTON_VARIANTS;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_VARIANTS.Primary,
  children,
}) => {
  return (
    <button
      className={clsx(
        'text-base px-8 py-3 transition-colors duration-500 border-none rounded-md cursor-pointer shadow-md focus:outline-none',
        {
          'bg-primary-button-bg text-primary-button-text hover:bg-primary-button-hover':
            variant === BUTTON_VARIANTS.Primary,
          'bg-secondary-button-bg text-secondary-button-text hover:bg-secondary-button-hover':
            variant === BUTTON_VARIANTS.Secondary,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
