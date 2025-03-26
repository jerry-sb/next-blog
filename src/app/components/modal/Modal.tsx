'use client';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import clsx from 'clsx';

export function Modal({
  children,
  isVisible,
  setIsVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const onClose = useCallback(() => {
    setIsVisible();
  }, [router]);

  clsx(
    'fixed w-full h-full inset-0 transition-opacity duration-500 bg-opacity-50 bg-black flex items-center justify-center z-[9999]',
    {}
  );
  return (
    <>
      <div
        className={clsx(
          'fixed w-full h-full inset-0',
          'transition-opacity duration-500',
          'bg-opacity-50 bg-black',
          'flex items-center justify-center',
          'z-[9999]',
          {
            'opacity-100 visible': isVisible,
            'opacity-0 invisible': !isVisible,
          }
        )}
      >
        <button className={'absolute right-5 top-5'} onClick={onClose}>
          <IoMdClose className={'h-[2rem] w-[2rem]'} />
        </button>
        {children}
      </div>
    </>
  );
}
