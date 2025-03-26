'use client';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }, [isVisible]);

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <div
        className={`absolute backdrop-blur-sm w-full h-full inset-0 transition-opacity duration-500 bg-opacity-50 bg-black flex items-center justify-center z-20 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button className={'absolute right-5 top-5'} onClick={onClose}>
          <IoMdClose className={'h-[2rem] w-[2rem]'} />
        </button>
        {children}
      </div>
    </>
  );
}
