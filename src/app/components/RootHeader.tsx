import * as React from 'react';
import ThemeToggleButton from '@/app/components/button/ThemeToggleButton';
import Link from 'next/link';
import BuggerButton from '@/app/components/button/BuggerButton';
import ScrollProgressBar from '@/app/components/common/ScrollProgressBar';
import TransitionHeader from '@/app/components/TransitionHeader';

const RootHeader = () => {
  return (
    <>
      <TransitionHeader>
        <div className="bg-[var(--layout-bg)] relative flex justify-between items-center px-4 h-[var(--header-height)] w-full border-b-2 border-b-[var(--border-color)]">
          <div className={'flex flex-grow'}>
            <Link href={'/'}>
              <h1 className={'font-bold text-2xl italic hover:underline'}>
                SB Notes.
              </h1>
            </Link>
          </div>
          <div className={'flex flex-grow items-center justify-end lg:hidden'}>
            <BuggerButton />
          </div>
          <div
            className={
              'hidden lg:flex flex-grow justify-end items-center gap-4 sm:gap-7'
            }
          >
            <Link
              className={'relative'}
              href={'/detail/1d3817e60e4680fc86e5fcdff8526c26'}
            >
              <p className={'font-bold italic text-lg'}>About me.</p>
            </Link>
            <ThemeToggleButton />
          </div>
        </div>
        <ScrollProgressBar />
      </TransitionHeader>
    </>
  );
};

export default RootHeader;
