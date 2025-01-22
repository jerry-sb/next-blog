import * as React from 'react';
import ThemeToggleButton from '@/app/components/button/ThemeToggleButton';
import Link from 'next/link';
import BuggerButton from '@/app/components/button/BuggerButton';

const RootHeader = () => {
  return (
    <header
      className={
        'bg-[var(--layout-bg)] flex justify-between items-center px-4  fixed top-0 h-[var(--header-height)] z-20 w-full border-b-2 border-b-[var(--border-color)]'
      }
    >
      <div className={'flex flex-grow'}>
        <Link href={'/'}>
          <h1 className={'font-bold text-2xl italic'}>SB Notes.</h1>
        </Link>
      </div>
      <div className={'flex flex-grow items-center justify-end lg:hidden'}>
        <BuggerButton />
      </div>
      <div
        className={
          'flex flex-grow justify-end items-center gap-4 sm:gap-7 hidden lg:flex'
        }
      >
        <Link href={'/'}>
          <p className={'font-bold italic text-lg'}>About me.</p>
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default RootHeader;
