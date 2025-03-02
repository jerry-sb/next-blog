'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TransitionHeader = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const [translateY, setTranslateY] = useState('0px');

  useEffect(() => {
    if (!path.includes('/detail')) {
      setTranslateY('0px');
      return;
    }
    const handleScroll = () => {
      const marginHeader = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--margin-header');

      const scrollY = window.scrollY;

      if (scrollY > 80) {
        setTranslateY(`${marginHeader}`);
      } else {
        setTranslateY('0px');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  return (
    <header
      className="w-full flex flex-col fixed z-20 transition-transform duration-300 ease-in-out"
      style={{ transform: `translateY(${translateY})` }}
    >
      {children}
    </header>
  );
};

export default TransitionHeader;
