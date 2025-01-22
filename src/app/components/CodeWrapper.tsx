'use client';
import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  darcula,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

const CodeWrapper = ({ code }: { code: string }) => {
  const { resolvedTheme } = useTheme();

  return (
    <SyntaxHighlighter
      language="bash"
      style={resolvedTheme === 'dark' ? atomDark : darcula}
      customStyle={{ borderRadius: '15px', margin: '0' }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeWrapper;
