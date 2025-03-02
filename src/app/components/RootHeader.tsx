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
            <Link className={'relative'} href={'/'}>
              <span
                className={
                  'absolute text-xs top-[-10px] left-[-15px] font-bold'
                }
              >
                준비중...
              </span>
              <p className={'font-bold italic text-lg line-through'}>
                About me.
              </p>
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
