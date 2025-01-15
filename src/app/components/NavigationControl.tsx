'use client';
import * as React from 'react';
import { useEffect } from 'react';

const NavigationControl = () => {
  useEffect(() => {
    // CSS 변수 업데이트
    document.documentElement.style.setProperty('--nav-width', '0');

    // Cleanup: 페이지를 떠날 때 변수 복원 (선택 사항)
    return () => {
      document.documentElement.style.setProperty('--nav-width', '15rem');
    };
  }, []);
  return <></>;
};

export default NavigationControl;
