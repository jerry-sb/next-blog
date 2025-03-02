'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ScrollProgressBar = () => {
  const path = usePathname();
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (!path.includes('/detail')) return;
    const updateScrollProgress = () => {
      if (document.documentElement.scrollHeight < 2000) return;
      const scrollTop = window.scrollY; // 현재 스크롤 위치
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight; // 전체 스크롤 가능 높이
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [path]);

  return (
    <>
      {path.includes('/detail') ? (
        <div
          className={'h-[var(--scroll-progress)] bg-heading relative top-0'}
          style={{ width: `${scrollProgress}%` }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ScrollProgressBar;
