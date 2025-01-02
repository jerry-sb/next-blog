'use client';
import { PropsWithChildren } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from 'next-themes';
import GlobalStyle from '@/app/GlobalStyles';

export default function Providers(props: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
