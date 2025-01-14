import * as React from 'react';
import ThemeToggleButton from '@/app/components/button/ThemeToggleButton';
import Link from 'next/link';

const RootHeader = () => {
  return (
    <header
      className={
        'flex justify-between items-center px-4 sm:px-8 fixed top-0 h-[var(--header-height)] z-10 w-full'
      }
    >
      <div className={'flex flex-grow'}>
        <Link href={'/public'}>
          <h1 className={'font-bold text-2xl italic'}>SB Notes.</h1>
        </Link>
      </div>
      <div className={'flex flex-grow justify-end items-center gap-4 sm:gap-7'}>
        <Link href={'/public'}>
          <p className={'font-bold italic text-lg'}>About me.</p>
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default RootHeader;
