'use client';

import React from 'react';
import { ButtonContainer } from './ButtonElements';
import { BUTTON_VARIANTS } from '@/app/constants/enum';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BUTTON_VARIANTS;
}

function Button({ children, variant }: ButtonProps) {
  return <ButtonContainer $variant={variant}>{children}</ButtonContainer>;
}

export default Button;
