'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers(props: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{props.children}</>;
  }

  return (
    <ThemeProvider defaultTheme={'light'} attribute="data-theme">
      {props.children}
    </ThemeProvider>
  );
}
