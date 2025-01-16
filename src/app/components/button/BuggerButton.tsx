'use client';
import * as React from 'react';
import { SlMenu } from 'react-icons/sl';

const BuggerButton = () => {
  const onClickBugger = () => {};

  return (
    <button
      onClick={onClickBugger}
      className={'p-2  border border-[var(--border-color)]'}
    >
      <SlMenu size={25} />
    </button>
  );
};

export default BuggerButton;
